//
//  SandaloneBankLinking.swift
//  iosApp
//
//  Created by D M Raisul Ahsan on 4/19/25.
//  Copyright © 2025 orgName. All rights reserved.
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

    var body: some View {
        Button(action: {
            showBalSheet = true
        }) {
            HStack {
                Text("Link Bank Account")
            }
            .frame(maxWidth: .infinity)
            .padding()
            .background(Color.blue)
            .foregroundColor(.white)
            .cornerRadius(8)
        }
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
                onSuccess()
            },
            onError: { error in // Called when an error occurs
                print("Error occurred during bank linking: \(error)")
                showBalSheet = false
                onError("Bank linking failed: \(error.message)")
            },
            onClose: { // Called when user closes the flow or the flow closes due to an error. If the flow closes due to an error, it will also call the onError callback
                print("Bank linking exited")
                showBalSheet = false
            },
            onEvent: {event in // Provides additional information about the events for logging purpose
                print("Bank Linking Event: \(event)")
            }
        )
    }
}

