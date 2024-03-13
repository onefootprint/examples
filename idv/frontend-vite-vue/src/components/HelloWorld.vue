<script>
import footprint from "@onefootprint/footprint-js";

export default {
  mounted() {
    const button = document.getElementById("verify-button");
    button.addEventListener("click", this.handleOpen);
  },
  methods: {
    handleOpen() {
      const publicKey = "ob_test_WNgSBRR7uxoT8JRDBBflgw";
      const component = footprint.init({
        kind: "verify",
        publicKey,
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
    },
  },
};
</script>

<template>
  <main>
    <button id="verify-button" type="button">Verify with Footprint</button>
  </main>
</template>
