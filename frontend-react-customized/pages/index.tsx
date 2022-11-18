import "@onefootprint/footprint-js/dist/footprint-js.css";

import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { FootprintButton } from "@onefootprint/footprint-react";

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
        <FootprintButton
          appearance={{
            variables: {
              fontFamily: '"SF UI Text", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
              linkColor: '#101010',
              colorError: '#D14343',
              buttonPrimaryBg: '#52BD95',
              buttonPrimaryHoverBg: '#429777',
              buttonPrimaryActiveBg: '#317159',
              buttonPrimaryColor: '#FFF',
              buttonBorderRadius: '4px',
              linkButtonColor: '#52BD95',
              labelColor: '#101840',
              inputBorderRadius: '4px',
              inputBorderWidth: '1px',
              inputPlaceholderColor: '#B5B5B5',
              inputColor: '#474d66',
              inputBg: '#FFFFFF',
              inputBorderColor: '#d8dae5',
              inputFocusElevation: 'none',
              inputErrorFocusElevation: 'box-shadow: 0 0 0 2px #d6e0ff;',
              inputHoverBorderColor: '#ADC2FF',
              hintColor: '#696f8c',
            }
          }}
          publicKey="ob_test_WNgSBRR7uxoT8JRDBBflgw"
          onCompleted={(validationToken: string) => {
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
