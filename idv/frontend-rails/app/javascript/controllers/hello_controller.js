import { Controller } from "@hotwired/stimulus"
import footprint from "@onefootprint/footprint-js";

export default class extends Controller {
  connect() {
  }
  handleClick() {
    const component = footprint.init({
      kind: 'verify',
      publicKey: 'ob_test_3HCvQT0SecyDEXIVl0wOf9'
    });
    component.render();
    debugger;
  }
}
