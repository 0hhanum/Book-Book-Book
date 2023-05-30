import { motion, useInView } from "framer-motion";
import React, { useRef } from "react";
import styled from "styled-components";

type TDirection = "left" | "right";
export interface IScrollAnimationComponent {
  texts: string[];
  direction?: TDirection;
}
const Container = styled(motion.div)<{ direction: TDirection }>`
  height: 225vh;
  display: flex;
  justify-content: ${(props) => (props.direction === "left" ? "start" : "end")};
`;
const TextContainer = styled.div`
  position: fixed;
  top: ${(props) => `calc(50% - ${props.theme.variables.headerHeight}px)`};
  display: flex;
  flex-direction: column;
`;

const Text = styled.span`
  margin-bottom: 40px;
  font-size: 50px;
  font-weight: bold;
`;
const ScrollAnimationComponent = ({
  texts,
  direction = "left",
}: IScrollAnimationComponent) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { amount: 0.4 });
  return (
    <Container
      direction={direction}
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
    >
      <TextContainer>
        {texts.map((text, i) => (
          <Text key={i}>{text}</Text>
        ))}
      </TextContainer>
    </Container>
  );
};

export default ScrollAnimationComponent;
