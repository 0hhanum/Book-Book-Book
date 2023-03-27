import * as React from "react";
import styled from "styled-components";
import Helmet from "../components/Helmet";
import Layout from "../components/Layout";
import Sidebar from "../components/Sidebar/Sidebar";

const Container = styled.div`
  padding-left: ${(props) => `${props.theme.variables.sidebarWidth}px`};
`;
const Test = () => {
  return (
    <>
      <Container>
        <h1>test</h1>
      </Container>
    </>
  );
};

export default Test;
export const Head = () => <Helmet title="testing" />;
