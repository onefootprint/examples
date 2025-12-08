import SwiftUI
import Footprint

struct BasicInfoView: View {
    @State private var isLoading: Bool = false
    @State private var errorMessage: String?
    @State private var showSuccessView: Bool = false
    @State private var vaultData: VaultData?
    @State private var isDataReady: Bool = false // State variable to track data readiness
    @State private var customField: String = ""
    
    private var defaultFormValues: [FpFieldName : String?] {
        [
            .idFirstName: vaultData?.idFirstName ?? "John",
            .idMiddleName: vaultData?.idMiddleName ?? "",
            .idLastName: vaultData?.idLastName ?? "Doe",
            .idDob: vaultData?.idDob ?? "01/01/1990",
            .idAddressLine1: vaultData?.idAddressLine1 ?? "123 Main St",
            .idAddressLine2: vaultData?.idAddressLine2 ?? "Apt 4B",
            .idCity: vaultData?.idCity ?? "New York",
            .idState: vaultData?.idState ?? "NY",
            .idZip: vaultData?.idZip ?? "10001",
            .idCountry: vaultData?.idCountry ?? "US",
            .idSsn9: vaultData?.idSsn9 ?? "123-45-6789"
        ]
    }
    
    var body: some View {
        NavigationView {
            ScrollView {
                if isDataReady {
                    FpForm(
                        defaultValues: defaultFormValues,
                        onSubmit: { vaultData in
                            submitVaultData(vaultData)
                        },
                        builder: { formUtils in
                            formContent(formUtils: formUtils)
                        }
                    )
                } else {
                    ProgressView("Loading data...") // Loading indicator
                        .padding()
                }
            }
            .navigationBarHidden(true)
            .background(
                NavigationLink(destination: SuccessView(), isActive: $showSuccessView) {
                    EmptyView()
                }
            )
            .onAppear {
                fetchVaultData()
                fetchRequirements()
            }
        }
    }
    
    private func fetchVaultData() {
        Task {
            do {
                let fetchedVaultData = try await Footprint.shared.getVaultData(fields:
                                                                                [
                                                                                    DataIdentifier.idFirstName,
                                                                                    DataIdentifier.idMiddleName,
                                                                                    DataIdentifier.idLastName,
                                                                                    DataIdentifier.idDob,
                                                                                    DataIdentifier.idAddressLine1,
                                                                                    DataIdentifier.idAddressLine2,
                                                                                    DataIdentifier.idCity,
                                                                                    DataIdentifier.idState,
                                                                                    DataIdentifier.idZip,
                                                                                    DataIdentifier.idCountry,
                                                                                    DataIdentifier.custom(fieldName: "lorem")
                                                                                    // SSN can't be decrypted
                                                                                ])
                print("Fetched vault data: \(fetchedVaultData)")
                
                DispatchQueue.main.async {
                    customField = fetchedVaultData.getCustomField(fieldName: "lorem") ?? ""
                    self.vaultData = fetchedVaultData
                    self.isDataReady = true // Set to true after fetching data
                }
            } catch {
                print("Error fetching vault data: \(error)")
                errorMessage = "Failed to fetch your information. Please try again."
            }
        }
    }
    
    private func fetchRequirements() {
        // This is an example of how you can fetch the most updated requirements
        // This example only print some of the information, however you can use this information in many ways
        // For example you can only show the input fields that are missing in the requirements
        Task {
            do {
                let requirementAttributes = try await Footprint.shared.getRequirements()
                let collected = requirementAttributes.fields.collected
                let missing = requirementAttributes.fields.missing
                let optional = requirementAttributes.fields.optional
                
                print("Collected fields: \(collected)")
                print("Missing fields: \(missing)")
                print("Optional fields: \(optional)")
            } catch {
                print("Error fetching requirements: \(error)")
            }
        }
    }
    
    private func submitVaultData(_ vaultData: VaultData) {
        isLoading = true
        errorMessage = nil
        
        Task {
            do {
                try await Footprint.shared.vault(data: VaultData.createVault(
                    idAddressLine1: vaultData.idAddressLine1,
                    idAddressLine2: vaultData.idAddressLine2,
                    idCity: vaultData.idCity,
                    idCountry: vaultData.idCountry,
                    idDob: vaultData.idDob,
                    idFirstName: vaultData.idFirstName,
                    idLastName: vaultData.idLastName ,
                    idMiddleName: vaultData.idMiddleName,
                    idSsn9: vaultData.idSsn9,
                    idState: vaultData.idState,
                    idZip: vaultData.idZip,
                    customFields: [
                        "lorem": customField
                    ]) )
                print("Vault data submitted successfully")
                let validationToken = try await Footprint.shared.process()
                showSuccessView = true
                print("Process submitted successfully: \(validationToken)")
            } catch  let error as FootprintException {
                // TODO: improve error handling
                handleVaultError(error)
            }
            catch {
                print("Generic Error!: \(error)")
                handleHandoff()
            }
            isLoading = false
        }
    }
    
    private func handleVaultError(_ error: FootprintException) {
        switch error.kind {
        case .inlineProcessNotSupported:
            print("Inline process not supported error, message: \(error.message)")
            handleHandoff()
        case .vaultingError:
            print("Vaulting error, message: \(error.message)")
        default:
            print("Error occurred: \(error)")
        }
        
    }
    
    private func handleHandoff() {
        Task {
            do {
                print("Launching handoff")
                try await FootprintHosted.shared.handoff(
                    onComplete: { validationToken in
                        print("Handoff completed successfully with token: \(validationToken)")
                        showSuccessView = true // Navigate to success view on completion
                    },
                    onCancel: {
                        print("Handoff was canceled by the user")
                        errorMessage = "Verification was canceled. Please try again."
                    },
                    onError: { error in
                        print("Error occurred during handoff: \(error)")
                        errorMessage = "An error occurred during verification. Please try again."
                    }
                )
            } catch {
                print("Error during handoff: \(error)")
                errorMessage = "An error occurred during verification. Please try again."
            }
        }
    }
    
    private func formContent(formUtils: FormUtils) -> some View {
        VStack(spacing: 20) {
            FpField(name: .idFirstName, content: {
                inputField(label: "First name", placeholder: "Enter your first name")
            })
            FpField(name: .idMiddleName, content: {
                inputField(label: "Middle name", placeholder: "Enter your middle name")
            })
            FpField(name: .idLastName, content: {
                inputField(label: "Last name", placeholder: "Enter your last name")
            })
            FpField(name: .idDob, content: {
                inputField(label: "Date of birth", placeholder: "Enter your date of birth")
            })
            FpField(name: .idAddressLine1, content: {
                inputField(label: "Address line 1", placeholder: "Enter your address line 1")
            })
            FpField(name: .idAddressLine2, content: {
                inputField(label: "Address line 2", placeholder: "Enter your address line 2")
            })
            FpField(name: .idCity, content: {
                inputField(label: "City", placeholder: "Enter your city")
            })
            FpField(name: .idState, content: {
                inputField(label: "State", placeholder: "Enter your state")
            })
            FpField(name: .idZip, content: {
                inputField(label: "Zip code", placeholder: "Enter your zip code")
            })
            FpField(name: .idCountry, content: {
                inputField(label: "Country", placeholder: "Enter your country")
            })
            VStack(alignment: .leading) {
                Text("Custom field")
                    .font(.subheadline)
                    .foregroundColor(.secondary)
                TextField("Enter the custom field", text: $customField)
                    .padding()
                    .background(Color.gray.opacity(0.1))
                    .cornerRadius(10)
            }
            
            FpField(name: .idSsn9, content: {
                VStack(alignment: .leading) {
                    FpLabel("SSN", font: .subheadline, color: .secondary)
                    FpInput() { binding, handleChange in
                        AnyView(TextField("SSN", text: binding)
                            .padding()
                            .background(Color.gray.opacity(0.1))
                            .cornerRadius(10)
                            .onChange(of: binding.wrappedValue) { newValue in
                                handleChange(newValue)
                            }
                        )
                    }
                    FpFieldError()
                }
            })
            submitButton(formUtils: formUtils)
        }
        .padding()
    }
    
    private func inputField(label: String, placeholder: String) -> some View {
        VStack(alignment: .leading) {
            FpLabel(label, font: .subheadline, color: .secondary)
            FpInput(placeholder: placeholder)
                .padding()
                .background(Color.gray.opacity(0.1))
                .cornerRadius(10)
            FpFieldError()
        }
    }
    
    private func submitButton(formUtils: FormUtils) -> some View {
        Button(action: formUtils.handleSubmit) {
            if isLoading {
                ProgressView()
                    .progressViewStyle(CircularProgressViewStyle(tint: .white))
                    .frame(maxWidth: .infinity, minHeight: 50)
                    .background(Color.blue)
                    .cornerRadius(10)
            } else {
                Text("Continue")
                    .foregroundColor(.white)
                    .frame(maxWidth: .infinity, minHeight: 50)
                    .background(Color.blue)
                    .cornerRadius(10)
                    .disabled(isLoading)
            }
        }
    }
}
