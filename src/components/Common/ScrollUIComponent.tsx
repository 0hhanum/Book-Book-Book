import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";

const Container = styled(motion.div)`
  position: fixed;
  bottom: 5vh;
  right: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Mouse = styled.div`
  height: 50px;
  width: 30px;
  border: ${(props) => `2px solid ${props.theme.fontColor}`};
  border-radius: 30px;
  position: relative;
  display: flex;
  justify-content: center;
  margin-bottom: 8px;
`;
const Wheel = styled.div`
  width: 2px;
  height: 10px;
  position: absolute;
  top: 10px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.fontColor};
`;
const Arrow = styled.div`
  width: 12px;
  height: 12px;
  border-right: ${(props) => `2px solid ${props.theme.fontColor}`};
  border-bottom: ${(props) => `2px solid ${props.theme.fontColor}`};
  transform: rotate(45deg);
`;
const ScrollComponentVariants = {
  initial: {
    translateY: 0,
  },
  animate: {
    translateY: 20,
    transition: {
      repeat: Infinity,
      duration: 1,
      repeatType: "reverse",
    },
  },
};
const ScrollUIComponent = () => {
  return (
    <Container
      variants={ScrollComponentVariants}
      initial="initial"
      animate="animate"
    >
      <Mouse>
        <Wheel />
      </Mouse>
      <Arrow />
    </Container>
  );
};

export default ScrollUIComponent;
