'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { sample } from './data';
import { buildingPermitApplicationSequence } from './sequence';
import { BuildingPermitApplicationSchema } from './validator';
import { FormContainer } from '@/components/FormContainer';
import Commentary from './Commentary.md';

export default function BuildingForm() {
    return (
        <>
            <h1>Very Long Buildings Form</h1>
            <Commentary className="prose" />

            <FormContainer
                defaultValues={sample}
                pages={buildingPermitApplicationSequence.pages}
                resolver={zodResolver(BuildingPermitApplicationSchema)}
            />
        </>
    );
}
