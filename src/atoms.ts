import { atom } from "recoil";
import { IBook } from "./data/books";

export const isDefaultThemeAtom = atom<boolean>({
  key: "isDefaultTheme",
  default: true,
});
export const filteredAuthorAtom = atom<string>({
  key: "filteredAuthor",
  default: "",
});
export const selectedBookAtom = atom<IBook | null>({
  key: "selectedBook",
  default: null,
});
