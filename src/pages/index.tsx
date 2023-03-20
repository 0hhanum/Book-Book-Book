import * as React from "react";
import Helmet from "../components/Helmet";
import Layout from "../components/Layout";

const Home = () => {
  return (
    <Layout>
      <h1 style={{ height: "200vh" }}>HOME</h1>
    </Layout>
  );
};

export default Home;
export const Head = () => <Helmet />;
