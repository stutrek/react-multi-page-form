import type { PetRockSystem } from './types';

export const rockyMcSmooth: PetRockSystem = {
    registration: {
        owner: {
            name: 'Sandy Pebbleton',
            address: '123 Boulder Blvd, Rocksville',
            phone: '555-ROCK',
            email: 'sandy@rockmail.com',
            soleOwner: true,
        },
        rockDetails: {
            name: 'Rocky McSmooth',
            alias: 'Smooth Operator',
            dateOfAcquisition: new Date('2023-04-01'),
            type: {
                sedimentary: true,
            },
            weight: 150, // grams
            color: {
                primaryColor: 'Slate Gray',
                secondaryColors: [
                    { name: 'Pebble Pink' },
                    { name: 'Granite Green' },
                ],
                isNatural: true,
                colorChanges: [
                    {
                        previousColor: 'Dull Gray',
                        dateChanged: new Date('2023-05-10'),
                        method: 'Polish',
                    },
                ],
            },
            texture: 'Smooth',
            accessories: [
                {
                    type: 'Tiny Sunglasses',
                    dateAdded: new Date('2023-06-15'),
                    material: 'Plastic',
                    securelyAttached: true,
                },
            ],
            lineage: {
                knownSiblings: [
                    { name: 'Bumpy McRough' },
                    { name: 'Glassy McShiny' },
                ],
                familyTree: '/documents/rocky_family_tree.pdf',
            },
        },
        personalityProfile: {
            demeanor: 'Laid-back',
            interactionPreferences: {
                physicalContact: true,
                preferredContactType: 'Rolling',
            },
            interactionFrequency: 'Daily',
        },
        housingInfo: {
            location: 'Display Case',
            hasBeenDisplaced: false,
        },
        certifications: {
            competitiveEvents: ['Rock Rolling Championship 2023'],
            emotionalSupport: true,
        },
    },
    coOwnership: {
        primaryOwner: {
            name: 'Sandy Pebbleton',
            address: '123 Boulder Blvd, Rocksville',
            phone: '555-ROCK',
            email: 'sandy@rockmail.com',
            soleOwner: false, // In co-ownership, 'soleOwner' might be false
        },
        coOwners: [
            {
                name: 'Granite Gary',
                ownershipPercentage: 50,
                relationshipToPrimaryOwner: 'Best Friend',
            },
        ],
        visitationSchedule: {
            daysPerWeek: {
                primaryOwner: 5,
                coOwner: 2,
            },
            specialEvents: ['Rock Birthday Party'],
        },
        custodyDispute: {
            cause: 'Disagreement over sunglasses style',
            proposedResolution: 'Mediation',
        },
    },
    colorDistribution: {
        primaryColor: 'Slate Gray',
        secondaryColors: [
            { color: 'Pebble Pink', percentage: 30 },
            { color: 'Granite Green', percentage: 20 },
        ],
        pattern: 'Spots',
        hasColorChanged: true,
        colorChangeDetails: [
            {
                previousColor: 'Dull Gray',
                dateChanged: new Date('2023-05-10'),
                reasonForChange: 'Polishing for better reflection',
            },
        ],
    },
    accessoryInventory: {
        accessories: [
            {
                type: 'Tiny Sunglasses',
                dateAdded: new Date('2023-06-15'),
                material: 'Plastic',
                securelyAttached: true,
            },
            {
                type: 'Mini Hat',
                dateAdded: new Date('2023-07-20'),
                material: 'Felt',
                securelyAttached: false,
            },
        ],
        hasBeenTestedForSafety: true,
    },
    emotionalSupportCertification: {
        certificationDetails: {
            authority: 'Rock Therapy Association',
            registrationNumber: 'RSA-2023-ROCKY',
        },
        supportFunctions: 'Grounding Presence',
        complaints: ['Occasionally too cool for school'],
    },
    insuranceVerification: {
        provider: 'StoneGuard Insurance',
        policyNumber: 'SG-ROCK-456789',
        coverageType: 'Damage',
        claimsHistory: [
            {
                date: new Date('2023-08-15'),
                description: 'Minor chip from accidental drop',
                claimAmount: 25.0,
                witnesses: ['Pebbly Pete'],
            },
        ],
    },
    counselingRequests: {
        counselingRequests: [
            {
                reason: 'Feeling too smooth and uninteresting',
                preferredMethod: 'Rock Art Therapy',
                previousTherapy: false,
                appointmentTimes: 'Afternoon',
            },
        ],
    },
    looseAccessoryReport: {
        accessory: {
            type: 'Mini Hat',
            dateAdded: new Date('2023-07-20'),
            material: 'Felt',
            securelyAttached: false,
        },
        noticedDate: new Date('2024-01-10'),
        hazardDescription: 'Hat keeps rolling away',
        reattachmentAttempted: true,
    },
    custodyDisputeResolution: {
        disputeReason: 'Hat vs. Sunglasses dominance',
        mediationRequired: true,
        petRockCounselorRequested: true,
    },
    patternCertification: {
        patternType: 'Spots',
        colors: ['Slate Gray', 'Pebble Pink'],
        coveragePercentage: 50,
        patternVerifiedByAnalyst: true,
    },
    claimReports: [
        {
            incident: {
                date: new Date('2023-08-15'),
                description: 'Minor chip from accidental drop',
                claimAmount: 25.0,
                witnesses: ['Pebbly Pete'],
            },
            claimAmount: 25.0,
            appraisedValue: 150.0,
        },
    ],
};

export const bumpyMcRough: PetRockSystem = {
    registration: {
        owner: {
            name: 'Gravel Greg',
            soleOwner: false,
        },
        coOwners: [
            {
                name: 'Stone Stella',
                ownershipPercentage: 60,
                relationshipToPrimaryOwner: 'Sister',
            },
            {
                name: 'Pebble Paul',
                ownershipPercentage: 40,
                relationshipToPrimaryOwner: 'Neighbor',
            },
        ],
        rockDetails: {
            name: 'Bumpy McRough',
            dateOfAcquisition: new Date('2022-11-05'),
            type: {
                metamorphic: true,
                other: 'Glittery',
            },
            weight: 200,
            color: {
                primaryColor: 'Granite Gray',
                isNatural: false,
            },
            texture: 'Rough',
            accessories: [
                {
                    type: 'Tiny Backpack',
                    dateAdded: new Date('2023-02-14'),
                    material: 'Leather',
                    securelyAttached: false,
                },
            ],
            lineage: {
                familyTree: '/documents/bumpy_family_tree.docx',
            },
        },
        personalityProfile: {
            demeanor: 'Energetic',
            interactionPreferences: {
                physicalContact: true,
                preferredContactType: 'Skipping',
            },
            interactionFrequency: 'Weekly',
        },
        housingInfo: {
            location: 'Garden',
            hasBeenDisplaced: true,
        },
        certifications: {
            competitiveEvents: ['Rock Hopping Contest', 'Pebble Toss'],
            emotionalSupport: false,
        },
    },
    coOwnership: {
        primaryOwner: {
            name: 'Gravel Greg',
            soleOwner: false,
        },
        coOwners: [
            {
                name: 'Stone Stella',
                ownershipPercentage: 60,
                relationshipToPrimaryOwner: 'Sister',
            },
            {
                name: 'Pebble Paul',
                ownershipPercentage: 40,
                relationshipToPrimaryOwner: 'Neighbor',
            },
        ],
        visitationSchedule: {
            daysPerWeek: {
                primaryOwner: 3,
                coOwner: 4,
            },
            specialEvents: ['Rock Picnic', 'Stone Movie Night'],
        },
    },
    colorDistribution: {
        primaryColor: 'Granite Gray',
        secondaryColors: [
            { color: 'Glitter Sparkle', percentage: 10 },
            { color: 'Midnight Black', percentage: 20 },
        ],
        pattern: 'Geological Layers',
        hasColorChanged: false,
    },
    accessoryInventory: {
        accessories: [
            {
                type: 'Tiny Backpack',
                dateAdded: new Date('2023-02-14'),
                material: 'Leather',
                securelyAttached: false,
            },
        ],
        hasBeenTestedForSafety: false,
    },
    insuranceVerification: {
        provider: 'RockSecure',
        policyNumber: 'RS-789012',
        coverageType: 'Theft',
    },
    counselingRequests: {
        counselingRequests: [
            {
                reason: 'Too bumpy and hard to handle',
                preferredMethod: 'Group Therapy',
                appointmentTimes: 'Morning',
            },
        ],
    },
    looseAccessoryReport: {
        accessory: {
            type: 'Tiny Backpack',
            dateAdded: new Date('2023-02-14'),
            material: 'Leather',
            securelyAttached: false,
        },
        noticedDate: new Date('2024-03-22'),
        hazardDescription: 'Backpack keeps falling off',
        reattachmentAttempted: false,
    },
    patternCertification: {
        patternType: 'Geological Layers',
        colors: ['Granite Gray', 'Glitter Sparkle', 'Midnight Black'],
        coveragePercentage: 30,
        patternVerifiedByAnalyst: false,
    },
    claimReports: [],
};

export const glassyMcShiny: PetRockSystem = {
    registration: {
        owner: {
            name: 'Crystal Claire',
            email: 'crystal@rockstars.com',
            soleOwner: true,
        },
        rockDetails: {
            name: 'Glassy McShiny',
            alias: 'Sparkle Rock',
            dateOfAcquisition: new Date('2021-07-20'),
            type: {
                igneous: true,
            },
            weight: 120,
            color: {
                primaryColor: 'Clear Quartz',
                secondaryColors: [{ name: 'Rainbow Prism' }],
                isNatural: true,
            },
            texture: 'Polished',
            accessories: [
                {
                    type: 'Mini Disco Ball',
                    dateAdded: new Date('2022-12-31'),
                    material: 'Metal',
                    securelyAttached: true,
                },
                {
                    type: 'LED Lights',
                    dateAdded: new Date('2023-01-01'),
                    material: 'Plastic',
                    securelyAttached: false,
                },
            ],
            lineage: {},
        },
        personalityProfile: {
            demeanor: 'Extroverted',
            interactionPreferences: {
                physicalContact: true,
                preferredContactType: 'Rolling',
            },
            interactionFrequency: 'Daily',
        },
        housingInfo: {
            location: 'Display Case',
        },
        certifications: {
            competitiveEvents: ['Light Show Extravaganza'],
            emotionalSupport: true,
        },
    },
    colorDistribution: {
        primaryColor: 'Clear Quartz',
        secondaryColors: [
            { color: 'Rainbow Prism', percentage: 50 },
            { color: 'Silver Sparkle', percentage: 30 },
        ],
        pattern: 'Abstract Swirls',
        hasColorChanged: true,
        colorChangeDetails: [
            {
                previousColor: 'Transparent',
                dateChanged: new Date('2022-01-01'),
                reasonForChange: 'Added LED Lights for sparkle effect',
            },
        ],
    },
    accessoryInventory: {
        accessories: [
            {
                type: 'Mini Disco Ball',
                dateAdded: new Date('2022-12-31'),
                material: 'Metal',
                securelyAttached: true,
            },
            {
                type: 'LED Lights',
                dateAdded: new Date('2023-01-01'),
                material: 'Plastic',
                securelyAttached: false,
            },
        ],
        hasBeenTestedForSafety: true,
    },
    emotionalSupportCertification: {
        certificationDetails: {
            authority: 'Glitter Rock Support',
            registrationNumber: 'GRS-GLASSY-001',
        },
        supportFunctions: 'Comfort during Stress',
    },
    insuranceVerification: {
        provider: 'SparkleShield Insurance',
        policyNumber: 'SS-GLASSY-999999',
        coverageType: 'Emotional Distress',
        claimsHistory: [
            {
                date: new Date('2023-02-14'),
                description: 'Glitter malfunction causing stress',
                claimAmount: 100.0,
                witnesses: ['Twinkle Tina'],
            },
        ],
    },
    counselingRequests: {
        counselingRequests: [
            {
                reason: 'Overwhelmed by brightness',
                preferredMethod: 'Meditation',
                previousTherapy: true,
                appointmentTimes: 'Evening',
            },
        ],
    },
    looseAccessoryReport: {
        accessory: {
            type: 'LED Lights',
            dateAdded: new Date('2023-01-01'),
            material: 'Plastic',
            securelyAttached: false,
        },
        noticedDate: new Date('2024-05-05'),
        hazardDescription: 'Lights flickering uncontrollably',
        reattachmentAttempted: true,
    },
    patternCertification: {
        patternType: 'Abstract Swirls',
        colors: ['Clear Quartz', 'Rainbow Prism', 'Silver Sparkle'],
        coveragePercentage: 70,
        patternVerifiedByAnalyst: true,
    },
    claimReports: [
        {
            incident: {
                date: new Date('2023-02-14'),
                description: 'Glitter malfunction causing stress',
                claimAmount: 100.0,
                witnesses: ['Twinkle Tina'],
            },
            claimAmount: 100.0,
            appraisedValue: 120.0,
        },
    ],
};
