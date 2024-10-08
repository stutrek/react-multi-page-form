import { z } from 'zod';
import type {
    BuildingPermitApplication,
    ApplicantInformation,
    ContactInformation,
    LicenseNumbers,
    PropertyDetails,
    ProjectLocationDescription,
    ProjectType,
    VarianceOrSpecialUsePermit,
    ZoningComplianceVerification,
    EnvironmentalConsiderations,
    EnvironmentalImpactAssessment,
    SitePlanSubmission,
    ArchitecturalDrawings,
    EngineeringReports,
    BuildingPlansSpecifications,
    UtilityServicesRequired,
    UtilityConnectionApplications,
    EnergyCompliance,
    UtilitiesInfrastructure,
    AccessibilityCompliance,
    FireProtectionSystems,
    FireLifeSafety,
    StormwaterManagementPlan,
    FloodplainAndStormwaterManagement,
    HistoricPreservationReview,
    TrafficFlowAssessment,
    TrafficImpactAnalysis,
    NotificationRequirements,
    PublicHearingDetails,
    NeighborNotificationAndPublicHearings,
    ContractorInformation,
    InsuranceVerification,
    ContractorAndSubcontractorDetails,
    AdditionalFees,
    FeeCalculationAndPayment,
    SubmissionConfirmation,
    FinalReviewAndCertification,
    InspectionScheduling,
    PostSubmissionRequirements,
} from './data';
import type { DocumentReference } from '@/components/FormLibrary';

// Helper Types
const DocumentReferenceSchema: z.ZodType<DocumentReference> = z.object({
    fileName: z.string().min(1, { message: 'File name is required.' }),
    fileType: z.string().min(1, { message: 'File type is required.' }),
    fileSize: z
        .number()
        .min(1, { message: 'File size must be greater than 0.' }), // in bytes
    fileUrl: z
        .string()
        .min(1, { message: 'File URL is required.' })
        .url({ message: 'Invalid URL format.' })
        .optional(), // URL if the file is stored remotely
});

// 1. Applicant Information
const ContactInformationSchema: z.ZodType<ContactInformation> = z.object({
    address: z.string().min(1, { message: 'Address is required.' }),
    phoneNumber: z.string().min(1, { message: 'Phone number is required.' }),
    email: z.string().email({ message: 'Invalid email address.' }),
});

const LicenseNumbersSchema: z.ZodType<LicenseNumbers> = z.object({
    contractorLicense: z
        .string()
        .min(1, { message: 'Contractor license is required.' })
        .optional(),
    businessLicense: z
        .string()
        .min(1, { message: 'Business license is required.' })
        .optional(),
});

const ApplicantInformationSchema: z.ZodType<ApplicantInformation> = z.object({
    fullName: z.string().min(1, { message: 'Full name is required.' }),
    companyName: z
        .string()
        .min(1, { message: 'Company name is required.' })
        .optional(),
    contactInformation: ContactInformationSchema,
    licenseNumbers: LicenseNumbersSchema.optional(),
    roleInProject: z.enum(
        ['Owner', 'Developer', 'Contractor', 'Authorized Agent'],
        {
            invalid_type_error: 'Invalid role in project.',
        },
    ),
});

// 2. Project Location and Description
const PropertyDetailsSchema: z.ZodType<PropertyDetails> = z.object({
    streetAddress: z
        .string()
        .min(1, { message: 'Street address is required.' }),
    parcelIdentificationNumber: z
        .string()
        .min(1, { message: 'Parcel identification number is required.' }),
    legalDescriptionOfProperty: z
        .string()
        .min(1, { message: 'Legal description of property is required.' }),
});

const ProjectTypeSchema: z.ZodType<ProjectType> = z.enum([
    'New Construction',
    'Renovation/Alteration',
    'Demolition',
    'Addition',
    'Change of Use',
]);

const VarianceOrSpecialUsePermitSchema: z.ZodType<VarianceOrSpecialUsePermit> =
    z.object({
        varianceRequested: z.boolean(),
        specialUsePermitRequested: z.boolean(),
        justificationStatement: z
            .string()
            .min(1, { message: 'Justification statement is required.' }),
        supportingDocuments: z.array(DocumentReferenceSchema).optional(),
    });

const ZoningComplianceVerificationSchema: z.ZodType<ZoningComplianceVerification> =
    z
        .object({
            currentZoningClassification: z.string().min(1, {
                message: 'Current zoning classification is required.',
            }),
            intendedUseDescription: z
                .string()
                .min(1, { message: 'Intended use description is required.' }),
            varianceOrSpecialUsePermit:
                VarianceOrSpecialUsePermitSchema.optional(),
        })
        .superRefine((data, ctx) => {
            if (
                data.varianceOrSpecialUsePermit &&
                !data.varianceOrSpecialUsePermit.justificationStatement
            ) {
                ctx.addIssue({
                    path: [
                        'varianceOrSpecialUsePermit',
                        'justificationStatement',
                    ],
                    code: 'custom',
                    message:
                        'Justification statement is required when requesting a variance or special use permit.',
                });
            }
        });

const ProjectLocationDescriptionSchema: z.ZodType<ProjectLocationDescription> =
    z.object({
        propertyDetails: PropertyDetailsSchema,
        projectType: ProjectTypeSchema,
        zoningComplianceVerification:
            ZoningComplianceVerificationSchema.optional(),
    });

// 3. Site Plan Submission
const EnvironmentalConsiderationsSchema: z.ZodType<EnvironmentalConsiderations> =
    z.object({
        hasWetlandsOrProtectedAreas: z.boolean(),
        impactsLocalWildlife: z.boolean(),
    });

const EnvironmentalImpactAssessmentSchema: z.ZodType<EnvironmentalImpactAssessment> =
    z
        .object({
            environmentalConsiderations: EnvironmentalConsiderationsSchema,
            environmentalImpactReport: DocumentReferenceSchema.optional(),
            stateEnvironmentalAgencyPermits: z
                .array(DocumentReferenceSchema)
                .optional(),
        })
        .superRefine((data, ctx) => {
            const { hasWetlandsOrProtectedAreas, impactsLocalWildlife } =
                data.environmentalConsiderations;
            if (
                (hasWetlandsOrProtectedAreas || impactsLocalWildlife) &&
                !data.environmentalImpactReport
            ) {
                ctx.addIssue({
                    path: ['environmentalImpactReport'],
                    code: 'custom',
                    message:
                        'Environmental Impact Report is required when there are environmental considerations.',
                });
            }
        });

const SitePlanSubmissionSchema: z.ZodType<SitePlanSubmission> = z.object({
    includesLandscapingChanges: z.boolean(),
    sitePlanDrawings: DocumentReferenceSchema,
    landscapingPlans: DocumentReferenceSchema.optional(),
    parkingLayout: DocumentReferenceSchema.optional(),
    environmentalImpactAssessment:
        EnvironmentalImpactAssessmentSchema.optional(),
});

// 6. Building Plans and Specifications
const ArchitecturalDrawingsSchema: z.ZodType<ArchitecturalDrawings> = z.object({
    floorPlans: DocumentReferenceSchema,
    elevations: DocumentReferenceSchema,
    structuralDetails: DocumentReferenceSchema,
});

const EngineeringReportsSchema: z.ZodType<EngineeringReports> = z.object({
    structuralCalculations: DocumentReferenceSchema.optional(),
    soilAnalysisReport: DocumentReferenceSchema.optional(),
});

const BuildingPlansSpecificationsSchema: z.ZodType<BuildingPlansSpecifications> =
    z
        .object({
            architecturalDrawings: ArchitecturalDrawingsSchema,
            engineeringReports: EngineeringReportsSchema,
            requiresFireSafetyPlan: z.boolean(),
            fireSafetyPlan: DocumentReferenceSchema.optional(),
        })
        .superRefine((data, ctx) => {
            if (data.requiresFireSafetyPlan && !data.fireSafetyPlan) {
                ctx.addIssue({
                    path: ['fireSafetyPlan'],
                    code: 'custom',
                    message:
                        'Fire Safety Plan is required when it is marked as required.',
                });
            }
        });

// 7. Utilities and Infrastructure
const UtilityServicesRequiredSchema: z.ZodType<UtilityServicesRequired> =
    z.object({
        electrical: z.boolean(),
        water: z.boolean(),
        sewer: z.boolean(),
        gas: z.boolean(),
    });

const UtilityConnectionApplicationsSchema: z.ZodType<UtilityConnectionApplications> =
    z.object({
        electrical: DocumentReferenceSchema.optional(),
        water: DocumentReferenceSchema.optional(),
        sewer: DocumentReferenceSchema.optional(),
        gas: DocumentReferenceSchema.optional(),
    });

const EnergyComplianceSchema: z.ZodType<EnergyCompliance> = z.object({
    energyEfficiencyComplianceReport: DocumentReferenceSchema,
    greenBuildingCertificationApplied: z.boolean().optional(),
});

const UtilitiesInfrastructureSchema: z.ZodType<UtilitiesInfrastructure> = z
    .object({
        utilityServicesRequired: UtilityServicesRequiredSchema,
        utilityConnectionApplications:
            UtilityConnectionApplicationsSchema.optional(),
        energyCompliance: EnergyComplianceSchema,
    })
    .superRefine((data, ctx) => {
        const { utilityServicesRequired, utilityConnectionApplications } = data;
        const requiredServices = [
            'electrical',
            'water',
            'sewer',
            'gas',
        ] as const;

        // biome-ignore lint/complexity/noForEach: <explanation>
        requiredServices.forEach((service) => {
            if (
                utilityServicesRequired[service] &&
                (!utilityConnectionApplications ||
                    !utilityConnectionApplications[service])
            ) {
                ctx.addIssue({
                    path: ['utilityConnectionApplications', service],
                    code: 'custom',
                    message: `${service.charAt(0).toUpperCase() + service.slice(1)} connection application is required when ${service} service is required.`,
                });
            }
        });
    });

// 8. Accessibility Compliance
const AccessibilityComplianceSchema: z.ZodType<AccessibilityCompliance> = z
    .object({
        meetsADAStandards: z.boolean(),
        accessibilityPlan: DocumentReferenceSchema.optional(),
    })
    .superRefine((data, ctx) => {
        if (!data.meetsADAStandards && !data.accessibilityPlan) {
            ctx.addIssue({
                path: ['accessibilityPlan'],
                code: 'custom',
                message:
                    'Accessibility Plan is required when the project does not meet ADA standards.',
            });
        }
    });

// 9. Fire and Life Safety
const FireProtectionSystemsSchema: z.ZodType<FireProtectionSystems> = z.object({
    sprinklerSystems: z.boolean(),
    fireAlarms: z.boolean(),
    emergencyExits: z.boolean(),
});

const FireLifeSafetySchema: z.ZodType<FireLifeSafety> = z
    .object({
        fireProtectionSystems: FireProtectionSystemsSchema,
        requiresEvacuationPlan: z.boolean(),
        emergencyEvacuationPlan: DocumentReferenceSchema.optional(),
        coordinatesWithFireMarshal: z.boolean().optional(),
    })
    .superRefine((data, ctx) => {
        if (data.requiresEvacuationPlan && !data.emergencyEvacuationPlan) {
            ctx.addIssue({
                path: ['emergencyEvacuationPlan'],
                code: 'custom',
                message:
                    'Emergency Evacuation Plan is required when it is marked as required.',
            });
        }
    });

// 10. Floodplain and Stormwater Management
const StormwaterManagementPlanSchema: z.ZodType<StormwaterManagementPlan> =
    z.object({
        erosionControlMeasures: z
            .string()
            .min(1, { message: 'Erosion control measures is required.' }),
        runoffCalculations: DocumentReferenceSchema,
    });

const FloodplainAndStormwaterManagementSchema: z.ZodType<FloodplainAndStormwaterManagement> =
    z
        .object({
            isInFloodZone: z.boolean(),
            floodplainDevelopmentPermit: DocumentReferenceSchema.optional(),
            stormwaterManagementPlan: StormwaterManagementPlanSchema,
        })
        .superRefine((data, ctx) => {
            if (data.isInFloodZone && !data.floodplainDevelopmentPermit) {
                ctx.addIssue({
                    path: ['floodplainDevelopmentPermit'],
                    code: 'custom',
                    message:
                        'Floodplain Development Permit is required when the property is in a flood zone.',
                });
            }
        });

// 11. Historic Preservation Review
const HistoricPreservationReviewSchema: z.ZodType<HistoricPreservationReview> =
    z
        .object({
            isHistoricProperty: z.boolean(),
            historicPreservationPlan: DocumentReferenceSchema.optional(),
            coordinatesWithHistoricCommission: z.boolean().optional(),
        })
        .superRefine((data, ctx) => {
            if (data.isHistoricProperty && !data.historicPreservationPlan) {
                ctx.addIssue({
                    path: ['historicPreservationPlan'],
                    code: 'custom',
                    message:
                        'Historic Preservation Plan is required when the property is historic.',
                });
            }
        });

// 12. Traffic Impact Analysis
const TrafficFlowAssessmentSchema: z.ZodType<TrafficFlowAssessment> = z.object({
    anticipatesTrafficIncrease: z.boolean(),
    mitigationStrategies: z
        .string()
        .min(1, { message: 'Mitigation strategies is required.' }),
});

const TrafficImpactAnalysisSchema: z.ZodType<TrafficImpactAnalysis> = z
    .object({
        trafficFlowAssessment: TrafficFlowAssessmentSchema,
        trafficImpactStudy: DocumentReferenceSchema.optional(),
    })
    .superRefine((data, ctx) => {
        if (
            data.trafficFlowAssessment.anticipatesTrafficIncrease &&
            !data.trafficImpactStudy
        ) {
            ctx.addIssue({
                path: ['trafficImpactStudy'],
                code: 'custom',
                message:
                    'Traffic Impact Study is required when an increase in traffic is anticipated.',
            });
        }
    });

// 13. Neighbor Notification and Public Hearings
const NotificationRequirementsSchema: z.ZodType<NotificationRequirements> =
    z.object({
        requiresPublicHearing: z.boolean(),
        notifiedAdjacentOwners: z.boolean(),
        postedPublicNotices: z.boolean(),
    });

const PublicHearingDetailsSchema: z.ZodType<PublicHearingDetails> = z.object({
    hearingDate: z.coerce.date({
        message: 'Invalid date format for hearing date.',
    }),
    publicCommentsReceived: z
        .string()
        .min(1, { message: 'Public comment is required.' }),
});

const NeighborNotificationAndPublicHearingsSchema: z.ZodType<NeighborNotificationAndPublicHearings> =
    z
        .object({
            notificationRequirements: NotificationRequirementsSchema,
            publicHearingDetails: PublicHearingDetailsSchema.optional(),
        })
        .superRefine((data, ctx) => {
            if (
                data.notificationRequirements.requiresPublicHearing &&
                !data.publicHearingDetails
            ) {
                ctx.addIssue({
                    path: ['publicHearingDetails'],
                    code: 'custom',
                    message:
                        'Public Hearing Details are required when a public hearing is necessary.',
                });
            }
        });

// 14. Contractor and Subcontractor Details
const ContractorInformationSchema: z.ZodType<ContractorInformation> = z.object({
    name: z.string().min(1, { message: 'Contractor name is required.' }),
    licenseNumber: z
        .string()
        .min(1, { message: 'License number is required.' }),
    contactInformation: ContactInformationSchema,
});

const InsuranceVerificationSchema: z.ZodType<InsuranceVerification> = z.object({
    liabilityInsuranceCertificate: DocumentReferenceSchema,
    workersCompensationCoverageCertificate: DocumentReferenceSchema,
});

const ContractorAndSubcontractorDetailsSchema: z.ZodType<ContractorAndSubcontractorDetails> =
    z.object({
        generalContractor: ContractorInformationSchema,
        subcontractors: z.array(ContractorInformationSchema),
        insuranceVerification: InsuranceVerificationSchema,
    });

// 15. Fee Calculation and Payment
const AdditionalFeesSchema: z.ZodType<AdditionalFees> = z.object({
    impactFees: z
        .number()
        .min(0, { message: 'Impact fees must be non-negative.' })
        .optional(),
    reviewFees: z
        .number()
        .min(0, { message: 'Review fees must be non-negative.' })
        .optional(),
});

const FeeCalculationAndPaymentSchema: z.ZodType<FeeCalculationAndPayment> =
    z.object({
        permitFee: z
            .number()
            .min(0, { message: 'Permit fee must be non-negative.' }),
        additionalFees: AdditionalFeesSchema.optional(),
        totalFee: z
            .number()
            .min(0, { message: 'Total fee must be non-negative.' }),
        paymentMethod: z.enum(['Online', 'Check', 'Money Order'], {
            invalid_type_error: 'Invalid payment method.',
        }),
        paymentReferenceNumber: z
            .string()
            .min(1, { message: 'Payment reference number is required.' })
            .optional(),
    });

// 16. Final Review and Certification
const SubmissionConfirmationSchema: z.ZodType<SubmissionConfirmation> =
    z.object({
        applicationReferenceNumber: z
            .string()
            .min(1, { message: 'Application reference number is required.' }),
        estimatedProcessingTime: z
            .string()
            .min(1, { message: 'Estimated processing time is required.' }),
    });

const FinalReviewAndCertificationSchema: z.ZodType<FinalReviewAndCertification> =
    z.object({
        reviewSummary: z
            .string()
            .min(1, { message: 'Review summary is required.' }),
        certificationStatement: z
            .string()
            .min(1, { message: 'Certification statement is required.' }),
        digitalSignature: z
            .string()
            .min(1, { message: 'Digital signature is required.' }),
        submissionConfirmation: SubmissionConfirmationSchema,
    });

// 17. Post-Submission Requirements
const InspectionSchedulingSchema: z.ZodType<InspectionScheduling> = z.object({
    requiredInspections: z
        .array(z.string().min(1, { message: 'Inspection type is required.' }))
        .nonempty({
            message: 'At least one required inspection must be specified.',
        }),
    schedulingInstructions: z
        .string()
        .min(1, { message: 'Scheduling instructions is required.' }),
});

const PostSubmissionRequirementsSchema: z.ZodType<PostSubmissionRequirements> =
    z.object({
        supplementalInformationRequests: z
            .array(z.string().min(1, { message: 'Request is required.' }))
            .optional(),
        inspectionScheduling: InspectionSchedulingSchema,
        permitIssuanceProcedure: z
            .string()
            .min(1, { message: 'Permit issuance procedure is required.' }),
    });

// Main Application Schema
export const BuildingPermitApplicationSchema: z.ZodType<BuildingPermitApplication> =
    z
        .object({
            applicantInformation: ApplicantInformationSchema,
            projectLocationDescription: ProjectLocationDescriptionSchema,
            sitePlanSubmission: SitePlanSubmissionSchema,
            buildingPlansSpecifications: BuildingPlansSpecificationsSchema,
            utilitiesInfrastructure: UtilitiesInfrastructureSchema,
            accessibilityCompliance: AccessibilityComplianceSchema,
            fireLifeSafety: FireLifeSafetySchema,
            floodplainAndStormwaterManagement:
                FloodplainAndStormwaterManagementSchema,
            historicPreservationReview:
                HistoricPreservationReviewSchema.optional(),
            trafficImpactAnalysis: TrafficImpactAnalysisSchema.optional(),
            neighborNotificationAndPublicHearings:
                NeighborNotificationAndPublicHearingsSchema.optional(),
            contractorAndSubcontractorDetails:
                ContractorAndSubcontractorDetailsSchema,
            feeCalculationAndPayment: FeeCalculationAndPaymentSchema,
            finalReviewAndCertification: FinalReviewAndCertificationSchema,
            postSubmissionRequirements:
                PostSubmissionRequirementsSchema.optional(),
        })
        .superRefine((data, ctx) => {
            // Historic Preservation Review
            if (
                data.historicPreservationReview?.isHistoricProperty &&
                !data.historicPreservationReview.historicPreservationPlan
            ) {
                ctx.addIssue({
                    path: [
                        'historicPreservationReview',
                        'historicPreservationPlan',
                    ],
                    code: 'custom',
                    message:
                        'Historic Preservation Plan is required when the property is historic.',
                });
            }

            // Traffic Impact Analysis
            if (
                data.trafficImpactAnalysis?.trafficFlowAssessment
                    .anticipatesTrafficIncrease &&
                !data.trafficImpactAnalysis.trafficImpactStudy
            ) {
                ctx.addIssue({
                    path: ['trafficImpactAnalysis', 'trafficImpactStudy'],
                    code: 'custom',
                    message:
                        'Traffic Impact Study is required when an increase in traffic is anticipated.',
                });
            }

            // Neighbor Notification and Public Hearings
            if (
                data.neighborNotificationAndPublicHearings
                    ?.notificationRequirements.requiresPublicHearing &&
                !data.neighborNotificationAndPublicHearings.publicHearingDetails
            ) {
                ctx.addIssue({
                    path: [
                        'neighborNotificationAndPublicHearings',
                        'publicHearingDetails',
                    ],
                    code: 'custom',
                    message:
                        'Public Hearing Details are required when a public hearing is necessary.',
                });
            }

            // Fee Calculation Validation
            const additionalFees =
                data.feeCalculationAndPayment.additionalFees || {};
            const calculatedTotalFee =
                data.feeCalculationAndPayment.permitFee +
                (additionalFees.impactFees || 0) +
                (additionalFees.reviewFees || 0);

            if (calculatedTotalFee !== data.feeCalculationAndPayment.totalFee) {
                ctx.addIssue({
                    path: ['feeCalculationAndPayment', 'totalFee'],
                    code: 'custom',
                    message:
                        'Total fee does not match the sum of permit and additional fees.',
                });
            }

            // Payment Reference Number Validation
            if (
                data.feeCalculationAndPayment.paymentMethod !== 'Online' &&
                (!data.feeCalculationAndPayment.paymentReferenceNumber ||
                    data.feeCalculationAndPayment.paymentReferenceNumber.trim() ===
                        '')
            ) {
                ctx.addIssue({
                    path: [
                        'feeCalculationAndPayment',
                        'paymentReferenceNumber',
                    ],
                    code: 'custom',
                    message:
                        'Payment reference number is required for non-online payment methods.',
                });
            }
        });
