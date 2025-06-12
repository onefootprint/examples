import SwiftUI
import Footprint


struct BankLinkingView: View {
    @State private var navigateToBasicInfo: Bool = false
    @State private var showBalSheet: Bool = false
    
    var body: some View {
        NavigationView {
            VStack {
                Button(action: {
                    self.showBalSheet = true
                }) {
                    Text("Link Bank Account")
                }
            }
            .background(
                NavigationLink(destination: BasicInfoView(), isActive: $navigateToBasicInfo) {
                    EmptyView()
                }
            )
            .padding()
            .sheet(
                isPresented: $showBalSheet,
                content: {
                    FootprintBankLinking(
                        redirectUri: "footprintcomponentsdemo://banklinking",
                        onSuccess: {
                            print("Bank linking completed successfully")
                            showBalSheet = false
                            navigateToBasicInfo = true
                        },
                        onError: { error in // Called when an error occurs
                            print("Error occurred during bank linking: \(error)")
                        },
                        onClose: { // Called when user closes the flow or the flow closes due to an error. If the flow closes due to an error, it will also call the onError callback
                            print("Bank linking exited")
                            showBalSheet = false
                        }
                    )
                }
            )
            
        }
    }
}
