import { atom } from "recoil";

export const isDefaultThemeAtom = atom<Boolean>({
  key: "isDefaultTheme",
  default: true,
});
