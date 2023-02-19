import Head from "next/head";
import { Header } from "@/components/Header";
import "@/styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Tammy AI</title>
        <meta
          name="description"
          content="Effortlessly create summaries of YouTube videos."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
