import {
	type FormValues,
	Fp,
	InlineProcessError,
	useFootprint,
} from "@onefootprint/footprint-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import Divider from "@/components/divider";
import Header from "@/components/header";
import Layout from "@/components/layout";
import Subtitle from "@/components/subtitle";
import Title from "@/components/title";
import LoadingSpinner from "@/components/loading-spinner";

// Step 1:
// You need to provide a fully verified auth token
// A fully verified auth token doesn't need to re-authenticate i.e. doesn't need OTP again
// Some auth tokens are not fully verified i.e. they need OTP again (which is conducted using fp.createAuthTokenBasedChallenge and fp.verify)
// This flow is only for the case where the auth token is fully verified.
const authToken = "YOUR_AUTH_TOKEN"; // TODO: Replace with your auth token
const publicKey = "pb_test_evrrjghzYMD6QSPDGleggt";

const Demo = () => {
	const [option, setOption] = useState("identify");
	const isIdentify = option === "identify";
	const isBasicData = option === "basic-data";
	const isSuccess = option === "success";

	const handleIdentifyDone = () => {
		setOption("basic-data");
	};

	const handleBasicDataDone = () => {
		setOption("success");
	};

	// Step 2:
	// Pass the auth token to the provider
	// Also make sure that the auth token is associated with the public key that you are passing
	// That is when you created the auth token, you used this public key
	return (
		<>
			<Fp.Provider publicKey={publicKey} authToken={authToken}>
				<Header>Onboarding</Header>
				{isIdentify && <Identify onDone={handleIdentifyDone} />}
				{isBasicData && <BasicData onDone={handleBasicDataDone} />}
				{isSuccess && <Success />}
			</Fp.Provider>
		</>
	);
};

const Identify = ({ onDone }: { onDone: () => void }) => {
	const fp = useFootprint();

	useEffect(() => {
		if (fp.isReady) {
			fp.requiresAuth()
				.then((shouldReAuth) => {
					// Step 3:
					// you MUST call fp.requiresAuth() to validate the auth token
					// The response from fp.requiresAuth() indicates whether you need to re-authenticate using OTP
					// The response from fp.requiresAuth() will be false if the auth token is fully verified
					// That means you don't need to do anything else for the auth part of the flow, our SDK is ready to vault, process, etc.
					if (!shouldReAuth) {
						onDone();
						return;
					}
					console.error("The provided auth token is not fully verified");
				})
				.catch((error) => {
					console.error("Error validating auth token: ", error);
				});
		}
	}, [fp, onDone]);

	return (
		<div className="flex h-screen w-screen items-center justify-center">
			<LoadingSpinner />
		</div>
	);
};

const BasicData = ({ onDone }: { onDone: () => void }) => {
	const fp = useFootprint();
	const { vaultData } = fp;

	const handleSubmit = async (data: FormValues) => {
		try {
			// Step 5:
			// Vault the data collected from the form by calling fp.vault
			await fp.vault(data);
			// Step 6.1:
			// Process the data by calling fp.process and get a validation token
			// A process success means user onboarding is complete
			// You can use the validation token to get the fp_id of the onboarded user from our API https://docs.onefootprint.com/api-reference#post-onboarding-session-validate
			const { validationToken } = await fp.process();
			onDone();
		} catch (error) {
			// Step 6.2:
			// For some onboarding, the requirement may include items that aren't supported in this SDK yet
			// When that happens, fp.process will throw an InlineProcessError
			// You can use the handoff function to handle the error
			// fp.handoff will launch the rest of the flow on an iframe modal
			// The handoff function will return the same validation token in the callback
			if (error instanceof InlineProcessError) {
				fp.handoff({ onComplete: (validationToken: string) => {} });
			}
		}
	};

	// Step 4:
	// Use our flexible UI components to create data collection forms
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
					<button type="submit" className="fp-button">
						Continue
					</button>
				</div>
			</Fp.Form>
		</Layout>
	);
};

const Success = () => (
	<Layout>
		<div className="mb-6">
			<Title>Success</Title>
			<Subtitle>You are all set!</Subtitle>
		</div>
	</Layout>
);

export default Demo;
