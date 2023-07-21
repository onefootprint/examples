import "./App.css";
import "@onefootprint/footprint-js/dist/footprint-js.css";

import { FootprintButton } from "@onefootprint/footprint-react";
import { FootprintSecureForm } from "@onefootprint/footprint-components-react";

function App() {
  return (
    <main>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '50px'
      }}>
        <FootprintButton
          publicKey="ob_test_WNgSBRR7uxoT8JRDBBflgw"
          onCompleted={(validationToken) => {
            console.log("on completed", validationToken);
          }}
          onCanceled={() => {
            console.log("canceled");
          }}
        />
        <div style={{width: '500px', height:'500px' }}>
          <FootprintSecureForm 
            authToken='tok_XYZ'
            cardAlias='primary'
            variant='card'
            onSave={() => console.log('saved')}
            onCancel={() => console.log('canceled')}
          />
        </div>
      </div>
    </main>
  );
}

export default App;
