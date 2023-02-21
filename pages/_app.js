import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Sofia_Sans } from "@next/font/google";
import { ThemeProvider } from "next-themes";
import Header from "@/components/Header";
import "@/styles/globals.css";
import Footer from "@/components/Footer";

const sans = Sofia_Sans({
  subsets: ["latin"],
  display: "swap",
});

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [queryClient] = React.useState(() => new QueryClient());
  const isAuthPage = router.pathname.startsWith("/auth");

  return (
    <>
      <style jsx global>
        {`
          :root {
            --font-sans: ${sans.style.fontFamily};
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

      <QueryClientProvider client={queryClient}>
        <ThemeProvider enableSystem={false}>
          <>
            {!isAuthPage && <Header />}
            <Component {...pageProps} />
            {!isAuthPage && <Footer />}
          </>
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
