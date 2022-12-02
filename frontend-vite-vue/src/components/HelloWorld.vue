<script>
import footprint from '@onefootprint/footprint-js';

export default {
  mounted() {
    const container = document.getElementById('footprint-container');
    const button = footprint.createButton(container);
    button.addEventListener('click', this.handleOpen)
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
    <div id="footprint-container"></div>
  </div>
</template>

