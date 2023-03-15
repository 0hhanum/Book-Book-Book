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
export interface IThemeProp {
  $isDefaultTheme: boolean;
}
const ThemeLayer = styled.div<IThemeProp>`
  position: fixed;
  top: 0;
  left: 0;
  bottom: ${(props) => (props.$isDefaultTheme ? 0 : "100vh")};
  right: 0;
  z-index: -1;
  background-color: ${(props) => props.theme.colors.black};
  transition: all 0.5s ease-in-out;
`;
const Layout = ({ children }: ILayout) => {
  const isDefaultTheme = useRecoilValue(isDefaultThemeAtom);
  return (
    <ThemeProvider theme={isDefaultTheme ? defaultTheme : lighterTheme}>
      <GlobalStyle />
      <NavBar />
      <Sidebar />
      {children}
      <ThemeLayer $isDefaultTheme={isDefaultTheme} />
    </ThemeProvider>
  );
};

export default Layout;
