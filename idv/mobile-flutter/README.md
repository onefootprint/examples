# Footprint Flutter

## Package oveview

Flutter is a powerful open-source framework to develop cross-platform applications from a single codebase. The Flutter plugin allows you to integrate Footprint onboarding flow into your Flutter Android/iOS apps. The plugin utilizes a secure in-app browser to run the onboarding flow.

## Installation

From the terminal, run the following command:

```bash
flutter pub add footprint_flutter
```

This will add the `footprint_flutter` dependency to your project’s `pubspec.yaml` as follows:

```yaml
dependencies:
  footprint_flutter: ^1.0.0
```

Alternatively, you can manually edit the `pubspec.yaml` file to add the dependency and run `flutter pub get` from the terminal to install the dependency.

After the installation, you need to link the InAppBrowser dependency. For iOS, make sure to run:

```bash
cd ios && pod install && cd ..
```

## Integration

1. Start by getting your Playbook public key, for instance, `pb_test_VMooXd04EUlnu3AvMYKjMW` from your [Footprint Dashboard](https://dashboard.onefootprint.com/playbooks).
2. Import the package `import 'package:footprint_flutter/footprint_flutter.dart';` on your dart code.
3. The package exposes a `footprint` object. In order to initialize the flow, simply call `init` method on the `footprint` object. As arguments to the init method, you must pass a `FootprintConfiguration` object and `BuildContext` of your widget builder. The `FootprintConfiguration` must contain the `publicKey` and `redirectUrl`. Additionally you can pass `onComplete` and `onCancel` callbacks and a number of optional parameters to customize the flow.

```dart
var config = FootprintConfiguration(
  publicKey: "pb_test_RcDHxZgJO9q3vY72d7ZLXu",
  onCancel: () => print("onCancel"),
  onComplete: (String token) => print("onComplete $token"),
);

footprint.init(config, context);
```

Instead of a `publicKey`, you can also use an `authToken` that you generate for a specific playbook and user. You can find more instructions on how to do this [here](https://docs.onefootprint.com/integrate/user-specific-onboarding).

For a complete example, click here.

### Bootstraping user data

Utilize the `userData` field in `FootprintConfiguration` to pre-fill any available data and bypass completed pages for your users. You can click [here](https://docs.onefootprint.com/integrate/user-data) to find out more about the formatting and validation requirements we have for these inputs.

```dart
var config = FootprintConfiguration(
  publicKey: "pb_test_RcDHxZgJO9q3vY72d7ZLXu",
  onCancel: () => print("onCancel"),
  onComplete: (String token) => print("onComplete $token"),
  userData: FootprintUserData(
    email: "example@gmail.com",
    phoneNumber: "+15555550100",
    firstName: "Jane",
    lastName: "Doe",
    dob: "01/01/1990",
    addressLine1: "123 Main St",
    addressLine2: "Unit 123",
    city: "San Francisco",
    state: "CA",
    country: "US",
    zip: "12345",
    ssn9: "343434344",
    ssn4: "1234",
    nationality: "US",
    usLegalStatus: "citizen",
    citizenships: ["US", "TR"],
    visaKind: "f1",
    visaExpirationDate: "05/12/2024",
  ),
);

footprint.init(config, context);
```

### Customizing the appearance

Take advantage of the `appearance` option to extend the default styles. You can utilize the same variables and rules as in the [web integration](https://docs.onefootprint.com/integrate/customization). You will need to pass values that are valid CSS styles.

```dart
var config = FootprintConfiguration(
  publicKey: "pb_test_RcDHxZgJO9q3vY72d7ZLXu",
  appearance: FootprintAppearance(
    fontSrc: 'https://fonts.googleapis.com/css2?family=Inter',
    variables: FootprintAppearanceVariables(
      fontFamily: '"Inter"',
      linkColor: '#101010',
      colorError: '#E33D19',
      buttonPrimaryBg: '#315E4C',
      buttonPrimaryHoverBg: '#46866c',
      buttonPrimaryColor: '#FFF',
      buttonBorderRadius: '70px',
    ),
  ),
);

footprint.init(config, context);
```

### Showing your company logo

You can also add your company logo at the top of the modal by passing the boolean field `showLogo` to `FootprintOptions` which is passed as `options` to `FootprintConfiguration`.

```dart
var config = FootprintConfiguration(
  publicKey: "pb_test_RcDHxZgJO9q3vY72d7ZLXu",
  onCancel: () => print("onCancel"),
  onComplete: (String token) => print("onComplete $token"),
  options: FootprintOptions(showLogo: true),
);

footprint.init(config, context);
```

### Setting the locale

Footprint also supports localization settings, you can use the `l10n` (localization) field in `FootprintConfiguration` and specify the desired locale and language.

Create a `FootprintL10n` object passing the desired locale and language. Currently, we support locales `FootprintSupportedLocale.enUS` and `FootprintSupportedLocale.esMX` . For languages, we support `FootprintSupportedLanguage.en` (English) and `FootprintSupportedLanguage.es` (Spanish).

For example, if your audience is in Mexico, you can set the locale as follows:

```dart
var config = FootprintConfiguration(
  publicKey: "pb_test_RcDHxZgJO9q3vY72d7ZLXu",
  onCancel: () => print("onCancel"),
  onComplete: (String token) => print("onComplete $token"),
  l10n: FootprintL10n(
    locale: FootprintSupportedLocale.esMX,
    language: FootprintSupportedLanguage.es,
  ),
);

footprint.init(config, context);
```

For a complete example, click [here](https://github.com/onefootprint/examples/tree/master/idv/mobile-flutter).

### Available Props

| Variable      | Description                                                                                                                                                                                             |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `publicKey`   | Optional. Onboarding configuration public key.                                                                                                                                                          |
| `authToken`   | Optional. A valid string authentication token generated using the Secret API Key, Footprint User ID and fields to collect. One of publicKey or authToken must be provided.                              |
| `redirectUrl` | Required. A deep link that will be navigated to when the web browser is closed.                                                                                                                         |
| `userData`    | Optional. An object that contains previously collected user data that can bootstrap the onboarding flow. More information [here](https://docs.onefootprint.com/integrate/user-data).                    |
| `options`     | Optional. An options object that customizes the flow, can accept `showLogo` and `showCompletionPage` entries. More info [here](https://docs.onefootprint.com/integrate/customization#available-options) |
| `appearance`  | Optional. A `FootprintAppearance` object that customizes the look of your integration                                                                                                                   |
| `l10n`        | Optional. Specifies the desired localization. More information [here](https://docs.onefootprint.com/integrate/customization#localization-configuration).                                                |
| `onComplete`  | Optional. A function that is called when the onboarding flow is completed by the user.                                                                                                                  |
| `onCancel`    | Optional. A function that is called when the onboarding flow is canceled by the user.                                                                                                                   |
| `onError`     | Optional. A function that is called there was an unrecoverable error while initializing the onboarding flow. It takes in an error string argument with more details.                                    |
