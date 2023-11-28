import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="verify"
export default class extends Controller {
  connect() {
  }

  handleClick() {
    console.log("Verify controller clicked");
  }
}
