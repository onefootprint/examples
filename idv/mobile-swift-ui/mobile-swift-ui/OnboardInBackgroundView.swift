//
//  OnboardInBackgroundView.swift
//  mobile-swift-ui
//
//  Created by D M Raisul Ahsan on 7/31/25.
//


import SwiftUI
import Footprint

struct OnboardInBackgroundView: View {
    @State private var isLoading = false

    var body: some View {
        NavigationStack {
            VStack(spacing: 20) {
                Button(action: {
                    isLoading = true
                    Onboarding.shared.initialize(
                        onboardingSessionToken: "YOUR SESSION TOKEN",
                        onComplete: { vTok in
                            isLoading = false
                            print("Onboarding complete - validation token \(vTok)")
                        },
                        onCancel: {
                            isLoading = false
                            print("User canceled the flow")
                        },
                        onError: { error in
                            isLoading = false
                            print("Error occurred \(error.message)")
                        },
                        options: OnboardingOptions(runInBackground: true)
                    )
                }) {
                    if isLoading {
                        ProgressView()
                            .progressViewStyle(CircularProgressViewStyle(tint: .white))
                            .frame(maxWidth: .infinity)
                    } else {
                        Text("Onboard in background")
                            .frame(maxWidth: .infinity)
                    }
                }
                .frame(width: 300, height: 50)
                .background(isLoading ? Color.gray : Color.blue)
                .foregroundColor(.white)
                .cornerRadius(10)
                .disabled(isLoading)
            }
            .padding(.horizontal, 20)
            .navigationTitle("Onboard in background")
        }
    }
}

