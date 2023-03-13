import * as React from "react";
import Helmet from "../components/Helmet";
import Layout from "../components/Layout";

const Home = () => {
  return (
    <Layout>
      <main>Home</main>
    </Layout>
  );
};

export default Home;
export const Head = () => <Helmet />;
