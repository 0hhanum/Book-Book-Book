import { atom } from "recoil";

export const isDefaultThemeAtom = atom<boolean>({
  key: "isDefaultTheme",
  default: true,
});
