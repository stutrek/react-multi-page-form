// Import necessary libraries and types
import type {
	UseFormRegister,
	FieldErrors,
	UseFormSetValue,
	UseFormWatch,
	UseFormGetValues,
} from 'react-hook-form';
import {
	TextInput,
	Checkbox,
	RadioGroup,
	Radio,
	FileInput,
} from '../../FormLibrary';
import type { BuildingPermitApplication } from './data';

// Define ComponentProps and BuildingFormComponent types
type ComponentProps = {
	register: UseFormRegister<BuildingPermitApplication>;
	errors: FieldErrors<BuildingPermitApplication>;
	setValue: UseFormSetValue<BuildingPermitApplication>;
	watch: UseFormWatch<BuildingPermitApplication>;
	getValues: UseFormGetValues<BuildingPermitApplication>;
};

type BuildingFormComponent = (props: ComponentProps) => JSX.Element;

// 1. Applicant Information Page Component
export const ApplicantInformationComponent: BuildingFormComponent = ({
	register,
	errors,
	watch,
}) => {
	const role = watch('applicantInformation.roleInProject');
	return (
		<div>
			<h2>Applicant Information</h2>
			<TextInput
				label="Full Name"
				{...register('applicantInformation.fullName')}
				error={errors.applicantInformation?.fullName}
			/>
			<TextInput
				label="Company Name"
				{...register('applicantInformation.companyName')}
				error={errors.applicantInformation?.companyName}
			/>
			<TextInput
				label="Address"
				{...register('applicantInformation.contactInformation.address')}
				error={errors.applicantInformation?.contactInformation?.address}
			/>
			<TextInput
				label="Phone Number"
				{...register('applicantInformation.contactInformation.phoneNumber')}
				error={errors.applicantInformation?.contactInformation?.phoneNumber}
			/>
			<TextInput
				label="Email"
				{...register('applicantInformation.contactInformation.email')}
				error={errors.applicantInformation?.contactInformation?.email}
			/>
			<RadioGroup name="roleInProject" value={role}>
				<Radio
					label="Owner"
					value="Owner"
					{...register('applicantInformation.roleInProject')}
				/>
				<Radio
					label="Developer"
					value="Developer"
					{...register('applicantInformation.roleInProject')}
				/>
				<Radio
					label="Contractor"
					value="Contractor"
					{...register('applicantInformation.roleInProject')}
				/>
				<Radio
					label="Authorized Agent"
					value="Authorized Agent"
					{...register('applicantInformation.roleInProject')}
				/>
			</RadioGroup>
		</div>
	);
};

// 2. Project Location and Description Page Component
export const ProjectLocationDescriptionComponent: BuildingFormComponent = ({
	register,
	errors,
	watch,
}) => {
	const projectType = watch('projectLocationDescription.projectType');
	return (
		<div>
			<h2>Project Location and Description</h2>
			<TextInput
				label="Street Address"
				{...register(
					'projectLocationDescription.propertyDetails.streetAddress',
				)}
				error={
					errors.projectLocationDescription?.propertyDetails?.streetAddress
				}
			/>
			<TextInput
				label="Parcel Identification Number"
				{...register(
					'projectLocationDescription.propertyDetails.parcelIdentificationNumber',
				)}
				error={
					errors.projectLocationDescription?.propertyDetails
						?.parcelIdentificationNumber
				}
			/>
			<TextInput
				label="Legal Description of Property"
				{...register(
					'projectLocationDescription.propertyDetails.legalDescriptionOfProperty',
				)}
				error={
					errors.projectLocationDescription?.propertyDetails
						?.legalDescriptionOfProperty
				}
			/>
			<RadioGroup name="projectType" value={projectType}>
				<Radio
					label="New Construction"
					value="New Construction"
					{...register('projectLocationDescription.projectType')}
				/>
				<Radio
					label="Renovation/Alteration"
					value="Renovation/Alteration"
					{...register('projectLocationDescription.projectType')}
				/>
				<Radio
					label="Demolition"
					value="Demolition"
					{...register('projectLocationDescription.projectType')}
				/>
				<Radio
					label="Addition"
					value="Addition"
					{...register('projectLocationDescription.projectType')}
				/>
				<Radio
					label="Change of Use"
					value="Change of Use"
					{...register('projectLocationDescription.projectType')}
				/>
			</RadioGroup>
		</div>
	);
};

// 3. Zoning Compliance Verification Component (Conditional)
export const ZoningComplianceComponent: BuildingFormComponent = ({
	register,
	errors,
	setValue,
}) => {
	return (
		<div>
			<h2>Zoning Compliance Verification</h2>
			<TextInput
				label="Current Zoning Classification"
				{...register(
					'projectLocationDescription.zoningComplianceVerification.currentZoningClassification',
				)}
				error={
					errors.projectLocationDescription?.zoningComplianceVerification
						?.currentZoningClassification
				}
			/>
			<TextInput
				label="Intended Use Description"
				{...register(
					'projectLocationDescription.zoningComplianceVerification.intendedUseDescription',
				)}
				error={
					errors.projectLocationDescription?.zoningComplianceVerification
						?.intendedUseDescription
				}
			/>
			<Checkbox
				label="Variance Requested"
				{...register(
					'projectLocationDescription.zoningComplianceVerification.varianceOrSpecialUsePermit.varianceRequested',
				)}
				error={
					errors.projectLocationDescription?.zoningComplianceVerification
						?.varianceOrSpecialUsePermit?.varianceRequested
				}
			/>
			<Checkbox
				label="Special Use Permit Requested"
				{...register(
					'projectLocationDescription.zoningComplianceVerification.varianceOrSpecialUsePermit.specialUsePermitRequested',
				)}
				error={
					errors.projectLocationDescription?.zoningComplianceVerification
						?.varianceOrSpecialUsePermit?.specialUsePermitRequested
				}
			/>
			<TextInput
				label="Justification Statement"
				{...register(
					'projectLocationDescription.zoningComplianceVerification.varianceOrSpecialUsePermit.justificationStatement',
				)}
				error={
					errors.projectLocationDescription?.zoningComplianceVerification
						?.varianceOrSpecialUsePermit?.justificationStatement
				}
			/>
			<FileInput
				label="Supporting Documents"
				{...register(
					'projectLocationDescription.zoningComplianceVerification.varianceOrSpecialUsePermit.supportingDocuments',
				)}
				setValue={setValue}
			/>
		</div>
	);
};

// 4. Site Plan Submission Component
export const SitePlanSubmissionComponent: BuildingFormComponent = ({
	register,
	errors,
	setValue,
}) => {
	return (
		<div>
			<h2>Site Plan Submission</h2>
			<FileInput
				label="Site Plan Drawings"
				{...register('sitePlanSubmission.sitePlanDrawings')}
				setValue={setValue}
				error={errors.sitePlanSubmission?.sitePlanDrawings}
			/>
			<FileInput
				label="Landscaping Plans"
				{...register('sitePlanSubmission.landscapingPlans')}
				setValue={setValue}
				error={errors.sitePlanSubmission?.landscapingPlans}
			/>
			<FileInput
				label="Parking Layout"
				{...register('sitePlanSubmission.parkingLayout')}
				setValue={setValue}
				error={errors.sitePlanSubmission?.parkingLayout}
			/>
			<Checkbox
				label="Includes Landscaping Changes"
				{...register('sitePlanSubmission.includesLandscapingChanges')}
				error={errors.sitePlanSubmission?.includesLandscapingChanges}
			/>
		</div>
	);
};

// 5. Environmental Impact Assessment Component (Conditional)
export const EnvironmentalImpactAssessmentComponent: BuildingFormComponent = ({
	register,
	errors,
	setValue,
}) => {
	return (
		<div>
			<h2>Environmental Impact Assessment</h2>
			<Checkbox
				label="Presence of Wetlands or Protected Areas"
				{...register(
					'sitePlanSubmission.environmentalImpactAssessment.environmentalConsiderations.hasWetlandsOrProtectedAreas',
				)}
				error={
					errors.sitePlanSubmission?.environmentalImpactAssessment
						?.environmentalConsiderations?.hasWetlandsOrProtectedAreas
				}
			/>
			<Checkbox
				label="Impacts Local Wildlife"
				{...register(
					'sitePlanSubmission.environmentalImpactAssessment.environmentalConsiderations.impactsLocalWildlife',
				)}
				error={
					errors.sitePlanSubmission?.environmentalImpactAssessment
						?.environmentalConsiderations?.impactsLocalWildlife
				}
			/>
			<FileInput
				label="Environmental Impact Report"
				{...register(
					'sitePlanSubmission.environmentalImpactAssessment.environmentalImpactReport',
				)}
				setValue={setValue}
				error={
					errors.sitePlanSubmission?.environmentalImpactAssessment
						?.environmentalImpactReport
				}
			/>
		</div>
	);
};

// 6. Building Plans and Specifications Component
export const BuildingPlansSpecificationsComponent: BuildingFormComponent = ({
	register,
	errors,
	setValue,
}) => {
	return (
		<div>
			<h2>Building Plans and Specifications</h2>
			<FileInput
				label="Floor Plans"
				{...register(
					'buildingPlansSpecifications.architecturalDrawings.floorPlans',
				)}
				setValue={setValue}
				error={
					errors.buildingPlansSpecifications?.architecturalDrawings?.floorPlans
				}
			/>
			<FileInput
				label="Elevations"
				{...register(
					'buildingPlansSpecifications.architecturalDrawings.elevations',
				)}
				setValue={setValue}
				error={
					errors.buildingPlansSpecifications?.architecturalDrawings?.elevations
				}
			/>
			<FileInput
				label="Structural Details"
				{...register(
					'buildingPlansSpecifications.architecturalDrawings.structuralDetails',
				)}
				setValue={setValue}
				error={
					errors.buildingPlansSpecifications?.architecturalDrawings
						?.structuralDetails
				}
			/>
			<FileInput
				label="Structural Calculations"
				{...register(
					'buildingPlansSpecifications.engineeringReports.structuralCalculations',
				)}
				setValue={setValue}
				error={
					errors.buildingPlansSpecifications?.engineeringReports
						?.structuralCalculations
				}
			/>
			<FileInput
				label="Soil Analysis Report"
				{...register(
					'buildingPlansSpecifications.engineeringReports.soilAnalysisReport',
				)}
				setValue={setValue}
				error={
					errors.buildingPlansSpecifications?.engineeringReports
						?.soilAnalysisReport
				}
			/>
			<Checkbox
				label="Requires Fire Safety Plan"
				{...register('buildingPlansSpecifications.requiresFireSafetyPlan')}
				error={errors.buildingPlansSpecifications?.requiresFireSafetyPlan}
			/>
		</div>
	);
};

// 7. Fire Safety Plan Component (Conditional)
export const FireSafetyPlanComponent: BuildingFormComponent = ({
	register,
	errors,
	setValue,
}) => {
	return (
		<div>
			<h2>Fire Safety Plan</h2>
			<FileInput
				label="Fire Safety Plan Document"
				{...register('buildingPlansSpecifications.fireSafetyPlan')}
				setValue={setValue}
				error={errors.buildingPlansSpecifications?.fireSafetyPlan}
			/>
		</div>
	);
};

// 8. Utilities and Infrastructure Component
export const UtilitiesInfrastructureComponent: BuildingFormComponent = ({
	register,
	errors,
	setValue,
}) => {
	return (
		<div>
			<h2>Utilities and Infrastructure</h2>
			<Checkbox
				label="Electrical"
				{...register(
					'utilitiesInfrastructure.utilityServicesRequired.electrical',
				)}
				error={
					errors.utilitiesInfrastructure?.utilityServicesRequired?.electrical
				}
			/>
			<Checkbox
				label="Water"
				{...register('utilitiesInfrastructure.utilityServicesRequired.water')}
				error={errors.utilitiesInfrastructure?.utilityServicesRequired?.water}
			/>
			<Checkbox
				label="Sewer"
				{...register('utilitiesInfrastructure.utilityServicesRequired.sewer')}
				error={errors.utilitiesInfrastructure?.utilityServicesRequired?.sewer}
			/>
			<Checkbox
				label="Gas"
				{...register('utilitiesInfrastructure.utilityServicesRequired.gas')}
				error={errors.utilitiesInfrastructure?.utilityServicesRequired?.gas}
			/>
			<FileInput
				label="Energy Efficiency Compliance Report"
				{...register(
					'utilitiesInfrastructure.energyCompliance.energyEfficiencyComplianceReport',
				)}
				setValue={setValue}
				error={
					errors.utilitiesInfrastructure?.energyCompliance
						?.energyEfficiencyComplianceReport
				}
			/>
			<Checkbox
				label="Apply for Green Building Certification"
				{...register(
					'utilitiesInfrastructure.energyCompliance.greenBuildingCertificationApplied',
				)}
				error={
					errors.utilitiesInfrastructure?.energyCompliance
						?.greenBuildingCertificationApplied
				}
			/>
		</div>
	);
};

// 9. Accessibility Compliance Component
export const AccessibilityComplianceComponent: BuildingFormComponent = ({
	register,
	errors,
	setValue,
}) => {
	return (
		<div>
			<h2>Accessibility Compliance</h2>
			<Checkbox
				label="Meets ADA Standards"
				{...register('accessibilityCompliance.meetsADAStandards')}
				error={errors.accessibilityCompliance?.meetsADAStandards}
			/>
			<FileInput
				label="Accessibility Plan (if applicable)"
				{...register('accessibilityCompliance.accessibilityPlan')}
				setValue={setValue}
				error={errors.accessibilityCompliance?.accessibilityPlan}
			/>
		</div>
	);
};

// 10. Fire Protection Systems Component
export const FireProtectionSystemsComponent: BuildingFormComponent = ({
	register,
	errors,
}) => {
	return (
		<div>
			<h2>Fire Protection Systems</h2>
			<Checkbox
				label="Sprinkler Systems"
				{...register('fireLifeSafety.fireProtectionSystems.sprinklerSystems')}
				error={errors.fireLifeSafety?.fireProtectionSystems?.sprinklerSystems}
			/>
			<Checkbox
				label="Fire Alarms"
				{...register('fireLifeSafety.fireProtectionSystems.fireAlarms')}
				error={errors.fireLifeSafety?.fireProtectionSystems?.fireAlarms}
			/>
			<Checkbox
				label="Emergency Exits"
				{...register('fireLifeSafety.fireProtectionSystems.emergencyExits')}
				error={errors.fireLifeSafety?.fireProtectionSystems?.emergencyExits}
			/>
			<Checkbox
				label="Requires Emergency Evacuation Plan"
				{...register('fireLifeSafety.requiresEvacuationPlan')}
				error={errors.fireLifeSafety?.requiresEvacuationPlan}
			/>
		</div>
	);
};

// 11. Emergency Evacuation Plan Component (Conditional)
export const EmergencyEvacuationPlanComponent: BuildingFormComponent = ({
	register,
	errors,
	setValue,
}) => {
	return (
		<div>
			<h2>Emergency Evacuation Plan</h2>
			<FileInput
				label="Emergency Evacuation Plan Document"
				{...register('fireLifeSafety.emergencyEvacuationPlan')}
				setValue={setValue}
				error={errors.fireLifeSafety?.emergencyEvacuationPlan}
			/>
		</div>
	);
};

// 12. Floodplain Determination Component
export const FloodplainDeterminationComponent: BuildingFormComponent = ({
	register,
	errors,
}) => {
	return (
		<div>
			<h2>Floodplain Determination</h2>
			<Checkbox
				label="Is the project located in a designated flood zone?"
				{...register('floodplainAndStormwaterManagement.isInFloodZone')}
				error={errors.floodplainAndStormwaterManagement?.isInFloodZone}
			/>
		</div>
	);
};

// 13. Stormwater Management Plan Component
export const StormwaterManagementPlanComponent: BuildingFormComponent = ({
	register,
	errors,
	setValue,
}) => {
	return (
		<div>
			<h2>Stormwater Management Plan</h2>
			<TextInput
				label="Erosion Control Measures"
				{...register(
					'floodplainAndStormwaterManagement.stormwaterManagementPlan.erosionControlMeasures',
				)}
				error={
					errors.floodplainAndStormwaterManagement?.stormwaterManagementPlan
						?.erosionControlMeasures
				}
			/>
			<FileInput
				label="Runoff Calculations"
				{...register(
					'floodplainAndStormwaterManagement.stormwaterManagementPlan.runoffCalculations',
				)}
				setValue={setValue}
				error={
					errors.floodplainAndStormwaterManagement?.stormwaterManagementPlan
						?.runoffCalculations
				}
			/>
		</div>
	);
};

// 14. Historic Preservation Review Component (Conditional)
export const HistoricPreservationReviewComponent: BuildingFormComponent = ({
	register,
	errors,
	setValue,
}) => {
	return (
		<div>
			<h2>Historic Preservation Review</h2>
			<Checkbox
				label="Is the property a historic property?"
				{...register('historicPreservationReview.isHistoricProperty')}
				error={errors.historicPreservationReview?.isHistoricProperty}
			/>
			<FileInput
				label="Historic Preservation Plan"
				{...register('historicPreservationReview.historicPreservationPlan')}
				setValue={setValue}
				error={errors.historicPreservationReview?.historicPreservationPlan}
			/>
		</div>
	);
};

// 15. Traffic Impact Analysis Component (Conditional)
export const TrafficImpactAnalysisComponent: BuildingFormComponent = ({
	register,
	errors,
	setValue,
}) => {
	return (
		<div>
			<h2>Traffic Impact Analysis</h2>
			<Checkbox
				label="Anticipates Traffic Increase"
				{...register(
					'trafficImpactAnalysis.trafficFlowAssessment.anticipatesTrafficIncrease',
				)}
				error={
					errors.trafficImpactAnalysis?.trafficFlowAssessment
						?.anticipatesTrafficIncrease
				}
			/>
			<TextInput
				label="Mitigation Strategies"
				{...register(
					'trafficImpactAnalysis.trafficFlowAssessment.mitigationStrategies',
				)}
				error={
					errors.trafficImpactAnalysis?.trafficFlowAssessment
						?.mitigationStrategies
				}
			/>
			<FileInput
				label="Traffic Impact Study"
				{...register('trafficImpactAnalysis.trafficImpactStudy')}
				setValue={setValue}
				error={errors.trafficImpactAnalysis?.trafficImpactStudy}
			/>
		</div>
	);
};

// 16. Neighbor Notification and Public Hearings Component (Conditional)
export const NeighborNotificationComponent: BuildingFormComponent = ({
	register,
	errors,
}) => {
	return (
		<div>
			<h2>Neighbor Notification and Public Hearings</h2>
			<Checkbox
				label="Notified Adjacent Owners"
				{...register(
					'neighborNotificationAndPublicHearings.notificationRequirements.notifiedAdjacentOwners',
				)}
				error={
					errors.neighborNotificationAndPublicHearings?.notificationRequirements
						?.notifiedAdjacentOwners
				}
			/>
			<Checkbox
				label="Posted Public Notices"
				{...register(
					'neighborNotificationAndPublicHearings.notificationRequirements.postedPublicNotices',
				)}
				error={
					errors.neighborNotificationAndPublicHearings?.notificationRequirements
						?.postedPublicNotices
				}
			/>
			<TextInput
				label="Public Hearing Date"
				type="date"
				{...register(
					'neighborNotificationAndPublicHearings.publicHearingDetails.hearingDate',
				)}
				error={
					errors.neighborNotificationAndPublicHearings?.publicHearingDetails
						?.hearingDate
				}
			/>
			<TextInput
				label="Public Comments Received"
				{...register(
					'neighborNotificationAndPublicHearings.publicHearingDetails.publicCommentsReceived',
				)}
				error={
					errors.neighborNotificationAndPublicHearings?.publicHearingDetails
						?.publicCommentsReceived
				}
			/>
		</div>
	);
};

// 17. Contractor and Subcontractor Details Component
export const ContractorDetailsComponent: BuildingFormComponent = ({
	register,
	errors,
	setValue,
}) => {
	return (
		<div>
			<h2>Contractor and Subcontractor Details</h2>
			<TextInput
				label="General Contractor Name"
				{...register(
					'contractorAndSubcontractorDetails.generalContractor.name',
				)}
				error={
					errors.contractorAndSubcontractorDetails?.generalContractor?.name
				}
			/>
			<TextInput
				label="License Number"
				{...register(
					'contractorAndSubcontractorDetails.generalContractor.licenseNumber',
				)}
				error={
					errors.contractorAndSubcontractorDetails?.generalContractor
						?.licenseNumber
				}
			/>
			<TextInput
				label="Contact Address"
				{...register(
					'contractorAndSubcontractorDetails.generalContractor.contactInformation.address',
				)}
				error={
					errors.contractorAndSubcontractorDetails?.generalContractor
						?.contactInformation?.address
				}
			/>
			<TextInput
				label="Contact Phone"
				{...register(
					'contractorAndSubcontractorDetails.generalContractor.contactInformation.phoneNumber',
				)}
				error={
					errors.contractorAndSubcontractorDetails?.generalContractor
						?.contactInformation?.phoneNumber
				}
			/>
			<TextInput
				label="Contact Email"
				{...register(
					'contractorAndSubcontractorDetails.generalContractor.contactInformation.email',
				)}
				error={
					errors.contractorAndSubcontractorDetails?.generalContractor
						?.contactInformation?.email
				}
			/>
			<FileInput
				label="Liability Insurance Certificate"
				{...register(
					'contractorAndSubcontractorDetails.insuranceVerification.liabilityInsuranceCertificate',
				)}
				setValue={setValue}
				error={
					errors.contractorAndSubcontractorDetails?.insuranceVerification
						?.liabilityInsuranceCertificate
				}
			/>
			<FileInput
				label="Workers' Compensation Coverage Certificate"
				{...register(
					'contractorAndSubcontractorDetails.insuranceVerification.workersCompensationCoverageCertificate',
				)}
				setValue={setValue}
				error={
					errors.contractorAndSubcontractorDetails?.insuranceVerification
						?.workersCompensationCoverageCertificate
				}
			/>
		</div>
	);
};

// 18. Fee Calculation and Payment Component
export const FeeCalculationAndPaymentComponent: BuildingFormComponent = ({
	register,
	errors,
	watch,
}) => {
	const paymentMethod = watch('feeCalculationAndPayment.paymentMethod');
	return (
		<div>
			<h2>Fee Calculation and Payment</h2>
			<TextInput
				label="Permit Fee"
				type="number"
				{...register('feeCalculationAndPayment.permitFee')}
				error={errors.feeCalculationAndPayment?.permitFee}
			/>
			<TextInput
				label="Total Fee"
				type="number"
				{...register('feeCalculationAndPayment.totalFee')}
				error={errors.feeCalculationAndPayment?.totalFee}
			/>
			<RadioGroup name="paymentMethod" value={paymentMethod}>
				<Radio
					label="Online"
					value="Online"
					{...register('feeCalculationAndPayment.paymentMethod')}
				/>
				<Radio
					label="Check"
					value="Check"
					{...register('feeCalculationAndPayment.paymentMethod')}
				/>
				<Radio
					label="Money Order"
					value="Money Order"
					{...register('feeCalculationAndPayment.paymentMethod')}
				/>
			</RadioGroup>
			<TextInput
				label="Payment Reference Number"
				{...register('feeCalculationAndPayment.paymentReferenceNumber')}
				error={errors.feeCalculationAndPayment?.paymentReferenceNumber}
			/>
		</div>
	);
};

// 19. Final Review and Certification Component
export const FinalReviewAndCertificationComponent: BuildingFormComponent = ({
	register,
	errors,
}) => {
	return (
		<div>
			<h2>Final Review and Certification</h2>
			<Checkbox
				label="I certify that all information is accurate."
				{...register('finalReviewAndCertification.certificationStatement')}
				error={errors.finalReviewAndCertification?.certificationStatement}
			/>
			<TextInput
				label="Digital Signature"
				{...register('finalReviewAndCertification.digitalSignature')}
				error={errors.finalReviewAndCertification?.digitalSignature}
			/>
			<TextInput
				label="Application Reference Number"
				readOnly
				{...register(
					'finalReviewAndCertification.submissionConfirmation.applicationReferenceNumber',
				)}
				error={
					errors.finalReviewAndCertification?.submissionConfirmation
						?.applicationReferenceNumber
				}
			/>
			<TextInput
				label="Estimated Processing Time"
				readOnly
				{...register(
					'finalReviewAndCertification.submissionConfirmation.estimatedProcessingTime',
				)}
				error={
					errors.finalReviewAndCertification?.submissionConfirmation
						?.estimatedProcessingTime
				}
			/>
		</div>
	);
};
