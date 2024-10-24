# FootprintSwift

## Requirements

- iOS 14.0 or later
- Swift 5.0 or later

## Installation

### Swift Package Manager

You can use The Swift Package Manager to install FootprintSwift by adding it to your project's Package.swift file:

```swift
import PackageDescription

let package = Package(
    name: "YourProject",
    dependencies: [
        .package(url: "https://github.com/onefootprint/footprint-swift", from: "0.0.1")
    ],
    targets: [
        .target(
            name: "YourTarget",
            dependencies: ["FootprintSwift"])
    ]
)
```

### CocoaPods
To integrate FootprintSwift into your Xcode project using CocoaPods, specify it in your Podfile:

```
 pod 'FootprintSwift'
 ```

## Usage

There are two ways to utilize FootprintSwift:

## Webview

You first need to import it and then configure it as shown in the examples below.

```swift
import FootprintSwift

let config = FootprintConfiguration(
    publicKey: "yourPublicKey",
    scheme: "yourScheme",
    onCancel: {
        // Handle dismiss
    },
    onComplete: { validationToken in
        // Handle completion with validation token
    }
)
Footprint.initialize(with: config)
```

After the initialization, a Webview will appear, and it will take the users through the regular flow, as defined on the playbook

## Onboarding components (beta)

With this approach, you have more control over the flow and how to present the UI for the users 

### Initialization 

```swift
import FootprintSwift

try await FootprintProvider.shared.initialize(
    configKey: "yourPublicKey"                       
)
```

Above is the simplest way to get started, you can check the initialize method to see what other parameters it accepts


### Inline OTP

You can now create an email or phone challenge using a function, instead of relying on the WebView.

#### Creating the challenge

```swift
import FootprintSwift

 try await FootprintProvider.shared.createEmailPhoneBasedChallenge(
    email: 'lorem@onefootprint.com', 
    phoneNumber: '+15555550100'
)
```

#### Verifying the challenge
Use the verify function to complete the challenge by passing the verification code as an argument

```swift
import FootprintSwift

try await FootprintProvider.shared.verify(verificationCode: code)
```

### Vaulting the data

As the name implies, this is the method for persisting the users data in our vault

```swift
import FootprintSwift

let vaultData = VaultData(
    idAddressLine1: addressLine1,
    idAddressLine2: addressLine2,
    idCity: city,
    idCountry: country,
    idDob: dobString,
    idFirstName: firstName,
    idLastName: lastName,
    idMiddleName: middleName,
    idSsn9: ssn,
    idState: state,
    idZip: zipCode
)
                                
try await FootprintProvider.shared.vault(vaultData: vaultData)
```

### Retrieving the vault data

If at any time, after OTP, you need to access the vaulting data, you can do it so by: 

```swift
import FootprintSwift

let vaultData = try await FootprintProvider.shared.getVaultData()                               
```

> **Note:**  The `FootprintProvider.shared.verify` also returns the vaultData,

### Processing the flow
Instead of relying on handoff and reopening the Webview, we can achieve this with a
simple function. However, we need to fall
back to the handoff (Webview) in certain situations:

1. If the user needs to do document step up (this is your case, because users
might need to submit documents depending on the rules configured on your
playbook)
2. If your playbook config requires you collecting passkeys/id-docs

```swift
import FootprintSwift

do {
    let response = try await FootprintProvider.shared.process()
    } catch {        
       if let footprintError = error as? FootprintError, 
          footprintError.domain == FootprintErrorDomain.process.rawValue { 
            do {
                try await FootprintProvider.shared.handoff(
                    onCancel: {
                        print("Handoff was canceled by the user")                        
                    },
                    onComplete: { validationToken in
                        print("Handoff completed successfully with token: \(validationToken)")                       
                    },                                           
                    onError: { error in
                        print("Error occurred during handoff: \(error)")                        
                    }
                )
            }    
```
## License

FootprintSwift is available under the MIT license. See the LICENSE file for more info.
