import { AnimatePresence, motion, useInView } from "framer-motion";
import React, { useRef } from "react";
import styled from "styled-components";

export interface IScrollAnimationComponent {
  texts: string[];
  children?: any;
}
const INTERSECTION_AMOUNT = 0.3;

const Container = styled(motion.div)`
  height: 225vh;
  display: flex;
  justify-content: center;
`;
const TextContainer = styled(motion.div)`
  position: fixed;
  top: ${(props) =>
    `calc(50% - ${props.theme.variables.headerHeight}px)`}; // Set to middle of the screen
  display: flex;
  flex-direction: column;
  z-index: 2;
`;

const Text = styled.span`
  margin-bottom: 40px;
  font-size: 50px;
  font-weight: bold;
  display: flex;
  justify-content: center;
`;

const ScrollAnimationComponent = ({
  texts,
  children,
}: IScrollAnimationComponent) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { amount: INTERSECTION_AMOUNT });
  return (
    <Container
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
    >
      <AnimatePresence>
        {isInView && (
          <>
            <TextContainer
              initial={{ translateY: "calc(-35% + 80px)" }}
              animate={{ translateY: "calc(-50% + 80px)" }}
              transition={{ duration: 1, ease: [0.17, 0.55, 0.55, 1] }}
              exit={{ translateY: "calc(-65% + 80px)" }}
            >
              {texts.map((text, i) => (
                <Text key={i}>{text}</Text>
              ))}
            </TextContainer>
            {children}
          </>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default ScrollAnimationComponent;
