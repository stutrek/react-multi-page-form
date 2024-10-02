// components/RockIdentificationForm.tsx
import { TextInput, Radio, Checkbox } from '@/components/FormLibrary';
import type { FormComponentProps } from '../types';

export const RockIdentificationForm = ({
    register,
    errors,
    getValues,
}: FormComponentProps) => {
    return (
        <div>
            <h2 className="mt-0">Rock Identification</h2>
            <TextInput
                label="Rock Name"
                {...register('registration.rockDetails.name', {
                    required: 'Rock name is required',
                })}
                error={errors.registration?.rockDetails?.name}
            />
            <TextInput
                label="Rock Alias"
                {...register('registration.rockDetails.alias')}
                error={errors.registration?.rockDetails?.alias}
            />
            <TextInput
                label="Date of Acquisition"
                type="date"
                {...register('registration.rockDetails.dateOfAcquisition', {
                    required: 'Date of acquisition is required',
                })}
                error={errors.registration?.rockDetails?.dateOfAcquisition}
            />
            <div className="mt-2">
                <Radio
                    label="Sedimentary"
                    value="Sedimentary"
                    {...register('registration.rockDetails.type', {
                        required: 'Rock type is required',
                    })}
                />
                <Radio
                    label="Igneous"
                    value="Igneous"
                    {...register('registration.rockDetails.type', {
                        required: 'Rock type is required',
                    })}
                />
                <Radio
                    label="Metamorphic"
                    value="Metamorphic"
                    {...register('registration.rockDetails.type', {
                        required: 'Rock type is required',
                    })}
                />
                <Radio
                    label="Other"
                    value="Other"
                    {...register('registration.rockDetails.type')}
                />
            </div>
            <TextInput
                label="Rock Weight (in grams)"
                type="number"
                {...register('registration.rockDetails.weight', {
                    required: 'Rock weight is required',
                    min: {
                        value: 1,
                        message: 'Rock weight must be greater than 0 grams',
                    },
                })}
                error={errors.registration?.rockDetails?.weight}
            />
            <Checkbox
                label="This rock has siblings"
                {...register('registration.rockDetails.hasSiblings')}
            />
            <Checkbox
                label="This rock is accessorized"
                {...register('registration.rockDetails.isAccessorized')}
            />
            <Checkbox
                label="This is an emotional support rock"
                {...register('registration.certifications.emotionalSupport')}
            />
        </div>
    );
};
