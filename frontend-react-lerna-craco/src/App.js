import React from 'react';
import "./App.css";
import "@onefootprint/footprint-js/dist/footprint-js.css";

import { FootprintVerifyButton } from "@onefootprint/footprint-react";

function App() {
  return (
    <div className='app'>
      <FootprintVerifyButton
        publicKey="ob_test_WNgSBRR7uxoT8JRDBBflgw"
        onCompleted={(validationToken) => {
          console.log("on completed", validationToken);
        }}
        onCanceled={() => {
          console.log("canceled");
        }}
      />
    </div>
  );
}

export default App;