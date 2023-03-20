import { motion } from "framer-motion";
import React from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { isDefaultThemeAtom } from "../../atoms";
import { IThemeProp } from "../Layout";

const ToggleContainer = styled(motion.div)<IThemeProp>`
  width: 50px;
  height: 80%;
  display: flex;
  border: 1px solid ${(props) => props.theme.colors.black};
  border-radius: 20px;
  background-color: ${(props) => props.theme.colors.white};
  align-items: center;
  justify-content: ${(props) =>
    props.$isDefaultTheme ? "flex-end" : "flex-start"};
  cursor: pointer;
  padding: 0px 1px;
  position: relative;
  overflow: hidden;
`;
const ToggleLayer = styled(motion.div)`
  background-color: ${(props) => props.theme.colors.black};
  width: 110%;
  height: 110%;
  position: absolute;
  left: -5px;
  border-radius: 20px;
`;
const ToggleCircle = styled(motion.div)`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid ${(props) => props.theme.colors.black};
  background-color: ${(props) => props.theme.colors.white};
  z-index: 2;
`;
const ToggleLayerVariants = {
  defaultTheme: {
    width: "110%",
    transition: {
      duration: 0.8,
    },
  },
  lightTheme: {
    width: 0,
    transition: {
      duration: 0.4,
      delay: 0.5,
    },
  },
};
const ThemeToggle = () => {
  const [isDefaultTheme, setIsDefaultTheme] =
    useRecoilState(isDefaultThemeAtom);
  const toggleTheme = () => {
    setIsDefaultTheme((current) => !current);
  };
  return (
    <ToggleContainer $isDefaultTheme={isDefaultTheme} onClick={toggleTheme}>
      <ToggleLayer
        variants={ToggleLayerVariants}
        animate={isDefaultTheme ? "defaultTheme" : "lightTheme"}
      />
      <ToggleCircle layout />
    </ToggleContainer>
  );
};

export default ThemeToggle;
