import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Montserrat } from "@next/font/google";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/utils/useAuth";
import { Banner } from "@/components/Banner";

import "@/styles/globals.css";

// const sans = Roboto_Flex({
//   subsets: ["latin"],
//   display: "swap",
// });

const sans = Montserrat({
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

      <Toaster
        toastOptions={{
          className: "dark:bg-neutral-700 dark:text-neutral-100",
        }}
      />
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider enableSystem={false}>
            <>
              <Banner />
              {!isAuthPage && <Header />}
              <Component {...pageProps} />
              {!isAuthPage && <Footer />}
            </>
          </ThemeProvider>
        </QueryClientProvider>
      </AuthProvider>
    </>
  );
}

export default MyApp;
