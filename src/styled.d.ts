import "styled-components";
import { EColors } from "./colors";

declare module "styled-components" {
  export interface DefaultTheme {
    backgroundColor: string;
    fontColor: string;
    accentColor: string;
    normalColor: string;
    warningColor: string;
    colors: typeof EColors;
  }
}
