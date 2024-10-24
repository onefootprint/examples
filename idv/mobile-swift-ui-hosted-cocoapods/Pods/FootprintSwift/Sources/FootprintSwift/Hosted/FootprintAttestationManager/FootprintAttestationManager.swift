import Foundation

struct AttestationChallengeRequest: Encodable {
    public var deviceType: String
    public var appBundleId: String
    
    init() {
        self.deviceType = "ios"
        self.appBundleId = Bundle.main.bundleIdentifier as! String
    }
    
    private enum CodingKeys: String, CodingKey {
        case deviceType = "device_type"
        case appBundleId = "app_bundle_id"
    }
    
    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encodeIfPresent(self.deviceType, forKey: .deviceType)
        try container.encodeIfPresent(self.appBundleId, forKey: .appBundleId)
    }
}

struct AttestationChallenge {
    public var challenge: String
    public var state: String
}

struct AttestationResult: Encodable {
    public var attestation: String
    public var state: String
}

@available(iOS 13.0, *)
public class FootprintAttestationManager {
    private var logger: FootprintLogger?
    
    init(logger: FootprintLogger?) {
        self.logger = logger
    }
    
    public func getAttestation(authToken: String?, deviceResponseJson: String?, service: String?, accessGroup: String?) async throws {
        guard let authToken = authToken,
              let deviceResponseJson = deviceResponseJson,
              let service = service,
              let accessGroup = accessGroup else {
            return
        }
        
        if #available(iOS 14.0, *) {
            let receivedChallenge = try await requestAttestationChallenge(authToken: authToken)
            let attestation = try await FootprintDeviceAttestation.attest(
                deviceResponseJson: deviceResponseJson,
                challenge: receivedChallenge!.challenge,
                service: service,
                accessGroup: accessGroup
            )
            try await submitAttestation(
                authToken: authToken,
                attestation: AttestationResult(attestation: attestation, state: receivedChallenge!.state)
            )
        }
    }
    
    private func getRequest(authToken: String, path: String, body: Data) -> URLRequest {
        var request = URLRequest(url: URL(string: "\(FootprintSdkMetadata.apiBaseUrl)\(path)")!)
        request.httpMethod = "POST"
        request.setValue(authToken, forHTTPHeaderField: "x-fp-authorization")
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.httpBody = body
        return request
    }
    
    private func requestAttestationChallenge(authToken: String) async throws -> AttestationChallenge? {
        let attestationChallenge = Task { () -> AttestationChallenge in
            let encoder = JSONEncoder()
            encoder.keyEncodingStrategy = .convertToSnakeCase
            let bodyJson = try! JSONSerialization.jsonObject(with: encoder.encode(AttestationChallengeRequest()), options: [])
            let body = try! JSONSerialization.data(withJSONObject: bodyJson)
            var request = getRequest(authToken: authToken, path: "/hosted/user/attest_device/challenge", body: body)
            let (data, _) = try! await URLSession.shared.data(for: request)
            let jsonResponse = try JSONSerialization.jsonObject(with: data, options: []) as! [String: String]
            return AttestationChallenge(
                challenge: jsonResponse["attestation_challenge"] as! String,
                state: jsonResponse["state"] as! String
            )
        }
        return try await attestationChallenge.value;
    }
    
    private func submitAttestation(authToken: String, attestation: AttestationResult) async throws -> Void {
        let encoder = JSONEncoder()
        encoder.keyEncodingStrategy = .convertToSnakeCase
        let bodyJson = try! JSONSerialization.jsonObject(with: encoder.encode(attestation), options: [])
        let body = try! JSONSerialization.data(withJSONObject: bodyJson)
        var request = getRequest(authToken: authToken, path: "/hosted/user/attest_device", body: body)
        try await URLSession.shared.data(for: request)
    }
}
