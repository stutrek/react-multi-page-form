// components/RockIdentificationForm.tsx
import { TextInput, RadioGroup, Radio } from '../../../FormLibrary';
import type { FormComponentProps } from '../types';

export const RockIdentificationForm = ({
    register,
    errors,
}: FormComponentProps) => {
    return (
        <div>
            <h2>Rock Identification</h2>
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
            <RadioGroup name="rockType">
                <Radio
                    label="Sedimentary"
                    value="sedimentary"
                    {...register('registration.rockDetails.type.sedimentary', {
                        required: 'Rock type is required',
                    })}
                />
                <Radio
                    label="Igneous"
                    value="igneous"
                    {...register('registration.rockDetails.type.igneous', {
                        required: 'Rock type is required',
                    })}
                />
                <Radio
                    label="Metamorphic"
                    value="metamorphic"
                    {...register('registration.rockDetails.type.metamorphic', {
                        required: 'Rock type is required',
                    })}
                />
                <Radio
                    label="Other"
                    value="other"
                    {...register('registration.rockDetails.type.other')}
                />
            </RadioGroup>
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
        </div>
    );
};
