import "/styles/globals.css";
import { ThirdwebProvider } from "@thirdweb-dev/react";

export default function App({ Component, pageProps }) {
  return (
    <ThirdwebProvider
      activeChain="polygon"
      clientId="88957554003bd70a27e4fe5bd8ab47eb"
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}
