// components/EmotionalSupportForm.tsx
import { TextInput, Select } from '@/components/FormLibrary';
import type { FormComponentProps } from '../types';

export const EmotionalSupportForm = ({
    register,
    errors,
}: FormComponentProps) => {
    return (
        <div>
            <h2 className="mt-0">Emotional Support Rock Certification</h2>
            <TextInput
                label="Certification Authority"
                {...register(
                    'emotionalSupportCertification.certificationDetails.authority',
                    { required: 'Certification authority is required' },
                )}
                error={
                    errors.emotionalSupportCertification?.certificationDetails
                        ?.authority
                }
            />
            <TextInput
                label="Registration Number"
                {...register(
                    'emotionalSupportCertification.certificationDetails.registrationNumber',
                    { required: 'Registration number is required' },
                )}
                error={
                    errors.emotionalSupportCertification?.certificationDetails
                        ?.registrationNumber
                }
            />
            <Select
                label="Support Functions"
                {...register('emotionalSupportCertification.supportFunctions', {
                    required: 'Support function is required',
                })}
                error={errors.emotionalSupportCertification?.supportFunctions}
                options={[
                    {
                        value: 'Grounding Presence',
                        label: 'Grounding Presence',
                    },
                    {
                        value: 'Comfort during Stress',
                        label: 'Comfort during Stress',
                    },
                    {
                        value: 'Symbol of Stability',
                        label: 'Symbol of Stability',
                    },
                    { value: 'Other', label: 'Other' },
                ]}
            />
            {errors.emotionalSupportCertification?.supportFunctions && (
                <p>
                    {
                        errors.emotionalSupportCertification.supportFunctions
                            .message
                    }
                </p>
            )}
        </div>
    );
};
