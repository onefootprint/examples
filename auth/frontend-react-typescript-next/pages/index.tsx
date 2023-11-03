import "@onefootprint/footprint-js/dist/footprint-js.css";
import footprint, { FootprintComponentKind } from '@onefootprint/footprint-js'

import type { NextPage } from "next";
import Head from "next/head";

import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const handleClick = () => {
    const fp = footprint.init({
      kind: FootprintComponentKind.Auth,
      publicKey: 'pb_test_ecsBv8tMC1qUXVX1Yya7jG',
      onComplete: (validationToken: string) => {
        console.log('validationToken', validationToken);
      },
    });
    fp.render();
  }

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
        <div className={styles.container}>
          <button type="button" onClick={handleClick}>Sign in with Footprint</button>
        </div>
      </main>
    </>
  );
};

export default Home;
