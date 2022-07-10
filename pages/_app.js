import Layout from "../components/Layout/Layout";
import { UxWrapper } from "../contexts/uxContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <UxWrapper>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UxWrapper>
  );
}

export default MyApp;
