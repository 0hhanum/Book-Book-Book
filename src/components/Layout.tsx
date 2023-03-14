import React from "react";

import { GlobalStyle } from "../GlobalStyle";
import styled, { ThemeProvider } from "styled-components";
import { useRecoilValue } from "recoil";
import { isDefaultThemeAtom } from "../atoms";
import { defaultTheme, lighterTheme } from "../theme";
import Sidebar from "./Sidebar";
import NavBar from "./NavBar";

interface ILayout {
  children: any;
}
const Layer = styled.div<{ isDefaultTheme: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: -1;
  background-color: ${(props) => (props.isDefaultTheme ? "black" : "white")};
  transition: background-color 0.5s ease-in-out;
`;
const Layout = ({ children }: ILayout) => {
  const isDefaultTheme = useRecoilValue(isDefaultThemeAtom);
  return (
    <ThemeProvider theme={isDefaultTheme ? defaultTheme : lighterTheme}>
      <GlobalStyle />
      <NavBar />
      <Sidebar />
      {children}
      <Layer isDefaultTheme={isDefaultTheme} />
    </ThemeProvider>
  );
};

export default Layout;
