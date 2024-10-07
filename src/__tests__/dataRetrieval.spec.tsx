// tests/dataRetrieval.test.js

import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { useMultiPageFormBase } from '../base';

describe('useMultiPageFormBase - Data Retrieval Tests', () => {
    const getCurrentData = jest.fn(() => ({}));

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('calls getCurrentData when computing navigation', async () => {
        const pages = [
            {
                id: 'page1',
                isComplete: jest.fn(() => false),
                isRequired: jest.fn(() => true),
                Component: () => <div>Page 1</div>,
            },
        ];

        const { result } = renderHook(() =>
            useMultiPageFormBase({
                getCurrentData,
                pages,
            }),
        );

        expect(getCurrentData).toHaveBeenCalled();

        await act(async () => {
            await result.current.advance();
        });

        expect(getCurrentData).toHaveBeenCalledTimes(3);
    });

    it('passes current data to callbacks', () => {
        const data = { field: 'value' };
        const getCurrentDataDynamic = jest.fn(() => data);
        const onPageChange = jest.fn();

        const pages = [
            {
                id: 'page1',
                isComplete: () => false,
                onArrive: jest.fn(),
                onExit: jest.fn(),
                Component: () => <div>Page 1</div>,
            },
        ];

        renderHook(() =>
            useMultiPageFormBase({
                getCurrentData: getCurrentDataDynamic,
                pages,
                onPageChange,
            }),
        );

        expect(onPageChange).toHaveBeenCalledWith(data, pages[0]);
        expect(pages[0].onArrive).toHaveBeenCalledWith(data);
    });
});
