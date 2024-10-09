// tests/followSequenceWithDecisionNodes.test.js

import { followSequence } from '../testUtils/followSequence';
import type { DecisionNode, FormPage } from '../types';

// Helper function to create FormPages
const createPage = (id: string, overrides = {}) =>
    ({
        id,
        isComplete: () => false,
        ...overrides,
    }) as unknown as FormPage<any, any, any>;

// Helper function to create DecisionNodes
const createDecisionNode = (id: string, overrides = {}) =>
    ({
        id,
        ...overrides,
    }) as DecisionNode<any>;

describe('followSequence with DecisionNodes', () => {
    it('navigates through a DecisionNode using selectNextPage', () => {
        const data = {};
        const sequence = [
            createPage('page1'),
            createDecisionNode('decision1', {
                selectNextPage: () => 'page3',
            }),
            createPage('page2'),
            createPage('page3'),
        ];

        const visitedPages = followSequence(sequence, data);

        // Expect visited pages to include only FormPages, in the order determined by the DecisionNode
        expect(visitedPages.map((page) => page.id)).toEqual(['page1', 'page3']);
    });

    it('skips DecisionNode when isRequired returns false', () => {
        const data = {};
        const sequence = [
            createPage('page1'),
            createDecisionNode('decision1', {
                isRequired: () => false,
                selectNextPage: () => 'page3',
            }),
            createPage('page2'),
            createPage('page3'),
        ];

        const visitedPages = followSequence(sequence, data);

        // DecisionNode is skipped; navigation proceeds as normal
        expect(visitedPages.map((page) => page.id)).toEqual([
            'page1',
            'page2',
            'page3',
        ]);
    });

    it('proceeds to next item when selectNextPage returns undefined', () => {
        const data = {};
        const sequence = [
            createPage('page1'),
            createDecisionNode('decision1', {
                selectNextPage: () => undefined,
            }),
            createPage('page2'),
            createPage('page3'),
        ];

        const visitedPages = followSequence(sequence, data);

        // Navigation proceeds to the next item
        expect(visitedPages.map((page) => page.id)).toEqual([
            'page1',
            'page2',
            'page3',
        ]);
    });

    it('skips over decision nodes when they are skipped', () => {
        const data = {};
        const sequence = [
            createPage('page1'),
            createDecisionNode('decision1', {
                selectNextPage: () => 'page2',
            }),
            createDecisionNode('decision2', {
                selectNextPage: () => 'page4',
            }),
            createPage('page2'),
            createPage('page3'),
            createPage('page4'),
        ];

        const visitedPages = followSequence(sequence, data);

        // Navigation should be: page1 -> page2 -> page4
        expect(visitedPages.map((page) => page.id)).toEqual([
            'page1',
            'page2',
            'page3',
            'page4',
        ]);
    });

    it('handles DecisionNode at the beginning of the sequence', () => {
        const data = {};
        const sequence = [
            createDecisionNode('decision1', {
                selectNextPage: () => 'page2',
            }),
            createPage('page1'),
            createPage('page2'),
        ];

        const visitedPages = followSequence(sequence, data);

        // Should start at decision1, then go to page2
        expect(visitedPages.map((page) => page.id)).toEqual(['page2']);
    });

    it('throws error when selectNextPage returns invalid page ID', () => {
        const data = {};
        const sequence = [
            createPage('page1'),
            createDecisionNode('decision1', {
                selectNextPage: () => 'invalidPage',
            }),
            createPage('page2'),
        ];

        expect(() => followSequence(sequence, data)).toThrow(
            'Next page "invalidPage" not found.',
        );
    });

    it('handles data-dependent selectNextPage functions', () => {
        const data = { skipPage2: true };
        const sequence = [
            createPage('page1'),
            createDecisionNode('decision1', {
                selectNextPage: (choiceData: typeof data) =>
                    choiceData.skipPage2 ? 'page3' : 'page2',
            }),
            createPage('page2'),
            createPage('page3'),
        ];

        const visitedPages = followSequence(sequence, data);

        // DecisionNode directs to page3 based on data
        expect(visitedPages.map((page) => page.id)).toEqual(['page1', 'page3']);
    });

    it('handles DecisionNode as the last item in the sequence', () => {
        const data = {};
        const sequence = [
            createPage('page1'),
            createPage('page2'),
            createDecisionNode('decision1', {
                selectNextPage: () => 'page3',
            }),
            createPage('page3'),
        ];

        const visitedPages = followSequence(sequence, data);

        // Navigation proceeds to page3 after the decision
        expect(visitedPages.map((page) => page.id)).toEqual([
            'page1',
            'page2',
            'page3',
        ]);
    });

    it('integrates DecisionNode with FormPage having alternateNextPage', () => {
        const data = {};
        const sequence = [
            createPage('page1'),
            createDecisionNode('decision1', {
                selectNextPage: () => 'page3',
            }),
            createPage('page2', {
                alternateNextPage: () => 'page4',
            }),
            createPage('page3'),
            createPage('page4'),
        ];

        const visitedPages = followSequence(sequence, data);

        // Expected navigation: page1 -> page3 -> page4
        expect(visitedPages.map((page) => page.id)).toEqual([
            'page1',
            'page3',
            'page4',
        ]);
    });

    it('supports DecisionNode with isRequired depending on data', () => {
        const data = { includeDecision: false };
        const sequence = [
            createPage('page1'),
            createDecisionNode('decision1', {
                isRequired: (decisionData: typeof data) =>
                    decisionData.includeDecision,
                selectNextPage: () => 'page3',
            }),
            createPage('page2'),
            createPage('page3'),
        ];

        const visitedPages = followSequence(sequence, data);

        // DecisionNode is skipped; navigation proceeds as normal
        expect(visitedPages.map((page) => page.id)).toEqual([
            'page1',
            'page2',
            'page3',
        ]);
    });
});
