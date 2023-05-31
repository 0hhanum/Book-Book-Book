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
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: gray;
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
              <FlashEffect
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  repeat: 1,
                  duration: 0.5,
                  type: "tween",
                  repeatType: "reverse",
                }}
              />
            )}
          </>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default ScrollAnimationComponent;
