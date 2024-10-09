import type {
    DeepPartial,
    FormPage,
    FormSequence,
    SequenceChild,
} from '../types';
import { flattenPages, getNextPageIndex, isDecisionNode } from '../utils';

/**
 * Follows a sequence of pages based on the provided data.
 * This function will return an array of pages that were visited in order.
 *
 * @param {SequenceChild[]} sequence - The sequence of pages to follow.
 * @param {DataT} data - The data to use when determining which pages to visit.
 * @returns {FormPage[]} An array of pages that were visited in order.
 */
export function followSequence<DataT, U, V>(
    sequence: SequenceChild<DataT, U, V>[] | FormSequence<DataT, U, V>,
    data: DeepPartial<DataT>,
): FormPage<DataT, U, V>[] {
    if (!Array.isArray(sequence)) {
        sequence = sequence.pages;
    }
    const [pages, pageMap] = flattenPages(sequence);

    const visitedPages: FormPage<DataT, any, any>[] = [];

    if (pages.length === 0) {
        return [];
    }

    // start at the first page
    // for each page
    // if it's required, add it to the visited pages
    // if it's not required, skip it
    // if it has a selectNextPage, go to that page
    // continue until the end is reached or a page has isFinal
    let currentPageIndex: number | undefined = 0;
    while (true) {
        if (currentPageIndex === undefined) {
            break;
        }
        const currentPage = pages[currentPageIndex] as FormPage<DataT, U, V>;
        if (visitedPages.includes(pageMap[currentPage.id])) {
            visitedPages.push(pageMap[currentPage.id]);
            throw new Error(
                `Loop detected at page '${currentPage.id}'. Navigation stopped. Full path: ${visitedPages
                    .map((page) => page.id)
                    .join(' -> ')}`,
            );
        }
        if (currentPageIndex !== 0 || !isDecisionNode(currentPage)) {
            visitedPages.push(pageMap[currentPage.id]);
        }
        if (currentPage.isFinal?.(data)) {
            break;
        }

        currentPageIndex = getNextPageIndex(
            data,
            pages,
            currentPageIndex,
            false,
        );
    }

    return visitedPages;
}
