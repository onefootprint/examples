package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"

	"github.com/gorilla/mux"
)

const (
	address string = "127.0.0.1:3000"
)

var PublishableKey string
var SecretKey string

func main() {
	fmt.Printf("Visit web app at: http://%s\n", address)

	PublishableKey = os.Getenv("PUBLISHABLE_KEY")
	if PublishableKey == "" {
		fmt.Println("Missing PUBLISHABLE_KEY environment variable")
		return
	}

	SecretKey = os.Getenv("SECRET_KEY")
	if SecretKey == "" {
		fmt.Println("Missing SECRET_KEY environment variable")
		return
	}

	serverDone := make(chan bool)

	srv := &http.Server{
		Addr:    address,
		Handler: NewRouter(),
	}

	go func() {
		if err := srv.ListenAndServe(); err != nil {
			close(serverDone)
		}
	}()

	<-serverDone
}

/**
* Routes
 */
func NewRouter() http.Handler {
	m := mux.NewRouter()
	m.HandleFunc("/", indexHandler).Methods(http.MethodGet)
	m.HandleFunc("/complete", postTokenHandler).Methods(http.MethodPost)
	return m
}

// Handles rendering the onboarding page
func indexHandler(w http.ResponseWriter, r *http.Request) {
	StartOnboardingPage(Index{PublishableKey: PublishableKey}, w)
}

// 1. receives the validation_token
// 2. exchanges the token for a footprint user id, and verification status
// 3. decrypts some basic information about the user
// 4. renders the completion page
func postTokenHandler(w http.ResponseWriter, r *http.Request) {
	validationToken := r.PostFormValue("validationToken")
	fmt.Printf("[DEBUG] got token from client %s\n", validationToken)

	// 1. perform the validation request
	type ValidateRequest struct {
		ValidationToken string `json:"validation_token"`
	}

	type ValidateResponse struct {
		FootprintUserId string `json:"footprint_user_id"`
		Status          string `json:"status"`
		Timestamp       string `json:"timestamp"`
	}

	var validationResponse ValidateResponse
	err := footprintApiRequest("POST", "users/validate", &ValidateRequest{validationToken}, &validationResponse)
	if err != nil {
		ErrorPage(err, w)
		return
	}

	// NOTE: in a real application you would want to store `validationResponse.FootprintUserId`
	// on the user record who you're enrolling into your product

	// TODO: save `validationResponse.FootprintUserId`

	// 2. decrypt some basic attributes
	type DecryptRequest struct {
		Fields []string `json:"fields"`
		Reason string   `json:"reason"`
	}
	decryptRequest := DecryptRequest{Fields: []string{"dob", "first_name", "last_name", "ssn4"}, Reason: "Demo app test"}

	type DecryptResponse struct {
		Dob       string `json:"dob"`
		Ssn4      string `json:"ssn4"`
		FirstName string `json:"first_name"`
		LastName  string `json:"last_name"`
	}

	var decryptResponse DecryptResponse
	err = footprintApiRequest("POST", fmt.Sprintf("users/%s/identity/decrypt", validationResponse.FootprintUserId), &decryptRequest, &decryptResponse)
	if err != nil {
		ErrorPage(err, w)
		return
	}

	CompletePage(Complete{
		FootprintUserId: validationResponse.FootprintUserId,
		Status:          validationResponse.Status,
		Timestamp:       validationResponse.Timestamp,
		FirstName:       decryptResponse.FirstName,
		LastName:        decryptResponse.LastName,
		Dob:             decryptResponse.Dob,
		Ssn4:            decryptResponse.Ssn4,
	}, w)
}

/**
* API helper to route authenticated requests to footprint
 */
func footprintApiRequest(method string, path string, input interface{}, target interface{}) (err error) {
	fmt.Printf("[DEBUG] making request %s %s\n", method, path)

	url := fmt.Sprintf("http://api.onefootprint.com/%s", path)
	jsonData, err := json.Marshal(input)
	if err != nil {
		return
	}

	client := http.Client{}

	request, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
	request.Header.Add("Content-Type", "application/json")

	request.Header.Add("X-Footprint-Secret-Key", SecretKey)
	if err != nil {
		return
	}

	resp, err := client.Do(request)
	if err != nil {
		return
	}

	fmt.Printf("[DEBUG] got status: %s \n", resp.Status)

	if resp.StatusCode != 200 {
		responseData, err := ioutil.ReadAll(resp.Body)
		if err != nil {
			return err
		}

		return fmt.Errorf("Status %s, Error: %s", resp.Status, string(responseData))
	}

	defer resp.Body.Close()
	return json.NewDecoder(resp.Body).Decode(target)
}
