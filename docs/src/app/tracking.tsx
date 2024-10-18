'use client';
import { useEffect } from 'react';

export const Tracking = () => {
    useEffect(() => {
        const listener = (event: PointerEvent) => {
            if (
                window.umami &&
                (event.target instanceof HTMLAnchorElement ||
                    event.target instanceof HTMLButtonElement)
            ) {
                const text = event.target.innerText;
                umami.track('click', {
                    text,
                });
            }
        };
        document.body.addEventListener('pointerdown', listener);
        return () => {
            document.body.removeEventListener('pointerdown', listener);
        };
    }, []);

    return null;
};
