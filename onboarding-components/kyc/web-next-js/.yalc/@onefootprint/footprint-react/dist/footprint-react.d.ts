import footprint, { FootprintVerifyProps, FootprintAuthProps, FootprintUpdateLoginMethodsProps, FootprintFormProps, FootprintRenderProps, FootprintBootstrapData, FootprintAppearance, FootprintComponent, SandboxOutcome } from '@onefootprint/footprint-js';
export { default } from '@onefootprint/footprint-js';
import React$1, { LabelHTMLAttributes, FormHTMLAttributes, HTMLAttributes, InputHTMLAttributes } from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';
import { FieldErrors, UseFormSetFocus, UseFormSetValue } from 'react-hook-form';
import * as _onefootprint_types from '@onefootprint/types';
import { PublicOnboardingConfig, SupportedLocale, ChallengeData } from '@onefootprint/types';

type SupportedProps = FootprintVerifyProps | FootprintAuthProps | FootprintUpdateLoginMethodsProps;
type ButtonProps = {
    className?: string;
    dialogVariant?: 'modal' | 'drawer';
    label?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    testID?: string;
};
type FootprintButtonProps = SupportedProps & ButtonProps;

declare const _default: React$1.ForwardRefExoticComponent<FootprintButtonProps & React$1.RefAttributes<HTMLButtonElement>>;

type FootprintFootprintFormProps = Omit<FootprintFormProps, 'kind' | 'containerId'>;
declare const FootprintForm: (props: FootprintFootprintFormProps) => react_jsx_runtime.JSX.Element | null;

type FootprintFootprintRenderProps = Omit<FootprintRenderProps, 'kind' | 'variant' | 'containerId'>;
declare const FootprintRender: (props: FootprintFootprintRenderProps) => react_jsx_runtime.JSX.Element | null;

type LabelProps = LabelHTMLAttributes<HTMLLabelElement>;

type SelectProps = React$1.SelectHTMLAttributes<HTMLSelectElement> & {
    children?: React$1.ReactNode;
};

type InputProps = React$1.InputHTMLAttributes<HTMLInputElement>;

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
type InvestorProps = {
    'investor_profile.employment_status': 'employed' | 'unemployed' | 'student' | 'retired';
    'investor_profile.occupation': string;
    'investor_profile.employer': string;
    'investor_profile.annual_income': 'le25k' | 'gt25k_le50k' | 'gt50k_le100k' | 'gt100k_le200k' | 'gt200k_le300k' | 'gt300k_le500k' | 'gt500k_le1200k';
    'investor_profile.net_worth': 'le50k' | 'gt50k_le100k' | 'gt100k_le200k' | 'gt200k_le500k' | 'gt500k_le1m' | 'gt1m_le5m' | 'gt5m';
    'investor_profile.funding_sources': 'employment_income' | 'investments' | 'inheritance' | 'business_income' | 'savings' | 'family';
    'investor_profile.investment_goals': Array<'growth' | 'income' | 'preserve_capital' | 'speculation' | 'diversification' | 'other'>;
    'investor_profile.risk_tolerance': 'conservative' | 'moderate' | 'aggressive';
    'investor_profile.declarations': Array<'affiliated_with_us_broker' | 'senior_executive' | 'senior_political_figure'>[];
    'investor_profile.senior_executive_symbols': string[];
    'investor_profile.family_member_names': string[];
    'investor_profile.political_organization': string;
    'investor_profile.brokerage_firm_employer': string;
};
type BusinessProps = {
    'business.address_line1': string;
    'business.address_line2': string;
    'business.city': string;
    'business.corporation_type': string;
    'business.country': string;
    'business.dba': string;
    'business.formation_date': string;
    'business.formation_state': string;
    'business.name': string;
    'business.phone_number': string;
    'business.state': string;
    'business.tin': string;
    'business.website': string;
    'business.zip': string;
    [key: `business.beneficial_owners[${number}].first_name`]: string;
    [key: `business.beneficial_owners[${number}].middle_name`]: string;
    [key: `business.beneficial_owners[${number}].last_name`]: string;
    [key: `business.beneficial_owners[${number}].email`]: string;
    [key: `business.beneficial_owners[${number}].phone_number`]: string;
    [key: `business.beneficial_owners[${number}].ownership_stake`]: number;
    [key: `business.kyced_beneficial_owners[${number}].first_name`]: string;
    [key: `business.kyced_beneficial_owners[${number}].middle_name`]: string;
    [key: `business.kyced_beneficial_owners[${number}].last_name`]: string;
    [key: `business.kyced_beneficial_owners[${number}].email`]: string;
    [key: `business.kyced_beneficial_owners[${number}].phone_number`]: string;
    [key: `business.kyced_beneficial_owners[${number}].ownership_stake`]: number;
};
type FormValues = Partial<IDProps> & Partial<BusinessProps> & Partial<InvestorProps> & Partial<CustomProps>;

type ApiErrorDetails<E> = E & {
    message: string;
    code?: string | null;
};
declare class ApiError<E> extends Error {
    details: ApiErrorDetails<E>;
    constructor(message: string, errorDetails: ApiErrorDetails<E>);
}
declare class InlineOtpNotSupported extends Error {
    constructor(message: string);
}
declare class InlineProcessError extends Error {
    constructor(message: string);
}

type UserDataError = {
    context: Partial<Record<keyof FootprintBootstrapData, string>> | string;
};

type FormOptions = {
    errors: FieldErrors<FormValues>;
    handleSubmit: () => void;
    setFocus: UseFormSetFocus<FormValues>;
    setValue: UseFormSetValue<FormValues>;
};
type FormProps = Omit<FormHTMLAttributes<HTMLFormElement>, 'onSubmit' | 'children' | 'defaultValue'> & {
    children: React$1.ReactNode | ((options: FormOptions) => React$1.ReactNode);
    defaultValues?: FormValues;
    onSubmit: (values: FormValues) => void;
};

type FieldErrorsProps = HTMLAttributes<HTMLDivElement>;

type PinInputProps = {
    containerClassName?: string;
    onComplete: (value: string) => void;
} & InputHTMLAttributes<HTMLInputElement>;

declare enum AuthTokenStatus {
    validWithSufficientScope = "validWithSufficientScope",
    validWithInsufficientScope = "validWithInsufficientScope",
    invalid = "invalid"
}

type ContextData = {
    appearance?: FootprintAppearance;
    authToken?: string;
    fpInstance?: FootprintComponent;
    handoffCallbacks?: {
        onCancel?: () => void;
        onClose?: () => void;
        onComplete?: (validationToken: string) => void;
        onError?: (error: unknown) => void;
    };
    onboardingConfig?: PublicOnboardingConfig;
    sandboxOutcome?: SandboxOutcome;
    sandboxId?: string;
    publicKey: string;
    locale?: SupportedLocale;
    authTokenStatus?: AuthTokenStatus;
    challengeData?: ChallengeData;
    didCallRequiresAuth: boolean;
    vaultData?: FormValues;
    vaultingToken?: string;
    verifiedAuthToken?: string;
};
type ProviderProps = Pick<ContextData, 'appearance' | 'authToken' | 'publicKey' | 'locale' | 'sandboxOutcome' | 'sandboxId'> & {
    children: React$1.ReactNode;
};

type FieldProps = {
    name: keyof FormValues;
    children?: React$1.ReactNode;
} & HTMLAttributes<HTMLDivElement>;

declare const COUNTRY_CODES: readonly ["US", "AS", "GU", "AF", "AX", "AL", "AN", "DZ", "AS", "AD", "AO", "AI", "AG", "AR", "AM", "AW", "AU", "AT", "AZ", "BS", "BH", "BD", "BB", "BY", "BE", "BZ", "BJ", "BM", "BT", "BO", "BA", "BQ", "BW", "BV", "BR", "IO", "BN", "BG", "BF", "BI", "KH", "CM", "CA", "CV", "KY", "CF", "TD", "CL", "CN", "CX", "CC", "CO", "KM", "SD", "CG", "CK", "CR", "CI", "HR", "CU", "CW", "CY", "CZ", "CD", "DK", "DJ", "DM", "DO", "EC", "EG", "SV", "GQ", "ER", "EE", "ET", "FK", "FO", "FJ", "FI", "FR", "GF", "PF", "TF", "GA", "GM", "GE", "DE", "GH", "GI", "GR", "GL", "GD", "GP", "GU", "GT", "GG", "GN", "GW", "GY", "HT", "HM", "VA", "HN", "HK", "HU", "IS", "IN", "ID", "IR", "IQ", "IE", "IM", "IL", "IT", "JM", "JP", "JE", "JO", "KZ", "KE", "KI", "KW", "KG", "LA", "LV", "LB", "LS", "LR", "LY", "LI", "LT", "LU", "MO", "MG", "MW", "MY", "MV", "ML", "MT", "MH", "MQ", "MR", "MU", "YT", "MX", "FM", "MD", "MC", "MN", "ME", "MS", "MA", "MZ", "MM", "NA", "NR", "NP", "NL", "NC", "NZ", "NI", "NE", "NG", "NU", "NF", "MP", "NO", "OM", "PK", "PW", "PS", "PA", "PG", "PY", "PE", "PH", "PN", "PL", "PT", "PR", "QA", "MK", "RE", "RO", "RU", "RW", "BL", "SH", "KN", "LC", "MF", "PM", "VC", "WS", "SM", "ST", "SA", "SN", "RS", "SC", "SL", "SG", "SX", "SK", "SI", "SB", "SO", "ZA", "GS", "KR", "SS", "ES", "LK", "SR", "SJ", "SZ", "SE", "CH", "SY", "TW", "TJ", "TZ", "TH", "TL", "TG", "TK", "TO", "TT", "TN", "TR", "TM", "TC", "TV", "UG", "UA", "AE", "GB", "UM", "UY", "UZ", "VU", "VE", "VN", "VI", "VG", "WF", "EH", "YE", "ZM", "ZW"];

declare const CORPORATION_TYPES: string[];

declare const useFootprint: () => {
    data: {
        onboardingConfig: _onefootprint_types.PublicOnboardingConfig | undefined;
        challengeData: _onefootprint_types.ChallengeData | undefined;
        vaultData: FormValues | undefined;
    };
    launchIdentify: ({ email, phoneNumber }: {
        email?: string;
        phoneNumber?: string;
    }, { onAuthenticated, onError, }?: {
        onAuthenticated?: (response: Awaited<ReturnType<(authToken: string) => Promise<{
            validationToken: string;
            requirements: {
                all: (_onefootprint_types.OnboardingRequirement & {
                    optionalAttributes?: string[];
                    populatedAttributes?: string[];
                    missingAttributes?: string[];
                })[];
                isCompleted: boolean;
                isMissing: boolean;
                missing: (_onefootprint_types.OnboardingRequirement & {
                    optionalAttributes?: string[];
                    populatedAttributes?: string[];
                    missingAttributes?: string[];
                })[];
            };
            vaultData: FormValues;
            fields: Record<"missing" | "optional" | "collected", _onefootprint_types.DataIdentifier[]>;
        }>>>) => void;
        onError?: (error: unknown) => void;
    }) => void;
    createEmailPhoneBasedChallenge: ({ email, phoneNumber }: {
        email?: string;
        phoneNumber?: string;
    }) => Promise<_onefootprint_types.ChallengeKind>;
    createAuthTokenBasedChallenge: () => Promise<_onefootprint_types.ChallengeKind>;
    verify: (payload: {
        verificationCode: string;
    }) => Promise<{
        validationToken: string;
        requirements: {
            all: (_onefootprint_types.OnboardingRequirement & {
                optionalAttributes?: string[];
                populatedAttributes?: string[];
                missingAttributes?: string[];
            })[];
            isCompleted: boolean;
            isMissing: boolean;
            missing: (_onefootprint_types.OnboardingRequirement & {
                optionalAttributes?: string[];
                populatedAttributes?: string[];
                missingAttributes?: string[];
            })[];
        };
        vaultData: FormValues;
        fields: Record<"missing" | "optional" | "collected", _onefootprint_types.DataIdentifier[]>;
    }>;
    requiresAuth: () => Promise<boolean>;
    isReadyForAuth: boolean;
    getRequirements: () => Promise<{
        requirements: {
            all: (_onefootprint_types.OnboardingRequirement & {
                optionalAttributes?: string[];
                populatedAttributes?: string[];
                missingAttributes?: string[];
            })[];
            isCompleted: boolean;
            isMissing: boolean;
            missing: (_onefootprint_types.OnboardingRequirement & {
                optionalAttributes?: string[];
                populatedAttributes?: string[];
                missingAttributes?: string[];
            })[];
        };
        fields: Record<"missing" | "optional" | "collected", _onefootprint_types.DataIdentifier[]>;
    }>;
    handoff: ({ onComplete, onError, onCancel, onClose, }?: {
        onComplete?: (validationToken: string) => void;
        onError?: (error: unknown) => void;
        onCancel?: () => void;
        onClose?: () => void;
    }) => void;
    process: () => Promise<{
        validationToken: string;
        requirements: {
            all: (_onefootprint_types.OnboardingRequirement & {
                optionalAttributes?: string[];
                populatedAttributes?: string[];
                missingAttributes?: string[];
            })[];
            isCompleted: boolean;
            isMissing: boolean;
            missing: (_onefootprint_types.OnboardingRequirement & {
                optionalAttributes?: string[];
                populatedAttributes?: string[];
                missingAttributes?: string[];
            })[];
        };
    }>;
    vault: (formValues: FormValues) => Promise<void>;
};

declare const Fp: {
    Field: ({ name, className, children, ...props }: FieldProps) => react_jsx_runtime.JSX.Element;
    Provider: ({ appearance, authToken, children, publicKey, locale, sandboxOutcome, sandboxId, }: ProviderProps) => react_jsx_runtime.JSX.Element;
    PinInput: ({ containerClassName, onComplete, disabled, className, autoFocus, ...props }: PinInputProps) => react_jsx_runtime.JSX.Element;
    FieldErrors: ({ className, ...props }: FieldErrorsProps) => react_jsx_runtime.JSX.Element | null;
    Form: ({ className, children, defaultValues, onSubmit, ...props }: FormProps) => react_jsx_runtime.JSX.Element;
    Input: ({ className, id, ...props }: InputProps) => react_jsx_runtime.JSX.Element;
    Select: ({ children, className, id, ...props }: SelectProps) => react_jsx_runtime.JSX.Element;
    Label: ({ className, children, htmlFor, ...props }: LabelProps) => react_jsx_runtime.JSX.Element;
};

export { ApiError, ApiErrorDetails, AuthTokenStatus, CORPORATION_TYPES, COUNTRY_CODES, _default as FootprintButton, FootprintForm, FootprintRender, FormValues, Fp, InlineOtpNotSupported, InlineProcessError, UserDataError, useFootprint };
