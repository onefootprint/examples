import "@onefootprint/footprint-js/dist/footprint-js.css";
import footprint from "@onefootprint/footprint-js";
import type { NextPage } from "next";
import Head from "next/head";

import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
	const handleOpen = () => {
		const component = footprint.init({
			kind: "verify",
			publicKey: "pb_test_tjifWCVzh1tTuH1qXCUNWh",
			onComplete: (validationToken: string) => {
				console.log(validationToken);
			},
			appearance: {
				variables: {
					borderRadius: "5px",
					buttonBorderRadius: "20px",
					buttonPrimaryBg: "#666666",
					buttonPrimaryHoverBg: "#333333",
					buttonPrimaryColor: "#FFF",
					linkButtonColor: "#007BFF",

					radioSelectColor: "#666666",
					radioSelectSelectedColor: "#000000",

					radioSelectBg: "#FFFFFF",
					radioSelectHoverBg: "#F9F9F9",
					radioSelectSelectedBg: "#FFF",

					radioSelectBorderColor: "#CCCCCC",
					radioSelectHoverBorderColor: "#999999",
					radioSelectSelectedBorderColor: "#666666",

					radioSelectComponentsIconBg: "#ccc",

					radioSelectComponentsIconSelectedBg: "#999",
					radioSelectComponentsIconColor: "#666666",
					radioSelectComponentsIconSelectedColor: "#fff",
				},
				rules: {
					button: {
						transition: "all .2s linear",
						backgroundColor: "#666666",
						color: "#FFF",
						borderRadius: "20px",
					},
					"button:hover": {
						backgroundColor: "#333333",
						color: "#FFF",
					},
					"button:focus": {
						outline: "2px solid #999999",
						outlineOffset: "2px",
					},
					"button:active": {
						backgroundColor: "#333333",
						transform: "scale(0.98)",
					},
					input: {
						border: "1px solid #CCCCCC",
						borderRadius: "5px",
						padding: "8px",
					},
					"input:hover": {
						borderColor: "#999999",
					},
					"input:focus": {
						borderColor: "#666666",
						outline: "none",
						boxShadow: "0 0 0 2px rgba(0, 0, 0, 0.1)",
					},
					"input:active": {
						borderColor: "#333333",
					},
					"pinInput:hover": {
						borderColor: "#999999",
					},
					"pinInput:focus": {
						borderColor: "#666666",
						outline: "none",
						boxShadow: "0 0 0 2px rgba(0, 0, 0, 0.1)",
					},
					"pinInput:active": {
						borderColor: "#333333",
					},
					label: {
						color: "#666666",
						fontSize: "14px",
					},
					hint: {
						color: "#999999",
						fontSize: "12px",
					},
					link: {
						color: "#007BFF",
						textDecoration: "none",
					},
					"link:hover": {
						color: "#0056b3",
						textDecoration: "underline",
					},
					"link:active": {
						color: "#004085",
					},
				},
			},
		});
		component.render();
	};

	return (
		<>
			<Head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="theme-color" content="#000000" />
				<title>Footprint | React + Typescript + Next.js</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className={styles.main}>
				<div id="footprint-container" className={styles.container} />
				<button type="button" onClick={handleOpen}>
					Verify
				</button>
			</main>
		</>
	);
};

export default Home;
