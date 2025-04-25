import SwiftUI
import Footprint

struct ContentView: View {
    var body: some View {
        NavigationStack {        
            NavigationLink("Onboarding components - signup", destination: EmailAndPhoneView()).padding(16)
            NavigationLink("Onboarding components - authToken", destination: AuthTokenView()).padding(16)
            NavigationLink("Hosted flow", destination: HostedView()).padding(16)
            NavigationLink("Bank linking with auth token", destination: StandaloneBankLinkingView()).padding(16)
        }
    }
    
}
