import React from "react";
import Helmet from "../../components/Helmet";
import styled from "styled-components";
import { navigate } from "gatsby";
const Container = styled.div`
  width: 100%;
  height: ${(props) => `calc(100vh - ${props.theme.variables.headerHeight}px)`};
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Text = styled.h1`
  font-size: 80px;
  margin-bottom: 20px;
`;
const SubText = styled.h2`
  font-size: 48px;
  margin-bottom: 20px;
`;
const ConfirmBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;
const Horizon = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${(props) => props.theme.fontColor};
`;
const ConfirmButton = styled.div`
  width: 260px;
  height: 100px;
  display: flex;
  font-size: 30px;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: ${(props) => `1px solid ${props.theme.normalColor}`};
  cursor: pointer;
  :hover {
    background-color: ${(props) => props.theme.fontColor};
    color: ${(props) => props.theme.backgroundColor};
  }
`;
const HotlineConfirm = () => {
  const onClick = () => {
    navigate("hotline/call");
  };
  return (
    <Container>
      <Text>Are you up for a chat now?</Text>
      <SubText>I'll connect you to my hotline!</SubText>
      <ConfirmBox>
        <Horizon />
        <ConfirmButton onClick={onClick}>Okay</ConfirmButton>
      </ConfirmBox>
    </Container>
  );
};

export default HotlineConfirm;
export const Head = () => <Helmet title="Hotline" />;
