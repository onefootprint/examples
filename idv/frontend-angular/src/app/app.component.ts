import { Component } from '@angular/core';
import footprint, { FootprintComponentKind } from '@onefootprint/footprint-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // TODO: replace the auth token below with a server generated token
  public handleClick() {
    const component = footprint.init({
      kind: FootprintComponentKind.Verify,
      authToken: 'tok_1232132',
      onComplete: (validationToken: string) => {
        // TODO: User has finished the flow. This validation token can be used to fetch the fp_id
        // of the user, the auth method they used to log in, and their KYC status
        // check: https://docs.onefootprint.com/sdks/javascript#available-components-verify-component-integration-available-props
        console.log('onComplete ', validationToken);
      },
      onAuth: (validationToken: string) => {
        // User has authenticated. Optionally, this validation token can be used to fetch the fp_id
        // of the authenticated user and the auth method they used to log in
        // check: https://docs.onefootprint.com/sdks/javascript#available-components-verify-component-integration-available-props
        console.log(validationToken);
      },
      onCancel: () => {
        console.log('onCancel');
      },
      onClose: () => {
        console.log('onClose');
      },
    });

    component.render();
  }
}
