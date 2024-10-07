import { renderHook, act } from '@testing-library/react';
import { useMultiPageFormBase } from '../base';

describe('useMultiPageFormBase - Validation Tests', () => {
    const getCurrentData = jest.fn(() => ({}));

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('prevents navigation when currentPage.validate returns errors', async () => {
        const onValidationError = jest.fn();
        const pagesWithValidation = [
            {
                id: 'page1',
                isComplete: () => false,
                validate: () => ({ field: 'Error' }),
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
                pages: pagesWithValidation,
                onValidationError,
            }),
        );

        await act(async () => {
            await result.current.advance();
        });

        expect(result.current.currentPage.id).toBe('page1');
        expect(onValidationError).toHaveBeenCalledWith({ field: 'Error' });
    });

    it('advances when currentPage.validate returns no errors', async () => {
        const pagesWithValidation = [
            {
                id: 'page1',
                isComplete: () => false,
                validate: () => undefined,
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
                pages: pagesWithValidation,
            }),
        );

        await act(async () => {
            await result.current.advance();
        });

        expect(result.current.currentPage.id).toBe('page2');
    });

    it('onValidationError is not called when validation passes', async () => {
        const onValidationError = jest.fn();
        const pagesWithValidation = [
            {
                id: 'page1',
                isComplete: () => false,
                validate: () => undefined,
                Component: () => <div>Page 1</div>,
            },
        ];

        const { result } = renderHook(() =>
            useMultiPageFormBase({
                getCurrentData,
                pages: pagesWithValidation,
                onValidationError,
            }),
        );

        await act(async () => {
            await result.current.advance();
        });

        expect(onValidationError).not.toHaveBeenCalled();
    });
});
