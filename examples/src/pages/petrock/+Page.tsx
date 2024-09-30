import { useForm } from 'react-hook-form';
import { pages } from './sequence';
import type { PetRockSystem } from './types';
import * as samples from './sampleData';
import { useMultiPageHookForm } from '../../../../src/hookForm';
import { useState } from 'react';
import { SequenceVisualizer } from '../../SequenceVisualizer';
import { StartingPage } from '../../../../src/types';

// The multi-page form component
export const PetRockRegistrationForm = ({
    defaultValues,
}: { defaultValues?: PetRockSystem }) => {
    const formApi = useForm<PetRockSystem>({
        defaultValues,
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
        getValues,
        control,
    } = formApi;

    const { currentPage, advance, goBack, nextStep, previousStep } =
        useMultiPageHookForm({
            formApi,
            pages,
            startingPage: StartingPage.FirstPage,
        });

    const onSubmit = (data: PetRockSystem) => {
        console.log('Form Submitted', data);
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-card">
                    <currentPage.Component
                        register={register}
                        errors={errors}
                        watch={watch}
                        setValue={setValue}
                        getValues={getValues}
                        control={control}
                    />
                </div>
                <div className="form-actions">
                    {previousStep && (
                        <button onClick={goBack} type="button">
                            Prev
                        </button>
                    )}
                    {nextStep ? (
                        <button onClick={advance} type="button">
                            Next
                        </button>
                    ) : (
                        <button type="submit">Submit</button>
                    )}
                </div>
            </form>
            <SequenceVisualizer
                data={watch()}
                currentPage={currentPage}
                pages={pages}
            />
        </>
    );
};

export const Page = () => {
    const [sampleData, setSampleData] = useState<PetRockSystem>();
    return (
        <div>
            <button onClick={() => setSampleData(undefined)} type="button">
                Empty Form
            </button>
            <button
                onClick={() => setSampleData(samples.bumpyMcRough)}
                type="button"
            >
                Bumpy McRough
            </button>
            <button
                onClick={() => setSampleData(samples.glassyMcShiny)}
                type="button"
            >
                Glassy McShiny
            </button>
            <button
                onClick={() => setSampleData(samples.rockyMcSmooth)}
                type="button"
            >
                Rocky McSmooth
            </button>
            <PetRockRegistrationForm
                defaultValues={sampleData}
                key={sampleData?.registration.rockDetails.name || 'none'}
            />
        </div>
    );
};
