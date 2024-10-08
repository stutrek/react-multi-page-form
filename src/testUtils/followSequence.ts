import type {
    DeepPartial,
    FormPage,
    FormSequence,
    SequenceChild,
} from '../types';
import { flattenPages } from '../utils';

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
    const visitedPageIds = new Set<string>();

    // start at the first page
    // for each page
    // if it's required, add it to the visited pages
    // if it's not required, skip it
    // if it has a alternateNextPage, go to that page
    // continue until the end is reached or a page has isFinal
    let currentPage: FormPage<DataT, U, V> | undefined = pages[0];
    while (currentPage) {
        visitedPages.push(pageMap[currentPage.id]);

        if (visitedPageIds.has(currentPage.id)) {
            throw new Error(
                `Loop detected at page '${currentPage.id}'. Navigation stopped. Full path: ${visitedPages.map((p) => p.id).join(' -> ')}`,
            );
        }
        visitedPageIds.add(currentPage.id);

        if (currentPage.isFinal?.(data)) {
            break;
        }

        const alternateNextPage: string | any =
            currentPage.alternateNextPage?.(data);
        if (alternateNextPage) {
            const nextPage = pages.find(
                (page) => page.id === alternateNextPage,
            );
            if (nextPage) {
                currentPage = nextPage;
                continue;
            }
        }

        const searchStartIndex: number = pages.indexOf(currentPage) + 1;
        currentPage = undefined;
        for (let i = searchStartIndex; i < pages.length; i++) {
            const nextPage = pages[i];
            if (!nextPage.isRequired || nextPage.isRequired(data)) {
                currentPage = nextPage;
                break;
            }
        }
    }

    return visitedPages;
}
