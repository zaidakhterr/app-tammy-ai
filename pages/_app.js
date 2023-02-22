import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Inter } from "@next/font/google";
import { ThemeProvider } from "next-themes";
import Header from "@/components/Header";
import "@/styles/globals.css";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/utils/useAuth";

const sans = Inter({
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

      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider enableSystem={false}>
            <>
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
