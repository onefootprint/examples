import SwiftUI
import FootprintSwift

struct AuthTokenView: View {
    @State private var authToken: String = ""
    private var onboardingComponents = FootprintProvider.shared
    @State private var shouldNavigateToNextView = false
    @State private var isLoading = false
    @State private var challengeKind: String = ""
    @State private var requiresAuth: Bool = false
    
    var body: some View {
        NavigationView {
            VStack(spacing: 20) {
                TextField(
                    "Auth token",
                    text: $authToken
                )
                .textFieldStyle(RoundedBorderTextFieldStyle())
                .padding()
                
                Button(action: {
                    isLoading = true
                    Task {
                        do {
                            try await onboardingComponents.initialize(
                                configKey: "pb_test_OmuMuP68H00rL3vVxRWg6f",
                                authToken: authToken
                            )
                            
                            let requiresAuthResponse = try await onboardingComponents.requiresAuth()
                            print("Requires auth response: \(requiresAuthResponse.requiresAuth)")
                            if requiresAuthResponse.requiresAuth {
                                let challengeKind = try await onboardingComponents.createAuthTokenBasedChallenge()
                                self.challengeKind = challengeKind
                                shouldNavigateToNextView = true
                                self.requiresAuth = true
                            } else {
                                shouldNavigateToNextView = true
                                self.requiresAuth = false
                            }
                        } catch {
                            if let footprintError = error as? FootprintError {
                                switch footprintError.kind {
                                case .inlineOtpNotSupported:
                                    try await FootprintProvider.shared.launchIdentify(
                                        onCancel: {
                                            print("User cancelled hosted identity flow")
                                        },
                                        onAuthenticated: { response in
                                            print("Hosted identity flow completed: \(response)")
                                            shouldNavigateToNextView = true
                                            isLoading = false
                                            self.requiresAuth = false
                                        },
                                        onError: { error in
                                            print("Error occurred: \(error)")
                                        }
                                    )
                                    
                                default:
                                    print("Error occurred: \(error)")
                                    shouldNavigateToNextView = false
                                    isLoading = false
                                }
                            }
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
                .frame(width: 100, height: 50)
                .background(Color.blue)
                .foregroundColor(.white)
                .cornerRadius(10)
                .disabled(isLoading)
                
                NavigationLink(destination: destinationView(), isActive: $shouldNavigateToNextView) { EmptyView() }
            }
            .padding()
        }
        .navigationTitle("Auth Token flow")
    }
    
    @ViewBuilder
    private func destinationView() -> some View {
        if requiresAuth {
            VerifyOTPView(challengeKind: challengeKind)
        } else {
            BasicInfoView()
        }
    }
}
