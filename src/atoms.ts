import { atom, selector } from "recoil";
import { IBook } from "./types/book";

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
export const isThreeObjectHoverAtom = atom<boolean>({
  key: "isThreeObjectHover",
  default: false,
});
// threeJS doesn't support css style
export const cursorStyleAtom = selector({
  key: "cursorStyleAtom",
  get({ get }) {
    return get(isThreeObjectHoverAtom);
  },
  set({ set }, isHover) {
    const body = document.querySelector("body");
    if (!body) return;
    body.style.cursor = isHover ? "pointer" : "default";
    set(isThreeObjectHoverAtom, isHover);
  },
});
