# Go + Vanilla JS example
This simple example app creates a Golang web server that renders basic HTML using Footprint.js that launches the footprint flow.
Most importantly, the files of interest are `templates/index.html` and `main.go`.

# How to run
1. `go get .`
2. Set environment variables secrets `export PUBLISHABLE_KEY=ob_test_... SECRET_KEY=sk_test_...`
3. `go run footprint-go-example`

# Overview 
## Frontend
1. Inside of `templates/index.html` we import the `footprint.js` vanilla JS sdk
2. Next, we implement the `window.onFootprintCompleted` handler to post the validation token to the `/complete` endpoint on the backend.
3. Next, we add the footprint button div to let the user initiate the onboarding flow, and we embed the `PublishableKey` that we render from the backend template.

## Backend
1. First, we use the `PublishableKey` to render the frontend page that loads the Footprint button.
2. Next, we implement the `POST /complete` endpoint which sends the validation token from the frontend to the backend
3. Next, we verify the token to ensure it's a valid onboarding. 
4. Next, you should store the `FootprintUserId` to your database (we omit this in the demo)
5. Finally, (optionally) decrypt some data about your user and render it using the `template/complete.html` template


