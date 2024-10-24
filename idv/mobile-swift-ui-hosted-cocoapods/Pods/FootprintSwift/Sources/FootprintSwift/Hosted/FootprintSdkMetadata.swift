import Foundation

internal struct FootprintSdkMetadata {
#if DEBUG
    static let bifrostBaseUrl: String = "https://id.preview.onefootprint.com"
    static let authBaseUrl: String = "https://auth.preview.onefootprint.com"
    static let apiBaseUrl: String = "https://api.dev.onefootprint.com"
#else
    static let bifrostBaseUrl: String = "https://id.onefootprint.com"
    static let authBaseUrl: String = "https://auth.onefootprint.com"
    static let apiBaseUrl: String = "https://api.onefootprint.com"
#endif
    static let name: String = "footprint-swift"
    static let kindVerify: String = "verify_v1"
    static let kindAuth: String = "auth_v1"
    static let version: String = "2.0.0"
}
