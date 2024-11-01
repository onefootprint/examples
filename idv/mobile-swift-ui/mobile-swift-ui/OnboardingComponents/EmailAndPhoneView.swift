import SwiftUI
import FootprintSwift

struct EmailAndPhoneView: View {
    @State private var shouldNavigateToNextView = false
    @State private var isLoading = false
    @State private var challengeKind: String = ""
    @State private var otpComplete: Bool = false
    
    var body: some View {
        FpForm(
            onSubmit: { vaultData in
                isLoading = true
                Task {
                    do {
                        let challengeKind = try await FootprintProvider.shared.createEmailPhoneBasedChallenge(email: vaultData.idEmail, phoneNumber: vaultData.idPhoneNumber)
                        print("Pin code sent to: \(challengeKind)")
                        self.challengeKind = challengeKind
                        shouldNavigateToNextView = true
                        isLoading = false
                    } catch {
                        if let footprintError = error as? FootprintError {
                            switch footprintError.kind {
                            case .inlineOtpNotSupported:
                                try await FootprintProvider.shared.launchIdentify(
                                    email: vaultData.idEmail,
                                    phone: vaultData.idPhoneNumber,
                                    onCancel: {
                                        print("User cancelled hosted identity flow")
                                    },
                                    onAuthenticated: { response in
                                        print("Hosted identity flow completed: \(response)")
                                        shouldNavigateToNextView = true
                                        isLoading = false
                                        otpComplete = true
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
                            ProgressView() // Loading indicator
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
        .onAppear {
            Task {
                do {
                    let sandboxOutcome = SandboxOutcome(overallOutcome: .pass, documentOutcome: .pass)
                    try await FootprintProvider.shared.initialize(
                        configKey: "pb_test_SrKLqUT0RKvpZbXXpn1Xsf",
                        sandboxOutcome: sandboxOutcome
                    )
                } catch {
                    print("Error: \(error)")
                }
            }
        }
        .navigate(to: destinationView(), when: $shouldNavigateToNextView)
    }
    
    @ViewBuilder
    private func destinationView() -> some View {
        if otpComplete == false {
            VerifyOTPView(challengeKind: challengeKind)
        } else {
            BasicInfoView()
        }
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
