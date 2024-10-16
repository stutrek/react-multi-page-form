import type {
    DecisionNode,
    DeepPartial,
    FormPage,
    FormSequence,
    SequenceChild,
} from './types';

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
            isRequired: newIsRequired,
        };
    }
    // It's a page or a decision node
    return {
        ...child,
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
    (FormPage<DataT, ComponentProps, ErrorList> | DecisionNode<DataT>)[],
    Record<string, FormPage<DataT, ComponentProps, ErrorList>>,
] {
    const result: (
        | FormPage<DataT, ComponentProps, ErrorList>
        | DecisionNode<DataT>
    )[] = [];
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

function isRequired<DataT, Page extends SequenceChild<DataT, any, any>>(
    page: Page,
    data: DeepPartial<DataT>,
) {
    if (page.isRequired === undefined || page.isRequired(data) !== false) {
        return true;
    }
}

export function isDecisionNode<DataT>(
    node: SequenceChild<DataT, any, any> | undefined,
): node is DecisionNode<DataT> {
    return !!node && 'selectNextPage' in node && !('Component' in node);
}

export function getNextPageIndex<DataT, U, V>(
    data: DeepPartial<DataT>,
    pages: (FormPage<DataT, U, V> | DecisionNode<DataT>)[],
    startingPageIndex: number,
    toNextIncomplete: boolean,
): number | undefined {
    const startingPage = pages[startingPageIndex] as FormPage<DataT, U, V>;
    if (!startingPage) {
        return undefined;
    }
    if (startingPage.isFinal?.(data)) {
        return undefined;
    }

    const visitedPath: string[] = [];
    const visitedPageIds = new Set<string>();

    const checkLoop = (pageId: string) => {
        visitedPath.push(pageId);
        if (visitedPageIds.has(pageId)) {
            throw new Error(
                `Loop detected at page '${pageId}'. Navigation stopped. Full path: ${visitedPath.join(
                    ' -> ',
                )}`,
            );
        }
        visitedPageIds.add(pageId);
    };

    const recurse = (currentPageIndex: number) => {
        const currentPage = pages[currentPageIndex];
        if (!isDecisionNode(currentPage) || isRequired(currentPage, data)) {
            const selectNextPage = currentPage.selectNextPage?.(data);
            if (selectNextPage) {
                checkLoop(selectNextPage);
                const nextPageIndex = pages.findIndex(
                    (page) => page.id === selectNextPage,
                );
                if (nextPageIndex === -1) {
                    throw new Error(`Next page "${selectNextPage}" not found.`);
                }
                const nextPage = pages[nextPageIndex];
                if (
                    isDecisionNode(nextPage) ||
                    (toNextIncomplete && nextPage.isComplete(data))
                ) {
                    return recurse(nextPageIndex);
                }
                return nextPageIndex;
            }
        }

        const nextPageIndex = currentPageIndex + 1;
        const nextPage = pages[nextPageIndex];

        if (nextPage) {
            checkLoop(nextPage.id);
            if (isRequired(nextPage, data)) {
                if (
                    isDecisionNode(nextPage) ||
                    (toNextIncomplete && nextPage.isComplete(data))
                ) {
                    return recurse(nextPageIndex);
                }
                return nextPageIndex;
            }
            return recurse(nextPageIndex);
        }

        return undefined;
    };

    return recurse(startingPageIndex);
}
