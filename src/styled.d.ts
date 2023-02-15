import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    backgroundColor: string;
    fontColor: string;
    accentColor: string;
    normalColor: string;
    warningColor: string;
  }
  export interface LighterTheme {
    backgroundColor: string;
    fontColor: string;
    accentColor: string;
    normalColor: string;
    warningColor: string;
  }
}
