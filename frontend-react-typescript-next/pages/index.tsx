import "@onefootprint/footprint-js/dist/footprint-js.css";

import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { FootprintButton } from "@onefootprint/footprint-react";
import { FootprintSecureForm } from "@onefootprint/footprint-components-react";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <title>Footprint | React + Typescript + Next.js</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div style={styles.container}>
          <FootprintButton
            publicKey="ob_test_WNgSBRR7uxoT8JRDBBflgw"
            onCompleted={(validationToken) => {
              console.log("on completed", validationToken);
            }}
            onCanceled={() => {
              console.log("user canceled!");
            }}
          />
          <div style={styles.form}>
            <FootprintSecureForm 
              authToken='tok_XYZ'
              cardAlias='primary'
              variant='card'
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
