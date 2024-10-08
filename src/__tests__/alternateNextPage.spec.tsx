import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { useMultiPageFormBase } from '../base';

describe('useMultiPageFormBase - alternateNextPage Method Tests', () => {
    const getCurrentData = jest.fn(() => ({}));

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('navigates to the alternate next page when alternateNextPage returns a valid page ID', async () => {
        const pages = [
            {
                id: 'page1',
                isComplete: () => false,
                alternateNextPage: () => 'page3',
                Component: () => <div>Page 1</div>,
            },
            {
                id: 'page2',
                isComplete: () => false,
                Component: () => <div>Page 2</div>,
            },
            {
                id: 'page3',
                isComplete: () => false,
                Component: () => <div>Page 3</div>,
            },
        ];

        const { result } = renderHook(() =>
            useMultiPageFormBase({
                getCurrentData,
                pages,
            }),
        );

        expect(result.current.currentPage.id).toBe('page1');

        await act(async () => {
            await result.current.advance();
        });

        // Expect to navigate to 'page3' instead of 'page2'
        expect(result.current.currentPage.id).toBe('page3');
    });

    it('proceeds to the next required page when alternateNextPage returns an invalid page ID', async () => {
        console.warn = jest.fn();

        const pages = [
            {
                id: 'page1',
                isComplete: () => false,
                alternateNextPage: () => 'invalidPageId',
                Component: () => <div>Page 1</div>,
            },
            {
                id: 'page2',
                isComplete: () => false,
                Component: () => <div>Page 2</div>,
            },
        ];

        const { result } = renderHook(() =>
            useMultiPageFormBase({
                getCurrentData,
                pages,
            }),
        );

        expect(result.current.currentPage.id).toBe('page1');

        await act(async () => {
            await result.current.advance();
        });

        // Should proceed to 'page2' as 'invalidPageId' does not exist
        expect(result.current.currentPage.id).toBe('page2');
        expect(console.warn).toHaveBeenCalledWith(
            "Page with ID 'invalidPageId' not found.",
        );
    });

    it('proceeds normally when alternateNextPage is undefined', async () => {
        const pages = [
            {
                id: 'page1',
                isComplete: () => false,
                // No alternateNextPage defined
                Component: () => <div>Page 1</div>,
            },
            {
                id: 'page2',
                isComplete: () => false,
                Component: () => <div>Page 2</div>,
            },
        ];

        const { result } = renderHook(() =>
            useMultiPageFormBase({
                getCurrentData,
                pages,
            }),
        );

        expect(result.current.currentPage.id).toBe('page1');

        await act(async () => {
            await result.current.advance();
        });

        // Should proceed to 'page2'
        expect(result.current.currentPage.id).toBe('page2');
    });

    it('proceeds normally when alternateNextPage returns undefined', async () => {
        const pages = [
            {
                id: 'page1',
                isComplete: () => false,
                alternateNextPage: () => undefined, // Explicitly returns undefined
                Component: () => <div>Page 1</div>,
            },
            {
                id: 'page2',
                isComplete: () => false,
                Component: () => <div>Page 2</div>,
            },
        ];

        const { result } = renderHook(() =>
            useMultiPageFormBase({
                getCurrentData,
                pages,
            }),
        );

        expect(result.current.currentPage.id).toBe('page1');

        await act(async () => {
            await result.current.advance();
        });

        // Should proceed to 'page2'
        expect(result.current.currentPage.id).toBe('page2');
    });
});
