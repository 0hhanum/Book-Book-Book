import * as React from "react";
import styled from "styled-components";
import Helmet from "../components/Helmet";
import Layout from "../components/Layout";
import Sidebar from "../components/Sidebar/Sidebar";

const Container = styled.div`
  padding-left: ${(props) => `${props.theme.variables.sidebarWidth}px`};
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Bookshelf = styled.div`
  width: 90%;
  height: 35vh;
  border-bottom: ${(props) =>
    `10px solid ${props.theme.colors.bookshelfColor}`};
  border-radius: 10px;
`;
const Home = () => {
  return (
    <Layout>
      <Sidebar />
      <Container>
        <Bookshelf />
        <Bookshelf />
      </Container>
    </Layout>
  );
};

export default Home;
export const Head = () => <Helmet />;
