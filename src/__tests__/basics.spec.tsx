import { renderHook, act } from '@testing-library/react';
import { useMultiPageFormBase } from '../base';

const threePages = [
    {
        id: 'first',
        isComplete: () => false,
        Component: () => <div />,
    },
    {
        id: 'second',
        isComplete: () => false,
        Component: () => <div />,
    },
    {
        id: 'third',
        isComplete: () => false,
        Component: () => <div />,
    },
];

describe('should increment counter', () => {
    it('should advance', async () => {
        const { result } = renderHook(() =>
            useMultiPageFormBase({
                getCurrentData: () => ({}),
                pages: threePages,
            }),
        );
        expect(result.current.currentPage.id).toBe('first');

        await act(async () => {
            await result.current.advance();
        });

        expect(result.current.currentPage.id).toBe('second');

        await act(async () => {
            await result.current.advance();
        });

        expect(result.current.currentPage.id).toBe('third');
    });

    it('should go to', async () => {
        const { result } = renderHook(() =>
            useMultiPageFormBase({
                getCurrentData: () => ({}),
                pages: threePages,
            }),
        );

        await act(async () => {
            await result.current.goTo('third');
        });

        expect(result.current.currentPage.id).toBe('third');
    });

    it('should go back when using advance', async () => {
        const { result } = renderHook(() =>
            useMultiPageFormBase({
                getCurrentData: () => ({}),
                pages: threePages,
            }),
        );

        await act(async () => {
            await result.current.advance();
        });

        expect(result.current.currentPage.id).toBe('second');

        await act(async () => {
            await result.current.goBack();
        });

        expect(result.current.currentPage.id).toBe('first');
    });

    it('should go back using the stack when using goTo', async () => {
        const { result } = renderHook(() =>
            useMultiPageFormBase({
                getCurrentData: () => ({}),
                pages: threePages,
            }),
        );

        await act(async () => {
            await result.current.goTo('third');
        });

        await act(async () => {
            await result.current.goBack();
        });

        expect(result.current.currentPage.id).toBe('first');
    });

    it('should go back using the stack when using goTo to a previous page', async () => {
        const { result } = renderHook(() =>
            useMultiPageFormBase({
                getCurrentData: () => ({}),
                pages: threePages,
            }),
        );

        await act(async () => {
            await result.current.advance();
        });

        await act(async () => {
            await result.current.goTo('first');
        });

        await act(async () => {
            await result.current.goBack();
        });

        expect(result.current.currentPage.id).toBe('second');
    });
});
