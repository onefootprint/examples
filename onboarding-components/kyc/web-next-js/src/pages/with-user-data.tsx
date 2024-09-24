import "@onefootprint/footprint-js/dist/footprint-js.css";
import {
	Fp,
	useFootprint,
	InlineOtpNotSupported,
  InlineProcessError,
  FormValues
} from "@onefootprint/footprint-react";
import React, { useState, useEffect } from "react";
import Image from "next/image";

import Layout from "@/components/layout";
import Header from "@/components/header";
import Title from "@/components/title";
import Subtitle from "@/components/subtitle";
import Divider from "@/components/divider";

const publicKey = "ob_test_B4vg9W3gfMS1yi3CEgdjLa";

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
  const isReady = fp.isReady;

	useEffect(() => {
    if (isReady) {
      console.log('create challenge')
      createChallenge();
    }
  }, [isReady]);
  
  const createChallenge = async () => {
    const email = "sandbox@onefootprint.com";
    const phoneNumber = "+15555550100";

    try {
      setIsBusy(true);
      await fp.createEmailPhoneBasedChallenge({
        email,
        phoneNumber,
      });
      setShowOtp(true);
    } catch (error) {
      if (error instanceof InlineOtpNotSupported) {
        await fp.launchIdentify(
          { email, phoneNumber },
          {
            onAuthenticated: onDone,
          },
        );
      }
    } finally {
      setIsBusy(false);
    }
  };

	const handleSubmitPin = async (verificationCode: string) => {
		try {
			setIsBusy(true);
			const res = await fp.verify({ verificationCode });
			console.log(res);
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
						<Subtitle>Please wait while we initialize the challenge...</Subtitle>
					</div>
				</>
			)}
		</Layout>
	);
};

const BasicData = ({ onDone }: { onDone: () => void }) => {
	const fp = useFootprint();
	const { vaultData } = fp.data;

	const handleSubmit = async (data: FormValues) => {
		try {
			await fp.vault(data);
			const { validationToken } = await fp.process();
			onDone();
		} catch (error) {
			if (error instanceof InlineProcessError) {
				fp.handoff({ onComplete: (validationToken: string) => {} });
			}
		}
	};

	return (
		<Layout>
			<div style={{ marginBottom: 24 }}>
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
