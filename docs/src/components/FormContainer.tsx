import type {
    Control,
    DefaultValues,
    FieldErrors,
    FieldValues,
    UseFormGetValues,
    UseFormRegister,
    UseFormSetValue,
    UseFormWatch,
    Resolver,
} from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { useMultiPageHookForm } from '../../../src/hookForm';
import { useState } from 'react';
import { SequenceVisualizer } from './SequenceVisualizer';
import { type SequenceChild, StartingPage } from '../../../src/types';
import { Button } from './FormLibrary';

export interface FormComponentProps<DataT extends FieldValues> {
    register: UseFormRegister<DataT>;
    errors: FieldErrors<DataT>;
    watch: UseFormWatch<DataT>;
    setValue: UseFormSetValue<DataT>;
    getValues: UseFormGetValues<DataT>;
    control: Control<DataT>;
}

// The multi-page form component
export function FormContainer<DataT extends FieldValues>({
    defaultValues,
    resolver,
    pages,
}: {
    defaultValues?: DefaultValues<DataT>;
    resolver?: Resolver<DataT>;
    pages: SequenceChild<DataT, FormComponentProps<DataT>, FieldErrors>[];
}) {
    const [submitted, setSubmitted] = useState(false);

    const formApi = useForm<DataT>({
        defaultValues,
        resolver,
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

    const { currentPage, advance, goBack, nextStep, previousStep, goTo } =
        useMultiPageHookForm({
            formApi,
            pages,
            startingPage: StartingPage.FirstPage,
        });

    const onSubmit = (data: DataT) => {
        setSubmitted(true);
        console.log('Form Submitted', data);
    };

    return submitted ? (
        <div className="form">
            <h3>Thanks for your submission!</h3>
            <Button
                onClick={() => {
                    formApi.reset();
                    goTo(pages[0].id);
                    setSubmitted(false);
                }}
            >
                Start again
            </Button>
        </div>
    ) : (
        <div className="form flex gap-2">
            <SequenceVisualizer
                data={watch()}
                currentPage={currentPage}
                pages={pages}
            />
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
                <hr className="my-4" />
                <div className="form-nav">
                    <div className="flex gap-2">
                        {previousStep && (
                            <Button onClick={goBack} color="neutral">
                                Prev
                            </Button>
                        )}
                        {nextStep ? (
                            <Button onClick={advance}>Next</Button>
                        ) : (
                            <Button type="submit">Submit</Button>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
}
