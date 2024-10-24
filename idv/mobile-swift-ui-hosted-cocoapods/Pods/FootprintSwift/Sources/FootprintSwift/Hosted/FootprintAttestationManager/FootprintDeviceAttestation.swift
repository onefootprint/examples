import Foundation
import UIKit

@available(iOS 14.0, *)
class FootprintDeviceAttestation: NSObject {

    static func attest(deviceResponseJson: String, challenge: String, service: String, accessGroup: String) async throws -> String {
        let attestation = Task { () -> String? in
            do {
                let attester = try await FootprintAttester.initOrCreate(service: service, accessGroup: accessGroup)
                let attestation = try await attester.attestDevice(metadata: DataToAttest(
                  model: UIDevice.current.model,
                  os: UIDevice.current.systemVersion,
                  webauthnDeviceResponseJson: deviceResponseJson,
                  footprintAttestationChallenge: challenge,
                  uploadedDocumentTypes: [],
                  deviceCheckToken: attester.deviceToken?.base64EncodedString())
                )

                let json = JSONEncoder()
                json.keyEncodingStrategy = .convertToSnakeCase
                json.dataEncodingStrategy = .base64
                let attestationJson = try json.encode(attestation).base64EncodedString()
                return attestationJson
            } catch {
                return nil
            }
        }
        
        return try await attestation.value!
      }

    
    static func requiresMainQueueSetup() -> Bool {
        return true
    }
}
