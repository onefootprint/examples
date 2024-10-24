import Foundation

public struct FootprintAppearance {
    var fontSrc: String?
    var rules: FootprintAppearanceRules?
    var variables: FootprintAppearanceVariables?
    
    public init(
        fontSrc: String? = nil,
        rules: FootprintAppearanceRules? = nil,
        variables: FootprintAppearanceVariables? = nil
    ) {
        self.fontSrc = fontSrc
        self.rules = rules
        self.variables = variables
    }
    
    private enum CodingKeys: String, CodingKey {
        case variant
        case fontSrc
        case rules
        case variables
    }
    
    private func valueToString<T>(value: T?) throws -> String where T: Encodable {
        if value == nil {
            return ""
        }

        let encoder = JSONEncoder()
        let encoded = try encoder.encode(value)
        let json = try JSONSerialization.jsonObject(with: encoded, options: [])
        let data = try JSONSerialization.data(withJSONObject: json)
        return String(data: data, encoding: .utf8)!
    }

    public func toJSON() throws -> [String: String]?  {
        var appearanceJson: [String: String] = [:]
        do {
            appearanceJson["rules"] = try self.valueToString(value: self.rules)
            appearanceJson["variables"] = try self.valueToString(value: self.variables)
        }
        if let fontSrc = self.fontSrc {
            appearanceJson["fontSrc"] = fontSrc
        }
        return appearanceJson.isEmpty ? nil : appearanceJson
    }
}
