import * as CSS from 'csstype';

type AppearanceVariables = Partial<{
    borderRadius: CSS.Property.BorderRadius;
    colorError: CSS.Property.Color;
    colorWarning: CSS.Property.Color;
    colorSuccess: CSS.Property.Color;
    colorAccent: CSS.Property.Color;
    borderColorError: CSS.Property.BorderColor;
    containerBg: CSS.Property.Background;
    containerElevation: CSS.Property.BoxShadow;
    containerBorder: CSS.Property.Border;
    containerBorderRadius: CSS.Property.BorderRadius;
    containerWidth: CSS.Property.Width;
    linkColor: CSS.Property.Color;
    fontFamily: CSS.Property.FontFamily;
    labelColor: CSS.Property.Color;
    labelFont: CSS.Property.Font;
    inputBorderRadius: CSS.Property.BorderRadius;
    inputBorderWidth: CSS.Property.BorderWidth;
    inputFont: CSS.Property.Font;
    inputHeight: CSS.Property.Height;
    inputPlaceholderColor: CSS.Property.Color;
    inputColor: CSS.Property.Color;
    inputBg: CSS.Property.Background;
    inputBorderColor: CSS.Property.BorderColor;
    inputElevation: CSS.Property.BoxShadow;
    inputHoverBg: CSS.Property.Background;
    inputHoverBorderColor: CSS.Property.BorderColor;
    inputHoverElevation: CSS.Property.BoxShadow;
    inputFocusBg: CSS.Property.Background;
    inputFocusBorderColor: CSS.Property.BorderColor;
    inputFocusElevation: CSS.Property.BoxShadow;
    inputErrorBg: CSS.Property.Background;
    inputErrorBorderColor: CSS.Property.BorderColor;
    inputErrorElevation: CSS.Property.BoxShadow;
    inputErrorHoverBg: CSS.Property.Background;
    inputErrorHoverBorderColor: CSS.Property.BorderColor;
    inputErrorHoverElevation: CSS.Property.BoxShadow;
    inputErrorFocusBg: CSS.Property.Background;
    inputErrorFocusBorderColor: CSS.Property.BorderColor;
    inputErrorFocusElevation: CSS.Property.BoxShadow;
    hintColor: CSS.Property.Color;
    hintErrorColor: CSS.Property.Color;
    hintFont: CSS.Property.Font;
    linkButtonColor: CSS.Property.Color;
    linkButtonHoverColor: CSS.Property.Color;
    linkButtonActiveColor: CSS.Property.Color;
    linkButtonDestructiveColor: CSS.Property.Color;
    linkButtonDestructiveHoverColor: CSS.Property.Color;
    linkButtonDestructiveActiveColor: CSS.Property.Color;
    buttonBorderRadius: CSS.Property.BorderRadius;
    buttonBorderWidth: CSS.Property.BorderWidth;
    buttonElevation: CSS.Property.BoxShadow;
    buttonElevationHover: CSS.Property.BoxShadow;
    buttonElevationActive: CSS.Property.BoxShadow;
    buttonOutlineOffset: CSS.Property.OutlineOffset;
    buttonPrimaryBg: CSS.Property.Background;
    buttonPrimaryColor: CSS.Property.Color;
    buttonPrimaryBorderColor: CSS.Property.BorderColor;
    buttonPrimaryHoverBg: CSS.Property.Background;
    buttonPrimaryHoverColor: CSS.Property.Color;
    buttonPrimaryHoverBorderColor: CSS.Property.BorderColor;
    buttonPrimaryActiveBg: CSS.Property.Background;
    buttonPrimaryActiveColor: CSS.Property.Color;
    buttonPrimaryActiveBorderColor: CSS.Property.BorderColor;
    buttonPrimaryDisabledBg: CSS.Property.Background;
    buttonPrimaryDisabledColor: CSS.Property.Color;
    buttonPrimaryDisabledBorderColor: CSS.Property.BorderColor;
    buttonPrimaryLoadingBg: CSS.Property.Background;
    buttonPrimaryLoadingColor: CSS.Property.Color;
    buttonsPrimaryLoadingBorderColor: CSS.Property.BorderColor;
    buttonSecondaryBg: CSS.Property.Background;
    buttonSecondaryColor: CSS.Property.Color;
    buttonSecondaryBorderColor: CSS.Property.BorderColor;
    buttonSecondaryHoverBg: CSS.Property.Background;
    buttonSecondaryHoverColor: CSS.Property.Color;
    buttonSecondaryHoverBorderColor: CSS.Property.BorderColor;
    buttonSecondaryActiveBg: CSS.Property.Background;
    buttonSecondaryActiveColor: CSS.Property.Color;
    buttonSecondaryActiveBorderColor: CSS.Property.BorderColor;
    buttonSecondaryDisabledBg: CSS.Property.Background;
    buttonSecondaryDisabledColor: CSS.Property.Color;
    buttonSecondaryDisabledBorderColor: CSS.Property.BorderColor;
    buttonSecondaryLoadingBg: CSS.Property.Background;
    buttonSecondaryLoadingColor: CSS.Property.Color;
    dropdownBg: CSS.Property.Background;
    dropdownHoverBg: CSS.Property.Background;
    dropdownBorderColor: CSS.Property.BorderColor;
    dropdownBorderWidth: CSS.Property.BorderWidth;
    dropdownBorderRadius: CSS.Property.BorderRadius;
    dropdownElevation: CSS.Property.BoxShadow;
    dropdownColorPrimary: CSS.Property.Color;
    dropdownColorSecondary: CSS.Property.Color;
    dropdownFooterBg: CSS.Property.Background;
    radioSelectBg: CSS.Property.Background;
    radioSelectColor: CSS.Property.Color;
    radioSelectHoverColor: CSS.Property.Color;
    radioSelectSelectedColor: CSS.Property.Color;
    radioSelectBorderRadius: CSS.Property.BorderRadius;
    radioSelectBorderWidth: CSS.Property.BorderWidth;
    radioSelectBorderColor: CSS.Property.BorderColor;
    radioSelectHoverBg: CSS.Property.Background;
    radioSelectHoverBorderColor: CSS.Property.BorderColor;
    radioSelectSelectedBg: CSS.Property.Background;
    radioSelectSelectedBorderColor: CSS.Property.BorderColor;
    radioSelectComponentsIconBg: CSS.Property.Background;
    radioSelectComponentsIconHoverBg: CSS.Property.Background;
    radioSelectComponentsIconSelectedBg: CSS.Property.Background;
}>;
type AppearanceRules = Partial<{
    button: CSS.Properties;
    'button:hover': CSS.Properties;
    'button:focus': CSS.Properties;
    'button:active': CSS.Properties;
    input: CSS.Properties;
    'input:hover': CSS.Properties;
    'input:focus': CSS.Properties;
    'input:active': CSS.Properties;
    pinInput: CSS.Properties;
    'pinInput:hover': CSS.Properties;
    'pinInput:focus': CSS.Properties;
    'pinInput:active': CSS.Properties;
    label: CSS.Properties;
    hint: CSS.Properties;
    link: CSS.Properties;
    'link:hover': CSS.Properties;
    'link:active': CSS.Properties;
    linkButton: CSS.Properties;
    'linkButton:hover': CSS.Properties;
    'linkButton:focus': CSS.Properties;
    'linkButton:active': CSS.Properties;
}>;
type Appearance = {
    variant?: 'modal' | 'drawer' | 'inline';
    fontSrc?: string;
    rules?: AppearanceRules;
    variables?: AppearanceVariables;
};

type CustomProps = {
    [key: `custom.${string}`]: string;
};
type IDProps = {
    'id.address_line1': string;
    'id.address_line2': string;
    'id.citizenships': string[];
    'id.city': string;
    'id.country': string;
    'id.dob': string;
    'id.drivers_license_number': string;
    'id.drivers_license_state': string;
    'id.email': string;
    'id.first_name': string;
    'id.itin': string;
    'id.last_name': string;
    'id.middle_name': string;
    'id.nationality': string;
    'id.phone_number': string;
    'id.ssn4': string;
    'id.ssn9': string;
    'id.state': string;
    'id.us_legal_status': string;
    'id.us_tax_id': string;
    'id.visa_expiration_date': string;
    'id.visa_kind': string;
    'id.zip': string;
};
type Business_BeneficialOwners = {
    email: string;
    first_name: string;
    last_name: string;
    ownership_stake: number;
    phone_number: string;
};
type BusinessProps = {
    'business.address_line1': string;
    'business.address_line2': string;
    'business.city': string;
    'business.corporation_type': string;
    'business.country': string;
    'business.dba': string;
    'business.name': string;
    'business.phone_number': string;
    'business.state': string;
    'business.tin': string;
    'business.website': string;
    'business.zip': string;
    'business.primary_owner_stake': number;
    'business.secondary_owners': Partial<Business_BeneficialOwners>[];
};
/** @deprecated: use BootstrapData instead */
type FootprintUserData = Partial<IDProps & CustomProps>;
type BootstrapData = Partial<IDProps & BusinessProps & CustomProps>;

declare enum ComponentKind {
    Auth = "auth",
    Components = "components",
    Form = "form",
    Render = "render",
    UpdateLoginMethods = "update_login_methods",
    Verify = "verify",
    VerifyButton = "verify-button"
}
type SupportedLocale = 'en-US' | 'es-MX';
type SupportedLanguage = 'en' | 'es';
type L10n = {
    locale?: SupportedLocale;
    language?: SupportedLanguage;
};
type Options = {
    showCompletionPage?: boolean;
    showLogo?: boolean;
};
type Variant = 'modal' | 'drawer' | 'inline';
type AdditionalComponentsSdkFunctionality = {
    relayFromComponents?: () => void;
};
type Component = {
    destroy: () => void;
    render: () => Promise<void>;
} & AdditionalComponentsSdkFunctionality;
type Footprint = {
    init: (props: Props) => Component;
};
type Props = AuthProps | FormProps | RenderProps | UpdateLoginMethodsProps | VerifyButtonProps | VerifyProps | ComponentsSdkProps;
type PropsBase = {
    readonly appearance?: Appearance;
    readonly containerId?: string;
    readonly kind: `${ComponentKind}`;
    readonly l10n?: L10n;
    readonly onError?: (error: string) => void;
    readonly variant?: Variant;
};
/** verify */
type VerifyAuthToken = {
    authToken: string;
    publicKey?: never;
};
type VerifyPublicKey = {
    publicKey: string;
    authToken?: never;
};
type VerifyVariant = 'modal' | 'drawer';
type BootstrapKeys = 'userData' | 'bootstrapData';
type VerifyDataKeys = BootstrapKeys | 'publicKey' | 'options' | 'authToken' | 'l10n';
type OverallOutcome = 'pass' | 'fail' | 'manual_review' | 'use_rules_outcome' | 'step_up';
type IdDocOutcome = 'pass' | 'fail' | 'real';
type SandboxOutcome = {
    readonly overallOutcome?: OverallOutcome;
    readonly documentOutcome?: IdDocOutcome;
};
type VerifyPropsBase<TAuth> = PropsBase & {
    readonly bootstrapData?: BootstrapData;
    readonly onAuth?: (validationToken: string) => void;
    readonly onCancel?: () => void;
    readonly onClose?: () => void;
    readonly onComplete?: (validationToken: string) => void;
    readonly options?: Options;
    readonly sandboxOutcome?: SandboxOutcome;
    readonly sandboxId?: string;
    /** @deprecated use bootstrapData instead */
    readonly userData?: FootprintUserData;
} & TAuth;
type VerifyProps = VerifyPropsBase<VerifyAuthToken | VerifyPublicKey> & {
    readonly kind: `${ComponentKind.Verify}`;
    readonly variant?: VerifyVariant;
};
type VerifyDataProps = Pick<VerifyProps, VerifyDataKeys> & {
    isComponentsSdk?: boolean;
    shouldRelayToComponents?: boolean;
    fixtureResult?: OverallOutcome;
    documentFixtureResult?: IdDocOutcome;
    sandboxId?: string;
};
/** Components SDK. Just a subset of Verify */
type ComponentsSdkProps = VerifyPropsBase<VerifyPublicKey | VerifyAuthToken> & {
    readonly onRelayToComponents?: (response: {
        authToken: string;
        vaultingToken: string;
    }) => void;
    readonly kind: `${ComponentKind.Components}`;
    readonly variant?: VerifyVariant;
    readonly shouldRelayToComponents?: boolean;
};
/** verify-button */
type VerifyButtonProps = VerifyPropsBase<VerifyAuthToken | VerifyPublicKey> & {
    readonly containerId: string;
    readonly dialogVariant?: VerifyVariant;
    readonly kind: `${ComponentKind.VerifyButton}`;
    readonly label?: string;
    readonly onClick?: () => void;
    readonly variant: 'inline';
};
type VerifyButtonDataProps = Pick<VerifyButtonProps, VerifyDataKeys | 'label'>;
/** render */
type RenderProps = PropsBase & {
    readonly authToken: string;
    readonly canCopy?: boolean;
    readonly containerId: string;
    readonly defaultHidden?: boolean;
    readonly id: string;
    readonly kind: `${ComponentKind.Render}`;
    readonly label?: string;
    readonly showHiddenToggle?: boolean;
    readonly variant: 'inline';
};
type RenderDataProps = Pick<RenderProps, 'authToken' | 'canCopy' | 'defaultHidden' | 'id' | 'label' | 'showHiddenToggle'>;
/** form */
type FormRef = {
    save: () => Promise<void>;
};
type FormOptions = {
    readonly hideButtons?: boolean;
    readonly hideCancelButton?: boolean;
    readonly hideFootprintLogo?: boolean;
};
type FormProps = PropsBase & {
    readonly authToken: string;
    readonly containerId?: string;
    readonly getRef?: (ref: FormRef) => void;
    readonly kind: `${ComponentKind.Form}`;
    readonly onCancel?: () => void;
    readonly onClose?: () => void;
    readonly onComplete?: () => void;
    readonly options?: FormOptions;
    readonly title?: string;
    readonly variant?: Variant;
};
type FormDataProps = Pick<FormProps, 'authToken' | 'options' | 'title' | 'l10n'>;
/** auth */
type AuthPropsBase = PropsBase & {
    readonly bootstrapData?: Pick<BootstrapData, 'id.email' | 'id.phone_number'>;
    readonly kind: `${ComponentKind.Auth}`;
    readonly onCancel?: () => void;
    readonly onClose?: () => void;
    readonly onComplete?: (validationToken: string) => void;
    readonly options?: Pick<Options, 'showLogo'>;
    /** @deprecated: use bootstrapData instead */
    readonly userData?: Pick<FootprintUserData, 'id.email' | 'id.phone_number'>;
    readonly variant?: 'modal' | 'drawer';
};
type AuthProps = AuthPropsBase & {
    readonly publicKey?: string;
    readonly authToken?: string;
    /** @deprecated after version 3.9.0 */
    readonly updateLoginMethods?: true;
};
type AuthDataProps = Pick<AuthProps, BootstrapKeys | 'authToken' | 'updateLoginMethods' | 'publicKey' | 'l10n' | 'options'>;
/** update_login_methods */
type UpdateLoginMethodsProps = PropsBase & {
    readonly authToken?: string;
    readonly bootstrapData?: Pick<BootstrapData, 'id.email' | 'id.phone_number'>;
    readonly kind: `${ComponentKind.UpdateLoginMethods}`;
    readonly onCancel?: () => void;
    readonly onClose?: () => void;
    readonly onComplete?: (validationToken: string) => void;
    readonly options?: Pick<Options, 'showLogo'>;
    /** @deprecated use bootstrapData instead */
    readonly userData?: Pick<FootprintUserData, 'id.email' | 'id.phone_number'>;
    readonly variant?: 'modal' | 'drawer';
};
type UpdateLoginMethodsDataProps = Pick<UpdateLoginMethodsProps, BootstrapKeys | 'authToken' | 'l10n' | 'options'>;

declare const footprint: Footprint;

declare enum PublicEvent {
    auth = "auth",
    canceled = "canceled",
    clicked = "clicked",
    closed = "closed",
    completed = "completed",
    relayToComponents = "relayToComponents"
}
declare enum PrivateEvent {
    formSaveComplete = "formSaveComplete",// triggered by form when save is complete, to resolve the promise
    formSaveFailed = "formSaveFailed",// triggered by form when save fails, to reject the promise
    formSaved = "formSaved",// triggered by tenant to save the form via ref
    propsReceived = "propsReceived",
    started = "started",
    relayFromComponents = "relayFromComponents"
}

type IdentifyRequest = {
    email?: string;
    phone_number?: string;
};

declare const identifyUser: (obj?: BootstrapData | FootprintUserData) => Promise<any>;

export { Footprint, Appearance as FootprintAppearance, AppearanceRules as FootprintAppearanceRules, AppearanceVariables as FootprintAppearanceVariables, AuthDataProps as FootprintAuthDataProps, AuthProps as FootprintAuthProps, BootstrapData as FootprintBootstrapData, Component as FootprintComponent, ComponentKind as FootprintComponentKind, FormDataProps as FootprintFormDataProps, FormOptions as FootprintFormOptions, FormProps as FootprintFormProps, FormRef as FootprintFormRef, IdentifyRequest as FootprintIdentifyRequest, Options as FootprintOptions, PrivateEvent as FootprintPrivateEvent, Props as FootprintProps, PropsBase as FootprintPropsBase, PublicEvent as FootprintPublicEvent, RenderDataProps as FootprintRenderDataProps, RenderProps as FootprintRenderProps, UpdateLoginMethodsDataProps as FootprintUpdateLoginMethodsDataProps, UpdateLoginMethodsProps as FootprintUpdateLoginMethodsProps, FootprintUserData, Variant as FootprintVariant, VerifyAuthToken as FootprintVerifyAuthToken, VerifyButtonDataProps as FootprintVerifyButtonDataProps, VerifyButtonProps as FootprintVerifyButtonProps, VerifyDataProps as FootprintVerifyDataProps, VerifyProps as FootprintVerifyProps, VerifyPublicKey as FootprintVerifyPublicKey, L10n, SandboxOutcome, SupportedLocale, footprint as default, identifyUser as identifyFootprintUser };
