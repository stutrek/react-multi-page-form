// components/CoOwnershipForm.tsx
import { TextInput, Select } from '../../../FormLibrary';
import type { FormComponentProps } from '../types';

export const CoOwnershipForm = ({ register, errors }: FormComponentProps) => {
    return (
        <div>
            <h2>Co-Ownership Information</h2>
            <TextInput
                label="Co-Owner's Name"
                {...register('registration.coOwners.0.name', {
                    required: 'Co-owner name is required',
                })}
                error={errors.registration?.coOwners?.[0]?.name}
            />
            <TextInput
                label="Co-Owner's Email"
                {...register('registration.coOwners.0.email', {
                    required: 'Co-owner email is required',
                    pattern: {
                        value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                        message: 'Please enter a valid email address',
                    },
                })}
                error={errors.registration?.coOwners?.[0]?.email}
            />
            <TextInput
                label="Ownership Percentage"
                type="number"
                {...register('registration.coOwners.0.ownershipPercentage', {
                    required: 'Ownership percentage is required',
                    min: {
                        value: 1,
                        message: 'Percentage must be at least 1%',
                    },
                    max: {
                        value: 99,
                        message: 'Percentage must be no more than 99%',
                    },
                })}
                error={errors.registration?.coOwners?.[0]?.ownershipPercentage}
            />
            <Select
                label="Relationship to Primary Owner"
                {...register(
                    'registration.coOwners.0.relationshipToPrimaryOwner',
                    { required: 'Relationship is required' },
                )}
                error={
                    errors.registration?.coOwners?.[0]
                        ?.relationshipToPrimaryOwner
                }
                options={[
                    { value: 'Friend', label: 'Friend' },
                    { value: 'Family Member', label: 'Family Member' },
                    { value: 'Neighbor', label: 'Neighbor' },
                    { value: 'Former Rock Owner', label: 'Former Rock Owner' },
                    { value: 'Other', label: 'Other' },
                ]}
            />
        </div>
    );
};
