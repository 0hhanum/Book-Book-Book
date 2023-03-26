import * as React from "react";
import styled from "styled-components";
import Helmet from "../components/Helmet";
import Layout from "../components/Layout";
import Books from "../components/Books";
import Sidebar from "../components/Sidebar/Sidebar";

const Container = styled.div`
  padding-left: ${(props) => `${props.theme.variables.sidebarWidth}px`};
`;
const Home = () => {
  return (
    <Layout>
      <Sidebar />
      <Container>
        <Books />
      </Container>
    </Layout>
  );
};

export default Home;
export const Head = () => <Helmet />;
