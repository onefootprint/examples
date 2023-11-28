import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
  }
  handleClick() {
    console.log("Hello controller clicked");
  }
}
