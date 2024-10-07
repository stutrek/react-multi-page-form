// tests/defaultParameters.test.js

import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { useMultiPageFormBase } from '../base';

describe('useMultiPageFormBase - Default Parameter Tests', () => {
    const getCurrentData = jest.fn(() => ({}));

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('works correctly when optional callbacks are undefined', async () => {
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
            }),
        );

        await act(async () => {
            await result.current.advance();
        });

        expect(result.current.currentPage.id).toBe('page2');
    });

    it('defaults to the correct starting page when startingPage is undefined', () => {
        const pages = [
            {
                id: 'page1',
                isComplete: () => true,
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

        expect(result.current.currentPage.id).toBe('page2');
    });
});
