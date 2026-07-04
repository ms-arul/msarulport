import { useRouter } from "next/router";

import Layout from "../components/Layout";
import { ActiveSectionProvider } from "../components/ActiveSectionContext";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <ActiveSectionProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ActiveSectionProvider>
  );
}

export default MyApp;
