import Foundation

public struct FootprintSdkTelemetry: Encodable {
    public var tenantDomain: String? = nil
    public var sdkKind: String? = nil
    public var sdkName: String? = nil
    public var sdkVersion: String? = nil
    public var logLevel: String? = nil
    public var logMessage: String? = nil
    public var sessionId: String? = nil
    
    init(tenantDomain: String? = nil, sdkKind: String? = nil, sdkName: String? = nil, sdkVersion: String? = nil, logLevel: String? = nil, logMessage: String? = nil, sessionId: String? = nil) {
        self.tenantDomain = tenantDomain
        self.sdkKind = sdkKind
        self.sdkName = sdkName
        self.sdkVersion = sdkVersion
        self.logLevel = logLevel
        self.logMessage = logMessage
        self.sessionId = sessionId
    }
    
    private enum CodingKeys: String, CodingKey {
        case tenantDomain = "tenant_domain"
        case sdkKind = "sdk_kind"
        case sdkName = "sdk_name"
        case sdkVersion = "sdk_version"
        case logLevel = "log_level"
        case logMessage = "log_message"
        case sessionId = "session_id"
    }
    
    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encodeIfPresent(self.tenantDomain, forKey: .tenantDomain)
        try container.encodeIfPresent(self.sdkKind, forKey: .sdkKind)
        try container.encodeIfPresent(self.sdkName, forKey: .sdkName)
        try container.encodeIfPresent(self.sdkVersion, forKey: .sdkVersion)
        try container.encodeIfPresent(self.logLevel, forKey: .logLevel)
        try container.encodeIfPresent(self.logMessage, forKey: .logMessage)
        try container.encodeIfPresent(self.sessionId, forKey: .sessionId)
    }
}
