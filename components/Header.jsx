import Head from "next/head";

export const Header = function () {
  return (
    <Head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Rendevous</title>
      {/* <link rel="stylesheet" href="./public/styles.css" /> */}
      <script src="https://unpkg.com/streamr-client@latest/streamr-client.web.js"></script>

      <script
        defer
        src="https://cdn.ethers.io/lib/ethers-5.7.2.umd.min.js"
        type="application/javascript"
      ></script>
      {/* LEAFLET LIBRARY */}
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
        crossorigin=""
      />

      {/* <!-- Make sure you put this AFTER Leaflet's CSS --> */}
      <script
        src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
        integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
        crossorigin=""
      ></script>

      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
      />

      {/* <script type="module" src="./src/index.js"></script> */}
    </Head>
  );
};
