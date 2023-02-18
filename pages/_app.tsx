import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithAuth0 } from "convex/react-auth0";
import convexConfig from "../convex.json";
import "../styles/globals.css";
import type { AppProps } from "next/app";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
const authInfo = convexConfig.authInfo[0];

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ConvexProviderWithAuth0 client={convex} authInfo={authInfo}>
      <Component {...pageProps} />
    </ConvexProviderWithAuth0>
  );
}
