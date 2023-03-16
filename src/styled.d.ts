import "styled-components";
import { EColors, EVariables } from "./styleVariables";

declare module "styled-components" {
  export interface DefaultTheme {
    backgroundColor: string;
    fontColor: string;
    accentColor: string;
    normalColor: string;
    warningColor: string;
    headerColor: string;
    colors: typeof EColors;
    variables: typeof EVariables;
  }
}
