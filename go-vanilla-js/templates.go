package main

import (
	"fmt"
	"html/template"
	"net/http"
)

type Index struct {
	PublishableKey string
}

func StartOnboardingPage(page Index, w http.ResponseWriter) {
	template := template.Must(template.ParseFiles("templates/index.html"))
	template.Execute(w, page)
}

type Complete struct {
	FootprintUserId      string
	Status               string
	RequiresManualReview bool
	Timestamp            string
	FirstName            string
	LastName             string
	Dob                  string
	Ssn4                 string
}

func CompletePage(page Complete, w http.ResponseWriter) {
	template := template.Must(template.ParseFiles("templates/complete.html"))
	template.Execute(w, page)
}

type Error struct {
	Message string
}

func ErrorPage(error error, w http.ResponseWriter) {
	fmt.Printf("Rendering error: %s\n", error.Error())
	template := template.Must(template.ParseFiles("templates/error.html"))
	template.Execute(w, Error{Message: error.Error()})
}
