import footprint from "@onefootprint/footprint-js";
import "@onefootprint/footprint-js/dist/footprint-js.css";

import "./style.css";

const publicKey = "ob_test_WNgSBRR7uxoT8JRDBBflgw";
const appearance = {
  theme: "light",
  variables: {
    fontFamily:
      '"SF UI Text", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    linkColor: "#101010",
    colorError: "#D14343",
    buttonPrimaryBg: "#52BD95",
    buttonPrimaryHoverBg: "#429777",
    buttonPrimaryActiveBg: "#317159",
    buttonPrimaryColor: "#FFF",
    buttonBorderRadius: "4px",
    linkButtonColor: "#52BD95",
    labelColor: "#101840",
    inputBorderRadius: "4px",
    inputBorderWidth: "1px",
    inputPlaceholderColor: "#B5B5B5",
    inputColor: "#474d66",
    inputBg: "#FFFFFF",
    inputBorderColor: "#d8dae5",
    inputFocusElevation: "none",
    inputErrorFocusElevation: "box-shadow: 0 0 0 2px #d6e0ff;",
    inputHoverBorderColor: "#ADC2FF",
    hintColor: "#696f8c",
  },
};

const button = document.getElementById("verify-button");
button.addEventListener("click", () => {
  const component = footprint.init({
    kind: "verify",
    publicKey,
    appearance,
    l10n: { locale: "en-US" },
    onComplete: (validationToken) => {
      // TODO: User has finished the flow. This validation token can be used to fetch the fp_id
      // of the user, the auth method they used to log in, and their KYC status
      // check: https://docs.onefootprint.com/sdks/javascript#available-components-verify-component-integration-available-props
      console.log(validationToken);
    },
    onAuth: (validationToken) => {
      // User has authenticated. Optionally, this validation token can be used to fetch the fp_id
      // of the authenticated user and the auth method they used to log in
      // check: https://docs.onefootprint.com/sdks/javascript#available-components-verify-component-integration-available-props
      console.log(validationToken);
    },
  });
  component.render();
});
