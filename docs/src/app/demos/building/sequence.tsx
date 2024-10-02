// Import necessary types from your codebase
import type {
    FieldErrors,
    UseFormGetValues,
    UseFormRegister,
    UseFormSetValue,
    UseFormWatch,
} from 'react-hook-form';
import type { FormPage, FormSequence } from '../../../../src/types';
import type { BuildingPermitApplication } from './data'; // Assuming this is where it's defined

import {
    ApplicantInformationComponent,
    ProjectLocationDescriptionComponent,
    ZoningComplianceComponent,
    SitePlanSubmissionComponent,
    EnvironmentalImpactAssessmentComponent,
    BuildingPlansSpecificationsComponent,
    FireSafetyPlanComponent,
    UtilitiesInfrastructureComponent,
    AccessibilityComplianceComponent,
    FireProtectionSystemsComponent,
    EmergencyEvacuationPlanComponent,
    FloodplainDeterminationComponent,
    StormwaterManagementPlanComponent,
    HistoricPreservationReviewComponent,
    TrafficImpactAnalysisComponent,
    NeighborNotificationComponent,
    ContractorDetailsComponent,
    FeeCalculationAndPaymentComponent,
    FinalReviewAndCertificationComponent,
} from './pageComponents';

// Define ComponentProps and ErrorList
type ComponentProps = {
    register: UseFormRegister<BuildingPermitApplication>;
    errors: FieldErrors<BuildingPermitApplication>;
    setValue: UseFormSetValue<BuildingPermitApplication>;
    watch: UseFormWatch<BuildingPermitApplication>;
    getValues: UseFormGetValues<BuildingPermitApplication>;
};

type BuildingFormSequence = FormSequence<
    BuildingPermitApplication,
    ComponentProps,
    FieldErrors<BuildingPermitApplication>
>;

type BuildingFormPage = FormPage<
    BuildingPermitApplication,
    ComponentProps,
    FieldErrors<BuildingPermitApplication>
>;

// Applicant Information Page
const applicantInformationPage: BuildingFormPage = {
    id: 'applicantInformation',
    isComplete: (data) =>
        !!data.applicantInformation?.fullName &&
        !!data.applicantInformation?.contactInformation,
    Component: ApplicantInformationComponent,
};

// Project Location and Description Page
const projectLocationDescriptionPage: BuildingFormPage = {
    id: 'projectLocationDescription',
    isComplete: (data) =>
        !!data.projectLocationDescription?.propertyDetails?.streetAddress,
    Component: ProjectLocationDescriptionComponent,
};

// Zoning Compliance Page (Conditional)
const zoningCompliancePage: BuildingFormPage = {
    id: 'zoningCompliance',
    isRequired: (data) =>
        data.projectLocationDescription?.projectType === 'Change of Use',
    isComplete: (data) =>
        !!data.projectLocationDescription?.zoningComplianceVerification,
    Component: ZoningComplianceComponent,
};

// Project Details Sequence
const projectDetailsSequence: BuildingFormSequence = {
    id: 'projectDetails',
    pages: [projectLocationDescriptionPage, zoningCompliancePage],
};

// Site Plan Submission Page
const sitePlanSubmissionPage: BuildingFormPage = {
    id: 'sitePlanSubmission',
    isComplete: (data) => !!data.sitePlanSubmission?.sitePlanDrawings,
    Component: SitePlanSubmissionComponent,
};

// Environmental Impact Assessment Page (Conditional)
const environmentalImpactAssessmentPage: BuildingFormPage = {
    id: 'environmentalImpactAssessment',
    isRequired: (data) => data.sitePlanSubmission?.includesLandscapingChanges,
    isComplete: (data) =>
        !!data.sitePlanSubmission?.environmentalImpactAssessment,
    Component: EnvironmentalImpactAssessmentComponent,
};

// Site Plan Submission Sequence
const sitePlanSubmissionSequence: BuildingFormSequence = {
    id: 'sitePlanSubmission',
    pages: [sitePlanSubmissionPage, environmentalImpactAssessmentPage],
};

// Building Plans and Specifications Page
const buildingPlansSpecificationsPage: BuildingFormPage = {
    id: 'buildingPlansSpecifications',
    isComplete: (data) =>
        !!data.buildingPlansSpecifications?.architecturalDrawings,
    Component: BuildingPlansSpecificationsComponent,
};

// Fire Safety Plan Page (Conditional)
const fireSafetyPlanPage: BuildingFormPage = {
    id: 'fireSafetyPlan',
    isRequired: (data) =>
        data.buildingPlansSpecifications?.requiresFireSafetyPlan,
    isComplete: (data) => !!data.buildingPlansSpecifications?.fireSafetyPlan,
    Component: FireSafetyPlanComponent,
};

// Building Plans and Specifications Sequence
const buildingPlansSpecificationsSequence: BuildingFormSequence = {
    id: 'buildingPlansSpecifications',
    pages: [buildingPlansSpecificationsPage, fireSafetyPlanPage],
};

// Utilities and Infrastructure Page
const utilitiesInfrastructurePage: BuildingFormPage = {
    id: 'utilitiesInfrastructure',
    isComplete: (data) =>
        data.utilitiesInfrastructure?.utilityServicesRequired !== undefined,
    Component: UtilitiesInfrastructureComponent,
};

// Energy Compliance Page
const energyCompliancePage: BuildingFormPage = {
    id: 'energyCompliance',
    isComplete: (data) =>
        !!data.utilitiesInfrastructure?.energyCompliance
            ?.energyEfficiencyComplianceReport,
    Component: UtilitiesInfrastructureComponent, // Reusing the same component if applicable
};

// Utilities and Infrastructure Sequence
const utilitiesInfrastructureSequence: BuildingFormSequence = {
    id: 'utilitiesInfrastructure',
    pages: [utilitiesInfrastructurePage, energyCompliancePage],
};

// Accessibility Compliance Page
const accessibilityCompliancePage: BuildingFormPage = {
    id: 'accessibilityCompliance',
    isComplete: (data) =>
        data.accessibilityCompliance?.meetsADAStandards !== undefined,
    Component: AccessibilityComplianceComponent,
};

// Fire Protection Systems Page
const fireProtectionSystemsPage: BuildingFormPage = {
    id: 'fireProtectionSystems',
    isComplete: (data) =>
        data.fireLifeSafety?.fireProtectionSystems !== undefined,
    Component: FireProtectionSystemsComponent,
};

// Emergency Evacuation Plan Page (Conditional)
const emergencyEvacuationPlanPage: BuildingFormPage = {
    id: 'emergencyEvacuationPlan',
    isRequired: (data) => data.fireLifeSafety?.requiresEvacuationPlan,
    isComplete: (data) => !!data.fireLifeSafety?.emergencyEvacuationPlan,
    Component: EmergencyEvacuationPlanComponent,
};

// Fire and Life Safety Sequence
const fireLifeSafetySequence: BuildingFormSequence = {
    id: 'fireLifeSafety',
    pages: [fireProtectionSystemsPage, emergencyEvacuationPlanPage],
};

// Floodplain Determination Page
const floodplainDeterminationPage: BuildingFormPage = {
    id: 'floodplainDetermination',
    isComplete: (data) =>
        data.floodplainAndStormwaterManagement?.isInFloodZone !== undefined,
    Component: FloodplainDeterminationComponent,
};

// Stormwater Management Plan Page
const stormwaterManagementPlanPage: BuildingFormPage = {
    id: 'stormwaterManagementPlan',
    isComplete: (data) =>
        !!data.floodplainAndStormwaterManagement?.stormwaterManagementPlan,
    Component: StormwaterManagementPlanComponent,
};

// Floodplain and Stormwater Management Sequence
const floodplainManagementSequence: BuildingFormSequence = {
    id: 'floodplainManagement',
    pages: [floodplainDeterminationPage, stormwaterManagementPlanPage],
};

// Historic Preservation Review Component (Conditional)
const historicPreservationReviewPage: BuildingFormPage = {
    id: 'historicPreservationReview',
    isRequired: (data) => data.historicPreservationReview?.isHistoricProperty,
    isComplete: (data) =>
        data.historicPreservationReview?.isHistoricProperty !== undefined,
    Component: HistoricPreservationReviewComponent,
};

// Traffic Impact Analysis Component (Conditional)
const trafficImpactAnalysisPage: BuildingFormPage = {
    id: 'trafficImpactAnalysis',
    isRequired: (data) =>
        data.projectLocationDescription?.projectType === 'New Construction' ||
        data.projectLocationDescription?.projectType === 'Addition',
    isComplete: (data) =>
        data.trafficImpactAnalysis?.trafficFlowAssessment !== undefined,
    Component: TrafficImpactAnalysisComponent,
};

// Neighbor Notification and Public Hearings Component (Conditional)
const neighborNotificationPage: BuildingFormPage = {
    id: 'neighborNotification',
    isRequired: (data) => {
        const varianceRequested =
            data.projectLocationDescription?.zoningComplianceVerification
                ?.varianceOrSpecialUsePermit?.varianceRequested;
        const specialUsePermitRequested =
            data.projectLocationDescription?.zoningComplianceVerification
                ?.varianceOrSpecialUsePermit?.specialUsePermitRequested;
        return varianceRequested || specialUsePermitRequested;
    },
    isComplete: (data) =>
        data.neighborNotificationAndPublicHearings?.notificationRequirements !==
        undefined,
    Component: NeighborNotificationComponent,
};

// Contractor and Subcontractor Details Page
const contractorDetailsPage: BuildingFormPage = {
    id: 'contractorDetails',
    isComplete: (data) =>
        !!data.contractorAndSubcontractorDetails?.generalContractor,
    Component: ContractorDetailsComponent,
};

// Fee Calculation and Payment Page
const feeCalculationAndPaymentPage: BuildingFormPage = {
    id: 'feeCalculationAndPayment',
    isComplete: (data) =>
        data.feeCalculationAndPayment?.paymentMethod !== undefined,
    Component: FeeCalculationAndPaymentComponent,
};

// Final Review and Certification Page
const finalReviewAndCertificationPage: BuildingFormPage = {
    id: 'finalReviewAndCertification',
    isComplete: (data) => !!data.finalReviewAndCertification?.digitalSignature,
    isFinal: () => true,
    Component: FinalReviewAndCertificationComponent,
};

// Main Form Sequence
export const buildingPermitApplicationSequence: BuildingFormSequence = {
    id: 'buildingPermitApplication',
    pages: [
        applicantInformationPage,
        projectDetailsSequence,
        sitePlanSubmissionSequence,
        buildingPlansSpecificationsSequence,
        utilitiesInfrastructureSequence,
        accessibilityCompliancePage,
        fireLifeSafetySequence,
        floodplainManagementSequence,
        historicPreservationReviewPage,
        trafficImpactAnalysisPage,
        neighborNotificationPage,
        contractorDetailsPage,
        feeCalculationAndPaymentPage,
        finalReviewAndCertificationPage,
    ],
};
