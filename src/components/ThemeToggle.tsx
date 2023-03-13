import { motion } from "framer-motion";
import React from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { isDefaultThemeAtom } from "../atoms";

const ToggleContainer = styled(motion.div)<{ isDefaultTheme: boolean }>`
  width: 50px;
  height: 80%;
  display: flex;
  border: 1px solid
    ${(props) =>
      props.isDefaultTheme
        ? props.theme.fontColor
        : props.theme.backgroundColor};
  border-radius: 20px;
  background-color: ${(props) =>
    props.isDefaultTheme ? props.theme.backgroundColor : props.theme.fontColor};
  align-items: center;
  justify-content: ${(props) =>
    props.isDefaultTheme ? "flex-end" : "flex-start"};
  cursor: pointer;
`;
const ToggleCircle = styled(motion.div)<{ isDefaultTheme: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid
    ${(props) =>
      props.isDefaultTheme
        ? props.theme.backgroundColor
        : props.theme.fontColor};
  background-color: ${(props) =>
    props.isDefaultTheme ? props.theme.fontColor : props.theme.backgroundColor};
`;
const ThemeToggle = () => {
  const [isDefaultTheme, setIsDefaultTheme] =
    useRecoilState(isDefaultThemeAtom);
  const toggleTheme = () => {
    setIsDefaultTheme((current) => !current);
  };
  return (
    <ToggleContainer isDefaultTheme={isDefaultTheme} onClick={toggleTheme}>
      <ToggleCircle isDefaultTheme={isDefaultTheme} />
    </ToggleContainer>
  );
};

export default ThemeToggle;
