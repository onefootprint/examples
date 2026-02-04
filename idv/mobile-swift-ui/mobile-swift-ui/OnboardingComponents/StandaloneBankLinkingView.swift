import SwiftUI
import Footprint

struct StandaloneBankLinkingView: View {
    @State private var authToken: String = "obtok_tSKbGNuAa8F3f7i3SUZNogGwtbYThMfjkg"
    @State private var isBankLinkingComplete: Bool = false
    @State private var showBankLinking: Bool = false
    
    var body: some View {
        VStack(spacing: 20) {
            Text("Bank Linking with Auth Token")
                .font(.title)
                .padding()
            
            TextField("Auth token", text: $authToken)
                .textFieldStyle(RoundedBorderTextFieldStyle())
                .padding(.horizontal)
            
            Button(action: {
                showBankLinking = true
            }) {
                Text("Link Bank Account")
                    .frame(maxWidth: .infinity)
                    .padding()
                    .background(Color.blue)
                    .foregroundColor(.white)
                    .cornerRadius(8)
            }
            .padding(.horizontal)
            
            if isBankLinkingComplete {
                Text("Bank linking completed successfully!")
                    .foregroundColor(.green)
                    .padding()
                    .transition(.opacity)
            }
            
            Spacer()
        }
        .animation(.easeInOut, value: isBankLinkingComplete)
        .sheet(isPresented: $showBankLinking) {
            FootprintBankLinking(
                authToken: authToken,
                redirectUri: "footprintcomponentsdemo://banklinking",
                onSuccess: { response in
                    handleSuccess(response)
                    showBankLinking = false
                    isBankLinkingComplete = true
                },
                onError: { error in
                    print("Error occurred during bank linking: \(error)")
                    showBankLinking = false
                    isBankLinkingComplete = false
                },
                onClose: {
                    print("Bank linking exited")
                    showBankLinking = false
                },
                onEvent: { event in
                    print("Bank Linking Event: \(event)")
                }
            )
        }
    }
    
    private func handleSuccess(_ response: BankLinkingCompletionResponse) {
        print("Bank linking completed successfully, validation token: \(response.validationToken)")
        
        response.meta.accounts.forEach { account in
            print("Account ID: \(account.id), " +
                  "Account Name: \(account.name), " +
                  "Account Type: \(account.type), " +
                  "Mask: \(account.mask ?? "none")")
        }
        
        response.meta.trackedScreens.forEach { screen in
            print("Tracked Screen: \(screen.name), " +
                  "Duration: \(screen.duration), " +
                  "Game Time: \(screen.gameTime ?? -1), " +
                  "Request Time: \(screen.requestTime ?? -1)")
        }
        
        let institution = response.meta.institution
        print("Institution ID: \(institution.id), " +
              "Institution Name: \(institution.name), " +
              "Institution Domain: \(institution.domain ?? "none")")
    }
}
