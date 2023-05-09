import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

interface ITypingAnimations {
  text: string;
}

const Pipe = styled(motion.div)`
  width: 2px;
  height: 35px;
  background-color: ${(props) => props.theme.headerColor};
  display: inline-block;
  margin-left: 5px;
  vertical-align: middle;
`;
const Text = styled.p`
  font-size: 24px;
  line-height: 50px;
`;
const TypingAnimations = ({ text }: ITypingAnimations) => {
  const [currentText, setCurrentText] = useState("");
  useEffect(() => {
    if (currentText !== text) {
      setTimeout(() => {
        setCurrentText((prevText) => text.slice(0, prevText.length + 1));
      }, 200);
    }
  }, [currentText]);

  return (
    <Text>
      {currentText}
      <Pipe
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, repeat: Infinity }}
      />
    </Text>
  );
};

export default TypingAnimations;
