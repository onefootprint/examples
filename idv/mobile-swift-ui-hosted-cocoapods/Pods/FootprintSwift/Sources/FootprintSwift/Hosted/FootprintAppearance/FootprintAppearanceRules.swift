import Foundation

public struct FootprintAppearanceRules: Codable {
    public var button: [String: String]?
    public var buttonHover: [String: String]?
    public var buttonFocus: [String: String]?
    public var buttonActive: [String: String]?
    public var input: [String: String]?
    public var inputHover: [String: String]?
    public var inputFocus: [String: String]?
    public var inputActive: [String: String]?
    public var pinInput: [String: String]?
    public var pinInputHover: [String: String]?
    public var pinInputFocus: [String: String]?
    public var pinInputActive: [String: String]?
    public var label: [String: String]?
    public var hint: [String: String]?
    public var link: [String: String]?
    public var linkButton: [String: String]?
    public var linkHover: [String: String]?
    public var linkActive:[String: String]?
    public var linkButtonHover:[String: String]?
    public var linkButtonFocus:[String: String]?
    public var linkButtonActive:[String: String]?
    
    public init(button: [String: String]? = nil,
                buttonHover: [String: String]? = nil,
                buttonFocus: [String: String]? = nil,
                buttonActive: [String: String]? = nil,
                input: [String: String]? = nil,
                inputHover: [String: String]? = nil,
                inputFocus: [String: String]? = nil,
                inputActive: [String: String]? = nil,
                pinInput: [String: String]? = nil,
                pinInputHover: [String: String]? = nil,
                pinInputFocus: [String: String]? = nil,
                pinInputActive: [String: String]? = nil,
                label: [String: String]? = nil,
                hint: [String: String]? = nil,
                link: [String: String]? = nil,
                linkButton: [String: String]? = nil,
                linkHover: [String: String]? = nil,
                linkActive: [String: String]? = nil,
                linkButtonHover: [String: String]? = nil,
                linkButtonFocus: [String: String]? = nil,
                linkButtonActive: [String: String]? = nil
                
    ) {
        self.button = button
        self.buttonHover = buttonHover
        self.buttonFocus = buttonFocus
        self.buttonActive = buttonActive
        self.input = input
        self.inputHover = inputHover
        self.inputFocus = inputFocus
        self.inputActive = inputActive
        self.pinInput = pinInput
        self.pinInputHover = pinInputHover
        self.pinInputFocus = pinInputFocus
        self.pinInputActive = pinInputActive
        self.label = label
        self.hint = hint
        self.link = link
        self.linkButton = linkButton
        self.linkHover = linkHover
        self.linkActive = linkActive
        self.linkButtonHover = linkButtonHover
        self.linkButtonFocus = linkButtonFocus
        self.linkButtonActive = linkButtonActive
    }
    
    private enum CodingKeys: String, CodingKey {
        case button = "button"
        case buttonHover = "button:hover"
        case buttonFocus = "button:focus"
        case buttonActive = "button:active"
        case input = "input"
        case inputHover = "input:hover"
        case inputFocus = "input:focus"
        case inputActive = "input:active"
        case pinInput = "pinInput"
        case pinInputHover = "pinInput:hover"
        case pinInputFocus = "pinInput:focus"
        case pinInputActive = "pinInput:active"
        case label = "label"
        case hint = "hint"
        case link = "link"
        case linkButton = "linkButton"
        case linkHover = "link:hover"
        case linkActive = "link:active"
        case linkButtonHover = "linkButton:hover"
        case linkButtonFocus = "linkButton:focus"
        case linkButtonActive = "linkButton:active"
    }
    
    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encodeIfPresent(self.button, forKey: .button)
        try container.encodeIfPresent(self.buttonHover, forKey: .buttonHover)
        try container.encodeIfPresent(self.buttonFocus, forKey: .buttonFocus)
        try container.encodeIfPresent(self.buttonActive, forKey: .buttonActive)
        try container.encodeIfPresent(self.input, forKey: .input)
        try container.encodeIfPresent(self.inputHover, forKey: .inputHover)
        try container.encodeIfPresent(self.inputFocus, forKey: .inputFocus)
        try container.encodeIfPresent(self.inputActive, forKey: .inputActive)
        try container.encodeIfPresent(self.pinInput, forKey: .pinInput)
        try container.encodeIfPresent(self.pinInputHover, forKey: .pinInputHover)
        try container.encodeIfPresent(self.pinInputFocus, forKey: .pinInputFocus)
        try container.encodeIfPresent(self.pinInputActive, forKey: .pinInputActive)
        try container.encodeIfPresent(self.label, forKey: .label)
        try container.encodeIfPresent(self.hint, forKey: .hint)
        try container.encodeIfPresent(self.link, forKey: .link)
        try container.encodeIfPresent(self.linkButton, forKey: .linkButton)
        try container.encodeIfPresent(self.linkHover, forKey: .linkHover)
        try container.encodeIfPresent(self.linkActive, forKey: .linkActive)
        try container.encodeIfPresent(self.linkButtonHover, forKey: .linkButtonHover)
        try container.encodeIfPresent(self.linkButtonFocus, forKey: .linkButtonFocus)
        try container.encodeIfPresent(self.linkButtonActive, forKey: .linkButtonActive)
    }
}
