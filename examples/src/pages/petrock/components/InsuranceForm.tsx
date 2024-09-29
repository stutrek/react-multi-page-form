// components/InsuranceForm.tsx
import { TextInput, Select } from '../../../FormLibrary';
import type { FormComponentProps } from '../types';

export const InsuranceForm = ({ register, errors }: FormComponentProps) => {
    return (
        <div>
            <h2>Insurance Information</h2>
            <TextInput
                label="Insurance Provider"
                {...register('insuranceVerification.provider', {
                    required: 'Insurance provider is required',
                })}
                error={errors.insuranceVerification?.provider}
            />
            <TextInput
                label="Policy Number"
                {...register('insuranceVerification.policyNumber', {
                    required: 'Policy number is required',
                })}
                error={errors.insuranceVerification?.policyNumber}
            />
            <Select
                label="Coverage Type"
                {...register('insuranceVerification.coverageType', {
                    required: 'Coverage type is required',
                })}
                error={errors.insuranceVerification?.coverageType}
                options={[
                    { value: 'Damage', label: 'Damage' },
                    { value: 'Theft', label: 'Theft' },
                    { value: 'Loss', label: 'Loss' },
                    {
                        value: 'Emotional Distress',
                        label: 'Emotional Distress',
                    },
                ]}
            />
        </div>
    );
};
