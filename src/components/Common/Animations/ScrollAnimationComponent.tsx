import { AnimatePresence, motion, useInView } from "framer-motion";
import React, { useRef } from "react";
import styled from "styled-components";

type TDirection = "left" | "right";
export interface IScrollAnimationComponent {
  texts: string[];
  direction?: TDirection;
}
const INTERSECTION_AMOUNT = 0.3;

const Container = styled(motion.div)<{ direction: TDirection }>`
  height: 225vh;
  display: flex;
  justify-content: ${(props) => (props.direction === "left" ? "start" : "end")};
`;
const TextContainer = styled(motion.div)`
  position: fixed;
  top: ${(props) => `calc(50% - ${props.theme.variables.headerHeight}px)`};
  display: flex;
  flex-direction: column;
  transform: translateX("-50px");
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
  const isInView = useInView(containerRef, { amount: INTERSECTION_AMOUNT });
  return (
    <Container
      direction={direction}
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
    >
      <AnimatePresence>
        {isInView && (
          <TextContainer
            initial={{ translateY: "50px" }}
            animate={{ translateY: 0 }}
            transition={{ duration: 1, type: "spring" }}
            exit={{ translateY: "-50px" }}
          >
            {texts.map((text, i) => (
              <Text key={i}>{text}</Text>
            ))}
          </TextContainer>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default ScrollAnimationComponent;
