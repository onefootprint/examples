package main

import (
	"fmt"
	"net/http"
	"os"

	"github.com/gorilla/mux"
)

const (
	address string = "127.0.0.1:3000"
)

var PublishableKey string

var footprintClient FootprintClient

func main() {
	fmt.Printf("Visit web app at: http://%s\n", address)

	PublishableKey = os.Getenv("PUBLISHABLE_KEY")
	if PublishableKey == "" {
		fmt.Println("Missing PUBLISHABLE_KEY environment variable")
		return
	}

	secretKey := os.Getenv("SECRET_KEY")
	if secretKey == "" {
		fmt.Println("Missing SECRET_KEY environment variable")
		return
	}

	footprintClient = NewFootprintApi(secretKey)

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
	StartOnboardingPage(Index{PublishableKey}, w)
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
		FootprintUserId      string `json:"footprint_user_id"`
		Status               string `json:"status"`
		RequiresManualReview bool   `json:"requires_manual_review"`
		Timestamp            string `json:"timestamp"`
	}

	var validationResponse ValidateResponse
	err := footprintClient.Request("POST", "onboarding/session/validate", &ValidateRequest{validationToken}, &validationResponse)
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
	err = footprintClient.Request("POST", fmt.Sprintf("users/%s/vault/identity/decrypt", validationResponse.FootprintUserId), &decryptRequest, &decryptResponse)
	if err != nil {
		ErrorPage(err, w)
		return
	}

	CompletePage(Complete{
		FootprintUserId:      validationResponse.FootprintUserId,
		Status:               validationResponse.Status,
		RequiresManualReview: validationResponse.RequiresManualReview,
		Timestamp:            validationResponse.Timestamp,
		FirstName:            decryptResponse.FirstName,
		LastName:             decryptResponse.LastName,
		Dob:                  decryptResponse.Dob,
		Ssn4:                 decryptResponse.Ssn4,
	}, w)
}
