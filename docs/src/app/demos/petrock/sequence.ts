import type { FieldErrors } from 'react-hook-form';
import { OwnerForm } from './components/OwnerForm';
import { CoOwnershipForm } from './components/CoOwnershipForm';
import { RockIdentificationForm } from './components/RockIdentificationForm';
import { RockColorForm } from './components/RockColorForm';
import { RockSiblingForm } from './components/RockSiblingForm';
import { RockPersonalityForm } from './components/RockPersonalityForm';
import { AccessoryInventoryForm } from './components/AccessoryInventoryForm';
import { EmotionalSupportForm } from './components/EmotionalSupportForm';
import { InsuranceForm } from './components/InsuranceForm';

import type { FormComponentProps, PetRockSystem } from './types';
import type { SequenceChild } from '../../../../../src/types';

// Form sequence
export const pages: SequenceChild<
    PetRockSystem,
    FormComponentProps,
    FieldErrors<PetRockSystem>
>[] = [
    {
        id: 'owner-info',
        isComplete: (data) => !!data.registration?.owner?.name,
        Component: OwnerForm,
    },
    {
        id: 'co-ownership-info',
        isRequired: (data) => !!data.registration?.owner?.hasCoOwners,
        isComplete: (data) =>
            !data.registration?.owner?.hasCoOwners ||
            (!!data.registration?.coOwners &&
                data.registration.coOwners.every(
                    (coOwner) =>
                        !!coOwner?.name && !!coOwner.ownershipPercentage,
                )),
        Component: CoOwnershipForm,
    },
    {
        id: 'rock-identification',
        isComplete: (data) =>
            !!data.registration?.rockDetails?.name &&
            !!data.registration.rockDetails.type &&
            !!data.registration.rockDetails.weight,
        Component: RockIdentificationForm,
    },
    {
        id: 'rock-color',
        isRequired: (data) =>
            (!!data.registration?.rockDetails?.color?.secondaryColors &&
                data.registration.rockDetails.color.secondaryColors.length >
                    0) ||
            data.registration?.rockDetails?.color?.isArtificial,
        isComplete: (data) =>
            !!data.registration?.rockDetails?.color?.primaryColor &&
            (!data.registration.rockDetails.color.isArtificial ||
                (!!data.registration.rockDetails.color.colorChanges &&
                    data.registration.rockDetails.color.colorChanges.length >
                        0)),
        Component: RockColorForm,
    },
    {
        id: 'rock-siblings',
        isRequired: (data) => !!data.registration?.rockDetails?.hasSiblings,
        isComplete: (data) =>
            !data.registration?.rockDetails?.hasSiblings ||
            (!!data.registration?.rockDetails?.lineage?.knownSiblings &&
                data.registration.rockDetails.lineage.knownSiblings.every(
                    (name) => !!name,
                )),
        Component: RockSiblingForm,
    },
    {
        id: 'rock-personality',
        isComplete: (data) => !!data.registration?.personalityProfile?.demeanor,
        Component: RockPersonalityForm,
    },
    {
        id: 'accessory-inventory',
        isRequired: (data) => !!data.registration?.rockDetails?.isAccessorized,
        isComplete: (data) =>
            !data.registration?.rockDetails?.isAccessorized ||
            !!data.accessoryInventory?.accessories?.every(
                (accessory) => !!accessory?.type,
            ),
        Component: AccessoryInventoryForm,
    },
    {
        id: 'emotional-support',
        isRequired: (data) =>
            !!data.registration?.certifications?.emotionalSupport,
        isComplete: (data) =>
            !!data.emotionalSupportCertification?.certificationDetails
                ?.registrationNumber,
        Component: EmotionalSupportForm,
    },
    {
        id: 'insurance',
        isComplete: (data) =>
            !!data.insuranceVerification?.provider &&
            !!data.insuranceVerification?.policyNumber,
        Component: InsuranceForm,
    },
];
