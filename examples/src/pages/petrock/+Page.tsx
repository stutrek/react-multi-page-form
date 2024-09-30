import { pages } from './sequence';
import type { PetRockSystem } from './types';
import * as samples from './sampleData';
import { useState } from 'react';
import { Box, Button } from '../../FormLibrary';
import { FormContainer } from '../../FormContainer';

export const Page = () => {
    const [sampleData, setSampleData] = useState<PetRockSystem>();
    return (
        <>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                    variant="outlined"
                    color="neutral"
                    onClick={() => setSampleData(undefined)}
                >
                    Empty Form
                </Button>
                <Button
                    variant="outlined"
                    color="neutral"
                    onClick={() => setSampleData(samples.bumpyMcRough)}
                >
                    Bumpy McRough
                </Button>
                <Button
                    variant="outlined"
                    color="neutral"
                    onClick={() => setSampleData(samples.glassyMcShiny)}
                >
                    Glassy McShiny
                </Button>
                <Button
                    variant="outlined"
                    color="neutral"
                    onClick={() => setSampleData(samples.rockyMcSmooth)}
                >
                    Rocky McSmooth
                </Button>
            </Box>
            <FormContainer
                defaultValues={sampleData}
                key={sampleData?.registration.rockDetails.name || 'none'}
                pages={pages}
            />
        </>
    );
};
