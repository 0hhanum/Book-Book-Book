import * as React from "react";
import Helmet from "../components/Helmet";
import Layout from "../components/Layout";

const IndexPage = () => {
  return (
    <Layout>
      <main> HELLO </main>
    </Layout>
  );
};

export default IndexPage;
export const Head = () => <Helmet />;
