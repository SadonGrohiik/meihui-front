import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider, Button } from "@mantine/core";
import Layout from "../components/layout";
import "../styles/index.scss";
import Cookie from "js-cookie";
import fetch from "isomorphic-fetch";
import AppContext from "../context/AppContext";
import React from "react";
import App from "next/app";

// import withData from "../lib/apollo";

class MyApp extends App {
  state = {
    user: null,
  };
  componentDidMount() {
    //grab token from cookie
    const token = Cookie.get("token");
    if (token) {
      //authenticate the token on the server andp lace setr user object
      fetch(`${process.env.STRAPI_URL}/users/me`),
        {
          headers: {
            Authorisation: `Bearer ${token}`,
          },
        };
    }
  }
  render() {
    const { Component, pageProps } = this.props;
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
            fontFamily: "Yekan",
            colors: {
              pastelYellow: ["#fed097"],
              pastelBlue: [
                "#d2f7ef",
                "#c1ece4",
                "#a3dbd0",
                "#88d0c3",
                "#7bcbbc",
                "#6fc7b7",
                "#6fb7a9",
                "#62a296",
              ],
            },
          }}
        >
          <Component {...pageProps} />
        </MantineProvider>
      </Layout>
    );
  }
}

export default MyApp;
