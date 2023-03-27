import React from "react";
import styled from "styled-components";
import Helmet from "../components/Helmet";

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
