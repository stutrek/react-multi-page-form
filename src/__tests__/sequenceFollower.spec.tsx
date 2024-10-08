// tests/followSequence.test.js

import React from 'react';
import { followSequence } from '../testUtils/followSequence';
import type { DeepPartial, SequenceChild } from '../types';

describe('followSequence', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return all required pages in order for a simple linear sequence', () => {
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

        const data = {};

        const visitedPages = followSequence(pages, data);

        expect(visitedPages.map((page) => page.id)).toEqual([
            'page1',
            'page2',
            'page3',
        ]);
    });

    it('should skip pages where isRequired returns false', () => {
        const pages = [
            {
                id: 'page1',
                isRequired: () => true,
                isComplete: () => false,
                Component: () => <div />,
            },
            {
                id: 'page2',
                isRequired: () => false,
                isComplete: () => false,
                Component: () => <div />,
            },
            {
                id: 'page3',
                isRequired: () => true,
                isComplete: () => false,
                Component: () => <div />,
            },
        ];

        const data = {};

        const visitedPages = followSequence(pages, data);

        expect(visitedPages.map((page) => page.id)).toEqual(['page1', 'page3']);
    });

    it('should navigate to alternate next page when alternateNextPage returns a valid page ID', () => {
        const pages = [
            {
                id: 'page1',
                alternateNextPage: () => 'page3',
                isComplete: () => false,
                Component: () => <div />,
            },
            { id: 'page2', isComplete: () => false, Component: () => <div /> },
            { id: 'page3', isComplete: () => false, Component: () => <div /> },
            { id: 'page4', isComplete: () => false, Component: () => <div /> },
        ];

        const data = {};

        const visitedPages = followSequence(pages, data);

        expect(visitedPages.map((page) => page.id)).toEqual([
            'page1',
            'page3',
            'page4',
        ]);
    });

    it('should stop navigation when a page with isFinal returns true', () => {
        const pages = [
            { id: 'page1', isComplete: () => false, Component: () => <div /> },
            {
                id: 'page2',
                isFinal: () => true,
                isComplete: () => false,
                Component: () => <div />,
            },
            { id: 'page3', isComplete: () => false, Component: () => <div /> },
        ];

        const data = {};

        const visitedPages = followSequence(pages, data);

        expect(visitedPages.map((page) => page.id)).toEqual(['page1', 'page2']);
    });

    it('should proceed to next page when alternateNextPage returns an invalid page ID', () => {
        console.warn = jest.fn();

        const pages = [
            {
                id: 'page1',
                alternateNextPage: () => 'invalidPage',
                isComplete: () => false,
                Component: () => <div />,
            },
            { id: 'page2', isComplete: () => false, Component: () => <div /> },
            { id: 'page3', isComplete: () => false, Component: () => <div /> },
        ];

        const data = {};

        const visitedPages = followSequence(pages, data);

        expect(visitedPages.map((page) => page.id)).toEqual([
            'page1',
            'page2',
            'page3',
        ]);
    });

    it('should handle data-dependent isRequired and alternateNextPage functions', () => {
        const formData = { includePage1: true, skipToPage4: true };

        const pages = [
            {
                id: 'page1',
                isRequired: (data: DeepPartial<typeof formData>) =>
                    data.includePage1,
                isComplete: () => false,
                Component: () => <div />,
            },
            {
                id: 'page2',
                alternateNextPage: (data: DeepPartial<typeof formData>) =>
                    data.skipToPage4 ? 'page4' : undefined,
                isComplete: () => false,
                Component: () => <div />,
            },
            { id: 'page3', isComplete: () => false, Component: () => <div /> },
            { id: 'page4', isComplete: () => false, Component: () => <div /> },
        ];

        const visitedPages = followSequence(pages, formData);

        expect(visitedPages.map((page) => page.id)).toEqual([
            'page1',
            'page2',
            'page4',
        ]);
    });

    it('should handle an empty sequence', () => {
        const pages: SequenceChild<any, any, any>[] = [];

        const data = {};

        const visitedPages = followSequence(pages, data);

        expect(visitedPages).toEqual([]);
    });

    it('should prevent infinite loops when alternateNextPage creates a loop', () => {
        const pages = [
            {
                id: 'page1',
                alternateNextPage: () => 'page2',
                isComplete: () => false,
                Component: () => <div />,
            },
            {
                id: 'page2',
                alternateNextPage: () => 'page1',
                isComplete: () => false,
                Component: () => <div />,
            },
            { id: 'page3', isComplete: () => false, Component: () => <div /> },
        ];

        const data = {};

        expect(() =>
            followSequence(pages, data),
        ).toThrowErrorMatchingInlineSnapshot(
            `"Loop detected at page 'page1'. Navigation stopped. Full path: page1 -> page2 -> page1"`,
        );
    });

    it('should handle pages with isFinal depending on data', () => {
        const formData = { endHere: true };

        const pages = [
            {
                id: 'page1',
                isFinal: (data: DeepPartial<typeof formData>) => !!data.endHere,
                isComplete: () => false,
                Component: () => <div />,
            },
            { id: 'page2', isComplete: () => false, Component: () => <div /> },
        ];

        const visitedPages = followSequence(pages, formData);

        expect(visitedPages.map((page) => page.id)).toEqual(['page1']);
    });

    it('should continue navigation when isFinal returns false', () => {
        const pages = [
            {
                id: 'page1',
                isFinal: () => false,
                isComplete: () => false,
                Component: () => <div />,
            },
            { id: 'page2', isComplete: () => false, Component: () => <div /> },
        ];

        const data = {};

        const visitedPages = followSequence(pages, data);

        expect(visitedPages.map((page) => page.id)).toEqual(['page1', 'page2']);
    });
});
