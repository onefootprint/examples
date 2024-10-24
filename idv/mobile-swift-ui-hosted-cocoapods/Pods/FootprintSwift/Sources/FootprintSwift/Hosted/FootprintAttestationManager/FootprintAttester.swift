import Foundation
import DeviceCheck
import CryptoKit
import AuthenticationServices

enum DCAttestationError: Error {
    case notSupported
    case generateKeyFailed
    case attestKeyFailed
    case invalidRpId
}

struct DataToAttest: Encodable {
    let model: String
    let os: String
    let webauthnDeviceResponseJson: String?
    let footprintAttestationChallenge: String
    let uploadedDocumentTypes: [String]
    let deviceCheckToken: String?
}

struct AttestedDevice: Codable {
    let attestationData: Data
    let metadataJSONData: Data
    let keyId: String
}

typealias KeyId = String

@available(iOS 14.0, *)
public class FootprintAttester {
    var service: String
    var accessGroup: String
    
    static let ATTESTATION_KEY_ID_STORAGE_KEY = "fp_attest_key_5"
    
    static func initOrCreate(service: String, accessGroup: String) async throws -> FootprintAttester {
        let keyId = try await Self.generateOrGetAttestationKey(service: service, accessGroup: accessGroup)
        if DCDevice.current.isSupported {
            let deviceToken = try await DCDevice.current.generateToken()
            return FootprintAttester(keyId: keyId, service: service, accessGroup: accessGroup, deviceToken: deviceToken)
        } else {
            return FootprintAttester(keyId: keyId, service: service, accessGroup: accessGroup, deviceToken: nil)
        }
    }
    
    /// generate an attestation key pair
    static func generateOrGetAttestationKey(service: String, accessGroup: String) async throws -> KeyId {
        let keychain = FootprintKeychainStorage(service: service, accessGroup: accessGroup)
        if let keyIdData = try? keychain.getData(key: ATTESTATION_KEY_ID_STORAGE_KEY),
           let keyId = String(data: keyIdData, encoding: .utf8)
        {
            return keyId
        }
        
        guard DCAppAttestService.shared.isSupported else {
            throw DCAttestationError.notSupported
        }
        
        let keyId = try await DCAppAttestService.shared.generateKey()
        try keychain.setData(key: ATTESTATION_KEY_ID_STORAGE_KEY, data: Data(keyId.utf8))
        
        return keyId
    }
    
    let keyId: KeyId
    let deviceToken: Data?
    
    init(keyId: KeyId, service: String, accessGroup: String, deviceToken: Data?) {
        self.keyId = keyId
        self.deviceToken = deviceToken
        self.service = service
        self.accessGroup = accessGroup
    }
    
    /// attest a device and embed certain challenge fields to bind the attestation to some external event
    func attestDevice(metadata: DataToAttest) async throws -> AttestedDevice {
        let json = JSONEncoder()
        json.keyEncodingStrategy = .convertToSnakeCase
        json.dataEncodingStrategy = .base64
        let metadataJSONData = try json.encode(metadata)
        
        let attestationData = try await attestDevice(with: metadataJSONData)
        
        return AttestedDevice(attestationData: attestationData,
                              metadataJSONData: metadataJSONData,
                              keyId: self.keyId)
    }
    
    private func attestDevice(with challenge:Data) async throws -> Data {
        let service = DCAppAttestService.shared
        guard service.isSupported else {
            throw DCAttestationError.notSupported
        }
        
        let challengeHash = Data(SHA256.hash(data: challenge))
        
        let attestation = try await service.attestKey(keyId, clientDataHash: challengeHash)
        return attestation
    }
    
}
