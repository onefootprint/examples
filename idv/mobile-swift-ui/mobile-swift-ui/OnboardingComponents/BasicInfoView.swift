import SwiftUI
import FootprintSwift

struct BasicInfoView: View {
    @State private var firstName: String = ""
    @State private var middleName: String = ""
    @State private var lastName: String = ""
    @State private var dateOfBirth: Date = Date()
    @State private var addressLine1: String = ""
    @State private var addressLine2: String = ""
    @State private var city: String = ""
    @State private var state: String = ""
    @State private var zipCode: String = ""
    @State private var country: String = ""
    @State private var ssn: String = ""
    @State private var isLoading: Bool = false
    @State private var errorMessage: String?  
    @State private var showSuccessView: Bool = false
    @State private var vaultData: VaultData?
    
    var body: some View {
        NavigationView {
            ScrollView {
                VStack(spacing: 24) {
                    Text("Basic Information")
                        .font(.title)
                        .fontWeight(.bold)
                    
                    GenericInputField(
                        text: $firstName,
                        placeholder: "First Name"
                    )
                    
                    GenericInputField(
                        text: $middleName,
                        placeholder: "Middle Name"
                    )
                    
                    GenericInputField(
                        text: $lastName,
                        placeholder: "Last Name"
                    )
                    
                    DatePicker("Date of Birth", selection: $dateOfBirth, displayedComponents: .date)
                        .datePickerStyle(DefaultDatePickerStyle())
                    
                    GenericInputField(
                        text: $addressLine1,
                        placeholder: "Address Line 1"
                    )
                    
                    GenericInputField(
                        text: $addressLine2,
                        placeholder: "Address Line 2 (Optional)"
                    )
                    
                    GenericInputField(
                        text: $city,
                        placeholder: "City"
                    )
                    
                    GenericInputField(
                        text: $state,
                        placeholder: "State"
                    )
                    
                    GenericInputField(
                        text: $zipCode,
                        placeholder: "Zip Code",
                        keyboardType: .numberPad
                    )
                    
                    GenericInputField(
                        text: $country,
                        placeholder: "Country"
                    )
                    
                    GenericInputField(
                        text: $ssn,
                        placeholder: "SSN",
                        keyboardType: .numberPad                    
                    )
                    
                    Button(action: {
                        isLoading = true
                        errorMessage = nil
                        Task {
                            do {
                                let dateFormatter = DateFormatter()
                                dateFormatter.dateFormat = "yyyy-MM-dd"
                                let dobString = dateFormatter.string(from: dateOfBirth)
                                
                                let vaultData = VaultData(
                                    idAddressLine1: addressLine1,
                                    idAddressLine2: addressLine2,
                                    idCity: city,
                                    idCountry: country,
                                    idDob: dobString,
                                    idFirstName: firstName,
                                    idLastName: lastName,
                                    idMiddleName: middleName,
                                    idSsn9: ssn,
                                    idState: state,
                                    idZip: zipCode
                                )
                                
                                try await FootprintProvider.shared.vault(vaultData: vaultData)
                                print("Vault data submitted successfully")
                               let response = try await FootprintProvider.shared.process()                               
                                showSuccessView = true
                                print("Process submitted successfully : \(showSuccessView)")
                               
                            } catch {
                                print("Error: \(error)")
                                if let footprintError = error as? FootprintError,
                                   footprintError.domain == FootprintErrorDomain.process.rawValue {
                                    do {
                                        try await FootprintProvider.shared.handoff(
                                            onCancel: {
                                                print("Handoff was canceled by the user")
                                                errorMessage = "Verification was canceled. Please try again."
                                            },
                                            onComplete: { validationToken in
                                                print("Handoff completed successfully with token: \(validationToken)")
                                                // You can add additional logic here if needed
                                                showSuccessView = true
                                            },                                           
                                            onError: { error in
                                                print("Error occurred during handoff: \(error)")
                                                errorMessage = "An error occurred during verification. Please try again."
                                            }
                                        )
                                    }
                                }
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
                    .cornerRadius(10)
                    .disabled(isLoading)
                    
                    if let errorMessage = errorMessage {
                        Text(errorMessage)
                            .foregroundColor(.red)
                            .padding()
                    }
                    
                    Spacer()
                }
                .padding()
            }
            .navigationBarHidden(true)
            .background(
                NavigationLink(destination: SuccessView(), isActive: $showSuccessView) {
                    EmptyView()
                }
            )
            .onAppear {
                Task {
                    do {
                        let fetchedVaultData = try await FootprintProvider.shared.getVaultData()
                        DispatchQueue.main.async {
                            self.vaultData = fetchedVaultData
                            self.updateFieldsWithVaultData()
                        }
                    } catch {
                        print("Error fetching vault data: \(error)")
                        errorMessage = "Failed to fetch your information. Please try again."
                    }
                }
            }
        }
    }
    
    private func updateFieldsWithVaultData() {
        guard let vaultData = vaultData else { return }
        
        firstName = vaultData.idFirstName ?? "John"
        middleName = vaultData.idMiddleName ?? "Doe"
        lastName = vaultData.idLastName ?? "Smith"
        if let dobString = vaultData.idDob,
           let dob = ISO8601DateFormatter().date(from: dobString) {
            dateOfBirth = dob
        } else {
            dateOfBirth = Calendar.current.date(from: DateComponents(year: 1990, month: 1, day: 1)) ?? Date()
        }
        addressLine1 = vaultData.idAddressLine1 ?? "123 Main St"
        addressLine2 = vaultData.idAddressLine2 ?? "Apt 4B"
        city = vaultData.idCity ?? "New York"
        state = vaultData.idState ?? "NY"
        zipCode = vaultData.idZip ?? "10001"
        country = vaultData.idCountry ?? "US"
        ssn = vaultData.idSsn9 ?? "123-45-6789"
    }
}

struct BasicInfoView_Previews: PreviewProvider {
    static var previews: some View {
        BasicInfoView()
    }
}
