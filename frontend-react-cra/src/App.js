import "./App.css";
import { FootprintButton } from "@onefootprint/footprint-react";

function App() {
  return (
    <main>
      <FootprintButton
        publicKey="ob_test_WNgSBRR7uxoT8JRDBBflgw"
        onCompleted={(validationToken) => {
          console.log("on completed", validationToken);
        }}
        onUserCanceled={() => {
          console.log("user canceled!");
        }}
      />
    </main>
  );
}

export default App;
