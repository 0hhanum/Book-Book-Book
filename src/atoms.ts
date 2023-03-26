import { atom } from "recoil";

export const isDefaultThemeAtom = atom<boolean>({
  key: "isDefaultTheme",
  default: true,
});
export const filteredAuthorAtom = atom<string>({
  key: "filteredAuthor",
  default: "",
});
