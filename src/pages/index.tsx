import * as React from "react";
import styled from "styled-components";
import Helmet from "../components/Helmet";
import Layout from "../components/Layout";
import Sidebar from "../components/Sidebar/Sidebar";

const Container = styled.div`
  padding-left: ${(props) => props.theme.variables.sidebarWidth};
`;
const Home = () => {
  return (
    <Layout>
      <Sidebar />
      <Container>
        <h1 style={{ height: "200vh" }}>HOME</h1>
      </Container>
    </Layout>
  );
};

export default Home;
export const Head = () => <Helmet />;
