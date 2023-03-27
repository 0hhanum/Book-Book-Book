import * as React from "react";
import styled from "styled-components";
import Helmet from "../components/Helmet";
import BookList from "../components/BookList";
import Sidebar from "../components/Sidebar/Sidebar";

const Container = styled.div`
  padding-left: ${(props) => `${props.theme.variables.sidebarWidth}px`};
`;
const Home = () => {
  return (
    <>
      <Sidebar />
      <Container>
        <BookList />
      </Container>
    </>
  );
};

export default Home;
export const Head = () => <Helmet />;
