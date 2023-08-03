<script>
import footprint from '@onefootprint/footprint-js';
import '@onefootprint/footprint-js/dist/footprint-js.css';

export default {
  mounted() {
    const button = document.getElementById('my-button');
    button.addEventListener('click', this.handleOpen)

    const component = footprint.init({
      kind: 'form',
      containerId: 'my-form',
      variant: 'inline',
      authToken: 'tok_joXzzB0kIVW0fMCB7RWPAHWt8itWdFWpit', // auth token generated using the Secret API Key on step 5
      onComplete: () => {
        console.log("saved");
      },
      onCancel: () => {
        console.log("canceled");
      },
      onClose: () => {
        console.log("closed");
      }
    });
  },
  methods: {
    handleOpen() {
      const component = footprint.init({
        kind: 'verify',
        publicKey: 'ob_test_WNgSBRR7uxoT8JRDBBflgw',
      });
      component.render()
    }
  }
}
</script>

<template>
  <div class="card">
    <div class="container">
      <button id="my-button"></div>
      <div id="my-form"></div>
    </div>
  </div>
</template>

