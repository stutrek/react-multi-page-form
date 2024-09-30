// components/RockPersonalityForm.tsx
import { Divider, Stack } from '@mui/joy';
import { RadioGroup, Radio, Checkbox, TextInput } from '../../../FormLibrary';
import type { FormComponentProps } from '../types';

export const RockPersonalityForm = ({
    register,
    errors,
    watch,
}: FormComponentProps) => {
    return (
        <div>
            <h2>Rock Personality Profile</h2>
            <Stack spacing={2}>
                <RadioGroup name="rockDemeanor">
                    <Radio
                        label="Introverted"
                        value="Introverted"
                        {...register(
                            'registration.personalityProfile.demeanor',
                            {
                                required: 'Demeanor is required',
                            },
                        )}
                    />
                    <Radio
                        label="Extroverted"
                        value="Extroverted"
                        {...register(
                            'registration.personalityProfile.demeanor',
                            {
                                required: 'Demeanor is required',
                            },
                        )}
                    />
                    <Radio
                        label="Shy"
                        value="Shy"
                        {...register(
                            'registration.personalityProfile.demeanor',
                            {
                                required: 'Demeanor is required',
                            },
                        )}
                    />
                    <Radio
                        label="Energetic"
                        value="Energetic"
                        {...register(
                            'registration.personalityProfile.demeanor',
                            {
                                required: 'Demeanor is required',
                            },
                        )}
                    />
                    <Radio
                        label="Laid-back"
                        value="Laid-back"
                        {...register(
                            'registration.personalityProfile.demeanor',
                            {
                                required: 'Demeanor is required',
                            },
                        )}
                    />
                </RadioGroup>
                <Divider />
                <Checkbox
                    label="Does your pet rock enjoy physical contact?"
                    {...register(
                        'registration.personalityProfile.interactionPreferences.physicalContact',
                    )}
                    error={
                        errors.registration?.personalityProfile
                            ?.interactionPreferences?.physicalContact
                    }
                />
                {errors.registration?.personalityProfile?.interactionPreferences
                    ?.physicalContact && (
                    <p>
                        {
                            errors.registration.personalityProfile
                                .interactionPreferences.physicalContact.message
                        }
                    </p>
                )}
                {watch(
                    'registration.personalityProfile.interactionPreferences.physicalContact',
                ) && (
                    <>
                        <RadioGroup name="preferredContactType">
                            <Radio
                                label="Rolling"
                                value="Rolling"
                                {...register(
                                    'registration.personalityProfile.interactionPreferences.preferredContactType',
                                    {
                                        required:
                                            'Preferred contact type is required',
                                    },
                                )}
                            />
                            <Radio
                                label="Light Tapping"
                                value="Light Tapping"
                                {...register(
                                    'registration.personalityProfile.interactionPreferences.preferredContactType',
                                    {
                                        required:
                                            'Preferred contact type is required',
                                    },
                                )}
                            />
                            <Radio
                                label="Skipping"
                                value="Skipping"
                                {...register(
                                    'registration.personalityProfile.interactionPreferences.preferredContactType',
                                    {
                                        required:
                                            'Preferred contact type is required',
                                    },
                                )}
                            />
                        </RadioGroup>
                        {errors.registration?.personalityProfile
                            ?.interactionPreferences?.preferredContactType && (
                            <p>
                                {
                                    errors.registration.personalityProfile
                                        .interactionPreferences
                                        .preferredContactType.message
                                }
                            </p>
                        )}
                    </>
                )}
                <TextInput
                    label="Interaction Frequency"
                    {...register(
                        'registration.personalityProfile.interactionFrequency',
                        { required: 'Interaction frequency is required' },
                    )}
                    error={
                        errors.registration?.personalityProfile
                            ?.interactionFrequency
                    }
                />
            </Stack>
        </div>
    );
};
