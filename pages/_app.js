import Head from "next/head";
import { useRouter } from "next/router";
import { Inter } from "@next/font/google";
import { ThemeProvider } from "next-themes";
import Header from "@/components/Header";
import "@/styles/globals.css";

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

      <ThemeProvider enableSystem={false}>
        <>
          {!isAuthPage && <Header />}
          <Component {...pageProps} />
        </>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
