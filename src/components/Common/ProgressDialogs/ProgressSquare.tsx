import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";

const Dot = styled(motion.div)`
  width: 250px;
  height: 250px;
  background-color: ${(props) => props.theme.headerColor};
  border-radius: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ProgressSquare = () => {
  return (
    <Dot
      initial={{ rotate: 0 }}
      animate={{ rotate: 180 }}
      transition={{
        duration: 1,
        repeat: Infinity,
      }}
    />
  );
};

export default ProgressSquare;
