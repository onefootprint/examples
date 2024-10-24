import Foundation

public enum FootprintLocale: String, Encodable {
    case esMX = "es-MX"
    case enUS = "en-US"
}

public enum FootprintLanguage: String, Encodable {
    case spanish = "es"
    case english = "en"
}

public struct FootprintL10n: Encodable {
    public var locale: FootprintLocale
    public var language: FootprintLanguage
    
    public init(locale: FootprintLocale? = nil, language: FootprintLanguage? = nil) {
        self.locale = locale ?? .enUS
        self.language = language ?? .english
    }
    
    private enum CodingKeys: String, CodingKey {
        case locale
        case language
    }
    
    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(self.locale, forKey: .locale)
        try container.encode(self.language, forKey: .language)
    }
}
