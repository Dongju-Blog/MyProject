import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <div id="portal" />
        <Main />
        <NextScript />
      </body>
      <script>
        if (!crossOriginIsolated) SharedArrayBuffer = ArrayBuffer;
      </script>
    </Html>
  )
}
