import { renderHook, act } from '@testing-library/react';
import { useMultiPageForm } from '../index';

describe('should increment counter', () => {
    it('should advance', async () => {
        const pages = [
            {
                id: 'first',
                isComplete: () => false,
                validate: () => undefined,
                Component: () => <div />,
            },
            {
                id: 'second',
                isComplete: () => false,
                validate: () => undefined,
                Component: () => <div />,
            },
        ];

        const { result } = renderHook(() =>
            useMultiPageForm({
                getCurrentData: () => ({}),
                pages,
            }),
        );
        expect(result.current.currentPage).toBe(pages[0]);
        expect(result.current.nextIncompleteStep).toBe(pages[1]);

        await act(async () => {
            await result.current.advance();
        });

        expect(result.current.currentPage).toBe(pages[1]);
        expect(result.current.nextIncompleteStep).toBe(undefined);
    });
});
