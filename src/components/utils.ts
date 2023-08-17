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

type Debounce = <T extends any[]>(
    func: (...args: T) => void,
    delay: number
) => (...args: T) => void;
export const debounce: Debounce = (func, delay) => {
    let timeout: ReturnType<typeof setTimeout> | null = null;
    return (...args) => {
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(() => {
            func(...args);
        }, delay);
    };
};
type Throttle = <T extends any[]>(
    func: (...args: T) => void,
    limit: number
) => (...args: T) => void;

export const throttle: Throttle = (func, limit) => {
    let throttling = false;

    return (...args) => {
        if (!throttling) {
            throttling = true;
            func(...args);

            setTimeout(() => {
                throttling = false;
            }, limit);
        }
    };
};
