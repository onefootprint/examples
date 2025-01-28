import SwiftUI
import Footprint

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
                        let challengeKind = try await Footprint.shared.createChallenge(email: vaultData.idEmail, phoneNumber: vaultData.idPhoneNumber)
                        print("Pin code sent to: \(challengeKind)")
                        self.challengeKind = challengeKind
                        shouldNavigateToNextView = true
                        isLoading = false
                    } catch {
                        print("Error creating challenge: \(error)")
                        print("is FootprintException \(isFootprintException(error))")
                        if isFootprintException(error), let fpException = extractFootprintException(error) {
                            switch fpException.kind {
                            case .inlineOtpNotSupported:
                                try await FootprintHosted.shared.launchIdentify(
                                    email: vaultData.idEmail,
                                    phone: vaultData.idPhoneNumber,
                                    onAuthenticated: { response in
                                        print("Hosted identity flow completed: \(response)")
                                        shouldNavigateToNextView = true
                                        isLoading = false
                                        otpComplete = true
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
                    let sandboxOutcome = SandboxOutcome(id: nil, overallOutcome: .pass, documentOutcome: .pass)
                    try await Footprint.shared.initializeWithPublicKey(
                        publicKey: "pb_test_qGrzwX22Vu5IGRsjbBFS4s",
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
