import { Html, Head, Main, NextScript } from "next/document";
import { Navbar } from "/components/Navbar";
import { Sidebar } from "/components/Sidebar";
import { RenderMap } from "/components/RenderMap";
import { IncomingStreams } from "/components/IncomingStreams";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>
      <body>
        <Main />

        {/* <Sidebar /> */}
        <IncomingStreams />
        {/* <RenderMap /> */}
        <NextScript />
        <div id="map"></div>
      </body>
    </Html>
  );
}
