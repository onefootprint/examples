import * as CSS from 'csstype';
import { TextProps, TextInputProps } from 'react-native';
import * as React from 'react';
import React__default from 'react';
import { FieldError, Merge, FieldErrorsImpl, FieldErrors } from 'react-hook-form';
import { SupportedLocale as SupportedLocale$1 } from '@onefootprint/types';

type AppearanceVariables = Partial<{
    borderRadius: CSS.Property.BorderRadius;
    colorError: CSS.Property.Color;
    colorWarning: CSS.Property.Color;
    colorSuccess: CSS.Property.Color;
    colorAccent: CSS.Property.Color;
    borderColorError: CSS.Property.BorderColor;
    linkColor: CSS.Property.Color;
    dialogBg: CSS.Property.Background;
    dialogBoxShadow: CSS.Property.BoxShadow;
    dialogBorderRadius: CSS.Property.BorderRadius;
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
    inputHoverBg: CSS.Property.Background;
    inputHoverBorderColor: CSS.Property.BorderColor;
    inputFocusBg: CSS.Property.Background;
    inputFocusBorderColor: CSS.Property.BorderColor;
    inputFocusElevation: CSS.Property.BoxShadow;
    inputErrorBg: CSS.Property.Background;
    inputErrorBorderColor: CSS.Property.BorderColor;
    inputErrorHoverBg: CSS.Property.Background;
    inputErrorHoverBorderColor: CSS.Property.BorderColor;
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
type BusinessBeneficialOwners = {
    email?: string;
    first_name?: string;
    last_name?: string;
    middle_name?: string;
    ownership_stake?: number;
    phone_number?: string;
};
type BusinessProps = {
    'business.address_line1': string;
    'business.address_line2': string;
    'business.beneficial_owners': BusinessBeneficialOwners[];
    'business.city': string;
    'business.corporation_type': string;
    'business.country': string;
    'business.dba': string;
    'business.formation_date': string;
    'business.formation_state': string;
    'business.kyced_beneficial_owners': BusinessBeneficialOwners[];
    'business.name': string;
    'business.phone_number': string;
    'business.state': string;
    'business.tin': string;
    'business.website': string;
    'business.zip': string;
};
type BootstrapData = Partial<IDProps> & Partial<BusinessProps> & Partial<CustomProps>;

type ComponentKind = 'verify';
type SupportedLocale = 'en-US' | 'es-MX';
type SupportedLanguage = 'en' | 'es';
type L10n = {
    locale?: SupportedLocale;
    language?: SupportedLanguage;
};
type BaseComponentProps = {
    readonly appearance?: Appearance;
    readonly l10n?: L10n;
    readonly onError?: (error: string) => void;
};
type WithAuthToken = {
    authToken: string;
    publicKey?: never;
};
type WithPublicKey = {
    publicKey: string;
    authToken?: never;
};
type VerifyProps = BaseComponentProps & {
    readonly bootstrapData?: BootstrapData;
    readonly onAuth?: (validationToken: string) => void;
    readonly onCancel?: () => void;
    readonly onClose?: () => void;
    readonly onComplete?: (validationToken: string) => void;
    readonly options?: Options;
} & (WithAuthToken | WithPublicKey);
declare enum OnboardingStep {
    Auth = "auth",
    Onboard = "onboard"
}
type OnboardingProps = VerifyProps & {
    step: OnboardingStep;
    onAuthComplete?: (tokens: {
        authToken: string;
        vaultingToken: string;
    }) => void;
};
type ComponentProps = VerifyProps;
type Footprint = {
    init: (props: ComponentProps) => () => void;
    destroy: () => void;
};
declare enum PublicEvent {
    closed = "closed",
    completed = "completed",
    canceled = "canceled"
}
type Options = {
    showCompletionPage?: boolean;
    showLogo?: boolean;
};

declare const _default: {
    init: (props: ComponentProps) => {
        render: () => Promise<void>;
    };
    destroy: () => void;
};

type FieldErrorsProps = TextProps;

type Di = Partial<{
    'id.email': string;
    'id.phone_number': string;
    'id.first_name': string;
    'id.middle_name': string;
    'id.last_name': string;
    'id.dob': string;
    'id.address_line1': string;
    'id.address_line2': string;
    'id.city': string;
    'id.state': string;
    'id.country': string;
    'id.zip': string;
    'id.ssn9': string;
    'id.ssn4': string;
    'id.nationality': string;
    'id.us_legal_status': string;
    'id.citizenships': string[];
    'id.visa_kind': string;
    'id.visa_expiration_date': string;
    'business.name': string;
    'business.dba': string;
    'business.tin': string;
    'business.website': string;
    'business.phone_number': string;
    'business.address_line1': string;
    'business.address_line2': string;
    'business.city': string;
    'business.state': string;
    'business.country': string;
    'business.zip': string;
    'business.corporation_type': string;
    [key: `business.beneficial_owners[${number}].first_name`]: string;
    [key: `business.beneficial_owners[${number}].middle_name`]: string;
    [key: `business.beneficial_owners[${number}].last_name`]: string;
    [key: `business.beneficial_owners[${number}].email`]: string;
    [key: `business.beneficial_owners[${number}].phone_number`]: string;
    [key: `business.beneficial_owners[${number}].ownership_stake`]: number;
} & {
    [key: `custom.${string}`]: string;
}>;

type FieldOptions = {
    error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
};
type FieldProps = {
    name: keyof Di;
    children?: (options: FieldOptions) => React__default.ReactNode;
};

type InputProps = TextInputProps;

type DiKey = keyof Di;
type FormOptions = {
    handleSubmit: () => void;
    setValue: (name: DiKey, value: Di[DiKey]) => void;
    errors: FieldErrors<Di>;
};
type FormProps = {
    children: (options: FormOptions) => React__default.ReactNode;
    onSubmit: (values: Di) => void;
    defaultValues?: Di;
};

type ProviderProps = {
    appearance?: Appearance;
    authToken?: string;
    children: React__default.ReactNode;
    publicKey: string;
    locale?: SupportedLocale$1;
};

declare const Fp: {
    Provider: ({ appearance, authToken, children, publicKey, locale, }: ProviderProps) => React.JSX.Element;
    Form: ({ children, defaultValues, onSubmit }: FormProps) => React.JSX.Element;
    Input: ({ ...props }: InputProps) => React.JSX.Element;
    Field: ({ name, children }: FieldProps) => React.JSX.Element;
    FieldErrors: ({ ...props }: FieldErrorsProps) => React.JSX.Element | null;
    COUNTRY_CODES: readonly ["US", "AS", "GU", "AF", "AX", "AL", "AN", "DZ", "AS", "AD", "AO", "AI", "AG", "AR", "AM", "AW", "AU", "AT", "AZ", "BS", "BH", "BD", "BB", "BY", "BE", "BZ", "BJ", "BM", "BT", "BO", "BA", "BQ", "BW", "BV", "BR", "IO", "BN", "BG", "BF", "BI", "KH", "CM", "CA", "CV", "KY", "CF", "TD", "CL", "CN", "CX", "CC", "CO", "KM", "SD", "CG", "CK", "CR", "CI", "HR", "CU", "CW", "CY", "CZ", "CD", "DK", "DJ", "DM", "DO", "EC", "EG", "SV", "GQ", "ER", "EE", "ET", "FK", "FO", "FJ", "FI", "FR", "GF", "PF", "TF", "GA", "GM", "GE", "DE", "GH", "GI", "GR", "GL", "GD", "GP", "GU", "GT", "GG", "GN", "GW", "GY", "HT", "HM", "VA", "HN", "HK", "HU", "IS", "IN", "ID", "IR", "IQ", "IE", "IM", "IL", "IT", "JM", "JP", "JE", "JO", "KZ", "KE", "KI", "KW", "KG", "LA", "LV", "LB", "LS", "LR", "LY", "LI", "LT", "LU", "MO", "MG", "MW", "MY", "MV", "ML", "MT", "MH", "MQ", "MR", "MU", "YT", "MX", "FM", "MD", "MC", "MN", "ME", "MS", "MA", "MZ", "MM", "NA", "NR", "NP", "NL", "NC", "NZ", "NI", "NE", "NG", "NU", "NF", "MP", "NO", "OM", "PK", "PW", "PS", "PA", "PG", "PY", "PE", "PH", "PN", "PL", "PT", "PR", "QA", "MK", "RE", "RO", "RU", "RW", "BL", "SH", "KN", "LC", "MF", "PM", "VC", "WS", "SM", "ST", "SA", "SN", "RS", "SC", "SL", "SG", "SX", "SK", "SI", "SB", "SO", "ZA", "GS", "KR", "SS", "ES", "LK", "SR", "SJ", "SZ", "SE", "CH", "SY", "TW", "TJ", "TZ", "TH", "TL", "TG", "TK", "TO", "TT", "TN", "TR", "TM", "TC", "TV", "UG", "UA", "AE", "GB", "UM", "UY", "UZ", "VU", "VE", "VN", "VI", "VG", "WF", "EH", "YE", "ZM", "ZW"];
    CORPORATION_TYPES: string[];
};

declare const useFootprint: () => {
    launchIdentify: ({ email, phoneNumber }: {
        email?: string;
        phoneNumber?: string;
    }, { onAuthenticated, onError, onCancel, }?: {
        onAuthenticated?: () => void;
        onError?: (error: unknown) => void;
        onCancel?: () => void;
    }) => void;
    save: (data: Di, { onSuccess, onError, }?: {
        onSuccess?: () => void;
        onError?: (error: unknown) => void;
    }) => Promise<void>;
    handoff: ({ onComplete, onError, onCancel, }?: {
        onComplete?: (validationToken: string) => void;
        onError?: (error: unknown) => void;
        onCancel?: () => void;
    }) => void;
};

export { Appearance, AppearanceRules, AppearanceVariables, BootstrapData, ComponentKind, ComponentProps, Footprint, Fp, L10n, OnboardingProps, OnboardingStep, Options, PublicEvent, SupportedLanguage, SupportedLocale, VerifyProps, _default as default, useFootprint };
