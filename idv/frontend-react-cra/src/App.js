import "@onefootprint/footprint-js/dist/footprint-js.css";
import { FootprintVerifyButton } from "@onefootprint/footprint-react";

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
    </main>
  );
}

export default App;
