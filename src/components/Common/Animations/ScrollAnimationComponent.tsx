import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";

type TDirection = "left" | "right";
export interface IScrollAnimationComponent {
  texts: string[];
  direction?: TDirection;
}
const Container = styled(motion.div)<{ direction: TDirection }>`
  height: 100vh;
  height: ${(props) => `calc(100vh - ${props.theme.variables.headerHeight}px)`};
  border-bottom: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.direction === "left" ? "start" : "end")};
`;
const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Text = styled.span`
  margin-bottom: 40px;
  font-size: 50px;
  font-weight: lighter;
`;
const ScrollAnimationComponent = ({
  texts,
  direction = "left",
}: IScrollAnimationComponent) => {
  return (
    <Container direction={direction}>
      <TextContainer>
        {texts.map((text, i) => (
          <Text key={i}>{text}</Text>
        ))}
      </TextContainer>
    </Container>
  );
};

export default ScrollAnimationComponent;
