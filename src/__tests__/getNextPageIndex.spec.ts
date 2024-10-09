// tests/getNextPageIndex.test.ts

import type { DeepPartial, FormPage } from '../types';
import { getNextPageIndex } from '../utils';

describe('getNextPageIndex', () => {
    // Helper function to create pages
    const createPage = <DataT>(
        id: string,
        overrides: Partial<FormPage<DataT, any, any>> = {},
    ): FormPage<DataT, any, any> =>
        ({
            id,
            isComplete: () => false,
            ...overrides,
        }) as FormPage<DataT, any, any>;

    it('returns currentPageIndex when currentPage is undefined', () => {
        const data = {};
        const pages: FormPage<any, any, any>[] = [];
        const currentPageIndex = 0;
        const toNextIncomplete = false;

        const result = getNextPageIndex(
            data,
            pages,
            currentPageIndex,
            toNextIncomplete,
        );
        expect(result).toBe(undefined);
    });

    it('returns currentPageIndex when currentPage.isFinal returns true', () => {
        const data = {};
        const pages: FormPage<any, any, any>[] = [
            createPage('page1', {
                isFinal: () => true,
            }),
        ];
        const currentPageIndex = 0;
        const toNextIncomplete = false;

        const result = getNextPageIndex(
            data,
            pages,
            currentPageIndex,
            toNextIncomplete,
        );
        expect(result).toBe(undefined);
    });

    it('navigates to alternateNextPage when defined and exists', () => {
        const data = {};
        const pages = [
            createPage('page1', {
                alternateNextPage: () => 'page3',
            }),
            createPage('page2'),
            createPage('page3'),
        ];
        const currentPageIndex = 0;
        const toNextIncomplete = false;

        const result = getNextPageIndex(
            data,
            pages,
            currentPageIndex,
            toNextIncomplete,
        );
        expect(result).toBe(2); // Index of 'page3'
    });

    it('throws error when alternateNextPage returns non-existent page', () => {
        const data = {};
        const pages = [
            createPage('page1', {
                alternateNextPage: () => 'pageX',
            }),
            createPage('page2'),
        ];
        const currentPageIndex = 0;
        const toNextIncomplete = false;

        expect(() =>
            getNextPageIndex(data, pages, currentPageIndex, toNextIncomplete),
        ).toThrowErrorMatchingInlineSnapshot(
            `"Alternate next page "pageX" not found."`,
        );
    });

    it('skips completed alternateNextPage when toNextIncomplete is true', () => {
        const data = {};
        const pages = [
            createPage('page1', {
                alternateNextPage: () => 'page3',
            }),
            createPage('page2'),
            createPage('page3', {
                isComplete: () => true,
            }),
            createPage('page4'),
        ];
        const currentPageIndex = 0;
        const toNextIncomplete = true;

        const result = getNextPageIndex(
            data,
            pages,
            currentPageIndex,
            toNextIncomplete,
        );
        expect(result).toBe(3); // Should skip 'page3' and return index of 'page4'
    });

    it('returns nextPageIndex when no alternateNextPage and next page is required', () => {
        const data = {};
        const pages = [
            createPage('page1'),
            createPage('page2', {
                isRequired: () => true,
            }),
        ];
        const currentPageIndex = 0;
        const toNextIncomplete = false;

        const result = getNextPageIndex(
            data,
            pages,
            currentPageIndex,
            toNextIncomplete,
        );
        expect(result).toBe(1);
    });

    it('skips completed next page when toNextIncomplete is true', () => {
        const data = {};
        const pages = [
            createPage('page1'),
            createPage('page2', {
                isRequired: () => true,
                isComplete: () => true,
            }),
            createPage('page3', {
                isRequired: () => true,
                isComplete: () => false,
            }),
        ];
        const currentPageIndex = 0;
        const toNextIncomplete = true;

        const result = getNextPageIndex(
            data,
            pages,
            currentPageIndex,
            toNextIncomplete,
        );
        expect(result).toBe(2); // Index of 'page3'
    });

    it('returns pages.length - 1 when no next required page', () => {
        const data = {};
        const pages = [createPage('page1')];
        const currentPageIndex = 0;
        const toNextIncomplete = false;

        const result = getNextPageIndex(
            data,
            pages,
            currentPageIndex,
            toNextIncomplete,
        );
        expect(result).toBe(undefined);
    });

    it('skips non-required next page and returns pages.length - 1', () => {
        const data = {};
        const pages = [
            createPage('page1'),
            createPage('page2', {
                isRequired: () => false,
            }),
        ];
        const currentPageIndex = 0;
        const toNextIncomplete = false;

        const result = getNextPageIndex(
            data,
            pages,
            currentPageIndex,
            toNextIncomplete,
        );
        expect(result).toBe(undefined);
    });

    it('handles multiple recursive calls to find next incomplete page', () => {
        const data = {};
        const pages = [
            createPage('page1'),
            createPage('page2', {
                isRequired: () => true,
                isComplete: () => true,
            }),
            createPage('page3', {
                isRequired: () => true,
                isComplete: () => true,
            }),
            createPage('page4', {
                isRequired: () => true,
                isComplete: () => false,
            }),
        ];
        const currentPageIndex = 0;
        const toNextIncomplete = true;

        const result = getNextPageIndex(
            data,
            pages,
            currentPageIndex,
            toNextIncomplete,
        );
        expect(result).toBe(3); // Index of 'page4'
    });

    it('returns pages.length - 1 when all remaining pages are complete and toNextIncomplete is true', () => {
        const data = {};
        const pages = [
            createPage('page1'),
            createPage('page2', {
                isRequired: () => true,
                isComplete: () => true,
            }),
            createPage('page3', {
                isRequired: () => true,
                isComplete: () => true,
            }),
        ];
        const currentPageIndex = 0;
        const toNextIncomplete = true;

        const result = getNextPageIndex(
            data,
            pages,
            currentPageIndex,
            toNextIncomplete,
        );
        expect(result).toBe(undefined);
    });

    it('returns currentPageIndex when currentPage is final and toNextIncomplete is true', () => {
        const data = {};
        const pages = [
            createPage('page1', {
                isFinal: () => true,
            }),
            createPage('page2', {
                isRequired: () => true,
                isComplete: () => false,
            }),
        ];
        const currentPageIndex = 0;
        const toNextIncomplete = true;

        const result = getNextPageIndex(
            data,
            pages,
            currentPageIndex,
            toNextIncomplete,
        );
        expect(result).toBe(undefined);
    });

    it('returns currentPageIndex when currentPageIndex is negative', () => {
        const data = {};
        const pages = [createPage('page1')];
        const currentPageIndex = -1;
        const toNextIncomplete = false;

        const result = getNextPageIndex(
            data,
            pages,
            currentPageIndex,
            toNextIncomplete,
        );
        expect(result).toBe(undefined);
    });

    it('returns currentPageIndex when currentPageIndex is beyond pages length', () => {
        const data = {};
        const pages = [createPage('page1')];
        const currentPageIndex = 5;
        const toNextIncomplete = false;

        const result = getNextPageIndex(
            data,
            pages,
            currentPageIndex,
            toNextIncomplete,
        );
        expect(result).toBe(undefined);
    });

    it('handles pages with data-dependent isRequired and isComplete', () => {
        const data = { skipPage2: true };
        const pages = [
            createPage('page1'),
            createPage('page2', {
                isRequired: (input: DeepPartial<typeof data>) =>
                    !input.skipPage2,
            }),
            createPage('page3', {
                isRequired: () => true,
                isComplete: () => false,
            }),
        ];
        const currentPageIndex = 0;
        const toNextIncomplete = true;

        const result = getNextPageIndex(
            data,
            // @ts-expect-error
            pages,
            currentPageIndex,
            toNextIncomplete,
        );
        expect(result).toBe(2); // Index of 'page3' since 'page2' is not required
    });

    it('returns next page when toNextIncomplete is false and next page is complete', () => {
        const data = {};
        const pages = [
            createPage('page1'),
            createPage('page2', {
                isRequired: () => true,
                isComplete: () => true,
            }),
        ];
        const currentPageIndex = 0;
        const toNextIncomplete = false;

        const result = getNextPageIndex(
            data,
            pages,
            currentPageIndex,
            toNextIncomplete,
        );
        expect(result).toBe(1); // Returns next page even if it's complete
    });

    it('skips to last page when all pages are not required', () => {
        const data = {};
        const pages = [
            createPage('page1'),
            createPage('page2', {
                isRequired: () => false,
            }),
            createPage('page3', {
                isRequired: () => false,
            }),
        ];
        const currentPageIndex = 0;
        const toNextIncomplete = false;

        const result = getNextPageIndex(
            data,
            pages,
            currentPageIndex,
            toNextIncomplete,
        );
        expect(result).toBe(undefined);
    });

    it('handles recursive alternateNextPage leading to an incomplete page', () => {
        const data = {};
        const pages = [
            createPage('page1', {
                alternateNextPage: () => 'page2',
            }),
            createPage('page2', {
                alternateNextPage: () => 'page3',
                isComplete: () => true,
            }),
            createPage('page3', {
                isComplete: () => false,
            }),
        ];
        const currentPageIndex = 0;
        const toNextIncomplete = true;

        const result = getNextPageIndex(
            data,
            pages,
            currentPageIndex,
            toNextIncomplete,
        );
        expect(result).toBe(2); // Index of 'page3'
    });

    it('throws error on circular alternateNextPage references', () => {
        const data = {};
        const pages = [
            createPage('page1', {
                alternateNextPage: () => 'page2',
                isComplete: () => true,
            }),
            createPage('page2', {
                alternateNextPage: () => 'page1',
                isComplete: () => true,
            }),
        ];
        const currentPageIndex = 0;
        const toNextIncomplete = true;

        expect(() =>
            getNextPageIndex(data, pages, currentPageIndex, toNextIncomplete),
        ).toThrowErrorMatchingInlineSnapshot(
            `"Loop detected at page 'page2'. Navigation stopped. Full path: page2 -> page1 -> page2"`,
        );
    });
});
