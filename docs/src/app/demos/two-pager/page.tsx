import './App.css';
import { TextInput } from '@/components/FormLibrary';
import type { SequenceChild } from '../../../../src/types';
import {
    type FormComponentProps,
    FormContainer,
} from '@/components/FormContainer';
import type { FieldErrors } from 'react-hook-form';

type FormModel = {
    name: string;
    pet: string;
};

const FirstPage = (props: FormComponentProps<FormModel>) => {
    const { errors, register } = props;
    return (
        <>
            <TextInput
                label="Name"
                {...register('name', {
                    required: true,
                    validate: (v) => {
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
        </>
    );
};

const SecondPage = (props: FormComponentProps<FormModel>) => {
    const { errors, register } = props;
    return (
        <>
            <TextInput
                label="Pet"
                {...register('pet', {
                    required: true,
                    validate: (v, data) => {
                        console.log(v, data);
                        if (!v) {
                            return 'Pet is required';
                        }
                        if (v === data.name) {
                            console.log('hi');
                            return 'Pet cannot be the same as a person';
                        }
                    },
                })}
                error={errors.pet}
            />
        </>
    );
};

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
            <h1>Multi Page Form Example</h1>
            <FormContainer defaultValues={{}} pages={sequence} />
        </>
    );
}
