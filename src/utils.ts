import { useCallback, useRef } from 'react';
import type {
    DeepPartial,
    FormPage,
    FormSequence,
    SequenceChild,
} from './types';

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
function wrapChild<DataT, ComponentProps, ErrorList>(
    child: SequenceChild<DataT, ComponentProps, ErrorList>,
    parent: FormSequence<DataT, ComponentProps, ErrorList>,
): SequenceChild<DataT, ComponentProps, ErrorList> {
    const newId = child.id; // `${parent.id}.${child.id}`;
    const newIsRequired = (data: DeepPartial<DataT>) => {
        if (parent.isRequired) {
            const parentIsRequired = parent.isRequired(data);
            if (parentIsRequired === false) {
                return false;
            }
        }
        if (child.isRequired) {
            return child.isRequired(data);
        }
        return true;
    };

    if ('pages' in child) {
        // It's a sequence
        return {
            ...child,
            id: newId,
            isRequired: newIsRequired,
        };
    }
    // It's a page
    return {
        ...child,
        id: newId,
        isRequired: newIsRequired,
    };
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
export function flattenPages<DataT, ComponentProps, ErrorList>(
    pagesInput: SequenceChild<DataT, ComponentProps, ErrorList>[],
): [
    FormPage<DataT, ComponentProps, ErrorList>[],
    Record<string, FormPage<DataT, ComponentProps, ErrorList>>,
] {
    const result: FormPage<DataT, ComponentProps, ErrorList>[] = [];
    const map: Record<string, FormPage<DataT, ComponentProps, ErrorList>> = {};
    for (const item of pagesInput) {
        if ('pages' in item) {
            // It's a sequence
            const sequence = item as FormSequence<
                DataT,
                ComponentProps,
                ErrorList
            >;
            const wrappedChildren = sequence.pages.map((child) =>
                wrapChild(child, sequence),
            );
            const [flattenedChildren, flattenedMap] =
                flattenPages(wrappedChildren);
            result.push(...flattenedChildren);
            Object.assign(map, flattenedMap);
        } else {
            // It's a page
            const page = item as FormPage<DataT, ComponentProps, ErrorList>;
            map[page.id] = page;
            result.push({
                isRequired: () => true,
                ...page,
            });
        }
    }

    return [result, map];
}
