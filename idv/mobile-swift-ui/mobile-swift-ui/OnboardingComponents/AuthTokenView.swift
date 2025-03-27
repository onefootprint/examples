import SwiftUI
import Footprint

struct AuthTokenView: View {
    @State private var authToken: String = ""
    @State private var shouldNavigateToNextView = false
    @State private var isLoading = false
    @State private var challengeKind: String = ""
    @State private var requiresAuth: Bool = false
    @State private var isSdkVersionDeprecated: Bool = false
    @State private var isFallbackHostedFlowSuccess: Bool = false
    @State private var showErrorScreen: Bool = false
    @State private var showCancelScreen: Bool = false
    @State private var errorMessage: String = ""

    var body: some View {
        Group {
            if isFallbackHostedFlowSuccess {
                SuccessView()
            }
            else if showErrorScreen {
                ErrorView(message: errorMessage)
            }
            else if showCancelScreen {
                CancelView()
            }
            else if isSdkVersionDeprecated {
                VStack {
                    ProgressView()
                        .progressViewStyle(CircularProgressViewStyle(tint: .blue))
                        .scaleEffect(2)
                    Text("Initializing Footprint SDK...")
                        .padding()
                        .foregroundColor(.secondary)
                }
                .onAppear {
                    Task {
                        await launchHostedFlow()
                    }
                }
            } else {
                NavigationView {
                    VStack(spacing: 20) {
                        TextField(
                            "Auth token",
                            text: $authToken
                        )
                        .textFieldStyle(RoundedBorderTextFieldStyle())
                        .padding()
                        
                        Button(action: handleSubmit) {
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
                        .disabled(isLoading || authToken.isEmpty)
                        
                        NavigationLink(destination: destinationView(), isActive: $shouldNavigateToNextView) { EmptyView() }
                    }
                    .padding()
                }
                .navigationTitle("Auth Token flow")
            }
        }
    }
    
    private func handleSubmit() {
        isLoading = true
        Task {
            do {
                let requiresAuth = try await Footprint.shared.initializeWithAuthToken(authToken: authToken).requiresAuth
                
                if requiresAuth {
                    let challengeKind = try await Footprint.shared.createChallenge()
                    self.challengeKind = challengeKind
                    shouldNavigateToNextView = true
                    self.requiresAuth = true
                } else {
                    shouldNavigateToNextView = true
                    self.requiresAuth = false
                }
            } catch {
                handleInitializationError(error)
            }
            isLoading = false
        }
    }
    
    private func handleInitializationError(_ error: Error) {
        errorMessage = error.localizedDescription
        
        if isFootprintException(error), let fpException = extractFootprintException(error) {
            switch fpException.kind {
            case .inlineOtpNotSupported:
                Task {
                    do {
                        try await FootprintHosted.shared.launchIdentify(
                            onAuthenticated: { response in
                                shouldNavigateToNextView = true
                                isLoading = false
                                self.requiresAuth = false
                            },
                            onCancel: {
                                showCancelScreen = true
                            },
                            onError: { error in
                                errorMessage = error
                                showErrorScreen = true
                            }
                        )
                    } catch {
                        errorMessage = error.localizedDescription
                        showErrorScreen = true
                    }
                }
            case .deprecatedSdkVersionError:
                isSdkVersionDeprecated = true
            default:
                showErrorScreen = true
            }
        } else {
            showErrorScreen = true
        }
    }
    
    private func launchHostedFlow() async {
        do {
            try await FootprintHosted.shared.launchHosted(
                onComplete: { validationToken in
                    isFallbackHostedFlowSuccess = true
                },
                onCancel: {
                    showCancelScreen = true
                    isSdkVersionDeprecated = false
                },
                onError: { error in
                    errorMessage = error
                    showErrorScreen = true
                    isSdkVersionDeprecated = false
                }
            )
        } catch {
            errorMessage = error.localizedDescription
            showErrorScreen = true
            isSdkVersionDeprecated = false
        }
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

private struct ErrorView: View {
    let message: String
    
    var body: some View {
        VStack(spacing: 20) {
            Image(systemName: "exclamationmark.triangle")
                .font(.system(size: 50))
                .foregroundColor(.red)
            Text("Error Occurred")
                .font(.title)
            Text(message)
                .multilineTextAlignment(.center)
                .padding()
        }
        .padding()
    }
}

private struct CancelView: View {
    var body: some View {
        VStack(spacing: 20) {
            Image(systemName: "xmark.circle")
                .font(.system(size: 50))
                .foregroundColor(.orange)
            Text("Flow Cancelled")
                .font(.title)
            Text("The hosted flow was cancelled by the user.")
                .multilineTextAlignment(.center)
                .padding()
        }
        .padding()
    }
}
