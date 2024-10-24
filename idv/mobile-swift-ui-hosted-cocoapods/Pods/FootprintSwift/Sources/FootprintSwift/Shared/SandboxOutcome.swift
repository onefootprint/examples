import Foundation

public enum OverallOutcome: String, Codable, CaseIterable {
    case pass
    case fail
    case manualReview = "manual_review"
    case useRulesOutcome = "use_rules_outcome"
    case stepUp = "step_up"
}

public enum IdDocOutcome: String, Codable, CaseIterable {
    case pass
    case fail
    case real
}

public struct SandboxOutcome: Codable {
    public let overallOutcome: OverallOutcome?
    public let documentOutcome: IdDocOutcome?
    
    public init(overallOutcome: OverallOutcome? = nil, documentOutcome: IdDocOutcome? = nil) {
        self.overallOutcome = overallOutcome
        self.documentOutcome = documentOutcome
    }
    
    enum CodingKeys: String, CodingKey {
        case overallOutcome
        case documentOutcome
    }
}
