import SwiftUI
import Footprint

struct EmailAndPhoneView: View {
    @State private var shouldNavigateToNextView = false
    @State private var isLoading = false
    @State private var challengeKind: String = ""
    @State private var otpComplete: Bool = false
    @State private var isSdkVersionDeprecated: Bool = false
    @State private var isFallbackHostedFlowSuccess: Bool = false
    @State private var isInitialized: Bool = false
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
            else if (isSdkVersionDeprecated || !isInitialized) {
                VStack {
                    ProgressView()
                        .progressViewStyle(CircularProgressViewStyle(tint: .blue))
                        .scaleEffect(2)
                    Text("Initializing Footprint SDK...")
                        .padding()
                        .foregroundColor(.secondary)
                }
            } else {
                FpForm(
                    defaultValues: [.idEmail: "sandbox@onefootprint.com",
                                   .idPhoneNumber: "+15555550100"],
                    onSubmit: { vaultData in
                        isLoading = true
                        Task {
                            do {
                                let emailInput = vaultData.idEmail
                                let phoneNumberInput = vaultData.idPhoneNumber
                                let challengeKind = try await Footprint.shared.createChallenge(email: emailInput, phoneNumber: phoneNumberInput)
                                self.challengeKind = challengeKind
                                shouldNavigateToNextView = true
                                isLoading = false
                            } catch {
                                handleChallengeError(error: error, vaultData: vaultData)
                            }
                        }
                    },
                    builder: { formUtils in
                        VStack(spacing: 20) {
                            FpField(
                                name: .idEmail,
                                content:{
                                    VStack(alignment: .leading){
                                        FpLabel("Email", font: .subheadline, color: .secondary)
                                        FpInput(placeholder: "Enter your email")
                                            .padding()
                                            .background(Color.gray.opacity(0.1))
                                            .cornerRadius(10)
                                        FpFieldError()
                                    }
                                }
                            )
                            
                            FpField(
                                name: .idPhoneNumber,
                                content: {
                                    VStack(alignment: .leading){
                                        FpLabel("Phone Number", font: .subheadline, color: .secondary)
                                        FpInput(placeholder: "Enter your phone number")
                                            .padding()
                                            .background(Color.gray.opacity(0.1))
                                            .cornerRadius(10)
                                        FpFieldError()
                                    }
                                }
                            )
                            Button(action: formUtils.handleSubmit) {
                                if isLoading {
                                    ProgressView()
                                        .progressViewStyle(CircularProgressViewStyle())
                                        .frame(width: 100, height: 50)
                                        .background(Color.blue)
                                        .cornerRadius(10)
                                } else {
                                    Text("Submit")
                                        .font(.headline)
                                        .foregroundColor(.white)
                                        .frame(width: 100, height: 50)
                                        .background(Color.blue)
                                        .cornerRadius(10)
                                }
                            }
                            .disabled(isLoading)
                        }
                    }
                )
                .padding(.horizontal, 20)
                .navigationTitle("Signup flow")
                .navigate(to: destinationView(), when: $shouldNavigateToNextView)
            }
        }
        .onAppear {
            Task {
                do {
                    let sandboxOutcome = SandboxOutcome(id: "sandboxhfv7824dcsdvc4151242", overallOutcome: .pass, documentOutcome: .pass)
                    try await Footprint.shared.initializeWithPublicKey(publicKey: "pb_test_vgflk9kNxmRRM83yHszGlE", sandboxOutcome: sandboxOutcome)
                    isInitialized = true
                } catch {
                    handleInitializationError(error: error)
                }
            }
        }
    }

    private func handleChallengeError(error: Error, vaultData: VaultData) {
        if isFootprintException(error), let fpException = extractFootprintException(error) {
            switch fpException.kind {
            case .inlineOtpNotSupported:
                Task {
                    do {
                        try await FootprintHosted.shared.launchIdentify(
                            email: vaultData.idEmail,
                            phone: vaultData.idPhoneNumber,
                            onAuthenticated: { response in
                                shouldNavigateToNextView = true
                                isLoading = false
                                otpComplete = true
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
            default:
                errorMessage = error.localizedDescription
                showErrorScreen = true
            }
        } else {
            errorMessage = error.localizedDescription
            showErrorScreen = true
        }
    }

    private func handleInitializationError(error: Error) {
        if isFootprintException(error), let fpException = extractFootprintException(error) {
            switch fpException.kind {
            case .deprecatedSdkVersionError:
                isSdkVersionDeprecated = true
                Task {
                    do {
                        try await FootprintHosted.shared.launchHosted(
                            onComplete: { validationToken in
                                isFallbackHostedFlowSuccess = true
                            },
                            onCancel: {
                                showCancelScreen = true
                            },
                            onError: { error in
                                errorMessage = error
                                showErrorScreen = true
                            },
                            appearance: Appearance(
                                variables: AppearanceVariables(
                                    buttonPrimaryBg: "#007aff"
                                )
                            ).data,
                            bootstrapData: FootprintBootstrapData(
                                idAddressLine1: "123 Main St",
                                idCity: "Anytown",
                                idCountry: "US",
                                idDob: "1990-01-01",
                                idEmail: "example@example.com",
                                idFirstName: "John",
                                idLastName: "Doe",
                                idPhoneNumber: "+15555550100",
                                idSsn9: "123456789",
                                idState: "CA",
                                idZip: "90210"
                            ).data
                        )
                    } catch {
                        errorMessage = error.localizedDescription
                        showErrorScreen = true
                    }
                }
            default:
                errorMessage = error.localizedDescription
                showErrorScreen = true
            }
        } else {
            errorMessage = error.localizedDescription
            showErrorScreen = true
        }
    }

    @ViewBuilder
    private func destinationView() -> some View {
        if otpComplete {
            BasicInfoView()
        } else {
            VerifyOTPView(challengeKind: challengeKind)
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

extension View {
    func navigate<NewView: View>(to view: NewView, when binding: Binding<Bool>) -> some View {
        NavigationView {
            ZStack {
                self
                    .navigationBarTitle("")
                    .navigationBarHidden(true)
                
                NavigationLink(
                    destination: view
                        .navigationBarTitle("")
                        .navigationBarHidden(true),
                    isActive: binding
                ) {
                    EmptyView()
                }
            }
        }
        .navigationViewStyle(.stack)
    }
}
