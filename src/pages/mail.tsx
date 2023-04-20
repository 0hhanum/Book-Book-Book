import React from "react";
import Helmet from "../components/Helmet";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
`;
const ContentLayout = styled.div`
  display: flex;
  width: 100%;
`;
const ContentSection = styled.section`
  width: 50%;
  height: ${(props) => `calc(100vh - ${props.theme.variables.headerHeight}px)`};
  &:first-child {
    border-right: ${(props) => `1px solid ${props.theme.normalColor}`};
    display: flex;
    align-items: flex-end;
    h1 {
      font-size: 128px;
      margin-bottom: 24px;
    }
  }
  &:last-child {
    h1 {
      font-size: 64px;
      letter-spacing: 8px;
    }
  }
`;
const Mail = () => {
  return (
    <Container>
      <ContentLayout>
        <ContentSection>
          <h1>Get in touch</h1>
        </ContentSection>
        <ContentSection>
          <h1>rntls123@</h1>
          <h1>naver.com</h1>
        </ContentSection>
      </ContentLayout>
    </Container>
  );
};

export default Mail;
export const Head = () => <Helmet title="Mail" />;
