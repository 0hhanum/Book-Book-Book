import { AnimatePresence, motion, useInView } from "framer-motion";
import React, { useRef } from "react";
import styled from "styled-components";

export interface IScrollAnimationComponent {
  texts: string[];
  flashEffect?: boolean;
}
const INTERSECTION_AMOUNT = 0.3;
const FLASH_EFFECT_OPACITY_DELAY = 0.5;
const FLASH_EFFECT_OPACITY_DURATION = 0.5;
const FLASH_EFFECT_BROKEN_DELAY = 1.5;
const FLASH_EFFECT_BROKEN_DURATION = 0.1;

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
  z-index: 2;
`;
const FlashEffect = styled(motion.div)`
  position: fixed;
  top: ${(props) => `${props.theme.variables.headerHeight}px`};
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #a70e0e;
  z-index: 1;
  opacity: 0;
`;
const FlashEffectLeft = styled(FlashEffect)`
  clip-path: polygon(25% 0, 75% 100%, 0 100%, 0 0);
`;

const FlashEffectRight = styled(FlashEffect)`
  clip-path: polygon(100% 0, 100% 100%, 75% 100%, 25% 0);
`;

const Text = styled.span`
  margin-bottom: 40px;
  font-size: 50px;
  font-weight: bold;
  display: flex;
  justify-content: center;
`;

const FlashEffectVariants = {
  initial: { x: 0, y: 0 },
  animate: {
    opacity: [0, 1],
    transition: {
      delay: FLASH_EFFECT_OPACITY_DELAY,
      duration: FLASH_EFFECT_OPACITY_DURATION,
      ease: "easeIn",
      x: {
        delay: FLASH_EFFECT_BROKEN_DELAY,
        duration: FLASH_EFFECT_BROKEN_DURATION,
      },
      y: {
        delay: FLASH_EFFECT_BROKEN_DELAY,
        duration: FLASH_EFFECT_BROKEN_DURATION,
      },
      rotate: {
        delay: FLASH_EFFECT_BROKEN_DELAY,
        duration: FLASH_EFFECT_BROKEN_DURATION,
      },
    },
  },
  exit: { display: "none" },
};
const FlashEffectLeftVariants = {
  ...FlashEffectVariants,
  animate: {
    ...FlashEffectVariants.animate,
    x: ["0%", "-5%"],
    y: ["0%", "-5%"],
    rotate: ["0deg", "-1deg"],
  },
};
const FlashEffectRightVariants = {
  ...FlashEffectVariants,
  animate: {
    ...FlashEffectVariants.animate,
    x: ["0%", "5%"],
    y: ["0%", "5%"],
    rotate: ["0deg", "2deg"],
  },
};
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
                  variants={FlashEffectLeftVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                />
                <FlashEffectRight
                  variants={FlashEffectRightVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
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
