package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
)

type FootprintClient struct {
	Host         string
	SecretApiKey string
}

func NewFootprintApi(secretApiKey string) FootprintClient {
	return FootprintClient{Host: "https://api.onefootprint.com", SecretApiKey: secretApiKey}
}

// Request a resource from the Footprint API
func (f FootprintClient) Request(method string, path string, input interface{}, target interface{}) (err error) {
	fmt.Printf("[DEBUG] making request %s %s\n", method, path)

	url := fmt.Sprintf("%s/%s", f.Host, path)
	jsonData, err := json.Marshal(input)
	if err != nil {
		return
	}

	client := http.Client{}

	request, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
	request.Header.Add("Content-Type", "application/json")

	request.Header.Add("X-Footprint-Secret-Key", f.SecretApiKey)
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

		return fmt.Errorf("status %s, error: %s", resp.Status, string(responseData))
	}

	defer resp.Body.Close()
	return json.NewDecoder(resp.Body).Decode(target)
}
