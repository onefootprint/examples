import "@onefootprint/footprint-js/dist/footprint-js.css";
import footprint from "@onefootprint/footprint-js";
import type { NextPage } from "next";
import Head from "next/head";

import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
	const handleOpen = () => {
		const component = footprint.init({
			kind: "verify",
			variant: "inline",
			containerId: "footprint-container",
			publicKey: "pb_test_5OJt1d7gDASCzgv7pZpLuB",
			onComplete: (validationToken: string) => {
				console.log(validationToken);
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
