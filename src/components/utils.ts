export const checkImageCached = (src: string) => {
  if (typeof window === undefined) return;
  const imgEntries = window.performance.getEntriesByName(src);
  return imgEntries.length > 0;
};
