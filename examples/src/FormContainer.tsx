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
import { useMultiPageHookForm } from '../../src/hookForm';
import { useState } from 'react';
import { SequenceVisualizer } from './SequenceVisualizer';
import { type SequenceChild, StartingPage } from '../../src/types';
import { Box, Button } from './FormLibrary';
import { Divider, Stack } from '@mui/joy';

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
        <Box sx={{ display: 'flex', gap: 2 }} className="form">
            <SequenceVisualizer
                data={watch()}
                currentPage={currentPage}
                pages={pages}
            />
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={2}>
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
                    <Divider />
                    <div className="form-nav">
                        <Box
                            sx={{
                                display: 'flex',
                                gap: 2,
                                flexWrap: 'wrap',
                            }}
                        >
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
                        </Box>
                    </div>
                </Stack>
            </form>
        </Box>
    );
}
