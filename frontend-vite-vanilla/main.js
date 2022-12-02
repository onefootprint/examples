import footprint from '@onefootprint/footprint-js';
import '@onefootprint/footprint-js/dist/footprint-js.css';

import './style.css'

const button = document.getElementById('verify-button');
button.addEventListener('click', () => {
  const publicKey = 'ob_test_WNgSBRR7uxoT8JRDBBflgw';
  const appearance = {
    theme: 'light',
    variables: {
      fontFamily: '"SF UI Text", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
      linkColor: '#101010',
      colorError: '#D14343',
      buttonPrimaryBg: '#52BD95',
      buttonPrimaryHoverBg: '#429777',
      buttonPrimaryActiveBg: '#317159',
      buttonPrimaryColor: '#FFF',
      buttonBorderRadius: '4px',
      linkButtonColor: '#52BD95',
      labelColor: '#101840',
      inputBorderRadius: '4px',
      inputBorderWidth: '1px',
      inputPlaceholderColor: '#B5B5B5',
      inputColor: '#474d66',
      inputBg: '#FFFFFF',
      inputBorderColor: '#d8dae5',
      inputFocusElevation: 'none',
      inputErrorFocusElevation: 'box-shadow: 0 0 0 2px #d6e0ff;',
      inputHoverBorderColor: '#ADC2FF',
      hintColor: '#696f8c',
    }
  };
  footprint.open({
    appearance,
    publicKey,
  });
});

