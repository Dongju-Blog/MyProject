import StackNotification from "@/components/Interface/StackNotification/StackNotification";
import Layout from "@/components/Layout/Layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { CookiesProvider } from "react-cookie";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CookiesProvider>
      <Layout>
        <StackNotification />
        <Component {...pageProps} />
      </Layout>
    </CookiesProvider>
  );
}
