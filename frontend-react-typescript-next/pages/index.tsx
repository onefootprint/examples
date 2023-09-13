import "@onefootprint/footprint-js/dist/footprint-js.css";

import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { FootprintVerifyButton } from "@onefootprint/footprint-react";

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
        <div className={styles.container}>
          <FootprintVerifyButton
            publicKey="ob_test_WNgSBRR7uxoT8JRDBBflgw"
            onComplete={(validationToken) => {
              console.log("on completed", validationToken);
            }}
            onCancel={() => {
              console.log("user canceled!");
            }}
          />
        </div>
      </main>
    </div>
  );
};

export default Home;
