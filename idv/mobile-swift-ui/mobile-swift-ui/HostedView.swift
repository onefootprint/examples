//
//  HostedView.swift
//  iosApp
//
//  Created by Rodrigo on 26/03/25.
//  Copyright © 2025 orgName. All rights reserved.
//
import SwiftUI
import Footprint

struct HostedView: View {
    var body: some View {
        NavigationStack {
            VStack  {
                Button(action: {
                    Task {
                        let appearance = FootprintAppearance.createAppearance(
                            rules: FootprintAppearanceRules.createAppearanceRules(button: ["transition": "all .2s linear"]),
                            variables: FootprintAppearanceVariables.createAppearanceVariables(
                                colorError: "#E33D19",
                                linkColor: "#101010",
                                fontFamily: "\"Inter\"",
                                labelColor: "#101010",
                                labelFont: "600 15px/18px \"Inter\"",
                                inputBorderRadius: "8px",
                                inputBorderWidth: "1px",
                                inputFont: "500 15px/21.42px \"Inter\"",
                                inputHeight: "50px",
                                inputPlaceholderColor: "#B5B5B5",
                                inputColor: "#101010",
                                inputBg: "#FFFFFF",
                                inputBorderColor: "#B5B5B5",
                                inputHoverBorderColor: "#707070",
                                inputFocusBorderColor: "#707070",
                                inputFocusElevation: "none",
                                inputErrorFocusElevation: "none",
                                hintColor: "#101010",
                                hintFont: "400 13px/20px \"Inter\"",
                                linkButtonColor: "#315E4C",
                                buttonBorderRadius: "70px",
                                buttonPrimaryBg: "#315E4C",
                                buttonPrimaryColor: "#FFF",
                                buttonPrimaryHoverBg: "#46866c"
                            )
                        )
                        
                        print("Called launchHosted")
                        
                        FootprintHosted.shared.launchHosted(
                            publicKey: "pb_test_Nza8oVYDBlrIqrQrNCbKRB",
                            onComplete: { validationToken in
                                print("launchHosted completed successfully with token: \(validationToken)")
                            },
                            onCancel: {
                                print("launchHosted was canceled by the user")
                            },
                            onError: { error in
                                print("Error occurred during handoff: \(error)")
                            },
                            appearance: appearance,
                            options: FootprintOptions(showCompletionPage: true, showLogo: true)
                            
                        )
                        
                        
                    }
                }) {
                    Text("Launch hosted flow")
                }
                
                .frame(width: 300, height: 50)
                .background(Color.blue)
                .foregroundColor(.white)
                .cornerRadius(10)
            }
            .padding(.horizontal, 20)
            .navigationTitle("Hosted flow")
        }
    }
    
}
