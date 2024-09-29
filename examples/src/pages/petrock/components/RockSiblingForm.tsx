// components/RockSiblingForm.tsx
import { TextInput, Button } from '../../../FormLibrary';
import type { FormComponentProps } from '../types';
import { useFieldArray } from 'react-hook-form';

export const RockSiblingForm = ({
    register,
    errors,
    control,
}: FormComponentProps) => {
    // Initialize useFieldArray for knownSiblings
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'registration.rockDetails.lineage.knownSiblings',
    });

    return (
        <div>
            <h2>Rock Sibling Information</h2>
            {fields.map((field, index) => (
                <div
                    key={field.id}
                    style={{
                        border: '1px solid #ccc',
                        padding: '10px',
                        marginBottom: '10px',
                    }}
                >
                    <h3>Sibling {index + 1}</h3>
                    <TextInput
                        label="Sibling Name"
                        {...register(
                            `registration.rockDetails.lineage.knownSiblings.${index}.name`,
                            {
                                required: 'Sibling name is required',
                                minLength: {
                                    value: 2,
                                    message:
                                        'Sibling name must be at least 2 characters',
                                },
                            },
                        )}
                        error={
                            errors.registration?.rockDetails?.lineage
                                ?.knownSiblings?.[index]?.name
                        }
                    />
                    <Button
                        type="button"
                        onClick={() => remove(index)}
                        style={{
                            marginTop: '10px',
                            backgroundColor: '#f44336',
                            color: '#fff',
                        }}
                    >
                        Remove Sibling
                    </Button>
                </div>
            ))}
            <Button
                type="button"
                onClick={() => append({ name: '' })}
                style={{ backgroundColor: '#4CAF50', color: '#fff' }}
            >
                Add Sibling
            </Button>
            {errors.registration?.rockDetails?.lineage?.knownSiblings
                ?.message && (
                <p style={{ color: 'red' }}>
                    {
                        errors.registration.rockDetails.lineage.knownSiblings
                            .message
                    }
                </p>
            )}
        </div>
    );
};
