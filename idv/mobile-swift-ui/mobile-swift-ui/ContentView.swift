import SwiftUI
import FootprintSwift
import Inject

struct ContentView: View {
    var body: some View {
        NavigationStack {
        VStack  {
            Button("Hosted flow") {
                let bootstrapData = FootprintBootstrapData(
                    email: "example@gmail.com",
                    phoneNumber: "+15555550100",
                    firstName: "Piip",
                    middleName: "the",
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
                    visaExpirationDate: "05/12/2024",
                    businessAddressLine1: "1 Main St",
                    businessAddressLine2: "Apt 10",
                    businessCity: "San Francisco",
                    businessCorporationType: "llc",
                    businessCountry: "US",
                    businessDba: "Test",
                    businessName: "Acme",
                    businessPhoneNumber: "+15555550100",
                    businessState: "CA",
                    businessTin: "12-3456789",
                    businessWebsite: "test.test.com",
                    businessZip: "94107"
                )
                
                let options = FootprintOptions(
                    showLogo: true
                )
                
                let appearance = FootprintAppearance(
                    rules: FootprintAppearanceRules(button: ["transition": "all .2s linear"]),
                    variables: FootprintAppearanceVariables(borderRadius: "10px", buttonPrimaryBg: "#0C6948")
                )
                
                let config = FootprintConfiguration(
                    publicKey: "pb_test_2i5Sl82d7NQOnToRYrD2dx", // KYB pb_key to test all bootstrap data
                    scheme: "footprintapp-callback",
                    bootstrapData: bootstrapData,
                    options: options,
                    l10n: FootprintL10n(locale: .esMX, language: .spanish),
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
        .padding(50)
            NavigationLink("Onboarding components - signup", destination: EmailAndPhoneView()).padding(50)
            NavigationLink("Onboarding components - authToken", destination: AuthTokenView()).padding(50)
            
        }.enableInjection()
    }
    
}
