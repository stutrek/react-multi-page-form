import { useCallback, useRef } from 'react';
import type { FormPage, FormSequence, SequenceChild } from './types';

// this provides a stable function that always calls the latest callback.
// it doesn't need a dependency array, and prevents memory leaks.
// https://www.schiener.io/2024-03-03/react-closures
export function useCallbackRef<T extends any[], U>(
    callback: (...args: T) => U,
): (...args: T) => U {
    const callbackRef = useRef(callback);
    callbackRef.current = callback;
    return useCallback<(...args: T) => U>(
        (...args) => callbackRef.current(...args),
        [],
    );
}

/**
 * Wraps a child form page or sequence by updating its `id` to include the parent's `id`
 * and combining the `isRequired` predicates of both the parent and child.
 *
 * This function is used to ensure that when flattening sequences, each child page or sequence
 * maintains a unique identifier and correctly determines if it is required based on both its own
 * and its parent's `isRequired` conditions.
 *
 * @param {SequenceChild} child - The child form page or sequence to wrap.
 * @param {FormSequence} parent - The parent form sequence containing the child.
 * @returns {SequenceChild} - The wrapped child with updated `id` and `isRequired` properties.
 */
function wrapChild<DataT, U, V, T extends SequenceChild<DataT, U, V>>(
    child: T,
    parent: FormSequence<DataT, U, V>,
): T {
    return {
        ...child,
        id: `${parent.id}.${child.id}`,
        isRequired: (data: DataT) => {
            if (parent.isRequired) {
                const parentisRequired = parent.isRequired(data);
                if (parentisRequired === false) {
                    return false;
                }
            }
            if (child.isRequired) {
                return child.isRequired(data);
            }
            return true;
        },
    } as T;
}

/**
 * Flattens an array of form pages and sequences into a flat array of form pages.
 *
 * This function recursively processes each item in the input array. If an item is a sequence,
 * it replaces the sequence in the array with its wrapped child pages. The wrapping ensures that
 * each child page inherits the `id` and `isRequired` logic from its parent sequence.
 *
 * @param {SequenceChild[]} pagesInput - The array of form pages and sequences to flatten.
 * @returns {FormPage[]} - A flat array of form pages with updated `id` and `isRequired` properties.
 */
export function flattenPages<U, V, W>(
    pagesInput: SequenceChild<U, V, W>[],
): FormPage<U, V, W>[] {
    const pages = [...pagesInput];
    for (let i = 0; i < pages.length; i++) {
        const item = pages[i];
        if ('pages' in item) {
            const sequencePages = item.pages.map((child) =>
                wrapChild(child, item),
            );
            // @ts-ignore
            pages.splice(i, 1, ...sequencePages);
            i -= 1;
        }
    }

    return pages as FormPage<U, V, W>[];
}
