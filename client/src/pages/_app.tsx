import StackNotification from "@/components/Interface/StackNotification/StackNotification";
import Layout from "@/components/Layout/Layout";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import type { AppProps } from "next/app";
import { CookiesProvider } from "react-cookie";
import "./ToastEditor.css";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient()

  return (
    <CookiesProvider>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <StackNotification />
          <Component {...pageProps} />
        </Layout>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </CookiesProvider>
  );
}
