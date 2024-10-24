import Foundation

public struct FootprintAppearanceVariables: Codable {
    // globals
    public var borderRadius: String?
    public var colorError: String?
    public var colorWarning: String?
    public var colorSuccess: String?
    public var colorAccent: String?
    public var borderColorError: String?
    
    // container
    public var containerBg: String?
    public var containerElevation: String?
    public var containerBorder: String?
    public var containerBorderRadius: String?
    
    // link
    public var linkColor: String?
    
    // typography
    public var fontFamily: String?
    
    // label
    public var labelColor: String?
    public var labelFont: String?
    
    // input
    public var inputBorderRadius: String?
    public var inputBorderWidth: String?
    public var inputFont: String?
    public var inputHeight: String?
    public var inputPlaceholderColor: String?
    public var inputColor: String?
    public var inputBg: String?
    public var inputBorderColor: String?
    public var inputElevation: String?
    public var inputHoverBg: String?
    public var inputHoverBorderColor: String?
    public var inputHoverElevation: String?
    public var inputFocusBg: String?
    public var inputFocusBorderColor: String?
    public var inputFocusElevation: String?
    public var inputErrorBg: String?
    public var inputErrorBorderColor: String?
    public var inputErrorElevation: String?
    public var inputErrorHoverBg: String?
    public var inputErrorHoverBorderColor: String?
    public var inputErrorHoverElevation: String?
    public var inputErrorFocusBg: String?
    public var inputErrorFocusBorderColor: String?
    public var inputErrorFocusElevation: String?
    
    // hint
    public var hintColor: String?
    public var hintErrorColor: String?
    public var hintFont: String?
    
    // link button
    public var linkButtonColor: String?
    public var linkButtonHoverColor: String?
    public var linkButtonActiveColor: String?
    public var linkButtonDestructiveColor: String?
    public var linkButtonDestructiveHoverColor: String?
    public var linkButtonDestructiveActiveColor: String?
    
    // button
    public var buttonBorderRadius: String?
    public var buttonBorderWidth: String?
    public var buttonElevation: String?
    public var buttonElevationHover: String?
    public var buttonElevationActive: String?
    public var buttonOutlineOffset: String?
    public var buttonPrimaryBg: String?
    public var buttonPrimaryColor: String?
    public var buttonPrimaryBorderColor: String?
    public var buttonPrimaryHoverBg: String?
    public var buttonPrimaryHoverColor: String?
    public var buttonPrimaryHoverBorderColor: String?
    public var buttonPrimaryActiveBg: String?
    public var buttonPrimaryActiveColor: String?
    public var buttonPrimaryActiveBorderColor: String?
    public var buttonPrimaryDisabledBg: String?
    public var buttonPrimaryDisabledColor: String?
    public var buttonPrimaryDisabledBorderColor: String?
    public var buttonPrimaryLoadingBg: String?
    public var buttonPrimaryLoadingColor: String?
    public var buttonsPrimaryLoadingBorderColor: String?
    public var buttonSecondaryBg: String?
    public var buttonSecondaryColor: String?
    public var buttonSecondaryBorderColor: String?
    public var buttonSecondaryHoverBg: String?
    public var buttonSecondaryHoverColor: String?
    public var buttonSecondaryHoverBorderColor: String?
    public var buttonSecondaryActiveBg: String?
    public var buttonSecondaryActiveColor: String?
    public var buttonSecondaryActiveBorderColor: String?
    public var buttonSecondaryDisabledBg: String?
    public var buttonSecondaryDisabledColor: String?
    public var buttonSecondaryDisabledBorderColor: String?
    public var buttonSecondaryLoadingBg: String?
    public var buttonSecondaryLoadingColor: String?
    
    // Dropdown
    public var dropdownBg: String?
    public var dropdownHoverBg: String?
    public var dropdownBorderColor: String?
    public var dropdownBorderWidth: String?
    public var dropdownBorderRadius: String?
    public var dropdownElevation: String?
    public var dropdownColorPrimary: String?
    public var dropdownColorSecondary: String?
    public var dropdownFooterBg: String?
    
    // Radio select
    public var radioSelectBg: String?
    public var radioSelectColor: String?
    public var radioSelectHoverColor: String?
    public var radioSelectSelectedColor: String?
    public var radioSelectBorderRadius: String?
    public var radioSelectBorderWidth: String?
    public var radioSelectBorderColor: String?
    public var radioSelectHoverBg: String?
    public var radioSelectHoverBorderColor: String?
    public var radioSelectSelectedBg: String?
    public var radioSelectSelectedBorderColor: String?
    public var radioSelectComponentsIconBg: String?
    public var radioSelectComponentsIconHoverBg: String?
    public var radioSelectComponentsIconSelectedBg: String?
    
    public init(borderRadius: String? = nil,
                colorError: String? = nil,
                colorWarning: String? = nil,
                colorSuccess: String? = nil,
                colorAccent: String? = nil,
                borderColorError: String? = nil,
                containerBg: String? = nil,
                containerElevation: String? = nil,
                containerBorder: String? = nil,
                containerBorderRadius: String? = nil,
                linkColor: String? = nil,
                fontFamily: String? = nil,
                labelColor: String? = nil,
                labelFont: String? = nil,
                inputBorderRadius: String? = nil,
                inputBorderWidth: String? = nil,
                inputFont: String? = nil,
                inputHeight: String? = nil,
                inputPlaceholderColor: String? = nil,
                inputColor: String? = nil,
                inputBg: String? = nil,
                inputBorderColor: String? = nil,
                inputElevation: String? = nil,
                inputHoverBg: String? = nil,
                inputHoverBorderColor: String? = nil,
                inputHoverElevation: String? = nil,
                inputFocusBg: String? = nil,
                inputFocusBorderColor: String? = nil,
                inputFocusElevation: String? = nil,
                inputErrorBg: String? = nil,
                inputErrorBorderColor: String? = nil,
                inputErrorElevation: String? = nil,
                inputErrorHoverBg: String? = nil,
                inputErrorHoverBorderColor: String? = nil,
                inputErrorHoverElevation: String? = nil,
                inputErrorFocusBg: String? = nil,
                inputErrorFocusBorderColor: String? = nil,
                inputErrorFocusElevation: String? = nil,
                hintColor: String? = nil,
                hintErrorColor: String? = nil,
                hintFont: String? = nil,
                linkButtonColor: String? = nil,
                linkButtonHoverColor: String? = nil,
                linkButtonActiveColor: String? = nil,
                linkButtonDestructiveColor: String? = nil,
                linkButtonDestructiveHoverColor: String? = nil,
                linkButtonDestructiveActiveColor: String? = nil,
                buttonBorderRadius: String? = nil,
                buttonBorderWidth: String? = nil,
                buttonElevation: String? = nil,
                buttonElevationHover: String? = nil,
                buttonElevationActive: String? = nil,
                buttonOutlineOffset: String? = nil,
                buttonPrimaryBg: String? = nil,
                buttonPrimaryColor: String? = nil,
                buttonPrimaryBorderColor: String? = nil,
                buttonPrimaryHoverBg: String? = nil,
                buttonPrimaryHoverColor: String? = nil,
                buttonPrimaryHoverBorderColor: String? = nil,
                buttonPrimaryActiveBg: String? = nil,
                buttonPrimaryActiveColor: String? = nil,
                buttonPrimaryActiveBorderColor: String? = nil,
                buttonPrimaryDisabledBg: String? = nil,
                buttonPrimaryDisabledColor: String? = nil,
                buttonPrimaryDisabledBorderColor: String? = nil,
                buttonPrimaryLoadingBg: String? = nil,
                buttonPrimaryLoadingColor: String? = nil,
                buttonsPrimaryLoadingBorderColor: String? = nil,
                buttonSecondaryBg: String? = nil,
                buttonSecondaryColor: String? = nil,
                buttonSecondaryBorderColor: String? = nil,
                buttonSecondaryHoverBg: String? = nil,
                buttonSecondaryHoverColor: String? = nil,
                buttonSecondaryHoverBorderColor: String? = nil,
                buttonSecondaryActiveBg: String? = nil,
                buttonSecondaryActiveColor: String? = nil,
                buttonSecondaryActiveBorderColor: String? = nil,
                buttonSecondaryDisabledBg: String? = nil,
                buttonSecondaryDisabledColor: String? = nil,
                buttonSecondaryDisabledBorderColor: String? = nil,
                buttonSecondaryLoadingBg: String? = nil,
                buttonSecondaryLoadingColor: String? = nil,
                dropdownBg: String? = nil,
                dropdownHoverBg: String? = nil,
                dropdownBorderColor: String? = nil,
                dropdownBorderWidth: String? = nil,
                dropdownBorderRadius: String? = nil,
                dropdownElevation: String? = nil,
                dropdownColorPrimary: String? = nil,
                dropdownColorSecondary: String? = nil,
                dropdownFooterBg: String? = nil,
                radioSelectBg: String? = nil,
                radioSelectColor: String? = nil,
                radioSelectHoverColor: String? = nil,
                radioSelectSelectedColor: String? = nil,
                radioSelectBorderRadius: String? = nil,
                radioSelectBorderWidth: String? = nil,
                radioSelectBorderColor: String? = nil,
                radioSelectHoverBg: String? = nil,
                radioSelectHoverBorderColor: String? = nil,
                radioSelectSelectedBg: String? = nil,
                radioSelectSelectedBorderColor: String? = nil,
                radioSelectComponentsIconBg: String? = nil,
                radioSelectComponentsIconHoverBg: String? = nil,
                radioSelectComponentsIconSelectedBg: String? = nil)
    {
        self.borderRadius = borderRadius
        self.colorError = colorError
        self.colorWarning = colorWarning
        self.colorSuccess = colorSuccess
        self.colorAccent = colorAccent
        self.borderColorError = borderColorError
        self.containerBg = containerBg
        self.containerElevation = containerElevation
        self.containerBorder = containerBorder
        self.containerBorderRadius = containerBorderRadius
        self.linkColor = linkColor
        self.fontFamily = fontFamily
        self.labelColor = labelColor
        self.labelFont = labelFont
        self.inputBorderRadius = inputBorderRadius
        self.inputBorderWidth = inputBorderWidth
        self.inputFont = inputFont
        self.inputHeight = inputHeight
        self.inputPlaceholderColor = inputPlaceholderColor
        self.inputColor = inputColor
        self.inputBg = inputBg
        self.inputBorderColor = inputBorderColor
        self.inputElevation = inputElevation
        self.inputHoverBg = inputHoverBg
        self.inputHoverBorderColor = inputHoverBorderColor
        self.inputHoverElevation = inputHoverElevation
        self.inputFocusBg = inputFocusBg
        self.inputFocusBorderColor = inputFocusBorderColor
        self.inputFocusElevation = inputFocusElevation
        self.inputErrorBg = inputErrorBg
        self.inputErrorBorderColor = inputErrorBorderColor
        self.inputErrorElevation = inputErrorElevation
        self.inputErrorHoverBg = inputErrorHoverBg
        self.inputErrorHoverBorderColor = inputErrorHoverBorderColor
        self.inputErrorHoverElevation = inputErrorHoverElevation
        self.inputErrorFocusBg = inputErrorFocusBg
        self.inputErrorFocusBorderColor = inputErrorFocusBorderColor
        self.inputErrorFocusElevation = inputErrorFocusElevation
        self.hintColor = hintColor
        self.hintErrorColor = hintErrorColor
        self.hintFont = hintFont
        self.linkButtonColor = linkButtonColor
        self.linkButtonHoverColor = linkButtonHoverColor
        self.linkButtonActiveColor = linkButtonActiveColor
        self.linkButtonDestructiveColor = linkButtonDestructiveColor
        self.linkButtonDestructiveHoverColor = linkButtonDestructiveHoverColor
        self.linkButtonDestructiveActiveColor = linkButtonDestructiveActiveColor
        self.buttonBorderRadius = buttonBorderRadius
        self.buttonBorderWidth = buttonBorderWidth
        self.buttonElevation = buttonElevation
        self.buttonElevationHover = buttonElevationHover
        self.buttonElevationActive = buttonElevationActive
        self.buttonOutlineOffset = buttonOutlineOffset
        self.buttonPrimaryBg = buttonPrimaryBg
        self.buttonPrimaryColor = buttonPrimaryColor
        self.buttonPrimaryBorderColor = buttonPrimaryBorderColor
        self.buttonPrimaryHoverBg = buttonPrimaryHoverBg
        self.buttonPrimaryHoverColor = buttonPrimaryHoverColor
        self.buttonPrimaryHoverBorderColor = buttonPrimaryHoverBorderColor
        self.buttonPrimaryActiveBg = buttonPrimaryActiveBg
        self.buttonPrimaryActiveColor = buttonPrimaryActiveColor
        self.buttonPrimaryActiveBorderColor = buttonPrimaryActiveBorderColor
        self.buttonPrimaryDisabledBg = buttonPrimaryDisabledBg
        self.buttonPrimaryDisabledColor = buttonPrimaryDisabledColor
        self.buttonPrimaryDisabledBorderColor = buttonPrimaryDisabledBorderColor
        self.buttonPrimaryLoadingBg = buttonPrimaryLoadingBg
        self.buttonPrimaryLoadingColor = buttonPrimaryLoadingColor
        self.buttonsPrimaryLoadingBorderColor = buttonsPrimaryLoadingBorderColor
        self.buttonSecondaryBg = buttonSecondaryBg
        self.buttonSecondaryColor = buttonSecondaryColor
        self.buttonSecondaryBorderColor = buttonSecondaryBorderColor
        self.buttonSecondaryHoverBg = buttonSecondaryHoverBg
        self.buttonSecondaryHoverColor = buttonSecondaryHoverColor
        self.buttonSecondaryHoverBorderColor = buttonSecondaryHoverBorderColor
        self.buttonSecondaryActiveBg = buttonSecondaryActiveBg
        self.buttonSecondaryActiveColor = buttonSecondaryActiveColor
        self.buttonSecondaryActiveBorderColor = buttonSecondaryActiveBorderColor
        self.buttonSecondaryDisabledBg = buttonSecondaryDisabledBg
        self.buttonSecondaryDisabledColor = buttonSecondaryDisabledColor
        self.buttonSecondaryDisabledBorderColor = buttonSecondaryDisabledBorderColor
        self.buttonSecondaryLoadingBg = buttonSecondaryLoadingBg
        self.buttonSecondaryLoadingColor = buttonSecondaryLoadingColor
        self.dropdownBg = dropdownBg
        self.dropdownHoverBg = dropdownHoverBg
        self.dropdownBorderColor = dropdownBorderColor
        self.dropdownBorderWidth = dropdownBorderWidth
        self.dropdownBorderRadius = dropdownBorderRadius
        self.dropdownElevation = dropdownElevation
        self.dropdownColorPrimary = dropdownColorPrimary
        self.dropdownColorSecondary = dropdownColorSecondary
        self.dropdownFooterBg = dropdownFooterBg
        self.radioSelectBg = radioSelectBg
        self.radioSelectColor = radioSelectColor
        self.radioSelectHoverColor = radioSelectHoverColor
        self.radioSelectSelectedColor = radioSelectSelectedColor
        self.radioSelectBorderRadius = radioSelectBorderRadius
        self.radioSelectBorderWidth = radioSelectBorderWidth
        self.radioSelectBorderColor = radioSelectBorderColor
        self.radioSelectHoverBg = radioSelectHoverBg
        self.radioSelectHoverBorderColor = radioSelectHoverBorderColor
        self.radioSelectSelectedBg = radioSelectSelectedBg
        self.radioSelectSelectedBorderColor = radioSelectSelectedBorderColor
        self.radioSelectComponentsIconBg = radioSelectComponentsIconBg
        self.radioSelectComponentsIconHoverBg = radioSelectComponentsIconHoverBg
        self.radioSelectComponentsIconSelectedBg = radioSelectComponentsIconSelectedBg
    }
    
    private enum CodingKeys: String, CodingKey {
        case borderRadius
        case colorError
        case colorWarning
        case colorSuccess
        case colorAccent
        case borderColorError
        case containerBg
        case containerElevation
        case containerBorder
        case containerBorderRadius
        case linkColor
        case fontFamily
        case labelColor
        case labelFont
        case inputBorderRadius
        case inputBorderWidth
        case inputFont
        case inputHeight
        case inputPlaceholderColor
        case inputColor
        case inputBg
        case inputBorderColor
        case inputElevation
        case inputHoverBg
        case inputHoverBorderColor
        case inputHoverElevation
        case inputFocusBg
        case inputFocusBorderColor
        case inputFocusElevation
        case inputErrorBg
        case inputErrorBorderColor
        case inputErrorElevation
        case inputErrorHoverBg
        case inputErrorHoverBorderColor
        case inputErrorHoverElevation
        case inputErrorFocusBg
        case inputErrorFocusBorderColor
        case inputErrorFocusElevation
        case hintColor
        case hintErrorColor
        case hintFont
        case linkButtonColor
        case linkButtonHoverColor
        case linkButtonActiveColor
        case linkButtonDestructiveColor
        case linkButtonDestructiveHoverColor
        case linkButtonDestructiveActiveColor
        case buttonBorderRadius
        case buttonBorderWidth
        case buttonElevation
        case buttonElevationHover
        case buttonElevationActive
        case buttonOutlineOffset
        case buttonPrimaryBg
        case buttonPrimaryColor
        case buttonPrimaryBorderColor
        case buttonPrimaryHoverBg
        case buttonPrimaryHoverColor
        case buttonPrimaryHoverBorderColor
        case buttonPrimaryActiveBg
        case buttonPrimaryActiveColor
        case buttonPrimaryActiveBorderColor
        case buttonPrimaryDisabledBg
        case buttonPrimaryDisabledColor
        case buttonPrimaryDisabledBorderColor
        case buttonPrimaryLoadingBg
        case buttonPrimaryLoadingColor
        case buttonsPrimaryLoadingBorderColor
        case buttonSecondaryBg
        case buttonSecondaryColor
        case buttonSecondaryBorderColor
        case buttonSecondaryHoverBg
        case buttonSecondaryHoverColor
        case buttonSecondaryHoverBorderColor
        case buttonSecondaryActiveBg
        case buttonSecondaryActiveColor
        case buttonSecondaryActiveBorderColor
        case buttonSecondaryDisabledBg
        case buttonSecondaryDisabledColor
        case buttonSecondaryDisabledBorderColor
        case buttonSecondaryLoadingBg
        case buttonSecondaryLoadingColor
        case dropdownBg
        case dropdownHoverBg
        case dropdownBorderColor
        case dropdownBorderWidth
        case dropdownBorderRadius
        case dropdownElevation
        case dropdownColorPrimary
        case dropdownColorSecondary
        case dropdownFooterBg
        case radioSelectBg
        case radioSelectColor
        case radioSelectHoverColor
        case radioSelectSelectedColor
        case radioSelectBorderRadius
        case radioSelectBorderWidth
        case radioSelectBorderColor
        case radioSelectHoverBg
        case radioSelectHoverBorderColor
        case radioSelectSelectedBg
        case radioSelectSelectedBorderColor
        case radioSelectComponentsIconBg
        case radioSelectComponentsIconHoverBg
        case radioSelectComponentsIconSelectedBg
    }
    
    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encodeIfPresent(self.borderRadius, forKey: .borderRadius)
        try container.encodeIfPresent(self.colorError, forKey: .colorError)
        try container.encodeIfPresent(self.colorWarning, forKey: .colorWarning)
        try container.encodeIfPresent(self.colorSuccess, forKey: .colorSuccess)
        try container.encodeIfPresent(self.colorAccent, forKey: .colorAccent)
        try container.encodeIfPresent(self.borderColorError, forKey: .borderColorError)
        try container.encodeIfPresent(self.containerBg, forKey: .containerBg)
        try container.encodeIfPresent(self.containerElevation, forKey: .containerElevation)
        try container.encodeIfPresent(self.containerBorder, forKey: .containerBorder)
        try container.encodeIfPresent(self.containerBorderRadius, forKey: .containerBorderRadius)
        try container.encodeIfPresent(self.linkColor, forKey: .linkColor)
        try container.encodeIfPresent(self.fontFamily, forKey: .fontFamily)
        try container.encodeIfPresent(self.labelColor, forKey: .labelColor)
        try container.encodeIfPresent(self.labelFont, forKey: .labelFont)
        try container.encodeIfPresent(self.inputBorderRadius, forKey: .inputBorderRadius)
        try container.encodeIfPresent(self.inputBorderWidth, forKey: .inputBorderWidth)
        try container.encodeIfPresent(self.inputFont, forKey: .inputFont)
        try container.encodeIfPresent(self.inputHeight, forKey: .inputHeight)
        try container.encodeIfPresent(self.inputPlaceholderColor, forKey: .inputPlaceholderColor)
        try container.encodeIfPresent(self.inputColor, forKey: .inputColor)
        try container.encodeIfPresent(self.inputBg, forKey: .inputBg)
        try container.encodeIfPresent(self.inputBorderColor, forKey: .inputBorderColor)
        try container.encodeIfPresent(self.inputElevation, forKey: .inputElevation)
        try container.encodeIfPresent(self.inputHoverBg, forKey: .inputHoverBg)
        try container.encodeIfPresent(self.inputHoverBorderColor, forKey: .inputHoverBorderColor)
        try container.encodeIfPresent(self.inputHoverElevation, forKey: .inputHoverElevation)
        try container.encodeIfPresent(self.inputFocusBg, forKey: .inputFocusBg)
        try container.encodeIfPresent(self.inputFocusBorderColor, forKey: .inputFocusBorderColor)
        try container.encodeIfPresent(self.inputFocusElevation, forKey: .inputFocusElevation)
        try container.encodeIfPresent(self.inputErrorBg, forKey: .inputErrorBg)
        try container.encodeIfPresent(self.inputErrorBorderColor, forKey: .inputErrorBorderColor)
        try container.encodeIfPresent(self.inputErrorElevation, forKey: .inputErrorElevation)
        try container.encodeIfPresent(self.inputErrorHoverBg, forKey: .inputErrorHoverBg)
        try container.encodeIfPresent(self.inputErrorHoverBorderColor, forKey: .inputErrorHoverBorderColor)
        try container.encodeIfPresent(self.inputErrorHoverElevation, forKey: .inputErrorHoverElevation)
        try container.encodeIfPresent(self.inputErrorFocusBg, forKey: .inputErrorFocusBg)
        try container.encodeIfPresent(self.inputErrorFocusBorderColor, forKey: .inputErrorFocusBorderColor)
        try container.encodeIfPresent(self.inputErrorFocusElevation, forKey: .inputErrorFocusElevation)
        try container.encodeIfPresent(self.hintColor, forKey: .hintColor)
        try container.encodeIfPresent(self.hintErrorColor, forKey: .hintErrorColor)
        try container.encodeIfPresent(self.hintFont, forKey: .hintFont)
        try container.encodeIfPresent(self.linkButtonColor, forKey: .linkButtonColor)
        try container.encodeIfPresent(self.linkButtonHoverColor, forKey: .linkButtonHoverColor)
        try container.encodeIfPresent(self.linkButtonActiveColor, forKey: .linkButtonActiveColor)
        try container.encodeIfPresent(self.linkButtonDestructiveColor, forKey: .linkButtonDestructiveColor)
        try container.encodeIfPresent(self.linkButtonDestructiveHoverColor, forKey: .linkButtonDestructiveHoverColor)
        try container.encodeIfPresent(self.linkButtonDestructiveActiveColor, forKey: .linkButtonDestructiveActiveColor)
        try container.encodeIfPresent(self.buttonBorderRadius, forKey: .buttonBorderRadius)
        try container.encodeIfPresent(self.buttonBorderWidth, forKey: .buttonBorderWidth)
        try container.encodeIfPresent(self.buttonElevation, forKey: .buttonElevation)
        try container.encodeIfPresent(self.buttonElevationHover, forKey: .buttonElevationHover)
        try container.encodeIfPresent(self.buttonElevationActive, forKey: .buttonElevationActive)
        try container.encodeIfPresent(self.buttonOutlineOffset, forKey: .buttonOutlineOffset)
        try container.encodeIfPresent(self.buttonPrimaryBg, forKey: .buttonPrimaryBg)
        try container.encodeIfPresent(self.buttonPrimaryColor, forKey: .buttonPrimaryColor)
        try container.encodeIfPresent(self.buttonPrimaryBorderColor, forKey: .buttonPrimaryBorderColor)
        try container.encodeIfPresent(self.buttonPrimaryHoverBg, forKey: .buttonPrimaryHoverBg)
        try container.encodeIfPresent(self.buttonPrimaryHoverColor, forKey: .buttonPrimaryHoverColor)
        try container.encodeIfPresent(self.buttonPrimaryHoverBorderColor, forKey: .buttonPrimaryHoverBorderColor)
        try container.encodeIfPresent(self.buttonPrimaryActiveBg, forKey: .buttonPrimaryActiveBg)
        try container.encodeIfPresent(self.buttonPrimaryActiveColor, forKey: .buttonPrimaryActiveColor)
        try container.encodeIfPresent(self.buttonPrimaryActiveBorderColor, forKey: .buttonPrimaryActiveBorderColor)
        try container.encodeIfPresent(self.buttonPrimaryDisabledBg, forKey: .buttonPrimaryDisabledBg)
        try container.encodeIfPresent(self.buttonPrimaryDisabledColor, forKey: .buttonPrimaryDisabledColor)
        try container.encodeIfPresent(self.buttonPrimaryDisabledBorderColor, forKey: .buttonPrimaryDisabledBorderColor)
        try container.encodeIfPresent(self.buttonPrimaryLoadingBg, forKey: .buttonPrimaryLoadingBg)
        try container.encodeIfPresent(self.buttonPrimaryLoadingColor, forKey: .buttonPrimaryLoadingColor)
        try container.encodeIfPresent(self.buttonsPrimaryLoadingBorderColor, forKey: .buttonsPrimaryLoadingBorderColor)
        try container.encodeIfPresent(self.buttonSecondaryBg, forKey: .buttonSecondaryBg)
        try container.encodeIfPresent(self.buttonSecondaryColor, forKey: .buttonSecondaryColor)
        try container.encodeIfPresent(self.buttonSecondaryBorderColor, forKey: .buttonSecondaryBorderColor)
        try container.encodeIfPresent(self.buttonSecondaryHoverBg, forKey: .buttonSecondaryHoverBg)
        try container.encodeIfPresent(self.buttonSecondaryHoverColor, forKey: .buttonSecondaryHoverColor)
        try container.encodeIfPresent(self.buttonSecondaryHoverBorderColor, forKey: .buttonSecondaryHoverBorderColor)
        try container.encodeIfPresent(self.buttonSecondaryActiveBg, forKey: .buttonSecondaryActiveBg)
        try container.encodeIfPresent(self.buttonSecondaryActiveColor, forKey: .buttonSecondaryActiveColor)
        try container.encodeIfPresent(self.buttonSecondaryActiveBorderColor, forKey: .buttonSecondaryActiveBorderColor)
        try container.encodeIfPresent(self.buttonSecondaryDisabledBg, forKey: .buttonSecondaryDisabledBg)
        try container.encodeIfPresent(self.buttonSecondaryDisabledColor, forKey: .buttonSecondaryDisabledColor)
        try container.encodeIfPresent(self.buttonSecondaryDisabledBorderColor, forKey: .buttonSecondaryDisabledBorderColor)
        try container.encodeIfPresent(self.buttonSecondaryLoadingBg, forKey: .buttonSecondaryLoadingBg)
        try container.encodeIfPresent(self.buttonSecondaryLoadingColor, forKey: .buttonSecondaryLoadingColor)
        try container.encodeIfPresent(self.dropdownBg, forKey: .dropdownBg)
        try container.encodeIfPresent(self.dropdownHoverBg, forKey: .dropdownHoverBg)
        try container.encodeIfPresent(self.dropdownBorderColor, forKey: .dropdownBorderColor)
        try container.encodeIfPresent(self.dropdownBorderWidth, forKey: .dropdownBorderWidth)
        try container.encodeIfPresent(self.dropdownBorderRadius, forKey: .dropdownBorderRadius)
        try container.encodeIfPresent(self.dropdownElevation, forKey: .dropdownElevation)
        try container.encodeIfPresent(self.dropdownColorPrimary, forKey: .dropdownColorPrimary)
        try container.encodeIfPresent(self.dropdownColorSecondary, forKey: .dropdownColorSecondary)
        try container.encodeIfPresent(self.dropdownFooterBg, forKey: .dropdownFooterBg)
        try container.encodeIfPresent(self.radioSelectBg, forKey: .radioSelectBg)
        try container.encodeIfPresent(self.radioSelectColor, forKey: .radioSelectColor)
        try container.encodeIfPresent(self.radioSelectHoverColor, forKey: .radioSelectHoverColor)
        try container.encodeIfPresent(self.radioSelectSelectedColor, forKey: .radioSelectSelectedColor)
        try container.encodeIfPresent(self.radioSelectBorderRadius, forKey: .radioSelectBorderRadius)
        try container.encodeIfPresent(self.radioSelectBorderWidth, forKey: .radioSelectBorderWidth)
        try container.encodeIfPresent(self.radioSelectBorderColor, forKey: .radioSelectBorderColor)
        try container.encodeIfPresent(self.radioSelectHoverBg, forKey: .radioSelectHoverBg)
        try container.encodeIfPresent(self.radioSelectHoverBorderColor, forKey: .radioSelectHoverBorderColor)
        try container.encodeIfPresent(self.radioSelectSelectedBg, forKey: .radioSelectSelectedBg)
        try container.encodeIfPresent(self.radioSelectSelectedBorderColor, forKey: .radioSelectSelectedBorderColor)
        try container.encodeIfPresent(self.radioSelectComponentsIconBg, forKey: .radioSelectComponentsIconBg)
        try container.encodeIfPresent(self.radioSelectComponentsIconHoverBg, forKey: .radioSelectComponentsIconHoverBg)
        try container.encodeIfPresent(self.radioSelectComponentsIconSelectedBg, forKey: .radioSelectComponentsIconSelectedBg)
    }
}
