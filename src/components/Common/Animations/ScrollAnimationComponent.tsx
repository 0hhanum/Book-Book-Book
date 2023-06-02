import { AnimatePresence, motion, useInView } from "framer-motion";
import React, { useRef } from "react";
import styled from "styled-components";

export interface IScrollAnimationComponent {
  texts: string[];
  flashEffect?: boolean;
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
  transform: translateX("-50px");
`;
const FlashEffect = styled(motion.div)`
  position: fixed;
  top: ${(props) => `${props.theme.variables.headerHeight}px`};
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${(props) => props.theme.warningColor};
`;
const FlashEffectLeft = styled(motion.div)`
  position: fixed;
  top: ${(props) => `${props.theme.variables.headerHeight}px`};
  bottom: 0;
  left: 0;
  right: 0%;
  clip-path: polygon(26% 0, 76% 100%, 0 100%, 0 0);
`;

const FlashEffectRight = styled(motion.div)`
  position: fixed;
  top: ${(props) => `${props.theme.variables.headerHeight}px`};
  bottom: 0;
  left: 0%;
  right: 0;
  clip-path: polygon(100% 0, 100% 100%, 75% 100%, 25% 0);
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
  flashEffect = false,
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
              initial={{ translateY: "50px" }}
              animate={{ translateY: 0 }}
              transition={{ duration: 1, ease: [0.17, 0.55, 0.55, 1] }}
              exit={{ translateY: "-50px" }}
            >
              {texts.map((text, i) => (
                <Text key={i}>{text}</Text>
              ))}
            </TextContainer>
            {flashEffect && (
              <>
                <FlashEffectLeft
                  initial={{ x: 0, y: 0 }}
                  animate={{
                    x: "-5%",
                    y: "-5%",
                    rotate: "-1deg",
                    backgroundColor: "red",
                  }}
                  exit={{ opacity: 0 }}
                  transition={{
                    delay: 0.3,
                    duration: 0.3,
                    type: "tween",
                  }}
                />
                <FlashEffectRight
                  initial={{ x: 0, y: 0 }}
                  animate={{
                    x: "5%",
                    y: "5%",
                    rotate: "2deg",
                    backgroundColor: "red",
                  }}
                  exit={{ opacity: 0 }}
                  transition={{
                    delay: 0.3,
                    duration: 0.3,
                    type: "tween",
                  }}
                />
              </>
            )}
          </>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default ScrollAnimationComponent;
