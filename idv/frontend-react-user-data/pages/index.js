import "@onefootprint/footprint-js/dist/footprint-js.css";

import Head from "next/head";
import styles from "../styles/Home.module.css";
import { FootprintVerifyButton } from "@onefootprint/footprint-react";

const Home = () => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <title>Footprint | React + Next.js</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <FootprintVerifyButton
          publicKey="ob_test_WNgSBRR7uxoT8JRDBBflgw"
          l10n={{ locale: "en-US" }}
          userData={{
            "id.email": "jane.doe@acme.com",
          }}
          onComplete={(validationToken) => {
            console.log("on completed", validationToken);
          }}
          onCancel={() => {
            console.log("onCanceled");
          }}
        />
      </main>
    </>
  );
};

export default Home;
