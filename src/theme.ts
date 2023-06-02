import { DefaultTheme } from "styled-components";
import { EColors, EVariables } from "./styleVariables";

export const defaultTheme: DefaultTheme = {
  backgroundColor: "#0c0f13",
  fontColor: "#ffffff",
  accentColor: "#004DFD",
  normalColor: "#767475",
  warningColor: "#a70e0e",
  headerColor: "#ff7400",
  assets: {
    starIcon: "/star.svg",
  },
  colors: EColors,
  variables: EVariables,
};

export const lighterTheme: DefaultTheme = {
  backgroundColor: "#ffffff",
  fontColor: "#0c0f13",
  accentColor: "#004DFD",
  normalColor: "#767475",
  warningColor: "#a70e0e",
  headerColor: "#41f934",
  assets: {
    starIcon: "/star_lighter.svg",
  },
  colors: EColors,
  variables: EVariables,
};
