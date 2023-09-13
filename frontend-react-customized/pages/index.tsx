import "@onefootprint/footprint-js/dist/footprint-js.css";

import type { NextPage } from "next";
import Head from "next/head";
import { FootprintVerifyButton } from "@onefootprint/footprint-react";

import styles from "../styles/Home.module.css";

const appearance = {
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
};

const Home: NextPage = () => (
  <>
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />
      <title>Footprint | React + Typescript + Next.js</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <main className={styles.main}>
      <FootprintVerifyButton
        publicKey="ob_test_WNgSBRR7uxoT8JRDBBflgw"
        onComplete={(validationToken) => {
          console.log("on completed", validationToken);
        }}
        onCancel={() => {
          console.log("user canceled!");
        }}
      />
    </main>
  </>
)

export default Home;
