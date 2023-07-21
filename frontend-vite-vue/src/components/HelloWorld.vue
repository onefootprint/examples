<script>
import footprintComponent from '@onefootprint/footprint-components-js';
import footprint from '@onefootprint/footprint-js';
import '@onefootprint/footprint-components-js/dist/footprint-components-js.css';

export default {
  mounted() {
    const container = document.getElementById('footprint-container');
    const button = footprint.createButton(container);
    button.addEventListener('click', this.handleOpen)

    footprintComponent.render({
      kind: 'secure-form',
      containerId: 'footprint-secure-form',
      props: {
        authToken: 'tok_joXzzB0kIVW0fMCB7RWPAHWt8itWdFWpit', // auth token generated using the Secret API Key on step 5
        cardAlias: 'primary', // this should match the cardAliases used while generating the auth token
        variant: 'card',
        onSave: () => {
          console.log("saved");
        },
        onCancel: () => {
          console.log("canceled");
        },
        onClose: () => {
          console.log("closed");
        }
      },
    });
  },
  methods: {
    handleOpen() {
      footprint.open({
        publicKey: 'ob_test_WNgSBRR7uxoT8JRDBBflgw',
      });
    }
  }
}
</script>

<template>
  <div class="card">
    <div class="container">
      <div id="footprint-container"></div>
      <div id="footprint-secure-form" class="form"></div>
    </div>
  </div>
</template>

