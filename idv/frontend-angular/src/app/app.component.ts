import { Component } from '@angular/core';
import footprint, { FootprintComponentKind } from '@onefootprint/footprint-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // TODO: replace the auth token below with a server generated token
  public handleClick() {
    const component = footprint.init({
      kind: FootprintComponentKind.Verify,
      authToken: 'tok_1232132',
      variant: 'modal',
      l10n: { locale: 'en-US' },
      options: {
        showCompletionPage: true,
        showLogo: true
      },
      onComplete: (validationToken: string) => {
        console.log('onComplete ', validationToken)
      },
      onCancel: () => {
        console.log('onCancel')
      },
      onClose: () => {
        console.log('onClose')
      },
    });

    component.render();
  }
}
