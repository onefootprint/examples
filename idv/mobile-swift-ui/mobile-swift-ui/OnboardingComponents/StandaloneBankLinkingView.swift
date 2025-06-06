//
//  StandaloneBankLinkingView.swift
//  mobile-swift-ui
//
//  Created by D M Raisul Ahsan on 4/25/25.
//

import SwiftUI
import Footprint

struct StandaloneBankLinkingView: View {
    @State private var authToken: String = ""
    @State private var isBankLinkingComplete: Bool = false
    
    var body: some View {
        VStack(spacing: 20) {
            Text("Bank Linking with Auth Token")
                .font(.title)
                .padding()
            
            TextField(
                "Auth token",
                text: $authToken
            )
            .textFieldStyle(RoundedBorderTextFieldStyle())
            .padding(.horizontal)
            
            BankLinkingViewWithAuthToken(
                authToken: authToken,
                onSuccess: {
                    isBankLinkingComplete = true
                },
                onError: { message in
                    print(message)
                    isBankLinkingComplete = false
                }
            )
            
            if isBankLinkingComplete {
                Text("Bank linking completed successfully!")
                    .foregroundColor(.green)
                    .padding()
                    .transition(.opacity)
            }
            Spacer()
        }
        .animation(.easeInOut, value: isBankLinkingComplete)
    }
}

struct BankLinkingViewWithAuthToken: View {
    let authToken: String
    let onSuccess: () -> Void
    let onError: (String) -> Void
    
    @State private var showBalSheet: Bool = false
    @State private var isLoading: Bool = false
    
    var body: some View {
        Button(action: {
            isLoading = true
            showBalSheet = true
        }) {
            HStack {
                if isLoading {
                    ProgressView()
                        .progressViewStyle(CircularProgressViewStyle(tint: .white))
                } else {
                    Text("Link Bank Account")
                }
            }
            .frame(maxWidth: .infinity)
            .padding()
            .background(isLoading ? Color.blue.opacity(0.7) : Color.blue)
            .foregroundColor(.white)
            .cornerRadius(8)
        }
        .disabled(isLoading)
        .padding(.horizontal)
        .sheet(isPresented: $showBalSheet) {
            bankLinkingSheet
        }
    }
    
    private var bankLinkingSheet: some View {
        FootprintBankLinkingWithAuthToken(
            authToken: authToken,
            redirectUri: "footprintcomponentsdemo://banklinking",
            onSuccess: { response in
                print("Bank linking completed successfully, validation token: \(response.validationToken)")
                showBalSheet = false
                isLoading = false
                onSuccess()
            },
            onError: { error in
                print("Error occurred during bank linking: \(error)")
                showBalSheet = false
                isLoading = false
                onError("Bank linking failed: \(error.message)")
            },
            onClose: {
                print("Bank linking exited")
                showBalSheet = false
                isLoading = false
            }
        )
    }
}

