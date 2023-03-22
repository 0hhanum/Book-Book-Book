import React from "react";

import { GlobalStyle } from "../GlobalStyle";
import styled, { ThemeProvider } from "styled-components";
import { useRecoilValue } from "recoil";
import { isDefaultThemeAtom } from "../atoms";
import { defaultTheme, lighterTheme } from "../theme";
import Sidebar from "./Sidebar/Sidebar";
import NavBar from "./Nav/NavBar";
import { motion } from "framer-motion";

interface ILayout {
  children: any;
}
export interface IThemeProp {
  $isDefaultTheme: boolean;
}
const LayerVariants = {
  defaultTheme: {
    bottom: 0,
    transition: {
      duration: 0.8,
      bounce: 0,
      type: "spring",
    },
  },
  lightTheme: {
    bottom: "100vh",
    transition: {
      duration: 0.8,
      bounce: 0,
      type: "spring",
    },
  },
};
const ThemeLayer = styled(motion.div)<IThemeProp>`
  position: fixed;
  top: 0;
  left: 0;
  bottom: ${(props) => (props.$isDefaultTheme ? 0 : "100vh")};
  right: 0;
  z-index: -1;
  background-color: ${(props) => props.theme.colors.black};
`;
// for minimum device size
const NoticeScreen = styled.div`
  display: none;
  /* Styles for the notice screen */

  @media (max-width: 991.98px) {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 40px;
    background-color: ${(props) => props.theme.backgroundColor};
    font-size: 24px;
    font-weight: bold;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    font-size: 36px;
    z-index: 9999;
  }
`;
const Layout = ({ children }: ILayout) => {
  const isDefaultTheme = useRecoilValue(isDefaultThemeAtom);
  return (
    <ThemeProvider theme={isDefaultTheme ? defaultTheme : lighterTheme}>
      <GlobalStyle />
      <NavBar />
      {children}
      <ThemeLayer
        $isDefaultTheme={isDefaultTheme}
        variants={LayerVariants}
        animate={isDefaultTheme ? "defaultTheme" : "lightTheme"}
      />
      <NoticeScreen>
        Sorry, this content is only available on larger screens.
      </NoticeScreen>
    </ThemeProvider>
  );
};

export default Layout;
