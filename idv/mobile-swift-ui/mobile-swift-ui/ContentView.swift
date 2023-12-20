import SwiftUI
import FootprintSwift

struct ContentView: View {
    
    var body: some View {
        VStack {
            Button("Verify") {
                let userData = FootprintUserData(
                    email: "example@gmail.com",
                    phoneNumber: "+15555550100",
                    firstName: "Piip",
                    lastName: "Foot",
                    dob: "01/01/1996",
                    addressLine1: "123 Main St",
                    addressLine2: "Unit 123",
                    city: "Huntington Beach",
                    state: "CA",
                    country: "US",
                    zip: "12345",
                    ssn9: "343434344",
                    ssn4: "1234",
                    nationality: "US",
                    usLegalStatus: "citizen",
                    citizenships: ["US", "TR"],
                    visaKind: "f1",
                    visaExpirationDate: "05/12/2024"
                )
                
                let options = FootprintOptions(
                    showCompletionPage: true,
                    showLogo: true
                )
                
                let appearance = FootprintAppearance(
                    theme: .light,
                    rules: FootprintAppearanceRules(button: ["transition": "all .2s linear"]),
                    variables: FootprintAppearanceVariables(borderRadius: "10px", buttonPrimaryBg: "#0C6948")
                )
                
                let config = FootprintConfiguration(
                    publicKey: "pb_test_RcDHxZgJO9q3vY72d7ZLXu",
                    scheme: "footprintapp-callback",
                    userData: userData,
                    options: options,
                    l10n: FootprintL10n(locale: .esMX),
                    appearance: appearance,
                    onCancel: {
                        print("User canceled")
                    },
                    onComplete: { validationToken in
                        print("Validation token: \(validationToken)")
                    },
                    onError: { error in
                        print("Tenant received error: \(error)")
                    }
                )
                
                Footprint.initialize(with: config)
            }
        }
        .padding()
    }
}
