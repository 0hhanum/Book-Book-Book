import { AnimatePresence, motion, useInView } from "framer-motion";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";

export interface IScrollAnimationComponent {
  texts: string[];
  isVanishingEffect?: boolean;
  vanishingCallback?: () => void;
  children?: JSX.Element;
}
const INTERSECTION_AMOUNT = 0.3;
const TRANSLATE_Y_BEZIER_CONSTANTS = {
  translateY: {
    duration: 1,
    ease: [0.17, 0.55, 0.55, 1],
  },
};

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
  isVanishingEffect = false,
  vanishingCallback,
}: IScrollAnimationComponent) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { amount: INTERSECTION_AMOUNT });
  useEffect(() => {
    if (isInView && vanishingCallback) {
      vanishingCallback();
    }
  }, [isInView]);
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
              initial={{ translateY: "calc(-30% + 80px)" }}
              animate={{
                translateY: "calc(-50% + 80px)",
                // TODO :: last page
                opacity: isVanishingEffect ? [1, 0] : 1,
                transition: {
                  ...TRANSLATE_Y_BEZIER_CONSTANTS,
                  opacity: {
                    duration: 5,
                  },
                },
                transitionEnd: {
                  visibility: isVanishingEffect ? "hidden" : "visible",
                },
              }}
              exit={{
                translateY: "calc(-70% + 80px)",
                transition: {
                  ...TRANSLATE_Y_BEZIER_CONSTANTS,
                },
              }}
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
