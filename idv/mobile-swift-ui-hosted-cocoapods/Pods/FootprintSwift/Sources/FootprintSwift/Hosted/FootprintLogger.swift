import Foundation

@available(iOS 13.0, *)
public class FootprintLogger {
    private var configuration: FootprintConfiguration?
    private let debugMode = false // Enable this for local development
    
    init(configuration: FootprintConfiguration?) {
        self.configuration = configuration
    }
    
    private func getMessage(raw: String) -> String {
        return "@onefootprint/footprint-swift: \(raw)"
    }
    
    public func logError(error: String, shouldCancel: Bool? = nil) {
        let errorMsg = self.getMessage(raw: error)
        if debugMode {
            print(errorMsg)
        } else {
            sendLog(message: error, level: "error")
        }
        if let onError = self.configuration?.onError {
            onError(errorMsg)
        }
        if let onCancel = self.configuration?.onCancel, (shouldCancel ?? false) {
            onCancel()
        }
    }
    
    public func logWarn(warning: String) {
        let warningMessage = self.getMessage(raw: warning)
        if debugMode {
            print(warningMessage)
        } else {
            sendLog(message: warning, level: "warning")
        }
    }
    
    public func sendLog(message: String, level: String) {
        Task { () in
            do {
                var request = URLRequest(url: URL(string: "\(FootprintSdkMetadata.apiBaseUrl)/org/sdk_telemetry")!)
                request.httpMethod = "POST"
                request.setValue("application/json", forHTTPHeaderField: "Content-Type")
                let encoder = JSONEncoder()
                encoder.keyEncodingStrategy = .convertToSnakeCase
                let telemetry = FootprintSdkTelemetry(
                    tenantDomain: configuration?.scheme,
                    sdkKind: (configuration?.isAuthPlaybook == true) ? FootprintSdkMetadata.kindAuth : FootprintSdkMetadata.kindVerify,
                    sdkName: FootprintSdkMetadata.name,
                    sdkVersion: FootprintSdkMetadata.version,
                    logLevel: level,
                    logMessage: message
                )
                let encodedConfiguration = try encoder.encode(telemetry)
                let configurationJSON = try? JSONSerialization.jsonObject(with: encodedConfiguration, options: [])
                let body = try JSONSerialization.data(withJSONObject: configurationJSON)
                request.httpBody = body
                try? await URLSession.shared.data(for: request)
            } catch { /* Fire and forget */ }
        }
    }
}
