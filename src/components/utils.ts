export const checkImageCached = (src: string) => {
  if (checkIsSSR()) return;
  const imgEntries = window.performance.getEntriesByName(src);
  return imgEntries.length > 0;
};

export const checkIsSSR = (): boolean => {
  return typeof window === "undefined";
};
