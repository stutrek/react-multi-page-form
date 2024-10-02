'use client';
import { TextInput } from '@/components/FormLibrary';
import {
    type FormComponentProps,
    FormContainer,
} from '@/components/FormContainer';
import type { FieldErrors } from 'react-hook-form';
import type { SequenceChild } from '../../../../../src/types';

// This is the data model that will be used for the form
type FormModel = {
    name: string;
    pet: string;
};

// These are the components that will be used for each page of the form
const FirstPage = (props: FormComponentProps<FormModel>) => {
    const { errors, register } = props;
    return (
        <>
            <h2 className="my-1">First Page</h2>
            <TextInput
                label="Name"
                {...register('name', {
                    // required: true,
                    validate: (v) => {
                        console.log(v);
                        if (!v) {
                            return 'Name is required';
                        }
                        if (v === 'Chungus') {
                            return 'Name cannot be Chungus';
                        }
                    },
                })}
                error={errors.name}
            />
            <i>Note: name cannot be "Chungus".</i>
        </>
    );
};

const SecondPage = (props: FormComponentProps<FormModel>) => {
    const { errors, register } = props;
    return (
        <>
            <h2 className="my-1">Second Page</h2>
            <TextInput
                label="Pet's Name"
                {...register('pet', {
                    required: true,
                    validate: (v, data) => {
                        console.log(v, data);
                        if (!v) {
                            return 'Pet is required';
                        }
                        if (v === data.name) {
                            return 'Pet cannot be the same as a person';
                        }
                    },
                })}
                error={errors.pet}
            />
            <i>Note: name cannot be the same as the human's name</i>
        </>
    );
};

// This is the sequence of pages that react-multi-page-form will use
const sequence: SequenceChild<
    FormModel,
    FormComponentProps<FormModel>,
    FieldErrors<FormModel>
>[] = [
    {
        id: 'first',
        isComplete: (data) => !!data.name?.length,
        validate: () => undefined,
        Component: FirstPage,
    },
    {
        id: 'second',
        isComplete: (data) => !!data.pet?.length,
        validate: () => undefined,
        Component: SecondPage,
    },
] as const;

export default function TwoPager() {
    return (
        <>
            <h1>Simple two page example</h1>
            <FormContainer defaultValues={{}} pages={sequence} />
        </>
    );
}
