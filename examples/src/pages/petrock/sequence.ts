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
import type { SequenceChild } from '../../../../src/types';

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
        isNeeded: (data) =>
            !!data.registration?.coOwners &&
            data.registration.coOwners.length > 0,
        isComplete: (data) =>
            !!data.registration?.coOwners &&
            data.registration.coOwners.every(
                (coOwner) => !!coOwner?.name && !!coOwner.ownershipPercentage,
            ),
        Component: CoOwnershipForm,
    },
    {
        id: 'rock-identification',
        isComplete: (data) =>
            !!data.registration?.rockDetails?.name &&
            (data.registration.rockDetails.type?.sedimentary ||
                data.registration.rockDetails.type?.igneous ||
                data.registration.rockDetails.type?.metamorphic ||
                !!data.registration.rockDetails.type?.other) &&
            !!data.registration.rockDetails.weight,
        Component: RockIdentificationForm,
    },
    {
        id: 'rock-color',
        isNeeded: (data) =>
            (!!data.registration?.rockDetails?.color?.secondaryColors &&
                data.registration.rockDetails.color.secondaryColors.length >
                    0) ||
            !data.registration?.rockDetails?.color?.isNatural,
        isComplete: (data) =>
            !!data.registration?.rockDetails?.color?.primaryColor &&
            (data.registration.rockDetails.color.isNatural ||
                (!!data.registration.rockDetails.color.colorChanges &&
                    data.registration.rockDetails.color.colorChanges.length >
                        0)),
        Component: RockColorForm,
    },
    {
        id: 'rock-siblings',
        isNeeded: (data) =>
            !!data.registration?.rockDetails?.lineage?.knownSiblings &&
            data.registration.rockDetails.lineage.knownSiblings.length > 0,
        isComplete: (data) =>
            !!data.registration?.rockDetails?.lineage?.knownSiblings &&
            data.registration.rockDetails.lineage.knownSiblings.every(
                (name) => !!name,
            ),
        Component: RockSiblingForm,
    },
    {
        id: 'rock-personality',
        isComplete: (data) => !!data.registration?.personalityProfile?.demeanor,
        Component: RockPersonalityForm,
    },
    {
        id: 'accessory-inventory',
        isNeeded: (data) =>
            !!data.accessoryInventory?.accessories &&
            data.accessoryInventory.accessories.length > 0,
        isComplete: (data) =>
            !!data.accessoryInventory &&
            data.accessoryInventory.accessories.every(
                (accessory) => !!accessory?.type,
            ),
        Component: AccessoryInventoryForm,
    },
    {
        id: 'emotional-support',
        isNeeded: (data) =>
            !!data.emotionalSupportCertification?.supportFunctions &&
            data.emotionalSupportCertification.supportFunctions.length > 0,
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
