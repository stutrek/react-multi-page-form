import React from 'react';
import { renderHook } from '@testing-library/react';
import { useMultiPageFormBase } from '../base';
import { StartingPage } from '../types';

describe('useMultiPageFormBase - Initialization Tests', () => {
    const pages = [
        {
            id: 'page1',
            isComplete: () => false,
            Component: () => <div />,
        },
        {
            id: 'page2',
            isComplete: () => false,
            Component: () => <div />,
        },
        {
            id: 'page3',
            isComplete: () => false,
            Component: () => <div />,
        },
    ];

    it('initializes to the first page when startingPage is StartingPage.FirstPage', () => {
        const { result } = renderHook(() =>
            useMultiPageFormBase({
                getCurrentData: () => ({}),
                pages,
                startingPage: StartingPage.FirstPage,
            }),
        );

        expect(result.current.currentPage.id).toBe('page1');
    });

    it('initializes to the first incomplete required page when startingPage is StartingPage.FirstIncomplete', () => {
        const pagesWithCompletion = [
            {
                id: 'page1',
                isComplete: () => true,
                isRequired: () => true,
                Component: () => <div />,
            },
            {
                id: 'page2',
                isComplete: () => false,
                isRequired: () => true,
                Component: () => <div />,
            },
            {
                id: 'page3',
                isComplete: () => false,
                isRequired: () => true,
                Component: () => <div />,
            },
        ];

        const { result } = renderHook(() =>
            useMultiPageFormBase({
                getCurrentData: () => ({}),
                pages: pagesWithCompletion,
                startingPage: StartingPage.FirstIncomplete,
            }),
        );

        expect(result.current.currentPage.id).toBe('page2');
    });

    it('initializes to the page with the given startingPage ID if valid', () => {
        const { result } = renderHook(() =>
            useMultiPageFormBase({
                getCurrentData: () => ({}),
                pages,
                startingPage: 'page2',
            }),
        );

        expect(result.current.currentPage.id).toBe('page2');
    });

    it('logs a warning and defaults to first incomplete page when startingPage ID is invalid', () => {
        console.warn = jest.fn();

        const pagesWithCompletion = [
            {
                id: 'page1',
                isComplete: () => true,
                isRequired: () => true,
                Component: () => <div />,
            },
            {
                id: 'page2',
                isComplete: () => false,
                isRequired: () => true,
                Component: () => <div />,
            },
        ];

        const { result } = renderHook(() =>
            useMultiPageFormBase({
                getCurrentData: () => ({}),
                pages: pagesWithCompletion,
                startingPage: 'invalidPageId',
            }),
        );

        expect(console.warn).toHaveBeenCalledWith(
            'Form page not found. Resuming from first page.',
        );

        expect(result.current.currentPage.id).toBe('page1');
    });

    it('initializes to the first incomplete page when startingPage is undefined', () => {
        const pagesWithCompletion = [
            {
                id: 'page1',
                isComplete: () => true,
                isRequired: () => true,
                Component: () => <div />,
            },
            {
                id: 'page2',
                isComplete: () => false,
                isRequired: () => true,
                Component: () => <div />,
            },
        ];

        const { result } = renderHook(() =>
            useMultiPageFormBase({
                getCurrentData: () => ({}),
                pages: pagesWithCompletion,
            }),
        );

        expect(result.current.currentPage.id).toBe('page2');
    });

    it('initializes to the first page when all required pages are complete', () => {
        const pagesAllComplete = [
            {
                id: 'page1',
                isComplete: () => true,
                isRequired: () => true,
                Component: () => <div />,
            },
            {
                id: 'page2',
                isComplete: () => true,
                isRequired: () => true,
                Component: () => <div />,
            },
        ];

        const { result } = renderHook(() =>
            useMultiPageFormBase({
                getCurrentData: () => ({}),
                pages: pagesAllComplete,
            }),
        );

        expect(result.current.currentPage.id).toBe('page1');
    });

    it('skips non-required pages during initialization when startingPage is StartingPage.FirstIncomplete', () => {
        const pagesWithNonRequired = [
            {
                id: 'page1',
                isComplete: () => false,
                isRequired: () => false,
                Component: () => <div />,
            },
            {
                id: 'page2',
                isComplete: () => false,
                isRequired: () => true,
                Component: () => <div />,
            },
        ];

        const { result } = renderHook(() =>
            useMultiPageFormBase({
                getCurrentData: () => ({}),
                pages: pagesWithNonRequired,
                startingPage: StartingPage.FirstIncomplete,
            }),
        );

        expect(result.current.currentPage.id).toBe('page2');
    });

    it('initializes to the first page if no incomplete required pages are found', () => {
        const pagesAllComplete = [
            {
                id: 'page1',
                isComplete: () => true,
                isRequired: () => true,
                Component: () => <div />,
            },
            {
                id: 'page2',
                isComplete: () => true,
                isRequired: () => true,
                Component: () => <div />,
            },
        ];

        const { result } = renderHook(() =>
            useMultiPageFormBase({
                getCurrentData: () => ({}),
                pages: pagesAllComplete,
                startingPage: StartingPage.FirstIncomplete,
            }),
        );

        expect(result.current.currentPage.id).toBe('page1');
    });

    it('logs a warning if pages change after first render', () => {
        console.warn = jest.fn();

        const initialPages = [
            {
                id: 'page1',
                isComplete: () => false,
                Component: () => <div />,
            },
        ];

        const updatedPages = [
            ...initialPages,
            {
                id: 'page2',
                isComplete: () => false,
                Component: () => <div />,
            },
        ];

        const { result, rerender } = renderHook(
            ({ pages }) =>
                useMultiPageFormBase({
                    getCurrentData: () => ({}),
                    pages,
                }),
            { initialProps: { pages: initialPages } },
        );

        expect(result.current.currentPage.id).toBe('page1');

        rerender({ pages: updatedPages });

        if (process.env.NODE_ENV !== 'production') {
            expect(console.warn).toHaveBeenCalledWith(
                'useMultiPageFormBase: pages changed after first render, this can lead to performance issues and unexpected behavior.',
            );
        }

        // The pages should have updated but navigation remains consistent
        expect(result.current.currentPage.id).toBe('page1');
    });

    it('handles empty pages array gracefully', () => {
        const { result } = renderHook(() =>
            useMultiPageFormBase({
                getCurrentData: () => ({}),
                pages: [],
            }),
        );

        expect(result.current.currentPage).toBeUndefined();
    });

    it('supports dynamic isRequired functions based on data', () => {
        const data = { skipPage2: true };

        const pagesWithDynamicRequired = [
            {
                id: 'page1',
                isComplete: () => true,
                isRequired: () => true,
                Component: () => <div />,
            },
            {
                id: 'page2',
                isComplete: () => false,
                isRequired: (data: Partial<{ skipPage2: boolean }>) =>
                    !data.skipPage2,
                Component: () => <div />,
            },
            {
                id: 'page3',
                isComplete: () => false,
                isRequired: () => true,
                Component: () => <div />,
            },
        ];

        const { result } = renderHook(() =>
            useMultiPageFormBase({
                getCurrentData: () => data,
                pages: pagesWithDynamicRequired,
                startingPage: StartingPage.FirstIncomplete,
            }),
        );

        expect(result.current.currentPage.id).toBe('page3');
    });
});
