import React from "react";
import Helmet from "../../components/Helmet";
import styled from "styled-components";
import MailSendSuccessSvg from "../../components/Mail/MailSendSuccessSvg";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: ${(props) => `calc(100vh - ${props.theme.variables.headerHeight}px)`};
`;
const TextBox = styled.div``;
const Text = styled.h1`
  font-size: 64px;
  letter-spacing: 8px;
`;
const SuccessSendMail = () => {
  return (
    <Container>
      <TextBox>
        <Text>Sent Successfully!</Text>
        <Text>Thank you for contact.</Text>
      </TextBox>
      <MailSendSuccessSvg />
    </Container>
  );
};

export default SuccessSendMail;
export const Head = () => <Helmet title="Mail" />;
