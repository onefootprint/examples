import SwiftUI
import FootprintSwift
import Inject

struct VerifyOTPView: View {
    @ObserveInjection var inject
    private var onboardingComponents = FootprintProvider.shared
    let challengeKind: String
    @State private var isLoading: Bool = false
    @State private var errorMessage: String?
    @State private var navigateToBasicInfo: Bool = false
    @State private var vaultData: VaultData?
    
    init(challengeKind: String) {
        self.challengeKind = challengeKind
    }
    
    var body: some View {
        NavigationView {
            VStack {
                Text("Enter Verification Code from \(challengeKind.uppercased())")
                    .font(.title2)
                    .padding(.bottom, 20)
                
                PinInputField { pincode in
                    submitPin(pin: pincode)
                }
                .padding()
                
                if isLoading {
                    ProgressView()
                        .progressViewStyle(CircularProgressViewStyle(tint: .blue))
                        .padding() // Add padding for better layout
                }
                
                if let errorMessage = errorMessage {
                    Text(errorMessage)
                        .foregroundColor(.red)
                        .padding()
                }
            }
            .enableInjection()
            .background(
                NavigationLink(destination: BasicInfoView(), isActive: $navigateToBasicInfo) {
                    EmptyView()
                }
            )
            .padding() // Add padding to the VStack for better layout
        }
    }
    
    private func submitPin(pin: String) {
        isLoading = true
        errorMessage = nil
        
        Task {
            do {
                let response = try await FootprintProvider.shared.verify(verificationCode: pin)
                print("Verification response: \(response)")
                self.vaultData = response.vaultData
                // Set navigate to true on the main thread
                DispatchQueue.main.async {
                    self.navigateToBasicInfo = true
                }
            } catch {
                DispatchQueue.main.async {
                    errorMessage = "Failed to submit PIN. Please try again."
                    print("Error submitting PIN: \(error)")
                }
            }
            // Set loading state to false
            DispatchQueue.main.async {
                isLoading = false
            }
        }
    }
}
