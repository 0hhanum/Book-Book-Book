import "styled-components";
import { EColors, EVariables } from "./styleVariables";

declare module "styled-components" {
  interface IAssets {
    starIcon: string;
  }
  export interface DefaultTheme {
    backgroundColor: string;
    fontColor: string;
    accentColor: string;
    normalColor: string;
    warningColor: string;
    headerColor: string;
    assets: IAssets;
    colors: typeof EColors;
    variables: typeof EVariables;
  }
}
