import { renderHook, act } from '@testing-library/react';
import { useMultiPageFormBase } from '../base';

describe('useMultiPageFormBase - Navigation Tests', () => {
    const pages = [
        {
            id: 'page1',
            isComplete: () => false,
            isRequired: () => true,
            Component: () => <div>Page 1</div>,
        },
        {
            id: 'page2',
            isComplete: () => false,
            isRequired: () => true,
            Component: () => <div>Page 2</div>,
        },
        {
            id: 'page3',
            isComplete: () => false,
            isRequired: () => true,
            isFinal: () => true,
            Component: () => <div>Page 3</div>,
        },
    ];

    const getCurrentData = jest.fn(() => ({}));

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('advances to the next required page', async () => {
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

        expect(result.current.currentPage.id).toBe('page2');
    });

    it('does not advance when navigation is already in progress', async () => {
        console.warn = jest.fn();

        const { result } = renderHook(() =>
            useMultiPageFormBase({
                getCurrentData,
                pages,
                onBeforePageChange: () => new Promise(() => {}),
            }),
        );

        await act(async () => {
            result.current.advance();
            result.current.advance();

            expect(console.warn).toHaveBeenCalledWith(
                'Navigation already in progress.',
            );
        });
    });

    it('navigates back to the previous page using navigationStack', async () => {
        const { result } = renderHook(() =>
            useMultiPageFormBase({
                getCurrentData,
                pages,
            }),
        );

        await act(async () => {
            await result.current.advance();
        });
        await act(async () => {
            await result.current.advance();
        });

        expect(result.current.currentPage.id).toBe('page3');

        await act(async () => {
            await result.current.goBack();
        });

        expect(result.current.currentPage.id).toBe('page2');
    });

    it('navigates to a specific page using goTo', async () => {
        const { result } = renderHook(() =>
            useMultiPageFormBase({
                getCurrentData,
                pages,
            }),
        );

        await act(async () => {
            await result.current.goTo('page3');
        });

        expect(result.current.currentPage.id).toBe('page3');
    });

    it('does not change page when goTo is called with invalid pageId', async () => {
        const { result } = renderHook(() =>
            useMultiPageFormBase({
                getCurrentData,
                pages,
            }),
        );

        await act(async () => {
            await result.current.goTo('invalidPageId');
        });

        expect(result.current.currentPage.id).toBe('page1');
    });

    it('does not go back if there is no previous page and logs a warning', async () => {
        console.warn = jest.fn();

        const { result } = renderHook(() =>
            useMultiPageFormBase({
                getCurrentData,
                pages,
            }),
        );

        await act(async () => {
            await result.current.goBack();
        });

        expect(console.warn).toHaveBeenCalledWith('No previous page found.');
        expect(result.current.currentPage.id).toBe('page1');
    });
});
