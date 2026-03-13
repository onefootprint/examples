//
//  VaultWithClientToken.swift
//  mobile-swift-ui
//
//  Created by D M Raisul Ahsan on 3/12/26.
//

import SwiftUI

struct VaultWithClientToken: View {
    private let clientToken = "cttok_XXX" // USE THE CLIENT TOKEN YOU RECEIVED FROM API
    @State private var email: String = "sandbox@onefootprint.com"
    @State private var phoneNumber: String = "+15555550100"
    @State private var firstName: String = "John"
    @State private var middleName: String = "Michael"
    @State private var lastName: String = "Doe"
    @State private var dob: String = "1990-01-01"
    @State private var addressLine1: String = "123 Main Street"
    @State private var addressLine2: String = "Apt 4B"
    @State private var city: String = "New York"
    @State private var state: String = "NY"
    @State private var zip: String = "10001"
    @State private var country: String = "US"
    @State private var ssn9: String = "123-45-6789"

    @State private var isLoading = false
    @State private var resultMessage: String?
    @State private var isError = false

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 16) {
                    inputField(label: "Email", text: $email)
                    inputField(label: "Phone Number", text: $phoneNumber, placeholder: "+1XXXXXXXXXX")
                    inputField(label: "First Name", text: $firstName)
                    inputField(label: "Middle Name", text: $middleName)
                    inputField(label: "Last Name", text: $lastName)
                    inputField(label: "Date of Birth", text: $dob, placeholder: "YYYY-MM-DD")
                    inputField(label: "Address Line 1", text: $addressLine1)
                    inputField(label: "Address Line 2", text: $addressLine2)
                    inputField(label: "City", text: $city)
                    inputField(label: "State", text: $state)
                    inputField(label: "ZIP Code", text: $zip)
                    inputField(label: "Country", text: $country)
                    inputField(label: "SSN", text: $ssn9, placeholder: "XXX-XX-XXXX")

                    if let resultMessage = resultMessage {
                        Text(resultMessage)
                            .foregroundColor(isError ? .red : .green)
                            .multilineTextAlignment(.center)
                            .padding()
                    }

                    Button(action: submitVault) {
                        if isLoading {
                            ProgressView()
                                .progressViewStyle(CircularProgressViewStyle(tint: .white))
                                .frame(maxWidth: .infinity, minHeight: 50)
                        } else {
                            Text("Submit")
                                .frame(maxWidth: .infinity, minHeight: 50)
                        }
                    }
                    .background(isLoading ? Color.gray : Color.blue)
                    .foregroundColor(.white)
                    .cornerRadius(10)
                    .disabled(isLoading)
                }
                .padding()
            }
            .navigationTitle("Vault with Client Token")
        }
    }

    private func inputField(label: String, text: Binding<String>, placeholder: String? = nil) -> some View {
        VStack(alignment: .leading) {
            Text(label)
                .font(.subheadline)
                .foregroundColor(.secondary)
            TextField(placeholder ?? "Enter \(label.lowercased())", text: text)
                .padding()
                .background(Color.gray.opacity(0.1))
                .cornerRadius(10)
        }
    }

    private func submitVault() {
        isLoading = true
        resultMessage = nil

        let body: [String: String] = [
            "id.email": email,
            "id.phone_number": phoneNumber,
            "id.first_name": firstName,
            "id.middle_name": middleName,
            "id.last_name": lastName,
            "id.dob": dob,
            "id.address_line1": addressLine1,
            "id.address_line2": addressLine2,
            "id.city": city,
            "id.state": state,
            "id.zip": zip,
            "id.country": country,
            "id.ssn9": ssn9
        ]

        guard let url = URL(string: "https://api.onefootprint.com/users/vault") else {
            resultMessage = "Invalid URL"
            isError = true
            isLoading = false
            return
        }

        var request = URLRequest(url: url)
        request.httpMethod = "PATCH"
        request.setValue(clientToken, forHTTPHeaderField: "x-fp-authorization")
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")

        do {
            request.httpBody = try JSONSerialization.data(withJSONObject: body)
        } catch {
            resultMessage = "Failed to encode request body"
            isError = true
            isLoading = false
            return
        }

        URLSession.shared.dataTask(with: request) { data, response, error in
            DispatchQueue.main.async {
                isLoading = false

                if let error = error {
                    resultMessage = "Request failed: \(error.localizedDescription)"
                    isError = true
                    return
                }

                guard let httpResponse = response as? HTTPURLResponse else {
                    resultMessage = "Invalid response"
                    isError = true
                    return
                }

                let responseBody = data.flatMap { String(data: $0, encoding: .utf8) } ?? "No response body"

                if (200...299).contains(httpResponse.statusCode) {
                    resultMessage = "Vault updated successfully (HTTP \(httpResponse.statusCode))"
                    isError = false
                    print("Vault response: \(responseBody)")
                } else {
                    resultMessage = "Error HTTP \(httpResponse.statusCode): \(responseBody)"
                    isError = true
                    print("Vault error: \(responseBody)")
                }
            }
        }.resume()
    }
}

