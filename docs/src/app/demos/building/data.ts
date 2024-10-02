import type { DocumentReference } from '@/components/FormLibrary';

// 1. Applicant Information
export interface ApplicantInformation {
    fullName: string;
    companyName?: string;
    contactInformation: ContactInformation;
    licenseNumbers?: LicenseNumbers;
    roleInProject: 'Owner' | 'Developer' | 'Contractor' | 'Authorized Agent';
}

export interface ContactInformation {
    address: string;
    phoneNumber: string;
    email: string;
}

export interface LicenseNumbers {
    contractorLicense?: string;
    businessLicense?: string;
}

// 2. Project Location and Description
export interface ProjectLocationDescription {
    propertyDetails: PropertyDetails;
    projectType: ProjectType;
    zoningComplianceVerification?: ZoningComplianceVerification; // Conditional
}

export interface PropertyDetails {
    streetAddress: string;
    parcelIdentificationNumber: string;
    legalDescriptionOfProperty: string;
}

export type ProjectType =
    | 'New Construction'
    | 'Renovation/Alteration'
    | 'Demolition'
    | 'Addition'
    | 'Change of Use';

// 3. Zoning Compliance Verification (Conditional)
export interface ZoningComplianceVerification {
    currentZoningClassification: string;
    intendedUseDescription: string;
    varianceOrSpecialUsePermit?: VarianceOrSpecialUsePermit; // Conditional
}

export interface VarianceOrSpecialUsePermit {
    varianceRequested: boolean;
    specialUsePermitRequested: boolean;
    justificationStatement: string;
    supportingDocuments?: DocumentReference[];
}

// 4. Site Plan Submission
export interface SitePlanSubmission {
    includesLandscapingChanges: boolean;
    sitePlanDrawings: DocumentReference;
    landscapingPlans?: DocumentReference;
    parkingLayout?: DocumentReference;
    environmentalImpactAssessment?: EnvironmentalImpactAssessment; // Conditional
}

// 5. Environmental Impact Assessment (Conditional)
export interface EnvironmentalImpactAssessment {
    environmentalConsiderations: EnvironmentalConsiderations;
    environmentalImpactReport?: DocumentReference; // Conditional
    stateEnvironmentalAgencyPermits?: DocumentReference[]; // Conditional
}

export interface EnvironmentalConsiderations {
    hasWetlandsOrProtectedAreas: boolean;
    impactsLocalWildlife: boolean;
}

// 6. Building Plans and Specifications
export interface BuildingPlansSpecifications {
    architecturalDrawings: ArchitecturalDrawings;
    engineeringReports: EngineeringReports;
    requiresFireSafetyPlan: boolean;
    fireSafetyPlan?: DocumentReference; // Conditional
}

export interface ArchitecturalDrawings {
    floorPlans: DocumentReference;
    elevations: DocumentReference;
    structuralDetails: DocumentReference;
}

export interface EngineeringReports {
    structuralCalculations?: DocumentReference;
    soilAnalysisReport?: DocumentReference;
}

// 7. Utilities and Infrastructure
export interface UtilitiesInfrastructure {
    utilityServicesRequired: UtilityServicesRequired;
    utilityConnectionApplications?: UtilityConnectionApplications; // Conditional
    energyCompliance: EnergyCompliance;
}

export interface UtilityServicesRequired {
    electrical: boolean;
    water: boolean;
    sewer: boolean;
    gas: boolean;
}

export interface UtilityConnectionApplications {
    electrical?: DocumentReference;
    water?: DocumentReference;
    sewer?: DocumentReference;
    gas?: DocumentReference;
}

export interface EnergyCompliance {
    energyEfficiencyComplianceReport: DocumentReference;
    greenBuildingCertificationApplied?: boolean;
}

// 8. Accessibility Compliance
export interface AccessibilityCompliance {
    meetsADAStandards: boolean;
    accessibilityPlan?: DocumentReference; // Conditional
}

// 9. Fire and Life Safety
export interface FireLifeSafety {
    fireProtectionSystems: FireProtectionSystems;
    requiresEvacuationPlan: boolean;
    emergencyEvacuationPlan?: DocumentReference; // Conditional
    coordinatesWithFireMarshal?: boolean; // Conditional
}

export interface FireProtectionSystems {
    sprinklerSystems: boolean;
    fireAlarms: boolean;
    emergencyExits: boolean;
}

// 10. Floodplain and Stormwater Management
export interface FloodplainAndStormwaterManagement {
    isInFloodZone: boolean;
    floodplainDevelopmentPermit?: DocumentReference; // Conditional
    stormwaterManagementPlan: StormwaterManagementPlan;
}

export interface StormwaterManagementPlan {
    erosionControlMeasures: string;
    runoffCalculations: DocumentReference;
}

// 11. Historic Preservation Review
export interface HistoricPreservationReview {
    isHistoricProperty: boolean;
    historicPreservationPlan?: DocumentReference; // Conditional
    coordinatesWithHistoricCommission?: boolean; // Conditional
}

// 12. Traffic Impact Analysis
export interface TrafficImpactAnalysis {
    trafficFlowAssessment: TrafficFlowAssessment;
    trafficImpactStudy?: DocumentReference; // Conditional
}

export interface TrafficFlowAssessment {
    anticipatesTrafficIncrease: boolean;
    mitigationStrategies: string;
}

// 13. Neighbor Notification and Public Hearings
export interface NeighborNotificationAndPublicHearings {
    notificationRequirements: NotificationRequirements;
    publicHearingDetails?: PublicHearingDetails; // Conditional
}

export interface NotificationRequirements {
    requiresPublicHearing: boolean;
    notifiedAdjacentOwners: boolean;
    postedPublicNotices: boolean;
}

export interface PublicHearingDetails {
    hearingDate: Date;
    publicCommentsReceived: string;
}

// 14. Contractor and Subcontractor Details
export interface ContractorAndSubcontractorDetails {
    generalContractor: ContractorInformation;
    subcontractors: ContractorInformation[];
    insuranceVerification: InsuranceVerification;
}

export interface ContractorInformation {
    name: string;
    licenseNumber: string;
    contactInformation: ContactInformation;
}

export interface InsuranceVerification {
    liabilityInsuranceCertificate: DocumentReference;
    workersCompensationCoverageCertificate: DocumentReference;
}

// 15. Fee Calculation and Payment
export interface FeeCalculationAndPayment {
    permitFee: number;
    additionalFees?: AdditionalFees;
    totalFee: number;
    paymentMethod: 'Online' | 'Check' | 'Money Order';
    paymentReferenceNumber?: string;
}

export interface AdditionalFees {
    impactFees?: number;
    reviewFees?: number;
}

// 16. Final Review and Certification
export interface FinalReviewAndCertification {
    reviewSummary: string;
    certificationStatement: string;
    digitalSignature: string;
    submissionConfirmation: SubmissionConfirmation;
}

export interface SubmissionConfirmation {
    applicationReferenceNumber: string;
    estimatedProcessingTime: string;
}

// 17. Post-Submission Requirements
export interface PostSubmissionRequirements {
    supplementalInformationRequests?: string[];
    inspectionScheduling: InspectionScheduling;
    permitIssuanceProcedure: string;
}

export interface InspectionScheduling {
    requiredInspections: string[];
    schedulingInstructions: string;
}

// Main Application Interface
export interface BuildingPermitApplication {
    applicantInformation: ApplicantInformation;
    projectLocationDescription: ProjectLocationDescription;
    sitePlanSubmission: SitePlanSubmission;
    buildingPlansSpecifications: BuildingPlansSpecifications;
    utilitiesInfrastructure: UtilitiesInfrastructure;
    accessibilityCompliance: AccessibilityCompliance;
    fireLifeSafety: FireLifeSafety;
    floodplainAndStormwaterManagement: FloodplainAndStormwaterManagement;
    historicPreservationReview?: HistoricPreservationReview; // Conditional
    trafficImpactAnalysis?: TrafficImpactAnalysis; // Conditional
    neighborNotificationAndPublicHearings?: NeighborNotificationAndPublicHearings; // Conditional
    contractorAndSubcontractorDetails: ContractorAndSubcontractorDetails;
    feeCalculationAndPayment: FeeCalculationAndPayment;
    finalReviewAndCertification: FinalReviewAndCertification;
    postSubmissionRequirements?: PostSubmissionRequirements; // Conditional
}

export const sample: BuildingPermitApplication = {
    applicantInformation: {
        fullName: 'John Doe',
        companyName: 'Doe Construction Ltd.',
        contactInformation: {
            address: '123 Main St, Anytown, USA',
            phoneNumber: '555-1234',
            email: 'john.doe@example.com',
        },
        licenseNumbers: {
            contractorLicense: 'CON123456',
            businessLicense: 'BUS654321',
        },
        roleInProject: 'Contractor',
    },
    projectLocationDescription: {
        propertyDetails: {
            streetAddress: '456 Elm St, Anytown, USA',
            parcelIdentificationNumber: 'PID78910',
            legalDescriptionOfProperty: 'Lot 12, Block 7, Anytown Subdivision',
        },
        projectType: 'New Construction',
    },
    sitePlanSubmission: {
        includesLandscapingChanges: true,
        sitePlanDrawings: {
            fileName: 'site_plan.pdf',
            fileType: 'application/pdf',
            fileSize: 1024000,
        },
    },
    buildingPlansSpecifications: {
        requiresFireSafetyPlan: true,
        architecturalDrawings: {
            floorPlans: {
                fileName: 'floor_plans.pdf',
                fileType: 'application/pdf',
                fileSize: 2048000,
            },
            elevations: {
                fileName: 'elevations.pdf',
                fileType: 'application/pdf',
                fileSize: 1024000,
            },
            structuralDetails: {
                fileName: 'structural_details.pdf',
                fileType: 'application/pdf',
                fileSize: 3072000,
            },
        },
        engineeringReports: {},
    },
    utilitiesInfrastructure: {
        utilityServicesRequired: {
            electrical: true,
            water: true,
            sewer: true,
            gas: false,
        },
        energyCompliance: {
            energyEfficiencyComplianceReport: {
                fileName: 'energy_report.pdf',
                fileType: 'application/pdf',
                fileSize: 512000,
            },
        },
    },
    accessibilityCompliance: {
        meetsADAStandards: true,
    },
    fireLifeSafety: {
        requiresEvacuationPlan: true,
        fireProtectionSystems: {
            sprinklerSystems: true,
            fireAlarms: true,
            emergencyExits: true,
        },
    },
    floodplainAndStormwaterManagement: {
        isInFloodZone: false,
        stormwaterManagementPlan: {
            erosionControlMeasures: 'Silt fences and sediment basins',
            runoffCalculations: {
                fileName: 'runoff_calculations.pdf',
                fileType: 'application/pdf',
                fileSize: 256000,
            },
        },
    },
    contractorAndSubcontractorDetails: {
        generalContractor: {
            name: 'Doe Construction Ltd.',
            licenseNumber: 'CON123456',
            contactInformation: {
                address: '123 Main St, Anytown, USA',
                phoneNumber: '555-1234',
                email: 'contact@doeconstruction.com',
            },
        },
        subcontractors: [],
        insuranceVerification: {
            liabilityInsuranceCertificate: {
                fileName: 'liability_insurance.pdf',
                fileType: 'application/pdf',
                fileSize: 102400,
            },
            workersCompensationCoverageCertificate: {
                fileName: 'workers_comp.pdf',
                fileType: 'application/pdf',
                fileSize: 102400,
            },
        },
    },
    feeCalculationAndPayment: {
        permitFee: 5000,
        totalFee: 5000,
        paymentMethod: 'Online',
        paymentReferenceNumber: 'PAY123456',
    },
    finalReviewAndCertification: {
        reviewSummary: 'All documents submitted.',
        certificationStatement: 'I certify that all information is accurate.',
        digitalSignature: 'John Doe',
        submissionConfirmation: {
            applicationReferenceNumber: 'APP78910',
            estimatedProcessingTime: '2-4 weeks',
        },
    },
};
