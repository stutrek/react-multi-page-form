import type {
    Control,
    FieldErrors,
    UseFormGetValues,
    UseFormRegister,
    UseFormSetValue,
    UseFormWatch,
} from 'react-hook-form';

// Base reusable types
interface Owner {
    name: string;
    address?: string;
    phone?: string;
    email?: string;
    hasCoOwners: boolean;
}

interface CoOwner extends Omit<Owner, 'hasCoOwners'> {
    ownershipPercentage: number;
    relationshipToPrimaryOwner:
        | 'Friend'
        | 'Family Member'
        | 'Neighbor'
        | 'Former Rock Owner'
        | 'Other';
}

interface Accessory {
    type: string;
    dateAdded: string;
    material?: string;
    securelyAttached: boolean;
}

interface Incident {
    date: string;
    description: string;
    claimAmount?: number;
    witnesses?: string[];
}

interface CounselingRequest {
    reason: string;
    preferredMethod:
        | 'Cognitive Therapy'
        | 'Rock Art Therapy'
        | 'Meditation'
        | 'Group Therapy';
    previousTherapy?: boolean;
    appointmentTimes: 'Morning' | 'Afternoon' | 'Evening';
}

// Section 1: Main Pet Rock Registration Form
interface PetRockRegistration {
    owner: Owner;
    coOwners?: CoOwner[];
    rockDetails: {
        name: string;
        alias?: string;
        dateOfAcquisition: string;
        type: 'Sedimentary' | 'Igneous' | 'Metamorphic' | 'Other';
        weight: number; // in grams
        color: {
            primaryColor: string;
            secondaryColors?: { name: string }[];
            isArtificial: boolean;
            colorChanges?: {
                previousColor: string;
                dateChanged: string;
                method: 'Paint' | 'Dye' | 'Polish' | 'Other';
            }[];
        };
        texture: 'Smooth' | 'Rough' | 'Cracked' | 'Polished' | 'Other';
        isAccessorized: boolean;
        accessories?: Accessory[];
        hasSiblings: boolean;
        lineage?: {
            knownSiblings?: { name: string }[];
            familyTree?: string; // Path to a file or document
        };
    };
    personalityProfile: {
        demeanor:
            | 'Introverted'
            | 'Extroverted'
            | 'Shy'
            | 'Energetic'
            | 'Laid-back';
        interactionPreferences: {
            physicalContact: boolean;
            preferredContactType?: 'Rolling' | 'Light Tapping' | 'Skipping';
        };
        interactionFrequency: 'Daily' | 'Weekly' | 'Monthly' | 'Rarely';
    };
    housingInfo: {
        location: 'Garden' | 'Shelf' | 'Display Case' | 'Pocket' | 'Other';
        hasBeenDisplaced?: boolean;
    };
    certifications?: {
        competitiveEvents?: string[];
        emotionalSupport?: boolean;
    };
}

// Section 3: Color Distribution Chart
interface ColorDistribution {
    primaryColor: string;
    secondaryColors: {
        color: string;
        percentage: number;
    }[];
    pattern:
        | 'Spots'
        | 'Stripes'
        | 'Abstract Swirls'
        | 'Geological Layers'
        | 'Other';
    hasColorChanged: boolean;
    colorChangeDetails?: {
        previousColor: string;
        dateChanged: string;
        reasonForChange: string;
    }[];
}

// Section 4: Accessory Inventory Form
interface AccessoryInventoryForm {
    accessories: Accessory[];
    hasBeenTestedForSafety: boolean;
}

// Section 5: Emotional Support Certification for Rocks
interface EmotionalSupportCertification {
    certificationDetails: {
        authority: string;
        registrationNumber: string;
    };
    supportFunctions:
        | 'Grounding Presence'
        | 'Comfort during Stress'
        | 'Symbol of Stability'
        | 'Other';
    complaints?: string[];
}

// Section 6: Insurance Verification
interface InsuranceVerification {
    provider: string;
    policyNumber: string;
    coverageType: 'Damage' | 'Theft' | 'Loss' | 'Emotional Distress';
    claimsHistory?: Incident[];
}

// Section 7: Counseling Request for Pet Rock
interface PetRockCounselingRequest {
    counselingRequests: CounselingRequest[];
}

// Section 8: Forms for other supplementary processes

// Loose Accessory Report
interface LooseAccessoryReport {
    accessory: Accessory;
    noticedDate: string;
    hazardDescription: string;
    reattachmentAttempted: boolean;
}

// Rock Custody Dispute Resolution
interface RockCustodyDisputeResolution {
    disputeReason: string;
    mediationRequired: boolean;
    petRockCounselorRequested: boolean;
}

// Pattern Certification
interface PatternCertification {
    patternType:
        | 'Spots'
        | 'Stripes'
        | 'Abstract Swirls'
        | 'Geological Layers'
        | 'Other';
    colors: string[];
    coveragePercentage: number;
    patternVerifiedByAnalyst: boolean;
}

// Claim Report
interface ClaimReport {
    incident: Incident;
    claimAmount: number;
    appraisedValue?: number;
}

// Complete Data Model for Pet Rock System
export interface PetRockSystem {
    registration: PetRockRegistration;
    colorDistribution?: ColorDistribution;
    accessoryInventory?: AccessoryInventoryForm;
    emotionalSupportCertification?: EmotionalSupportCertification;
    insuranceVerification?: InsuranceVerification;
    counselingRequests?: PetRockCounselingRequest;
    looseAccessoryReport?: LooseAccessoryReport;
    custodyDisputeResolution?: RockCustodyDisputeResolution;
    patternCertification?: PatternCertification;
    claimReports?: ClaimReport[];
}

// ./types.ts
export interface FormComponentProps {
    register: UseFormRegister<PetRockSystem>;
    errors: FieldErrors<PetRockSystem>;
    watch: UseFormWatch<PetRockSystem>;
    setValue: UseFormSetValue<PetRockSystem>;
    getValues: UseFormGetValues<PetRockSystem>;
    control: Control<PetRockSystem>;
}
