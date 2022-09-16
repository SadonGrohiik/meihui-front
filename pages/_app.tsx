import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import Layout from "../components/layout";
import "../styles/index.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Head>
        <title>
          <meta
            name="viewport"
            content="minimum-scale=1, initiaal-scale=1, width=device-width"
          />
        </title>
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: "light",
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>
    </Layout>
  );
}

export default MyApp;
