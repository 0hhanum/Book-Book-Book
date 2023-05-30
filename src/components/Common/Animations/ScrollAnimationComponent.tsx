import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";

interface IScrollAnimationComponent {
  texts: string[];
}
const Container = styled(motion.div)`
  height: 100vh;
  background: gray;
  height: ${(props) => `calc(100vh - ${props.theme.variables.headerHeight}px)`};
`;
const TextContainer = styled.div``;

const Text = styled.span``;
const ScrollAnimationComponent = ({ texts }: IScrollAnimationComponent) => {
  return (
    <Container>
      <TextContainer>
        {texts.map((text, i) => (
          <Text key={i}>{text}</Text>
        ))}
      </TextContainer>
    </Container>
  );
};

export default ScrollAnimationComponent;
