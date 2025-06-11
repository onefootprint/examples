import {
	DeprecatedSdkVersion,
	type FormValues,
	Fp,
	InlineOtpNotSupported,
	InlineProcessError,
	useFootprint,
} from "@onefootprint/footprint-react-native";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Button, SafeAreaView } from "react-native";

export default function App() {
	const authToken: string | undefined = undefined;
	const [initError, setInitError] = useState<Error | null>(null);
	
	return (
		<SafeAreaView style={styles.container}>
		<Fp.Provider
		publicKey="pb_test_92S2cMhzjLU1MBMPC5hnhk"
		authToken={authToken}
		redirectUrl="footprint://"
		onInitializationError={(error) => {
			setInitError(error);
		}}
		>
		<OnboardingComponents
		withAuthToken={!!authToken}
		initError={initError}
		/>
		</Fp.Provider>
		</SafeAreaView>
	);
}

const OnboardingComponents = ({
	withAuthToken,
	initError,
}: { withAuthToken: boolean; initError: Error | null }) => {
	const fp = useFootprint();
	const [step, setStep] = useState("identify");
	const [vaultData, setVaultData] = useState<FormValues>();
	
	if (initError) {
		return <InitErrorPage error={initError} />;
	}
	
	if (!fp.isReady) {
		return <Text>Loading...</Text>;
	}
	
	if (step === "identify") {
		return withAuthToken ? (
			<IdentifyWithAuthToken
			onDone={(vaultData?: FormValues) => {
				setVaultData(vaultData);
				setStep("kyc");
			}}
			/>
		) : (
			<Identify
			onDone={(vaultData?: FormValues) => {
				setVaultData(vaultData);
				setStep("kyc");
			}}
			/>
		);
	}
	
	if (step === "kyc") {
		return <KycDemo vaultData={vaultData} />;
	}
	
	return null;
};

const IdentifyWithAuthToken = ({
	onDone,
}: {
	onDone: (vaultData?: FormValues) => void;
}) => {
	const fp = useFootprint();
	const [challengeKind, setChallengeKind] = useState<string>();
	const [isAuthRequired, setIsAuthRequired] = useState<boolean | null>(null);
	
	useEffect(() => {
		setIsAuthRequired(fp.requiresAuth);
	}, [fp]);
	
	useEffect(() => {
		if (isAuthRequired && !challengeKind) {
			fp.createAuthTokenBasedChallenge()
			.then((result) => {
				setChallengeKind(result);
			})
			.catch((error) => {
				console.log("createAuthTokenBasedChallenge error", error);
				if (error instanceof InlineOtpNotSupported) {
					fp.launchIdentify(
						{},
						{
							onAuthenticated: (result) => {
								console.log("onAuthenticated", result);
								onDone(result.vaultData);
							},
							onError(error) {
								console.log("onError", error);
							},
						},
					);
				}
			});
		} else if (isAuthRequired != null && isAuthRequired === false) {
			onDone();
		}
	}, [fp, isAuthRequired, challengeKind, onDone]);
	
	const verifyChallenge = (otp: string) => {
		fp.verify({
			verificationCode: otp,
		})
		.then((result) => {
			console.log("verifyChallenge", result);
			onDone(result.vaultData);
		})
		.catch((error) => {
			console.log("verifyChallenge error", error);
		});
	};
	
	if (challengeKind) {
		return (
			<View style={styles.container}>
			<Text
			style={{
				marginBottom: 10,
			}}
			>
			Verify challenge
			</Text>
			<Fp.Otp
			onComplete={verifyChallenge}
			style={{
				width: 50,
				height: 50,
				borderRadius: 5,
				borderColor: "gray",
				borderWidth: 1,
				padding: 8,
				margin: 2,
			}}
			/>
			</View>
		);
	}
	
	return (
		<View style={styles.container}>
		<Text>Loading...</Text>
		</View>
	);
};

const Identify = ({ onDone }: { onDone: (vaultData?: FormValues) => void }) => {
	const fp = useFootprint();
	const [challengeKind, setChallengeKind] = useState<string>();
	
	const handleCreateChallenge = (formValues: FormValues) => {
		console.log("Submitting", formValues);
		fp.createEmailPhoneBasedChallenge({
			email: formValues["id.email"],
			phoneNumber: formValues["id.phone_number"],
		})
		.then((result) => {
			console.log("createEmailPhoneBasedChallenge", result);
			setChallengeKind(result);
		})
		.catch((error) => {
			console.log("createEmailPhoneBasedChallenge error", error);
			if (error instanceof InlineOtpNotSupported) {
				fp.launchIdentify(
					{
						email: formValues["id.email"],
						phoneNumber: formValues["id.phone_number"],
					},
					{
						onAuthenticated: (result) => {
							console.log("onAuthenticated", result);
							onDone(result.vaultData);
						},
						onError(error) {
							console.log("onError", error);
						},
					},
				);
			}
		});
	};
	
	const verifyChallenge = (otp: string) => {
		fp.verify({
			verificationCode: otp,
		})
		.then((result) => {
			console.log("verifyChallenge", result);
			onDone(result.vaultData);
		})
		.catch((error) => {
			console.log("verifyChallenge error", error);
		});
	};
	
	if (challengeKind) {
		return (
			<View style={styles.container}>
			<Text
			style={{
				marginBottom: 10,
			}}
			>
			Verify challenge
			</Text>
			<Fp.Otp
			onComplete={verifyChallenge}
			style={{
				width: 50,
				height: 50,
				borderRadius: 5,
				borderColor: "gray",
				borderWidth: 1,
				padding: 8,
				margin: 2,
			}}
			/>
			</View>
		);
	}
	
	return (
		<View style={styles.container}>
		<View
		style={{
			gap: 20,
		}}
		>
		<Text>Footprint Auth Demo</Text>
		<Text>Enter your email and phone number</Text>
		
		<Fp.Form onSubmit={handleCreateChallenge}>
		{({ handleSubmit, setValue, errors }) => {
			console.log("form errors", errors);
			return (
				<View>
				<Fp.Field name="id.email">
				{({ error }) => {
					return (
						<>
						<Text
						style={{ marginBottom: 10 }}
						nativeID="labelUsername"
						>
						Email
						</Text>
						<Fp.Input
						placeholder="Email"
						style={
							error ? styles.textInputError : styles.textInput
						}
						aria-labelledby="labelUsername"
						accessibilityLabelledBy="labelUsername"
						autoCapitalize="none"
						autoCorrect={false}
						/>
						<Fp.FieldErrors />
						</>
					);
				}}
				</Fp.Field>
				<Fp.Field name="id.phone_number">
				{({ error }) => (
					<>
					<Fp.Input
					placeholder="Phone"
					style={error ? styles.textInputError : styles.textInput}
					/>
					<Fp.FieldErrors />
					</>
				)}
				</Fp.Field>
				<Button
				title="Submit"
				onPress={() => {
					handleSubmit();
				}}
				/>
				</View>
			);
		}}
		</Fp.Form>
		</View>
		</View>
	);
};

const KycDemo = ({ vaultData }: { vaultData?: FormValues }) => {
	const fp = useFootprint();
	const [validationToken, setValidationToken] = React.useState<string | null>(
		null,
	);
	const [step, setStep] = React.useState(0);
	
	const steps = [
		<BasicInformation
		key={0}
		onDone={() => setStep(1)}
		vaultData={vaultData}
		/>,
		<AddressInformation
		key={1}
		onDone={() => {
			fp.process()
			.then((result) => {
				setValidationToken(result.validationToken);
			})
			.catch((error) => {
				if (error instanceof InlineProcessError) {
					fp.handoff({
						onComplete: (validationToken) => {
							setValidationToken(validationToken);
						},
					});
				} else {
					console.log("process error", error);
				}
			});
		}}
		vaultData={vaultData}
		/>,
	];
	
	if (validationToken) {
		return (
			<View style={styles.container}>
			<Text>Validation Token: {validationToken}</Text>
			</View>
		);
	}
	
	return <View style={styles.container}>{steps[step]}</View>;
};

const BasicInformation = ({
	onDone,
	vaultData,
}: {
	onDone: () => void;
	vaultData?: FormValues;
}) => {
	const fp = useFootprint();
	
	const handleSubmit = (data: FormValues) => {
		console.log("Submitting", data);
		fp.vault(data)
		.then(() => {
			fp.getRequirements().then((requirements) => {
				console.log("remaining requirements", requirements);
			});
			onDone();
		})
		.catch((error) => {
			console.log("vaulting error", error);
		});
	};
	
	return (
		<View style={styles.container}>
		<Fp.Form
		onSubmit={handleSubmit}
		defaultValues={{
			"id.first_name": vaultData?.["id.first_name"],
			"id.middle_name": vaultData?.["id.middle_name"],
			"id.last_name": vaultData?.["id.last_name"],
			"id.dob": vaultData?.["id.dob"],
		}}
		>
		{({ handleSubmit }) => (
			<View>
			<Fp.Field name="id.first_name">
			{({ error }) => (
				<>
				<Text style={{ marginBottom: 10 }}>First Name</Text>
				<Fp.Input
				placeholder="First Name"
				style={error ? styles.textInputError : styles.textInput}
				/>
				<Fp.FieldErrors />
				</>
			)}
			</Fp.Field>
			<Fp.Field name="id.middle_name">
			{({ error }) => (
				<>
				<Text style={{ marginBottom: 10 }}>Middle Name</Text>
				<Fp.Input
				placeholder="Middle Name"
				style={error ? styles.textInputError : styles.textInput}
				/>
				<Fp.FieldErrors />
				</>
			)}
			</Fp.Field>
			<Fp.Field name="id.last_name">
			{({ error }) => (
				<>
				<Text style={{ marginBottom: 10 }}>Last Name</Text>
				<Fp.Input
				placeholder="Last Name"
				style={error ? styles.textInputError : styles.textInput}
				/>
				<Fp.FieldErrors />
				</>
			)}
			</Fp.Field>
			<Fp.Field name="id.dob">
			{({ error }) => (
				<>
				<Text style={{ marginBottom: 10 }}>Date of Birth</Text>
				<Fp.Input
				placeholder="Date of Birth"
				style={error ? styles.textInputError : styles.textInput}
				/>
				<Fp.FieldErrors />
				</>
			)}
			</Fp.Field>
			<Fp.Field name="id.ssn4">
			{({ error }) => (
				<>
				<Text style={{ marginBottom: 10 }}>SSN-4</Text>
				<Fp.Input
				placeholder="SSN"
				style={error ? styles.textInputError : styles.textInput}
				/>
				<Fp.FieldErrors />
				</>
			)}
			</Fp.Field>
			<Fp.Field name="id.ssn9">
			{({ error }) => (
				<>
				<Text style={{ marginBottom: 10 }}>SSN-9</Text>
				<Fp.Input
				placeholder="SSN"
				style={error ? styles.textInputError : styles.textInput}
				/>
				<Fp.FieldErrors />
				</>
			)}
			</Fp.Field>
			<Button
			title="Submit"
			onPress={() => {
				handleSubmit();
			}}
			/>
			</View>
		)}
		</Fp.Form>
		</View>
	);
};

const AddressInformation = ({
	onDone,
	vaultData,
}: {
	onDone: () => void;
	vaultData?: FormValues;
}) => {
	const fp = useFootprint();
	
	const handleSubmit = (data: FormValues) => {
		fp.vault(data)
		.then(() => {
			fp.getRequirements().then((requirements) => {
				console.log("remaining requirements", requirements);
			});
			onDone();
		})
		.catch((error) => {
			console.log("vaulting error", error);
		});
	};
	
	return (
		<View style={styles.container}>
		<Fp.Form
		onSubmit={handleSubmit}
		defaultValues={{
			"id.address_line1": vaultData?.["id.address_line1"],
			"id.address_line2": vaultData?.["id.address_line2"],
			"id.country": vaultData?.["id.country"],
			"id.city": vaultData?.["id.city"],
			"id.state": vaultData?.["id.state"],
			"id.zip": vaultData?.["id.zip"],
		}}
		>
		{({ handleSubmit }) => (
			<View>
			<Fp.Field name="id.address_line1">
			{({ error }) => (
				<>
				<Text style={{ marginBottom: 10 }}>Address line 1</Text>
				<Fp.Input
				placeholder="Address Line 1"
				style={error ? styles.textInputError : styles.textInput}
				/>
				<Fp.FieldErrors />
				</>
			)}
			</Fp.Field>
			<Fp.Field name="id.address_line2">
			{({ error }) => (
				<>
				<Text style={{ marginBottom: 10 }}>Address line 2</Text>
				<Fp.Input
				placeholder="Address Line 2"
				style={error ? styles.textInputError : styles.textInput}
				/>
				<Fp.FieldErrors />
				</>
			)}
			</Fp.Field>
			<Fp.Field name="id.country">
			{({ error }) => (
				<>
				<Text style={{ marginBottom: 10 }}>Country</Text>
				<Fp.Input
				placeholder="Country"
				style={error ? styles.textInputError : styles.textInput}
				/>
				<Fp.FieldErrors />
				</>
			)}
			</Fp.Field>
			<Fp.Field name="id.city">
			{({ error }) => (
				<>
				<Text style={{ marginBottom: 10 }}>City</Text>
				<Fp.Input
				placeholder="City"
				style={error ? styles.textInputError : styles.textInput}
				/>
				<Fp.FieldErrors />
				</>
			)}
			</Fp.Field>
			<Fp.Field name="id.state">
			{({ error }) => (
				<>
				<Text style={{ marginBottom: 10 }}>State</Text>
				<Fp.Input
				placeholder="State"
				style={error ? styles.textInputError : styles.textInput}
				/>
				<Fp.FieldErrors />
				</>
			)}
			</Fp.Field>
			<Fp.Field name="id.zip">
			{({ error }) => (
				<>
				<Text style={{ marginBottom: 10 }}>Zip</Text>
				<Fp.Input
				placeholder="Zip"
				style={error ? styles.textInputError : styles.textInput}
				/>
				<Fp.FieldErrors />
				</>
			)}
			</Fp.Field>
			<Button
			title="Submit"
			onPress={() => {
				handleSubmit();
			}}
			/>
			</View>
		)}
		</Fp.Form>
		</View>
	);
};

const InitErrorPage = ({ error }: { error: Error }) => {
	const fp = useFootprint();
	const [hostedCompleted, setHostedCompleted] = useState(false);
	const [hostedLaunched, setHostedLaunched] = useState(false);
	const [validationToken, setValidationToken] = useState<string | null>(null);
	
	useEffect(() => {
		const launchHostedFlow = () => {
			fp.launchHosted({
				bootstrapData: {
					"id.email": "sandbox@onefootprint.com",
					"id.phone_number": "+15555550100",
					"id.first_name": "Sandbox",
					"id.last_name": "User",
					"id.dob": "1990-01-01",
					"id.country": "US",
					"id.address_line1": "123 Main St",
					"id.city": "Anytown",
					"id.state": "CA",
					"id.zip": "12345",
					"id.ssn9": "123456789",
				},
				options: {
					showLogo: true,
				},
				onComplete: (validationToken: string) => {
					console.log("Hosted completed. Validation token:", validationToken);
					setHostedCompleted(true);
					setValidationToken(validationToken);
				},
				onError: (error: unknown) => {
					console.error("Error launching hosted:", error);
				},
				onClose: () => {
					console.log("Hosted closed");
				},
				onCancel: () => {
					console.log("Hosted cancelled");
				},
			});
		};
		
		if (error instanceof DeprecatedSdkVersion && !hostedLaunched) {
			console.log("Launching hosted flow");
			setHostedLaunched(true);
			launchHostedFlow();
		}
	}, [hostedLaunched, error, fp]);
	
	if (hostedCompleted) {
		return <Text>Validation Token: {validationToken}</Text>;
	}
	
	if (error instanceof DeprecatedSdkVersion) {
		return <Text>Loading...</Text>;
	}
	
	// If the error is not a DeprecatedSdkVersion, we can't handle it using the hosted flow
	return (
		<View style={styles.container}>
		<Text>Initialization Error</Text>
		<Text>{error.message}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	textInput: {
		marginBottom: 10,
		padding: 10,
		borderColor: "gray",
		borderWidth: 1,
		width: 200,
		borderRadius: 15,
	},
	textInputError: {
		marginBottom: 10,
		padding: 10,
		borderColor: "red",
		borderWidth: 1,
		width: 200,
		borderRadius: 15,
	},
});
