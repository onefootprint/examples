import "@onefootprint/footprint-js/dist/style.css";

import Head from "next/head";
import styles from "../styles/Home.module.css";
import { FootprintButton } from "@onefootprint/footprint-react";

const Home = () => {
  return (
    <div className={styles.container}>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <title>Footprint | React + Next.js</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <FootprintButton
          publicKey="ob_test_WNgSBRR7uxoT8JRDBBflgw"
          onCompleted={(validationToken) => {
            console.log("on completed", validationToken);
          }}
          onCanceled={() => {
            console.log("user canceled!");
          }}
        />
      </main>
    </div>
  );
};

export default Home;
