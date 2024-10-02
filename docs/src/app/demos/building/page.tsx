'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { sample } from './data';
import { buildingPermitApplicationSequence } from './sequence';
import { BuildingPermitApplicationSchema } from './validator';
import { FormContainer } from '@/components/FormContainer';

export default function BuildingForm() {
    return (
        <>
            <h1>Multi Page Form Example</h1>
            <FormContainer
                defaultValues={sample}
                pages={buildingPermitApplicationSequence.pages}
                resolver={zodResolver(BuildingPermitApplicationSchema)}
            />
        </>
    );
}
