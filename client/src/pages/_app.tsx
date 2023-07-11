import StackNotification from '@/components/Interface/StackNotification/StackNotification'
import Layout from '@/components/Layout/Layout'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Layout><StackNotification/><Component {...pageProps} /></Layout>
}
