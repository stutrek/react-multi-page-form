# Testing Forms and Sequences

React Multi Page Forms provides two tools to make testing and development easier.

## `flattenPages`

This method takes any sequence and flattens it, using a depth first search. This is the same utility used internally to determine the order of pages and sequences.

This utility enables you to test sequences easily.

```typescript
import { flattenPages } from 'react-multi-page-form/utils';
import { wyomingSequence } from '../stateSequences';

describe('wyoming sequence', () => {
	it("should include video visits when they're accepted", () => {
		const flattened = flattenPages(wyomingSequence);
		
		const data = {
			state: 'WY',
			acceptsVideoVisits: true
		};

		const pageIds = flattened.filter(page => page.isRequired(data));

		expect(pageIds).toEqual([
			'page-one',
			'page-two',
			'video-visits',
			'last-page'
		]);
	})

	it("should exclude video visits when they're not accepted", () => {
		const flattened = flattenPages(wyomingSequence);
		
		const data = {
			state: 'WY',
			acceptsVideoVisits: false
		};

		const pageIds = flattened.filter(page => page.isRequired(data));

		expect(pageIds).toEqual([
			'page-one',
			'page-two',
			'last-page'
		]);
} )

```

## The `FormPagesTester` Component

Building and ensuring accurate validation on your forms can be very challenging. This utility component takes an array of pages and sample data, and makes a single page that contains all the forms for the sequence. This component can be useful when combined with Storybook and visual testing.

[See an example](/demos/petrock/test) on the pet rock registration form.

```typescript
'use client';
import { flattenPages } from 'react-multi-page-form/utils';
import { FormPagesTester } from 'react-multi-page-form/testUtils/FormPagesTester';
import { pages } from '../sequence';
import { rockyMcSmooth } from '../sampleData';

const flattened = flattenPages(pages);

export default function PetRockTest() {
    return (
        <>
            <h1>Pet Rock Test Page</h1>
            <FormPagesTester pages={flattened} sampleData={rockyMcSmooth} />
        </>
    );
}
```