import { DefaultTheme } from "styled-components";
import { EColors } from "./colors";

export const defaultTheme: DefaultTheme = {
  backgroundColor: "#0c0f13",
  fontColor: "#ffffff",
  accentColor: "#004DFD",
  normalColor: "#767475",
  warningColor: "#FF3548",
  colors: EColors,
};

export const lighterTheme: DefaultTheme = {
  backgroundColor: "#ffffff",
  fontColor: "#0c0f13",
  accentColor: "#004DFD",
  normalColor: "#767475",
  warningColor: "#FF3548",
  colors: EColors,
};
