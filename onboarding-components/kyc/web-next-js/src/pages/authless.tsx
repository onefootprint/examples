import {
	type FormValues,
	Fp,
	InlineProcessError,
	useFootprint,
} from "@onefootprint/footprint-react";
import React, { useCallback, useEffect, useState } from "react";
import Divider from "@/components/divider";
import Header from "@/components/header";
import Layout from "@/components/layout";
import Subtitle from "@/components/subtitle";
import Title from "@/components/title";
import LoadingSpinner from "@/components/loading-spinner";

// Step 1:
// You need to provide an authless token here
// 1. Create an authless playbook
// 2. Create an an auth token, passing your authless playbook key and email and phone numbers. Don't forget the user_external_id
// curl -X POST https://api.onefootprint.com/onboarding/session \
//   -u sk_test_123: \
//   -d '{
//     "kind": "onboard",
//     "key": "pb_test_oOCYD7ATmtGFnxXv1b2Z4A",
//     "user_external_id": "8c942342-987Dd-452-84f7-012324ab66899",
//     "bootstrap_data": {
//       "id.email": "rafaelmotta021@gmail.com",
//       "id.phone_number": "+15555550100"
//     }
//   }'
const authToken = "obtok_h9C9xZwNilv7HRQrklL5qiFGgNmJq2BD1o"; // TODO: Replace with your auth token
const publicKey = "pb_test_oOCYD7ATmtGFnxXv1b2Z4A";

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

	// Step 3: Initialize the authless flow
	// This will also get any data in the vault, so you can pre-fill the form
	// you'll also get a response with the missing fields to collect
	const start = useCallback(async () => {
		const response = await fp.startAuthlessFlow();
		console.log(response);
		onDone();
	}, [fp, onDone]);

	useEffect(() => {
		if (fp.isReady) {
			start();
		}
	}, [fp.isReady]);

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
			// Step 4:
			// Vault the data collected from the form by calling fp.vault
			await fp.vault(data);
			// Step 5
			// Process the data by calling fp.process and get a validation token
			// A process success means user onboarding is complete
			// You can use the validation token to get the fp_id of the onboarded user from our API https://docs.onefootprint.com/api-reference#post-onboarding-session-validate
			const { validationToken } = await fp.process();
			onDone();
		} catch (error) {
			// Step 6
			// For some onboarding, the requirement may include items that aren't supported in this SDK yet
			// When that happens, fp.process will throw an InlineProcessError
			// You can use the handoff function to handle the error
			// fp.handoff will launch the rest of the flow on an iframe modal
			// The handoff function will return the same validation token in the callback
			// This will happen in a few cases:
			// 1. You forgot to collect some required field
			// 2. Your playbook requires to collect a document
			// 3. Your playbook has a step-up, that will collect a document
			if (error instanceof InlineProcessError) {
				fp.handoff({ onComplete: (validationToken: string) => {} });
			}
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
