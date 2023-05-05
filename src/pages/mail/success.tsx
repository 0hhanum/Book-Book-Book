import React from "react";
import Helmet from "../../components/Helmet";
import styled from "styled-components";
import { motion } from "framer-motion";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: ${(props) => `calc(100vh - ${props.theme.variables.headerHeight}px)`};
`;
const TextBox = styled.div``;
const Text = styled.h1`
  font-size: 64px;
  letter-spacing: 7px;
`;
const Horizon = styled.div`
  width: 100%;
  height: 2.5px;
  position: fixed;
  background-color: ${(props) => props.theme.fontColor};
  transform: translateY(-4rem);
  z-index: 1;
`;
const MovingLine = styled(motion.div)`
  width: 20%;
  height: 2.5px;
  position: fixed;
  background-color: ${(props) => props.theme.headerColor};
  transform: translateY(-4rem);
  z-index: 2;
`;
const movingLineVariants = {
  initial: {
    left: "-20%",
  },
  animate: {
    left: "110%",
    transition: {
      duration: 1,
      repeat: 1,
      repeatType: "reverse",
      type: "tween",
    },
  },
};
const SuccessSendMail = () => {
  return (
    <Container>
      <Horizon />
      <MovingLine
        variants={movingLineVariants}
        initial="initial"
        animate="animate"
      />
      <TextBox>
        <Text>Sent Successfully!</Text>
        <Text>Thank you for contact.</Text>
      </TextBox>
    </Container>
  );
};

export default SuccessSendMail;
export const Head = () => <Helmet title="Mail" />;
