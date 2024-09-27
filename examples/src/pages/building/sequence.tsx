// Import necessary types from your codebase
import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import type { FormPage, FormSequence } from '../../../../src/types';
import type { BuildingPermitApplication } from './data'; // Assuming this is where it's defined

// Define ComponentProps and ErrorList
interface ComponentProps {
	errors: FieldErrors<BuildingPermitApplication>;
	register: UseFormRegister<BuildingPermitApplication>;
}
type ErrorList = string[]; // Assuming errors are a list of strings

// Applicant Information Page
const applicantInformationPage: FormPage<
	BuildingPermitApplication,
	ComponentProps,
	ErrorList
> = {
	id: 'applicantInformation',
	isComplete: (data) =>
		!!data.applicantInformation?.fullName &&
		!!data.applicantInformation?.contactInformation,
	Component: () => (
		<div id="applicantInformation">Applicant Information Page</div>
	),
};

// Project Location Description Page
const projectLocationDescriptionPage: FormPage<
	BuildingPermitApplication,
	ComponentProps,
	ErrorList
> = {
	id: 'projectLocationDescription',
	isComplete: (data) =>
		!!data.projectLocationDescription?.propertyDetails?.streetAddress,
	Component: () => (
		<div id="projectLocationDescription">Project Location Description Page</div>
	),
};

// Zoning Compliance Page (Conditional)
const zoningCompliancePage: FormPage<
	BuildingPermitApplication,
	ComponentProps,
	ErrorList
> = {
	id: 'zoningCompliance',
	isNeeded: (data) =>
		data.projectLocationDescription?.projectType === 'Change of Use',
	isComplete: (data) =>
		!!data.projectLocationDescription?.zoningComplianceVerification
			?.currentZoningClassification &&
		!!data.projectLocationDescription?.zoningComplianceVerification
			?.intendedUseDescription,
	Component: () => <div id="zoningCompliance">Zoning Compliance Page</div>,
};
// Project Location and Description Sequence
const projectDetailsSequence: FormSequence<
	BuildingPermitApplication,
	ComponentProps,
	ErrorList
> = {
	pages: [projectLocationDescriptionPage, zoningCompliancePage],
};

// Site Plan Submission Page
const sitePlanSubmissionPage: FormPage<
	BuildingPermitApplication,
	ComponentProps,
	ErrorList
> = {
	id: 'sitePlanSubmission',
	isComplete: (data) => !!data.sitePlanSubmission?.sitePlanDrawings,
	Component: () => <div id="sitePlanSubmission">Site Plan Submission Page</div>,
};

// Environmental Impact Assessment Page (Conditional)
const environmentalImpactAssessmentPage: FormPage<
	BuildingPermitApplication,
	ComponentProps,
	ErrorList
> = {
	id: 'environmentalImpactAssessment',
	isNeeded: (data) => data.sitePlanSubmission?.includesLandscapingChanges,
	isComplete: (data) =>
		!!data.sitePlanSubmission?.environmentalImpactAssessment,
	Component: () => (
		<div id="environmentalImpactAssessment">
			Environmental Impact Assessment Page
		</div>
	),
};

// Site Plan Submission Sequence
const sitePlanSubmissionSequence: FormSequence<
	BuildingPermitApplication,
	ComponentProps,
	ErrorList
> = {
	pages: [sitePlanSubmissionPage, environmentalImpactAssessmentPage],
};

// Architectural Drawings Page
const architecturalDrawingsPage: FormPage<
	BuildingPermitApplication,
	ComponentProps,
	ErrorList
> = {
	id: 'architecturalDrawings',
	isComplete: (data) =>
		!!data.buildingPlansSpecifications?.architecturalDrawings,
	Component: () => (
		<div id="architecturalDrawings">Architectural Drawings Page</div>
	),
};

// Engineering Reports Page
const engineeringReportsPage: FormPage<
	BuildingPermitApplication,
	ComponentProps,
	ErrorList
> = {
	id: 'engineeringReports',
	isComplete: (data) => !!data.buildingPlansSpecifications?.engineeringReports,
	Component: () => <div id="engineeringReports">Engineering Reports Page</div>,
};

// Fire Safety Plan Page (Conditional)
const fireSafetyPlanPage: FormPage<
	BuildingPermitApplication,
	ComponentProps,
	ErrorList
> = {
	id: 'fireSafetyPlan',
	isNeeded: (data) => data.buildingPlansSpecifications?.requiresFireSafetyPlan,
	isComplete: (data) => !!data.buildingPlansSpecifications?.fireSafetyPlan,
	Component: () => <div id="fireSafetyPlan">Fire Safety Plan Page</div>,
};

// Building Plans and Specifications Sequence
const buildingPlansSpecificationsSequence: FormSequence<
	BuildingPermitApplication,
	ComponentProps,
	ErrorList
> = {
	pages: [
		architecturalDrawingsPage,
		engineeringReportsPage,
		fireSafetyPlanPage,
	],
};

// Utility Services Page
const utilityServicesPage: FormPage<
	BuildingPermitApplication,
	ComponentProps,
	ErrorList
> = {
	id: 'utilityServices',
	isComplete: (data) =>
		data.utilitiesInfrastructure?.utilityServicesRequired !== undefined,
	Component: () => <div id="utilityServices">Utility Services Page</div>,
};

// Energy Compliance Page
const energyCompliancePage: FormPage<
	BuildingPermitApplication,
	ComponentProps,
	ErrorList
> = {
	id: 'energyCompliance',
	isComplete: (data) =>
		!!data.utilitiesInfrastructure?.energyCompliance
			?.energyEfficiencyComplianceReport,
	Component: () => <div id="energyCompliance">Energy Compliance Page</div>,
};

// Utilities and Infrastructure Sequence
const utilitiesInfrastructureSequence: FormSequence<
	BuildingPermitApplication,
	ComponentProps,
	ErrorList
> = {
	pages: [utilityServicesPage, energyCompliancePage],
};

// Accessibility Compliance Page
const accessibilityCompliancePage: FormPage<
	BuildingPermitApplication,
	ComponentProps,
	ErrorList
> = {
	id: 'accessibilityCompliance',
	isComplete: (data) =>
		data.accessibilityCompliance?.meetsADAStandards !== undefined,
	Component: () => (
		<div id="accessibilityCompliance">Accessibility Compliance Page</div>
	),
};

// Fire Protection Systems Page
const fireProtectionSystemsPage: FormPage<
	BuildingPermitApplication,
	ComponentProps,
	ErrorList
> = {
	id: 'fireProtectionSystems',
	isComplete: (data) =>
		data.fireLifeSafety?.fireProtectionSystems !== undefined,
	Component: () => (
		<div id="fireProtectionSystems">Fire Protection Systems Page</div>
	),
};

// Emergency Evacuation Plan Page (Conditional)
const emergencyEvacuationPlanPage: FormPage<
	BuildingPermitApplication,
	ComponentProps,
	ErrorList
> = {
	id: 'emergencyEvacuationPlan',
	isNeeded: (data) => data.fireLifeSafety?.requiresEvacuationPlan,
	isComplete: (data) => !!data.fireLifeSafety?.emergencyEvacuationPlan,
	Component: () => (
		<div id="emergencyEvacuationPlan">Emergency Evacuation Plan Page</div>
	),
};

// Fire and Life Safety Sequence
const fireLifeSafetySequence: FormSequence<
	BuildingPermitApplication,
	ComponentProps,
	ErrorList
> = {
	pages: [fireProtectionSystemsPage, emergencyEvacuationPlanPage],
};

// Floodplain Determination Page
const floodplainDeterminationPage: FormPage<
	BuildingPermitApplication,
	ComponentProps,
	ErrorList
> = {
	id: 'floodplainDetermination',
	isComplete: (data) =>
		data.floodplainAndStormwaterManagement?.isInFloodZone !== undefined,
	Component: () => (
		<div id="floodplainDetermination">Floodplain Determination Page</div>
	),
};

// Stormwater Management Plan Page
const stormwaterManagementPlanPage: FormPage<
	BuildingPermitApplication,
	ComponentProps,
	ErrorList
> = {
	id: 'stormwaterManagementPlan',
	isComplete: (data) =>
		!!data.floodplainAndStormwaterManagement?.stormwaterManagementPlan,
	Component: () => (
		<div id="stormwaterManagementPlan">Stormwater Management Plan Page</div>
	),
};

// Floodplain and Stormwater Management Sequence
const floodplainManagementSequence: FormSequence<
	BuildingPermitApplication,
	ComponentProps,
	ErrorList
> = {
	pages: [floodplainDeterminationPage, stormwaterManagementPlanPage],
};

// Historic Property Status Page
const historicPropertyStatusPage: FormPage<
	BuildingPermitApplication,
	ComponentProps,
	ErrorList
> = {
	id: 'historicPropertyStatus',
	isComplete: (data) =>
		data.historicPreservationReview?.isHistoricProperty !== undefined,
	Component: () => (
		<div id="historicPropertyStatus">Historic Property Status Page</div>
	),
};

// Historic Preservation Plan Page (Conditional)
const historicPreservationPlanPage: FormPage<
	BuildingPermitApplication,
	ComponentProps,
	ErrorList
> = {
	id: 'historicPreservationPlan',
	isNeeded: (data) => data.historicPreservationReview?.isHistoricProperty,
	isComplete: (data) =>
		!!data.historicPreservationReview?.historicPreservationPlan,
	Component: () => (
		<div id="historicPreservationPlan">Historic Preservation Plan Page</div>
	),
};

// Historic Preservation Review Sequence (Conditional)
const historicPreservationReviewSequence: FormSequence<
	BuildingPermitApplication,
	ComponentProps,
	ErrorList
> = {
	pages: [historicPropertyStatusPage, historicPreservationPlanPage],
	isNeeded: (data) => data.historicPreservationReview?.isHistoricProperty,
};

// Traffic Flow Assessment Page
const trafficFlowAssessmentPage: FormPage<
	BuildingPermitApplication,
	ComponentProps,
	ErrorList
> = {
	id: 'trafficFlowAssessment',
	isComplete: (data) =>
		data.trafficImpactAnalysis?.trafficFlowAssessment !== undefined,
	Component: () => (
		<div id="trafficFlowAssessment">Traffic Flow Assessment Page</div>
	),
};

// Traffic Impact Study Page (Conditional)
const trafficImpactStudyPage: FormPage<
	BuildingPermitApplication,
	ComponentProps,
	ErrorList
> = {
	id: 'trafficImpactStudy',
	isNeeded: (data) =>
		data.trafficImpactAnalysis?.trafficFlowAssessment
			.anticipatesTrafficIncrease,
	isComplete: (data) => !!data.trafficImpactAnalysis?.trafficImpactStudy,
	Component: () => <div id="trafficImpactStudy">Traffic Impact Study Page</div>,
};

// Traffic Impact Analysis Sequence (Conditional)
const trafficImpactAnalysisSequence: FormSequence<
	BuildingPermitApplication,
	ComponentProps,
	ErrorList
> = {
	pages: [trafficFlowAssessmentPage, trafficImpactStudyPage],
	isNeeded: (data) =>
		data.projectLocationDescription?.projectType === 'New Construction' ||
		data.projectLocationDescription?.projectType === 'Addition',
};

// Notification Requirements Page
const notificationRequirementsPage: FormPage<
	BuildingPermitApplication,
	ComponentProps,
	ErrorList
> = {
	id: 'notificationRequirements',
	isComplete: (data) =>
		data.neighborNotificationAndPublicHearings?.notificationRequirements !==
		undefined,
	Component: () => (
		<div id="notificationRequirements">Notification Requirements Page</div>
	),
};

// Public Hearing Details Page (Conditional)
const publicHearingDetailsPage: FormPage<
	BuildingPermitApplication,
	ComponentProps,
	ErrorList
> = {
	id: 'publicHearingDetails',
	isNeeded: (data) =>
		data.neighborNotificationAndPublicHearings?.notificationRequirements
			.requiresPublicHearing,
	isComplete: (data) =>
		!!data.neighborNotificationAndPublicHearings?.publicHearingDetails,
	Component: () => (
		<div id="publicHearingDetails">Public Hearing Details Page</div>
	),
};

// Neighbor Notification and Public Hearings Sequence (Conditional)
const neighborNotificationSequence: FormSequence<
	BuildingPermitApplication,
	ComponentProps,
	ErrorList
> = {
	pages: [notificationRequirementsPage, publicHearingDetailsPage],
	isNeeded: (data) =>
		data.projectLocationDescription?.zoningComplianceVerification
			?.varianceOrSpecialUsePermit !== undefined,
};

// Contractor and Subcontractor Details Page
const contractorDetailsPage: FormPage<
	BuildingPermitApplication,
	ComponentProps,
	ErrorList
> = {
	id: 'contractorDetails',
	isComplete: (data) =>
		!!data.contractorAndSubcontractorDetails?.generalContractor,
	Component: () => <div id="contractorDetails">Contractor Details Page</div>,
};

// Fee Calculation and Payment Page
const feeCalculationAndPaymentPage: FormPage<
	BuildingPermitApplication,
	ComponentProps,
	ErrorList
> = {
	id: 'feeCalculationAndPayment',
	isComplete: (data) =>
		data.feeCalculationAndPayment?.paymentMethod !== undefined,
	Component: () => (
		<div id="feeCalculationAndPayment">Fee Calculation and Payment Page</div>
	),
};

// Final Review and Certification Page
const finalReviewAndCertificationPage: FormPage<
	BuildingPermitApplication,
	ComponentProps,
	ErrorList
> = {
	id: 'finalReviewAndCertification',
	isComplete: (data) => !!data.finalReviewAndCertification?.digitalSignature,
	isFinal: () => true,
	Component: () => (
		<div id="finalReviewAndCertification">
			Final Review and Certification Page
		</div>
	),
};

// Main Form Sequence
export const buildingPermitApplicationForm: FormSequence<
	BuildingPermitApplication,
	ComponentProps,
	ErrorList
> = {
	pages: [
		applicantInformationPage,
		projectDetailsSequence,
		sitePlanSubmissionSequence,
		buildingPlansSpecificationsSequence,
		utilitiesInfrastructureSequence,
		accessibilityCompliancePage,
		fireLifeSafetySequence,
		floodplainManagementSequence,
		historicPreservationReviewSequence,
		trafficImpactAnalysisSequence,
		neighborNotificationSequence,
		contractorDetailsPage,
		feeCalculationAndPaymentPage,
		finalReviewAndCertificationPage,
	],
};
