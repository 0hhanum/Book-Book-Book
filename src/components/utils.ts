export const checkImageCached = (src: string) => {
  if (checkIsSSR()) return;
  const imgEntries = window.performance.getEntriesByName(src);
  return imgEntries.length > 0;
};

export const checkIsSSR = (): boolean => {
  return typeof window === "undefined";
};

export const preloadImage = (src: string, callback?: () => void) => {
  const virtualImage = new Image();
  virtualImage.src = src; // it makes load texture concurrently using disc cache
  if (callback) {
    virtualImage.onload = () => callback();
  }
};
