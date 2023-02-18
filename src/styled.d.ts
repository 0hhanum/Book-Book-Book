import "styled-components";

declare module "styled-components" {
  export interface Theme {
    backgroundColor: string;
    fontColor: string;
    accentColor: string;
    normalColor: string;
    warningColor: string;
  }
}
