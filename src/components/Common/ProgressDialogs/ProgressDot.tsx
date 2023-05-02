import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";

const ParentDot = styled(motion.div)`
  width: 250px;
  height: 250px;
  background-color: ${(props) => props.theme.headerColor};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ProgressDot = () => {
  return (
    <ParentDot
      initial={{ rotateY: 0 }}
      animate={{ rotateX: "180deg", rotateY: "360deg" }}
      transition={{ duration: 1, repeat: Infinity }}
    />
  );
};

export default ProgressDot;
