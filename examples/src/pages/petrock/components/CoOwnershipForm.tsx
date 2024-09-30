import { useFieldArray } from 'react-hook-form';
import { TextInput, Select } from '../../../FormLibrary';
import type { FormComponentProps } from '../types';

export const CoOwnershipForm = ({
    register,
    errors,
    control,
}: FormComponentProps) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'registration.coOwners',
    });

    return (
        <div>
            <h2>Co-Ownership Information</h2>
            {fields.map((field, index) => (
                <div key={field.id}>
                    <TextInput
                        label="Co-Owner's Name"
                        {...register(
                            `registration.coOwners.${index}.name` as const,
                            {
                                required: 'Co-owner name is required',
                            },
                        )}
                        error={errors.registration?.coOwners?.[index]?.name}
                    />
                    <TextInput
                        label="Co-Owner's Email"
                        {...register(
                            `registration.coOwners.${index}.email` as const,
                            {
                                required: 'Co-owner email is required',
                                pattern: {
                                    value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                                    message:
                                        'Please enter a valid email address',
                                },
                            },
                        )}
                        error={errors.registration?.coOwners?.[index]?.email}
                    />
                    <TextInput
                        label="Ownership Percentage"
                        type="number"
                        {...register(
                            `registration.coOwners.${index}.ownershipPercentage` as const,
                            {
                                required: 'Ownership percentage is required',
                                min: {
                                    value: 1,
                                    message: 'Percentage must be at least 1%',
                                },
                                max: {
                                    value: 99,
                                    message:
                                        'Percentage must be no more than 99%',
                                },
                            },
                        )}
                        error={
                            errors.registration?.coOwners?.[index]
                                ?.ownershipPercentage
                        }
                    />
                    <Select
                        label="Relationship to Primary Owner"
                        {...register(
                            `registration.coOwners.${index}.relationshipToPrimaryOwner` as const,
                            { required: 'Relationship is required' },
                        )}
                        error={
                            errors.registration?.coOwners?.[index]
                                ?.relationshipToPrimaryOwner
                        }
                        options={[
                            { value: 'Friend', label: 'Friend' },
                            { value: 'Family Member', label: 'Family Member' },
                            { value: 'Neighbor', label: 'Neighbor' },
                            {
                                value: 'Former Rock Owner',
                                label: 'Former Rock Owner',
                            },
                            { value: 'Other', label: 'Other' },
                        ]}
                    />
                    <button type="button" onClick={() => remove(index)}>
                        Remove
                    </button>
                </div>
            ))}
            <button
                type="button"
                onClick={() =>
                    append({
                        name: '',
                        email: '',
                        ownershipPercentage: 0,
                        relationshipToPrimaryOwner: '',
                    })
                }
            >
                Add Co-Owner
            </button>
        </div>
    );
};
