import SwiftUI
import Footprint

struct AuthTokenView: View {
    @State private var authToken: String = ""
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
                            let requiresAuthResponse = try await Footprint.shared.initializeWithAuthToken(
                                authToken: authToken
                            )
                            
                            print("Requires auth response: \(requiresAuthResponse.requiresAuth)")
                            if requiresAuthResponse.requiresAuth {
                                let challengeKind = try await Footprint.shared.createChallenge()
                                self.challengeKind = challengeKind
                                shouldNavigateToNextView = true
                                self.requiresAuth = true
                            } else {
                                shouldNavigateToNextView = true
                                self.requiresAuth = false
                            }
                        } catch {
                            if isFootprintException(error), let fpException = extractFootprintException(error) {
                                switch fpException.kind {
                                case .inlineOtpNotSupported:
                                    try await FootprintHosted.shared.launchIdentify(
                                        onAuthenticated: { response in
                                            print("Hosted identity flow completed: \(response)")
                                            shouldNavigateToNextView = true
                                            isLoading = false
                                            self.requiresAuth = false
                                        },
                                        onCancel: {
                                            print("User cancelled hosted identity flow")
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
