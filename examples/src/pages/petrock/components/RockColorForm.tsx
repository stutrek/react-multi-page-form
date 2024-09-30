// components/RockColorForm.tsx
import { TextInput, Checkbox, Button } from '../../../FormLibrary';
import type { FormComponentProps } from '../types';
import { useFieldArray } from 'react-hook-form';

export const RockColorForm = ({
    register,
    errors,
    watch,
    control,
}: FormComponentProps) => {
    const isArtificialColor = watch(
        'registration.rockDetails.color.isArtificial',
    );

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'registration.rockDetails.color.secondaryColors',
    });

    return (
        <div>
            <h2>Rock Color Information</h2>
            <TextInput
                label="Primary Color"
                {...register('registration.rockDetails.color.primaryColor', {
                    required: 'Primary color is required',
                })}
                error={errors.registration?.rockDetails?.color?.primaryColor}
            />
            <h3>Secondary Colors</h3>
            {fields.map((field, index) => (
                <div
                    key={field.id}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '10px',
                    }}
                >
                    <TextInput
                        label={`Secondary Color ${index + 1}`}
                        {...register(
                            `registration.rockDetails.color.secondaryColors.${index}`,
                            {
                                required: 'Secondary color is required',
                                minLength: {
                                    value: 2,
                                    message:
                                        'Secondary color must be at least 2 characters',
                                },
                            },
                        )}
                        error={
                            errors.registration?.rockDetails?.color
                                ?.secondaryColors?.[index]?.name
                        }
                    />
                    <Button
                        type="button"
                        onClick={() => remove(index)}
                        style={{
                            marginLeft: '10px',
                            backgroundColor: '#f44336',
                            color: '#fff',
                        }}
                    >
                        Remove
                    </Button>
                </div>
            ))}
            <Button
                type="button"
                onClick={() => append({ name: '' })}
                style={{
                    backgroundColor: '#4CAF50',
                    color: '#fff',
                    marginTop: '10px',
                }}
            >
                Add Secondary Color
            </Button>
            <Checkbox
                label="Is this rock artificially colored?"
                {...register('registration.rockDetails.color.isArtificial')}
                error={errors.registration?.rockDetails?.color?.isArtificial}
            />
            {isArtificialColor && (
                <TextInput
                    label="Method of Artificial Coloring"
                    {...register(
                        'registration.rockDetails.color.colorChanges.0.method',
                        {
                            required:
                                'Method of artificial coloring is required',
                        },
                    )}
                    error={
                        errors.registration?.rockDetails?.color
                            ?.colorChanges?.[0]?.method
                    }
                />
            )}
        </div>
    );
};
