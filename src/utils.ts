import { useCallback, useRef } from 'react';

// this provides a stable function that always calls the latest callback.
// it doesn't need a dependency array, and prevents memory leaks.
// https://www.schiener.io/2024-03-03/react-closures
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function useCallbackRef<T extends (...params: any) => any>(
    callback: T,
): T {
    const callbackRef = useRef(callback);
    callbackRef.current = callback;
    // @ts-ignore
    return useCallback<T>(
        // @ts-ignore
        (...args) => callbackRef.current(...args),
        [],
    );
}
