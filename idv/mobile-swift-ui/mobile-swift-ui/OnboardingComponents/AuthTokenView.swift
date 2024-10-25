import SwiftUI
import FootprintSwift

struct AuthTokenView: View {
    @State private var authToken: String = ""
    private var onboardingComponents = FootprintProvider.shared
    @State private var shouldNavigateToNextView = false
    @State private var isLoading = false
    
    var body: some View {
        NavigationView {
            VStack(spacing: 20) {
                TextField("Auth token", text: $authToken)
                    .textFieldStyle(RoundedBorderTextFieldStyle())
                    .padding()
                Button(action: {
                    isLoading = true
                    Task {
                        do {
                            try await onboardingComponents.initialize(
                                configKey: "pb_test_QeSAeS8XHohiSpCOj2l4vd",
                                authToken: authToken
                            )
                            
                            try await onboardingComponents.createAuthTokenBasedChallenge()
                         

                            shouldNavigateToNextView = true
                        } catch {
                            print("Error: \(error)")
                            shouldNavigateToNextView = false
                        }
                        isLoading = false
                    }
                }) {
                    if isLoading {
                        ProgressView()
                            .progressViewStyle(CircularProgressViewStyle(tint: .white))
                    } else {
                        Text("Continue")
                    }
                }
                .padding()
                .background(Color.blue)
                .foregroundColor(.white)
                .cornerRadius(10)
                .disabled(isLoading)
                
                NavigationLink(destination: VerifyOTPView(), isActive: $shouldNavigateToNextView) { EmptyView() }
            }
            .padding()
        }
        .navigationTitle("Auth Token flow")
    }
}

struct AuthTokenView_Previews: PreviewProvider {
    static var previews: some View {
        AuthTokenView()
    }
}
