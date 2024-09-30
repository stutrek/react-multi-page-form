import type { PetRockSystem } from './types';

export const rockyMcSmooth: PetRockSystem = {
    registration: {
        owner: {
            name: 'Sandy Pebbleton',
            address: '123 Boulder Blvd, Rocksville',
            phone: '555-345-1234',
            email: 'sandy@rockmail.com',
            hasCoOwners: true,
        },
        rockDetails: {
            name: 'Rocky McSmooth',
            alias: 'Smooth Operator',
            dateOfAcquisition: '2023-04-01',
            type: 'Sedimentary',
            weight: 150, // grams
            color: {
                primaryColor: 'Slate Gray',
                secondaryColors: [
                    { name: 'Pebble Pink' },
                    { name: 'Granite Green' },
                ],
                isArtificial: true,
                colorChanges: [
                    {
                        previousColor: 'Dull Gray',
                        dateChanged: '2023-05-10',
                        method: 'Polish',
                    },
                ],
            },
            texture: 'Smooth',
            isAccessorized: true,
            accessories: [
                {
                    type: 'Tiny Sunglasses',
                    dateAdded: '2023-06-15',
                    material: 'Plastic',
                    securelyAttached: true,
                },
            ],
            hasSiblings: true,
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
                dateChanged: '2023-05-10',
                reasonForChange: 'Polishing for better reflection',
            },
        ],
    },
    accessoryInventory: {
        accessories: [
            {
                type: 'Tiny Sunglasses',
                dateAdded: '2023-06-15',
                material: 'Plastic',
                securelyAttached: true,
            },
            {
                type: 'Mini Hat',
                dateAdded: '2023-07-20',
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
                date: '2023-08-15',
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
            dateAdded: '2023-07-20',
            material: 'Felt',
            securelyAttached: false,
        },
        noticedDate: '2024-01-10',
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
                date: '2023-08-15',
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
            hasCoOwners: true,
        },
        coOwners: [
            {
                name: 'Stone Stella',
                ownershipPercentage: 60,
                relationshipToPrimaryOwner: 'Family Member',
            },
            {
                name: 'Pebble Paul',
                ownershipPercentage: 40,
                relationshipToPrimaryOwner: 'Neighbor',
            },
        ],
        rockDetails: {
            name: 'Bumpy McRough',
            dateOfAcquisition: '2022-11-05',
            type: 'Metamorphic',
            weight: 200,
            color: {
                primaryColor: 'Granite Gray',
                isArtificial: false,
            },
            texture: 'Rough',
            isAccessorized: true,
            accessories: [
                {
                    type: 'Tiny Backpack',
                    dateAdded: '2023-02-14',
                    material: 'Leather',
                    securelyAttached: false,
                },
            ],
            hasSiblings: false,
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
                dateAdded: '2023-02-14',
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
            dateAdded: '2023-02-14',
            material: 'Leather',
            securelyAttached: false,
        },
        noticedDate: '2024-03-22',
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
            hasCoOwners: false,
        },
        rockDetails: {
            name: 'Glassy McShiny',
            alias: 'Sparkle Rock',
            dateOfAcquisition: '2021-07-20',
            type: 'Igneous',
            weight: 120,
            color: {
                primaryColor: 'Clear Quartz',
                secondaryColors: [{ name: 'Rainbow Prism' }],
                isArtificial: false,
            },
            texture: 'Polished',
            isAccessorized: true,
            accessories: [
                {
                    type: 'Mini Disco Ball',
                    dateAdded: '2022-12-31',
                    material: 'Metal',
                    securelyAttached: true,
                },
                {
                    type: 'LED Lights',
                    dateAdded: '2023-01-01',
                    material: 'Plastic',
                    securelyAttached: false,
                },
            ],
            hasSiblings: false,
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
                dateChanged: '2022-01-01',
                reasonForChange: 'Added LED Lights for sparkle effect',
            },
        ],
    },
    accessoryInventory: {
        accessories: [
            {
                type: 'Mini Disco Ball',
                dateAdded: '2022-12-31',
                material: 'Metal',
                securelyAttached: true,
            },
            {
                type: 'LED Lights',
                dateAdded: '2023-01-01',
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
                date: '2023-02-14',
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
            dateAdded: '2023-01-01',
            material: 'Plastic',
            securelyAttached: false,
        },
        noticedDate: '2024-05-05',
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
                date: '2023-02-14',
                description: 'Glitter malfunction causing stress',
                claimAmount: 100.0,
                witnesses: ['Twinkle Tina'],
            },
            claimAmount: 100.0,
            appraisedValue: 120.0,
        },
    ],
};
