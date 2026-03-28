'use client';

/**
 * Footprint React SDK Demo Page
 *
 * This page demonstrates all supported flows of the @onefootprint/footprint-react SDK.
 * The flow is determined by URL query parameters:
 *
 * URL PARAMETERS:
 *   - public_key:          Playbook public key (e.g. pb_test_xxx). Triggers the public key flow.
 *   - ob_session_token:    Auth token to use for the session. This demo uses onboarding session
 *                          tokens (obtok_xxx), but the SDK accepts any Footprint auth token
 *                          (e.g. utok_xxx). Triggers the auth token flow.
 *   - collect_email_phone: "true" to show email/phone form in the auth token flow (default "false").
 *                          Only relevant when ob_session_token is provided.
 *
 * FLOWS:
 *   1. PublicKeyFlow         — ?public_key=pb_test_xxx
 *   2. EmailPhoneAuthFlow    — ?ob_session_token=obtok_xxx&collect_email_phone=true
 *   3. DirectAuthFlow        — ?ob_session_token=obtok_xxx  (requiresAuth=true, no email/phone)
 *   4. NoAuthRequiredFlow    — ?ob_session_token=obtok_xxx  (requiresAuth=false, skip to vault)
 *
 * public_key and ob_session_token are mutually exclusive.
 */

import {
	type FormValues,
	Fp,
	InlineOtpNotSupported,
	InlineProcessError,
	useFootprint,
} from "@onefootprint/footprint-react";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import Divider from "../components/divider";
import Header from "../components/header";
import Layout from "../components/layout";
import Subtitle from "../components/subtitle";
import Title from "../components/title";

// ---------------------------------------------------------------------------
// URL param parsing
// ---------------------------------------------------------------------------

type DemoParams = {
	publicKey: string | null;
	obSessionToken: string | null;
	collectEmailPhone: boolean;
};

const useDemoParams = (): DemoParams => {
	const searchParams = useSearchParams();
	return {
		publicKey: searchParams.get("public_key"),
		obSessionToken: searchParams.get("ob_session_token"),
		collectEmailPhone: searchParams.get("collect_email_phone") === "true",
	};
};

// ---------------------------------------------------------------------------
// Top-level page component
// ---------------------------------------------------------------------------

const Demo = dynamic(() => Promise.resolve(DemoContent), { ssr: false });

const DemoContent = () => {
	const { publicKey, obSessionToken, collectEmailPhone } = useDemoParams();

	if (publicKey && obSessionToken) {
		return (
			<Layout>
				<Title>Error</Title>
				<Subtitle>
					Cannot provide both public_key and ob_session_token. Use one or the
					other.
				</Subtitle>
			</Layout>
		);
	}

	if (!publicKey && !obSessionToken) {
		return (
			<Layout>
				<Title>Error</Title>
				<Subtitle>
					Missing URL parameter: provide either public_key or ob_session_token.
				</Subtitle>
			</Layout>
		);
	}

	return (
		<Fp.Provider
			publicKey={publicKey ?? undefined}
			authToken={obSessionToken ?? undefined}
		>
			<Header>Onboarding</Header>
			{publicKey ? (
				<PublicKeyFlow />
			) : (
				<AuthTokenFlow collectEmailPhone={collectEmailPhone} />
			)}
		</Fp.Provider>
	);
};

// ---------------------------------------------------------------------------
// FLOW 1: Public Key
// ---------------------------------------------------------------------------

const PublicKeyFlow = () => {
	const [step, setStep] = useState<"identify" | "basic-data" | "success">(
		"identify",
	);
	const [validationToken, setValidationToken] = useState<string | null>(null);

	return (
		<>
			{step === "identify" && (
				<IdentifyWithEmailPhone onDone={() => setStep("basic-data")} />
			)}
			{step === "basic-data" && (
				<BasicDataForm
					onDone={(token) => {
						setValidationToken(token);
						setStep("success");
					}}
				/>
			)}
			{step === "success" && <Success validationToken={validationToken} />}
		</>
	);
};

// ---------------------------------------------------------------------------
// Auth Token Flow Router
// ---------------------------------------------------------------------------

const AuthTokenFlow = ({
	collectEmailPhone,
}: {
	collectEmailPhone: boolean;
}) => {
	const fp = useFootprint();

	if (fp.requiresAuth === null) {
		return (
			<Layout>
				<LoadingIndicator message="Initializing..." />
			</Layout>
		);
	}

	if (fp.requiresAuth === false) {
		return <NoAuthRequiredFlow />;
	}

	if (collectEmailPhone) {
		return <EmailPhoneAuthFlow />;
	}

	return <DirectAuthFlow />;
};

// ---------------------------------------------------------------------------
// FLOW 2: Auth Token + Email/Phone Collection
// ---------------------------------------------------------------------------

const EmailPhoneAuthFlow = () => {
	const [step, setStep] = useState<"identify" | "basic-data" | "success">(
		"identify",
	);
	const [validationToken, setValidationToken] = useState<string | null>(null);

	return (
		<>
			{step === "identify" && (
				<IdentifyWithEmailPhone onDone={() => setStep("basic-data")} />
			)}
			{step === "basic-data" && (
				<BasicDataForm
					onDone={(token) => {
						setValidationToken(token);
						setStep("success");
					}}
				/>
			)}
			{step === "success" && <Success validationToken={validationToken} />}
		</>
	);
};

// ---------------------------------------------------------------------------
// FLOW 3: Auth Token + Direct Challenge (no email/phone)
// ---------------------------------------------------------------------------

const DirectAuthFlow = () => {
	const fp = useFootprint();
	const [step, setStep] = useState<
		"challenge" | "otp" | "basic-data" | "success"
	>("challenge");
	const [validationToken, setValidationToken] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const initChallenge = async () => {
			try {
				await fp.createChallenge();
				setStep("otp");
			} catch (err) {
				if (err instanceof InlineOtpNotSupported) {
					fp.launchIdentify(
						{},
						{
							onAuthenticated: () => setStep("basic-data"),
							onError: (e) =>
								setError(e instanceof Error ? e.message : String(e)),
						},
					);
				} else {
					setError(err instanceof Error ? err.message : String(err));
				}
			}
		};
		initChallenge();
	}, [fp.createChallenge, fp.launchIdentify]);

	if (error) {
		return (
			<Layout>
				<Title>Error</Title>
				<Subtitle>{error}</Subtitle>
			</Layout>
		);
	}

	return (
		<>
			{step === "challenge" && (
				<Layout>
					<LoadingIndicator message="Creating challenge..." />
				</Layout>
			)}
			{step === "otp" && (
				<OtpVerification onDone={() => setStep("basic-data")} />
			)}
			{step === "basic-data" && (
				<BasicDataForm
					onDone={(token) => {
						setValidationToken(token);
						setStep("success");
					}}
				/>
			)}
			{step === "success" && <Success validationToken={validationToken} />}
		</>
	);
};

// ---------------------------------------------------------------------------
// FLOW 4: Auth Token, No Auth Required
// ---------------------------------------------------------------------------

const NoAuthRequiredFlow = () => {
	const [step, setStep] = useState<"basic-data" | "success">("basic-data");
	const [validationToken, setValidationToken] = useState<string | null>(null);

	return (
		<>
			{step === "basic-data" && (
				<BasicDataForm
					onDone={(token) => {
						setValidationToken(token);
						setStep("success");
					}}
				/>
			)}
			{step === "success" && <Success validationToken={validationToken} />}
		</>
	);
};

// ---------------------------------------------------------------------------
// Shared: Email/Phone identification form + OTP
// ---------------------------------------------------------------------------

const IdentifyWithEmailPhone = ({ onDone }: { onDone: () => void }) => {
	const fp = useFootprint();
	const [showOtp, setShowOtp] = useState(false);
	const [isBusy, setIsBusy] = useState(false);

	const handleSubmitEmailPhone = async (formValues: FormValues) => {
		const email = formValues["id.email"];
		const phoneNumber = formValues["id.phone_number"];
		try {
			setIsBusy(true);
			await fp.createChallenge({ email, phoneNumber });
			setShowOtp(true);
		} catch (error) {
			if (error instanceof InlineOtpNotSupported) {
				fp.launchIdentify(
					{ email, phoneNumber },
					{ onAuthenticated: onDone },
				);
			} else {
				console.error("Challenge creation failed:", error);
			}
		} finally {
			setIsBusy(false);
		}
	};

	if (showOtp) {
		return <OtpVerification onDone={onDone} />;
	}

	return (
		<Layout>
			<div className="mb-6">
				<Title>Identification</Title>
				<Subtitle>Please provide your email and phone number</Subtitle>
			</div>
			<Fp.Form onSubmit={handleSubmitEmailPhone}>
				<div className="flex flex-col gap-4">
					<Fp.Field name="id.email">
						<Fp.Label>Your email</Fp.Label>
						<Fp.Input
							placeholder="jane@acme.com"
							defaultValue="sandbox@onefootprint.com"
						/>
						<Fp.FieldErrors />
					</Fp.Field>
					<Fp.Field name="id.phone_number">
						<Fp.Label>Phone</Fp.Label>
						<Fp.Input
							placeholder="(123) 456-7890"
							defaultValue="+15555550100"
						/>
						<Fp.FieldErrors />
					</Fp.Field>
					<div className="mb-2">
						<Divider />
					</div>
					<button type="submit" className="fp-button">
						{isBusy ? "Loading..." : "Continue"}
					</button>
				</div>
			</Fp.Form>
		</Layout>
	);
};

// ---------------------------------------------------------------------------
// Shared: OTP verification
// ---------------------------------------------------------------------------

const OtpVerification = ({ onDone }: { onDone: () => void }) => {
	const fp = useFootprint();
	const [verificationCode, setVerificationCode] = useState("");
	const [isBusy, setIsBusy] = useState(false);

	const handleSubmitPin = async () => {
		try {
			setIsBusy(true);
			await fp.verify({ verificationCode });
			onDone();
		} catch (error) {
			console.error("OTP verification failed:", error);
		} finally {
			setIsBusy(false);
		}
	};

	return (
		<Layout>
			<div className="flex flex-col text-center">
				<div className="mb-6">
					<Title>Verify your phone number</Title>
					<Subtitle>Enter the 6-digit code sent to you.</Subtitle>
				</div>
				<Fp.PinInput
					value={verificationCode}
					onComplete={handleSubmitPin}
					onChange={setVerificationCode}
					autoFocus
					pinActiveClassName="border-[rgb(74,36,219)] border"
				/>
				{isBusy && (
					<div className="mt-5">
						<Image
							src="/loading.svg"
							height={32}
							width={32}
							alt="Loading..."
						/>
					</div>
				)}
			</div>
		</Layout>
	);
};

// ---------------------------------------------------------------------------
// Shared: Basic data vault form
// ---------------------------------------------------------------------------

const BasicDataForm = ({
	onDone,
}: {
	onDone: (validationToken: string) => void;
}) => {
	const fp = useFootprint();
	const { vaultData } = fp;
	const [isBusy, setIsBusy] = useState(false);

	const handleSubmit = async (data: FormValues) => {
		try {
			setIsBusy(true);
			await fp.vault(data);
			const { validationToken } = await fp.process();
			onDone(validationToken);
		} catch (error) {
			if (error instanceof InlineProcessError) {
				fp.handoff({
					onComplete: (validationToken: string) => onDone(validationToken),
				});
			} else {
				console.error("Vault/process failed:", error);
			}
		} finally {
			setIsBusy(false);
		}
	};

	return (
		<Layout>
			<div className="mb-6">
				<Title>Basic information</Title>
				<Subtitle>Please provide some basic personal information</Subtitle>
			</div>
			<Fp.Form
				onSubmit={handleSubmit}
				defaultValues={{
					"id.first_name": vaultData?.["id.first_name"],
					"id.middle_name": vaultData?.["id.middle_name"],
					"id.last_name": vaultData?.["id.last_name"],
					"id.dob": vaultData?.["id.dob"],
					"id.country": vaultData?.["id.country"] || "US",
					"id.address_line1": vaultData?.["id.address_line1"],
					"id.address_line2": vaultData?.["id.address_line2"],
					"id.city": vaultData?.["id.city"],
					"id.state": vaultData?.["id.state"],
					"id.zip": vaultData?.["id.zip"],
				}}
			>
				<div className="flex flex-col gap-3">
					<Fp.Field name="id.first_name">
						<Fp.Label>First name</Fp.Label>
						<Fp.Input placeholder="Jane" />
						<Fp.FieldErrors />
					</Fp.Field>
					<Fp.Field name="id.middle_name">
						<Fp.Label>Middle name</Fp.Label>
						<Fp.Input placeholder="Sue" />
						<Fp.FieldErrors />
					</Fp.Field>
					<Fp.Field name="id.last_name">
						<Fp.Label>Last name</Fp.Label>
						<Fp.Input placeholder="Joe" />
						<Fp.FieldErrors />
					</Fp.Field>
					<Fp.Field name="id.dob">
						<Fp.Label>DOB</Fp.Label>
						<Fp.Input placeholder="MM/DD/YYYY" />
						<Fp.FieldErrors />
					</Fp.Field>
					<div className="mb-2">
						<Divider />
					</div>
					<Fp.Field name="id.country">
						<Fp.Input placeholder="US" defaultValue="US" type="hidden" />
					</Fp.Field>
					<Fp.Field name="id.address_line1">
						<Fp.Label>Address line 1</Fp.Label>
						<Fp.Input placeholder="Street number" />
						<Fp.FieldErrors />
					</Fp.Field>
					<Fp.Field name="id.address_line2">
						<Fp.Label>Address line 2 (optional)</Fp.Label>
						<Fp.Input placeholder="Apartment, suite, etc." />
						<Fp.FieldErrors />
					</Fp.Field>
					<Fp.Field name="id.city">
						<Fp.Label>City</Fp.Label>
						<Fp.Input placeholder="New York" />
						<Fp.FieldErrors />
					</Fp.Field>
					<Fp.Field name="id.state">
						<Fp.Label>State</Fp.Label>
						<Fp.Input placeholder="NY" />
						<Fp.FieldErrors />
					</Fp.Field>
					<Fp.Field name="id.zip">
						<Fp.Label>Zip</Fp.Label>
						<Fp.Input placeholder="11206" />
						<Fp.FieldErrors />
					</Fp.Field>
					<div className="mb-2">
						<Divider />
					</div>
					<Fp.Field name="id.ssn9">
						<Fp.Label>SSN</Fp.Label>
						<Fp.Input placeholder="XXX-XX-XXXX" />
						<Fp.FieldErrors />
					</Fp.Field>
					<div className="mb-2">
						<Divider />
					</div>
					<button type="submit" className="fp-button" disabled={isBusy}>
						{isBusy ? "Loading..." : "Continue"}
					</button>
				</div>
			</Fp.Form>
		</Layout>
	);
};

// ---------------------------------------------------------------------------
// Shared: UI helpers
// ---------------------------------------------------------------------------

const Success = ({
	validationToken,
}: {
	validationToken: string | null;
}) => (
	<Layout>
		<div className="mb-6">
			<Title>Success</Title>
			<Subtitle>You are all set!</Subtitle>
		</div>
		{validationToken && (
			<div className="mt-2 p-3 rounded-md bg-gray-100">
				<p className="text-sm font-medium text-gray-600 mb-1">
					Validation Token
				</p>
				<p className="text-xs font-mono text-gray-900 break-all">
					{validationToken}
				</p>
			</div>
		)}
	</Layout>
);

const LoadingIndicator = ({ message }: { message: string }) => (
	<div className="flex flex-col items-center gap-2">
		<Image src="/loading.svg" height={32} width={32} alt="Loading..." />
		<span className="text-sm text-gray-500">{message}</span>
	</div>
);

export default Demo;
