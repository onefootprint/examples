import "@onefootprint/footprint-js/dist/footprint-js.css";
import { Fp, FormValues, useFootprint } from "@onefootprint/footprint-react";
import React, { useState } from "react";
import Image from "next/image";

import Layout from "@/components/layout";
import Header from "@/components/header";
import Title from "@/components/title";
import Subtitle from "@/components/subtitle";
import Divider from "@/components/divider";

const publicKey = "pb_test_CbzkvaXKvOVdTn3YLokEP0";

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

	return (
		<>
			<Fp.Provider publicKey={publicKey}>
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
	const [isBusy, setIsBusy] = useState(false);
	const [showOtp, setShowOtp] = useState(false);

	const handleSubmitData = async (formValues: FormValues) => {
		try {
			setIsBusy(true);
			await fp.createEmailPhoneBasedChallenge({
				email: formValues["id.email"],
				phoneNumber: formValues["id.phone_number"],
			});
			setShowOtp(true);
		} catch (error) {
			console.log(error);
		} finally {
			setIsBusy(false);
		}
	};

	const handleSubmitPin = async (verificationCode: string) => {
		try {
			setIsBusy(true);
			await fp.verify({ verificationCode });
			onDone();
		} catch (error) {
			console.log(error);
		} finally {
			setIsBusy(false);
		}
	};

	return (
		<Layout>
			{showOtp ? (
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						textAlign: "center",
					}}
				>
					<div style={{ marginBottom: 24 }}>
						<Title>Verify your phone number</Title>
						<Subtitle>
							Enter the 6-digit code sent to +1 (555) 555‑0100.
						</Subtitle>
					</div>
					<Fp.PinInput onComplete={handleSubmitPin} autoFocus />
					{isBusy ? (
						<div style={{ marginTop: 20 }}>
							<Image
								src="/loading.svg"
								height={32}
								width={32}
								alt="Loading..."
							/>
						</div>
					) : null}
				</div>
			) : (
				<>
					<div style={{ marginBottom: 24 }}>
						<Title>Identification</Title>
						<Subtitle>Please provide your email and phone number</Subtitle>
					</div>
					<Fp.Form onSubmit={handleSubmitData}>
						<div style={{ display: "flex", gap: 16, flexDirection: "column" }}>
							<Fp.Field name="id.email">
								<Fp.Label>Your email</Fp.Label>
								<Fp.Input placeholder="jane@acme.com" />
								<Fp.FieldErrors />
							</Fp.Field>
							<Fp.Field name="id.phone_number">
								<Fp.Label>Phone</Fp.Label>
								<Fp.Input placeholder="(123) 456-7890" />
								<Fp.FieldErrors />
							</Fp.Field>
							<div style={{ marginBottom: 8 }}>
								<Divider />
							</div>
							<button type="submit" className="fp-button">
								{isBusy ? "Loading..." : "Continue"}
							</button>
						</div>
					</Fp.Form>
				</>
			)}
		</Layout>
	);
};

const BasicData = ({ onDone }: { onDone: () => void }) => {
	const fp = useFootprint();

	const handleSubmit = async (data: FormValues) => {
		await fp.save(data);
		fp.handoff({
			onComplete: (validationToken) => {
				console.log(validationToken);
				onDone();
			},
		});
	};

	return (
		<Layout>
			<div style={{ marginBottom: 24 }}>
				<Title>Basic information</Title>
				<Subtitle>Please provide some basic personal information</Subtitle>
			</div>
			<Fp.Form onSubmit={handleSubmit}>
				<div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
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
					<div style={{ marginBottom: 8 }}>
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
					<div style={{ marginBottom: 8 }}>
						<Divider />
					</div>
					<Fp.Field name="id.ssn9">
						<Fp.Label>SSN</Fp.Label>
						<Fp.Input placeholder="XXX-XX-XXXX" />
						<Fp.FieldErrors />
					</Fp.Field>
					<div style={{ marginBottom: 8 }}>
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
		<div style={{ marginBottom: 24 }}>
			<Title>Success</Title>
			<Subtitle>You are all set!</Subtitle>
		</div>
	</Layout>
);

export default Demo;
