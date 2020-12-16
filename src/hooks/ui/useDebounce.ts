import { debounce } from "lodash";
import { useCallback } from "react";

export default function useDebouncedCallback(callback: any, delay: number) {
    const debouncedFn = useCallback(
        debounce((...args) => callback(...args), delay),
        [delay],
    );
    return debouncedFn;
}