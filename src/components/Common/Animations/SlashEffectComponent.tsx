import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";

const FLASH_EFFECT_OPACITY_DELAY = 0.3;
const FLASH_EFFECT_OPACITY_DURATION = 0.5;
const FLASH_EFFECT_BROKEN_DELAY = 1.2;
const FLASH_EFFECT_BROKEN_DURATION = 0.1;
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
const SlashEffectComponent = () => {
  return (
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
  );
};

export default SlashEffectComponent;
