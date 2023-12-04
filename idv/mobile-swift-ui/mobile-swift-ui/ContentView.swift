import SwiftUI
import FootprintSwift

struct ContentView: View {
    
    var body: some View {
        VStack {
            Button("Verify") {
                 let config = FootprintConfiguration(
                    publicKey: "pb_test_RcDHxZgJO9q3vY72d7ZLXu",
                    scheme: "footprintapp-callback",
                    onClose: {
                        print("close")
                    },
                    onComplete: { validationToken in
                        print("Validation Token: \(validationToken)")
                    }
                 )
                 Footprint.initialize(with: config)
            }
        }
        .padding()
    }
}
