import { RouteLoader } from "@/components/Loader";
import "@/styles/globals.css";
import { AnimatePresence } from "framer-motion";
import Head from "next/head";
import Router from "next/router";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);

    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
      </Head>
      <main className="main">
        <div className="page-container">
          <Component isRouteLoading={loading} {...pageProps} />
          <AnimatePresence>{loading ? <RouteLoader /> : null}</AnimatePresence>
        </div>
      </main>
    </>
  );
}
