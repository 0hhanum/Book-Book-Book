import React from "react";

import { GlobalStyle } from "../GlobalStyle";
import styled, { ThemeProvider } from "styled-components";
import { useRecoilValue } from "recoil";
import { isDefaultThemeAtom } from "../atoms";
import { defaultTheme, lighterTheme } from "../theme";
import Sidebar from "./Sidebar";
import NavBar from "./NavBar";
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
const Layout = ({ children }: ILayout) => {
  const isDefaultTheme = useRecoilValue(isDefaultThemeAtom);
  return (
    <ThemeProvider theme={isDefaultTheme ? defaultTheme : lighterTheme}>
      <GlobalStyle />
      <NavBar />
      <Sidebar />
      {children}
      <ThemeLayer
        $isDefaultTheme={isDefaultTheme}
        variants={LayerVariants}
        animate={isDefaultTheme ? "defaultTheme" : "lightTheme"}
      />
    </ThemeProvider>
  );
};

export default Layout;
