import Head from "next/head";
import Header from "@/components/Header";
import { Inter } from "@next/font/google";
import "@/styles/globals.css";
import { useRouter } from "next/router";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const isAuthPage = router.pathname.startsWith("/auth");

  return (
    <>
      <style jsx global>
        {`
          :root {
            --font-inter: ${inter.style.fontFamily};
          }
        `}
      </style>
      <Head>
        <title>Tammy AI</title>
        <meta
          name="description"
          content="Effortlessly create summaries of YouTube videos."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {!isAuthPage && <Header />}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
