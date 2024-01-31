# Footprint Flutter

# Overview

Flutter is a powerful open-source framework to develop cross-platform applications from a single codebase. The Flutter plugin allows you to integrate footprint onboarding flow into your Flutter Android/iOS apps. The plugin utilizes a secure in-app browser to run the onboarding flow.

# Installing

From the terminal, run the following command:

```jsx
flutter pub add footprint_flutter
```

This will add the `footprint_flutter` dependency to your project’s `pubspec.yaml` as follows:

```jsx
dependencies:
  footprint_flutter: ^0.0.1
```

Alternatively, you can manually edit the `pubspec.yaml` file to add the dependency and run `flutter pub get` from the terminal to install the dependency.

# Setting up deeplink to your app

In order to integrate the verification flow using this plugin, you will need to provide a deep-link to your app. If you are using more granular paths, you need to provide a deep-link to the current screen of the app. This is to make sure that the browser screen closes automatically once the flow is complete and goes back to the screen on your app from which the flow was initiated. **Not that the scheme used in this link must be unique to your app and must be the same for both Android and iOS**.

# Setting up deeplink for android

**We suggest you use this Flutter A[ndroid deep linking tutorial](https://docs.flutter.dev/cookbook/navigation/set-up-app-links) to make sure that you own the scheme you will use for the app to ensure uniqueness. The process below gives you a simple shortcut way to get started but isn’t recommended for production.**

Provide a deep link to your app’s current activity (the activity from which you will start the onboarding flow). Create a deep link by adding an intent filter to your activity in the `AndroidManifest.xml` .

```xml
<intent-filter>
       <action android:name="android.intent.action.VIEW" />
       <category android:name="android.intent.category.DEFAULT" />
       <category android:name="android.intent.category.BROWSABLE" />
       <data android:scheme="com.footprint.fluttersdk"
              android:host="example" />
</intent-filter>
```

Use your preferred (or custom) scheme and host (optional). For the example above, the deeplink to the activity would be `com.footprint.fluttersdk://example` .

# Setting up deeplink for iOS

TODO

**We suggest you use the associated domains suggested in this flutter** [iOS deep linking tutorial](https://docs.flutter.dev/cookbook/navigation/set-up-app-links) **to ensure uniqueness. The process below gives you a simple shortcut way to get started, but isn’t recommended for production.**

On iOS, add the url scheme to url types on XCode as follows:

![Screenshot 2024-01-30 at 1.05.02 PM.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/c935cdd2-695d-4f38-8410-f8904f37301b/dea676ae-9dc6-4067-9d85-30dd98f5e4b2/Screenshot_2024-01-30_at_1.05.02_PM.png)

# Integration

1. Start by getting your Playbook public key, for instance, `pb_test_VMooXd04EUlnu3AvMYKjMW` from your [Footprint Dashboard](https://dashboard.onefootprint.com/playbooks).
2. Import the package `import 'package:footprint_flutter/footprint_flutter.dart';` on your dart code.
3. The package exposes a `footprint` object. In order to initialize the flow, simply call `init` method on the `footprint` object. As arguments to the init method, you must pass a `FootprintConfiguration` object and `BuildContext` of your widget builder. The `FootprintConfiguration` must contain the `publicKey` and `redirectUrl`. Additionally you can pass `onComplete` and `onCancel` callbacks and a number of optional parameters to customize the flow.

```dart
var config = FootprintConfiguration(
        publicKey: "pb_test_RcDHxZgJO9q3vY72d7ZLXu",
        onCancel: () => print("onCancel"),
        onComplete: (String token) => print("onComplete $token"),
        l10n: FootprintL10n(language: FootprintSupportedLanguage.es),
        appearance: FootprintAppearance(
            variables: FootprintAppearanceVariables(buttonPrimaryBg: 'red')));

footprint.init(config, context);
```

Instead of a `publicKey`, you can also use an `authToken` that you generate for a specific playbook and user. You can find more instructions on how to do this [here](https://docs.onefootprint.com/integrate/user-specific-onboarding).

## Bootstrapping user data

Utilize the `userData` field in `FootprintConfiguration` to pre-fill any available data and bypass completed pages for your users. You can click [here](https://docs.onefootprint.com/integrate/user-data) to find out more about the formatting and validation requirements we have for these inputs.

```dart
var config = FootprintConfiguration(
      publicKey: "pb_test_RcDHxZgJO9q3vY72d7ZLXu",
      onCancel: () => print("onCancel"),
      onComplete: (String token) => print("onComplete $token"),
      userData: FootprintUserData(
          email: "example@gmail.com",
          phoneNumber: "+15555550100",
          firstName: "Piip",
          lastName: "Foot",
          dob: "01/01/1996",
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
          visaExpirationDate: "05/12/2024"),
    );

footprint.init(config, context);
```

## Customizing the appearance

Take advantage of the `appearance` option to extend the default styles. You can utilize the same variables and rules as in the [web integration](https://docs.onefootprint.com/integrate/customization). You will need to pass values that are valid CSS styles.

```dart
var config = FootprintConfiguration(
  publicKey: "pb_test_RcDHxZgJO9q3vY72d7ZLXu");
	appearance: FootprintAppearance(
		fontSrc: 'https://fonts.googleapis.com/css2?family=Inter',
	  variables: FootprintAppearanceVariables(
			fontFamily: '"Inter"',
      linkColor: '#101010',
      colorError: '#E33D19',

      buttonPrimaryBg: '#315E4C',
      buttonPrimaryHoverBg: '#46866c',
      buttonPrimaryColor: '#FFF',
      buttonBorderRadius: '70px'
		)
	)
)

footprint.init(config, context);
```

## Showing your company logo

You can also add your company logo at the top of the modal by passing the boolean field `showLogo` to `FootprintOptions` which is passed as `options` to `FootprintConfiguration`.

```dart
var config = FootprintConfiguration(
        publicKey: "pb_test_RcDHxZgJO9q3vY72d7ZLXu",
        onCancel: () => print("onCancel"),
        onComplete: (String token) => print("onComplete $token"),
        options: FootprintOptions(showLogo: true));

footprint.init(config, context);
```

## Setting the locale

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
          language: FootprintSupportedLanguage.es),
    );

footprint.init(config, context);
```
