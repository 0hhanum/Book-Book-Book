import { DefaultTheme } from "styled-components";
import { EColors, EVariables } from "./styleVariables";

export const defaultTheme: DefaultTheme = {
  backgroundColor: "#0c0f13",
  fontColor: "#ffffff",
  accentColor: "#004DFD",
  normalColor: "#767475",
  warningColor: "#FF3548",
  headerColor: "#ff7400",
  assets: {
    starIcon: "/star.svg",
    mailSendSuccessSvg: "/mail_send_success.svg",
  },
  colors: EColors,
  variables: EVariables,
};

export const lighterTheme: DefaultTheme = {
  backgroundColor: "#ffffff",
  fontColor: "#0c0f13",
  accentColor: "#004DFD",
  normalColor: "#767475",
  warningColor: "#FF3548",
  headerColor: "#41f934",
  assets: {
    starIcon: "/star_lighter.svg",
    mailSendSuccessSvg: "/mail_send_success_lighter.svg",
  },
  colors: EColors,
  variables: EVariables,
};
