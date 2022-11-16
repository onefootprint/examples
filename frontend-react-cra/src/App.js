import "./App.css";
import "@onefootprint/footprint-js/dist/footprint-js.css";

import { FootprintButton } from "@onefootprint/footprint-react";

function App() {
  return (
    <main>
      <FootprintButton
        publicKey="ob_test_WNgSBRR7uxoT8JRDBBflgw"
        onCompleted={(validationToken) => {
          console.log("on completed", validationToken);
        }}
        onCanceled={() => {
          console.log("canceled");
        }}
      />
    </main>
  );
}

export default App;
