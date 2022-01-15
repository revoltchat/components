import { DependencyList, useCallback } from "react";

export function debounce(cb: (...args: unknown[]) => void, duration: number) {
    // Store the timer variable.
    let timer: NodeJS.Timeout;
    // This function is given to React.
    return (...args: unknown[]) => {
        // Get rid of the old timer.
        clearTimeout(timer);
        // Set a new timer.
        timer = setTimeout(() => {
            // Instead calling the new function.
            // (with the newer data)
            cb(...args);
        }, duration);
    };
}

export function useDebounceCallback(
    cb: (...args: unknown[]) => void,
    inputs: DependencyList,
    duration = 1000,
) {
    // eslint-disable-next-line
    return useCallback(
        debounce(cb as (...args: unknown[]) => void, duration),
        inputs,
    );
}
