<script>
import footprint from '@onefootprint/footprint-js';


export default {
  mounted() {
    const button = document.getElementById('verify-button');
    button.addEventListener('click', this.handleOpen);
  },
  methods: {
    handleOpen() {
      const publicKey = 'ob_test_WNgSBRR7uxoT8JRDBBflgw';
      const component = footprint.init({
        kind: 'verify',
        publicKey,
        onComplete: (validationToken) => {
          console.log(validationToken)
        },
      });
      component.render();
    }
  }
}
</script>

<template>
  <main>
    <button id="verify-button" type="button">Verify with Footprint</button>
  </main>
</template>

