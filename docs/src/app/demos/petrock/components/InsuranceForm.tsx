// components/InsuranceForm.tsx
import { TextInput, Select } from '@/components/FormLibrary';
import type { FormComponentProps } from '../types';

export const InsuranceForm = ({ hookForm }: FormComponentProps) => {
    const {
        register,
        formState: { errors },
    } = hookForm;

    return (
        <div>
            <h2 className="mt-0">Insurance Information</h2>
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
