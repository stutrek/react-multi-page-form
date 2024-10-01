// components/OwnerForm.tsx
import { TextInput, Checkbox } from '@/components/FormLibrary';
import type { FormComponentProps } from '../types';

export const OwnerForm = ({ register, errors }: FormComponentProps) => {
    return (
        <div>
            <h2>Owner Information</h2>
            <TextInput
                label="Full Name"
                {...register('registration.owner.name', {
                    required: 'Owner name is required',
                    minLength: {
                        value: 2,
                        message: 'Owner name must be at least 2 characters',
                    },
                })}
                error={errors.registration?.owner?.name}
            />
            <TextInput
                label="Address"
                {...register('registration.owner.address', {
                    maxLength: {
                        value: 100,
                        message: 'Address cannot exceed 100 characters',
                    },
                })}
                error={errors.registration?.owner?.address}
            />
            <TextInput
                label="Phone Number"
                {...register('registration.owner.phone', {
                    validate: (value) => {
                        const numbers = value?.replace(/\D/g, '');
                        return (
                            numbers?.length === 10 ||
                            'Phone number must be 10 digits'
                        );
                    },
                })}
                error={errors.registration?.owner?.phone}
            />
            <TextInput
                label="Email Address"
                {...register('registration.owner.email', {
                    required: 'Email is required',
                    pattern: {
                        value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                        message: 'Please enter a valid email address',
                    },
                })}
                error={errors.registration?.owner?.email}
            />
            <Checkbox
                label="Is rock in shared custody?"
                {...register('registration.owner.hasCoOwners')}
                error={errors.registration?.owner?.hasCoOwners}
            />
        </div>
    );
};
