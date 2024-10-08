'use client';
import { useForm } from 'react-hook-form';
import {
    Button,
    TextInput,
    Checkbox,
    Radio,
    FileInput,
} from '@/components/FormLibrary';

const data = {
    text: 'hello',
    checkbox1: true,
    checkbox2: false,
    radio: 'fish',
    file: undefined,
};

export default function ComponentLibrary() {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: data,
    });

    return (
        <div>
            <h1>Sample Components</h1>
            <form onSubmit={handleSubmit((data) => console.log(data))}>
                <TextInput
                    label="Text"
                    {...register('text', {
                        required: 'Text is required',
                        validate: (v) => {
                            if (v === 'hello') {
                                return 'Text cannot be "hello"';
                            }
                        },
                    })}
                    error={errors.text}
                />
                <Checkbox
                    label="Checkbox 1"
                    {...register('checkbox1', {
                        required: 'Checkbox 1 is required',
                    })}
                    error={errors.checkbox1}
                />
                <Checkbox
                    label="Checkbox 2"
                    {...register('checkbox2', {
                        required: 'Checkbox 2 is required',
                    })}
                    error={errors.checkbox2}
                />
                <div className="mt-2">
                    <Radio label="Dog" value="dog" {...register('radio')} />
                    <Radio label="Cat" value="cat" {...register('radio')} />
                    <Radio label="Fish" value="fish" {...register('radio')} />
                </div>

                <FileInput
                    label="File"
                    {...register('file')}
                    setValue={setValue}
                />
                <hr />
                <Button type="submit">Submit</Button>
            </form>
        </div>
    );
}
