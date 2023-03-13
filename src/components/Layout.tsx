import React from "react";

import { GlobalStyle } from "../GlobalStyle";
import { ThemeProvider } from "styled-components";
import { useRecoilValue } from "recoil";
import { isDefaultThemeAtom } from "../atoms";
import { defaultTheme, lighterTheme } from "../theme";
import Sidebar from "./Sidebar";
import NavBar from "./NavBar";

interface ILayout {
  children: any;
}

const Layout = ({ children }: ILayout) => {
  const isDefaultTheme = useRecoilValue(isDefaultThemeAtom);
  return (
    <ThemeProvider theme={isDefaultTheme ? defaultTheme : lighterTheme}>
      <GlobalStyle />
      <NavBar />
      <Sidebar />
      {children}
    </ThemeProvider>
  );
};

export default Layout;
