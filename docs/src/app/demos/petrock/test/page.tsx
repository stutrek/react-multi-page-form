'use client';
import { flattenPages } from '../../../../../../src/utils';
import { FormPagesTester } from '../../../../../../src/testUtils/FormPagesTester';
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
