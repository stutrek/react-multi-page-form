import {
    type DefaultValues,
    type FieldValues,
    useForm,
    type UseFormReturn,
} from 'react-hook-form';
import type { DeepPartial, FormPage } from '../../types'; // Adjust the import path as needed
import { useLayoutEffect } from 'react';

export function FormPageTester<DataT extends FieldValues, ComponentProps>({
    page,
    defaultValues,
    additionalProps,
    validator,
    shouldValidate = false,
}: {
    page: FormPage<DataT, ComponentProps, any>;
    defaultValues?: DefaultValues<DataT>;
    additionalProps?: DeepPartial<ComponentProps>;
    validator?: any; // Replace 'any' with the appropriate type for the validator
    shouldValidate?: boolean;
}): JSX.Element {
    const hookForm: UseFormReturn<DataT> = useForm<DataT>({
        defaultValues,
        resolver: validator,
    });

    const { trigger, reset } = hookForm;

    const handleValidate = () => {
        trigger();
    };

    const handleReset = () => {
        reset();
    };

    useLayoutEffect(() => {
        if (shouldValidate) {
            trigger();
        }
    });

    return (
        <div>
            <page.Component
                {...(additionalProps as ComponentProps)}
                hookForm={hookForm}
            />
            <button onClick={handleValidate}>Validate</button>
            <button onClick={handleReset}>Reset</button>
        </div>
    );
}
