import Foundation

public struct FootprintOptions: Encodable {
    public var showCompletionPage: Bool
    public var showLogo: Bool
    
    public init(showCompletionPage: Bool = false, showLogo: Bool = false) {
        self.showCompletionPage = showCompletionPage
        self.showLogo = showLogo
    }
    
    private enum CodingKeys: String, CodingKey {
        case showCompletionPage = "show_completion_page"
        case showLogo = "show_logo"
    }
    
    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(self.showCompletionPage, forKey: .showCompletionPage)
        try container.encode(self.showLogo, forKey: .showLogo)
    }
}
