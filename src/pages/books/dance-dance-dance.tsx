import React from "react";
import Helmet from "../../components/Helmet";
import styled from "styled-components";
import ScrollUIComponent from "../../components/Common/ScrollUIComponent";

const Container = styled.div``;
const DanceDanceDance = () => {
  return (
    <Container>
      <ScrollUIComponent />
    </Container>
  );
};

export default DanceDanceDance;
export const Head = () => <Helmet title="Dance Dance Dance" />;
