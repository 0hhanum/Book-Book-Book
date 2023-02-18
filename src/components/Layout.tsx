import React from "react";

import { GlobalStyle } from "../GlobalStyle";
import { ThemeProvider } from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import { isDefaultThemeAtom } from "../atoms";
import { defaultTheme, lighterTheme } from "../theme";

interface ILayout {
  children: any;
}

const Layout = ({ children }: ILayout) => {
  // const isDefaultTheme = useRecoilValue(isDefaultThemeAtom);
  const [isDefaultTheme, setTheme] = useRecoilState(isDefaultThemeAtom);
  setTimeout(() => {
    setTheme(false);
    console.log("exec");
  }, 5000);
  return (
    <ThemeProvider theme={isDefaultTheme ? defaultTheme : lighterTheme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};

export default Layout;
