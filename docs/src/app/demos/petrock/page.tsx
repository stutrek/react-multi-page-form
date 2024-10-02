'use client';
import { pages } from './sequence';
import type { PetRockSystem } from './types';
import * as samples from './sampleData';
import { useState } from 'react';
import { Button } from '@/components/FormLibrary';
import { FormContainer } from '@/components/FormContainer';
import Commentary from './Commentary.md';

export default function PetRock() {
    const [sampleData, setSampleData] = useState<PetRockSystem>();
    return (
        <>
            <h1 className="my-1">Pet Rock Registration</h1>
            <Commentary />
            <div className="flex">
                <Button
                    color="neutral"
                    variant="outline"
                    onClick={() => setSampleData(undefined)}
                >
                    Empty Form
                </Button>
                <Button
                    color="neutral"
                    variant="outline"
                    onClick={() => setSampleData(samples.bumpyMcRough)}
                >
                    Bumpy McRough
                </Button>
                <Button
                    color="neutral"
                    variant="outline"
                    onClick={() => setSampleData(samples.glassyMcShiny)}
                >
                    Glassy McShiny
                </Button>
                <Button
                    color="neutral"
                    variant="outline"
                    onClick={() => setSampleData(samples.rockyMcSmooth)}
                >
                    Rocky McSmooth
                </Button>
            </div>
            <hr className={'my-2'} />
            <FormContainer
                defaultValues={sampleData}
                key={sampleData?.registration.rockDetails.name || 'none'}
                pages={pages}
            />
        </>
    );
}
