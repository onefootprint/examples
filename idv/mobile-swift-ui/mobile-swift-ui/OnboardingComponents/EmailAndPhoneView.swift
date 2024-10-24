import SwiftUI
import FootprintSwift
import Inject


struct EmailAndPhoneView: View {
    @ObserveInjection var inject
    @State private var email: String = "sandbox@onefootprint.com"
    @State private var phoneNumber: String = "+15555550100"
    @State private var shouldNavigateToNextView = false
    @State private var isLoading = false
    
    var body: some View {
        NavigationView {
            VStack {
                TextField("Enter your email", text: $email)
                    .textFieldStyle(RoundedBorderTextFieldStyle())
                    .padding()
                TextField("Enter your phone number", text: $phoneNumber)
                    .textFieldStyle(RoundedBorderTextFieldStyle())
                    .padding()
                Button(action: {
                    isLoading = true
                    Task {
                        do {
                            try await FootprintProvider.shared.createEmailPhoneBasedChallenge(email: email, phoneNumber: phoneNumber)

                            shouldNavigateToNextView = true
                        } catch {                          
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
                .foregroundColor(.white)
                .padding()
                .frame(maxWidth: .infinity)
                .background(isLoading ? Color.gray : Color.blue)
                .cornerRadius(8)
                .disabled(isLoading)
                .padding()               
                NavigationLink(destination: VerifyOTPView(), isActive: $shouldNavigateToNextView) { EmptyView() }
            }
        }
        .navigationTitle("Signup flow")
        .onAppear(perform: {
            Task {
                do {
                    let sandboxOutcome = SandboxOutcome(overallOutcome: .pass, documentOutcome: .pass)
                    try await FootprintProvider.shared.initialize(
                        configKey: "pb_test_QeSAeS8XHohiSpCOj2l4vd",
//                        sandboxId: "gC2hvdsN06Q53",
                        sandboxOutcome: sandboxOutcome
                       )
                }
            }
        })
        .enableInjection()
    }
}
