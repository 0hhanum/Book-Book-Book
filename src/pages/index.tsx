import * as React from "react";
import type { PageProps } from "gatsby";
import Helmet from "../components/Helmet";
import Layout from "../components/Layout";

const IndexPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <main> HELLO </main>
    </Layout>
  );
};

export default IndexPage;

export const Head = () => <Helmet />;
