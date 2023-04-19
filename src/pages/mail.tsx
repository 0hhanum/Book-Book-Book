import React from "react";
import Helmet from "../components/Helmet";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
`;
const Header = styled.div`
  height: ${(props) => `${props.theme.variables.headerHeight}px`};
  border-bottom: ${(props) => `1px solid ${props.theme.normalColor}`};
  padding-top: 22px;
  display: flex;
  h1 {
    font-size: 42px;
  }
`;
const ContentLayout = styled.div`
  display: flex;
  width: 100%;
`;
const ContentSection = styled.section`
  width: 50%;
  height: calc(100vh - 120px);
  &:first-child {
    border-right: ${(props) => `1px solid ${props.theme.normalColor}`};
  }
`;
const Mail = () => {
  return (
    <Container>
      <Header>
        <h1>Get in touch</h1>
      </Header>
      <ContentLayout>
        <ContentSection></ContentSection>
        <ContentSection></ContentSection>
      </ContentLayout>
    </Container>
  );
};

export default Mail;
export const Head = () => <Helmet title="Mail" />;
