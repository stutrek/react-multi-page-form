import { renderHook, act } from '@testing-library/react';
import { useMultiPageFormBase } from '../base';

describe('useMultiPageFormBase - Callback Invocation Tests', () => {
    const pages = [
        {
            id: 'page1',
            isComplete: () => false,
            onArrive: jest.fn(),
            onExit: jest.fn(),
            Component: () => <div>Page 1</div>,
        },
        {
            id: 'page2',
            isComplete: () => false,
            onArrive: jest.fn(),
            onExit: jest.fn(),
            Component: () => <div>Page 2</div>,
        },
    ];

    const getCurrentData = jest.fn(() => ({}));

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('calls onPageChange when the page changes', async () => {
        const onPageChange = jest.fn();

        const { result } = renderHook(() =>
            useMultiPageFormBase({
                getCurrentData,
                pages,
                onPageChange,
            }),
        );

        expect(onPageChange).toHaveBeenCalledWith({}, pages[0]);

        await act(async () => {
            await result.current.advance();
        });

        expect(onPageChange).toHaveBeenCalledWith({}, pages[1]);
    });

    it('calls currentPage.onArrive when arriving at a new page', async () => {
        const { result } = renderHook(() =>
            useMultiPageFormBase({
                getCurrentData,
                pages,
            }),
        );

        expect(pages[0].onArrive).toHaveBeenCalledWith({});

        await act(async () => {
            await result.current.advance();
        });

        expect(pages[1].onArrive).toHaveBeenCalledWith({});
    });

    it('calls currentPage.onExit when exiting a page', async () => {
        const { result } = renderHook(() =>
            useMultiPageFormBase({
                getCurrentData,
                pages,
            }),
        );

        await act(async () => {
            await result.current.advance();
        });

        expect(pages[0].onExit).toHaveBeenCalledWith({});
    });

    it('calls onBeforePageChange before changing pages', async () => {
        const onBeforePageChange = jest.fn(() => true);

        const { result } = renderHook(() =>
            useMultiPageFormBase({
                getCurrentData,
                pages,
                onBeforePageChange,
            }),
        );

        await act(async () => {
            await result.current.advance();
        });

        expect(onBeforePageChange).toHaveBeenCalledWith({}, pages[0]);
        expect(result.current.currentPage.id).toBe('page2');
    });

    it('prevents navigation when onBeforePageChange returns false', async () => {
        const onBeforePageChange = jest.fn(() => false);

        const { result } = renderHook(() =>
            useMultiPageFormBase({
                getCurrentData,
                pages,
                onBeforePageChange,
            }),
        );

        await act(async () => {
            await result.current.advance();
        });

        expect(onBeforePageChange).toHaveBeenCalled();
        expect(result.current.currentPage.id).toBe('page1');
    });

    it('calls onValidationError when onBeforePageChange returns an error list', async () => {
        const errorList = { field: 'Error' };
        const onBeforePageChange = jest.fn(() => errorList);
        const onValidationError = jest.fn();

        const { result } = renderHook(() =>
            useMultiPageFormBase({
                getCurrentData,
                pages,
                onBeforePageChange,
                onValidationError,
            }),
        );

        await act(async () => {
            await result.current.advance();
        });

        expect(onBeforePageChange).toHaveBeenCalled();
        expect(onValidationError).toHaveBeenCalledWith(errorList);
        expect(result.current.currentPage.id).toBe('page1');
    });
});
