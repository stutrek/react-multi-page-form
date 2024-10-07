// tests/asyncBehavior.test.js

import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { useMultiPageFormBase } from '../base';

describe('useMultiPageFormBase - Asynchronous Behavior Tests', () => {
    const getCurrentData = jest.fn(() => ({}));

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('waits for async onBeforePageChange before navigating', async () => {
        const onBeforePageChange = jest.fn(
            () =>
                new Promise((resolve) => setTimeout(() => resolve(true), 100)),
        );

        const pages = [
            {
                id: 'page1',
                isComplete: () => false,
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
                onBeforePageChange,
            }),
        );

        await act(async () => {
            const advancePromise = result.current.advance();
            expect(result.current.currentPage.id).toBe('page1');
            await advancePromise;
        });

        expect(result.current.currentPage.id).toBe('page2');
    });

    it('waits for async currentPage.onExit before navigating', async () => {
        const onExit = jest.fn(
            () =>
                new Promise<void>((resolve) =>
                    setTimeout(() => resolve(), 100),
                ),
        );

        const pages = [
            {
                id: 'page1',
                isComplete: () => false,
                onExit,
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

        await act(async () => {
            const advancePromise = result.current.advance();
            expect(onExit).toHaveBeenCalled();
            await advancePromise;
        });

        expect(result.current.currentPage.id).toBe('page2');
    });
});
