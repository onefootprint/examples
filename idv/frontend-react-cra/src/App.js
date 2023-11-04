import "@onefootprint/footprint-js/dist/footprint-js.css";
import { FootprintAuthButton, FootprintVerifyButton } from "@onefootprint/footprint-react";

import "./App.css";

function App() {
  return (
    <main>
      <FootprintVerifyButton
        publicKey="ob_test_WNgSBRR7uxoT8JRDBBflgw"
        l10n={{ locale: "en-US" }}
        onComplete={(validationToken) => {
          console.log("on completed", validationToken);
        }}
        onCancel={() => {
          console.log("user canceled!");
        }}
      />
      
      <FootprintAuthButton
        publicKey="ob_test_askljdhaskjd"
        dialogVariant="modal"
        label="Auth with Footprint (modal)"
        onCancel={() => console.log('cancel')}
        onClose={() => console.log('close')}
        onComplete={(validationToken) =>
          console.log('complete ', validationToken)
        }
      />
    </main>
  );
}

export default App;
