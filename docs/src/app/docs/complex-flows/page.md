# Large and Complex Flows

Let's say you are building an onboarding flow for an app that allows users to search doctors and schedule appointments. There are a lot of details in this flow, including insurances, video, existing software, and more. Bueracracy has made this hard on everyone. There are parts of this form that require specialized knowledge of iinsurances and bueracracy, health care specialties, and even software integration. It's likely different people will need to review different parts of this workflow.

Here's the flow that you received from product, you can click on it to see more detail, but the relevant sections will be highlighted.

[![complex flow](/big-form/full.png "if you're thinking \"oh my, if you have this you should build a system to handle it\", That's why we're here.")](/big-form/full.png)

We will look at a few of the more interesting parts of this workflow, starting with the simplest and moving to the more complex.

This document assumes that you're familiar with the concept of pages and sequences, and the basics of how React Multi Page Form works. If you're still curious about that, [see the API docs](/docs/api). It also assumes that all the UI components and form validation are done.

## A sequence with varying pages

When choosing the locations doctors practice, entering data for video visits is only required if the doctor accepts video visits. Additionally, this may affect the sequences later on.

![locations](/big-form/locations.png "")

This is easy to express as a single sequence where one page has an `isRequired` predicate. Note that the sequence does not need to know about the `isRequired` predicates of its children.

```typescript
const licensedStates = {
	id: 'licensed-states',
	isComplete: (data) => !!data.locations.licensedStates,
	Component: LicensedStateForm
}

const locations = {
	id: 'locations',
	isComplete: (data) => !!data.locations.locations,
	Component: LocationsForm
}

// video is a checkbox on this page
const doctorsAtLocations = {
	id: 'docs-at-locations',
	isComplete: (data) => !!data.locations.doctors,
	Component: DoctorsAtLocationsForm
}

// this page has an `isRequired` predicate.
const videoVisit = {
	id: 'video-visit',
	isComplete: (data) => !!data.locations.video,
	isRequired: (data) => data.locations?.doctors?.some(doc => doc.acceptsVideoVisits),
	Component: VideoVisitInfoForm
}

// The actual sequence
const locationsSequence = {
	id: 'locations-sequence',
	pages: [
		licensedStates,
		locations,
		doctorsAtLocations,
		videoVisit
	]
}
```


## A sequence within a sequence

In the section of the flow chart dealing with the doctor's specialties, there's an additional section that must be filled out for qualifications regarding mental health, but only if a mental health specialty is selected.

![mental health](/big-form/mental-health.png "")

React Multi Page Form makes it easy to keep the code for the mental health workflow separate from the rest of the form. This may be a section that has complex business concerns that certain people have expertise in, it would be good if they could see and test this section in isolation.


This flow fits cleaning into two different sequences. The specialties sequence has a page for specialties, then includes the sequence for mental health, with an `isRequired`.

```typescript

// The pages in this sequence do not have an `isRequired` predicate.
// That will be on the sequence.
const mentalHealthSequence = {
	id: 'mental-health',
	pages: [
		mentalHealthTrainingPage,
		mentalHealthCertificationPage
	],
	isRequired: (data) => hasMentalHealthSpecialty(data.specialties)
}

// the full sequence
const specialtiesSequence = {
	id: 'specialties',
	pages: [
		specialtiesPage, // a regular page
		mentalHealthSequence // followed by our sequence
	]
}
```

## Multiple parallel sequences

After locations are chosen, there may be workflows depending on which state(s) they are practicing in. They may have chosen one state, they may have chosen many states, or they may not have chosen any relevant states. The workflow for Wyoming even has a branch for video visits!

The laws relevant to each state can be very esoteric. 

![states](/big-form/states.png "")

This is best modeled as a sequence of sequences. Each state sequence is responsible for checking whether or not it should be shown.

```typescript

// Wyoming is the most interesting one
const wyomingSequence = {
	id: 'wyoming',
	pages: [{
		id: 'wy-license',
		isComplete: (data) => !!data.states.wyoming.license,
		Component: WyLicenseForm
	}, {
		id: 'wy-background-check',
		isComplete: (data) => !!data.states.wyoming.background,
		Component: WyBackgroundForm
	}, {
		id: 'wy-video-visit',
		isComplete: (data) => !!data.states.wyoming.videoVisit,
		isRequired: (data) => !!data.locations.video, // isRequired predicate
		Component: WyVideoVisitForm
	},{
		id: 'wy-final-approval',
		isComplete: (data) => !!data.states.wyoming.approval,
		Component: WyFinalApproval
	}],
	// this sequence is needed if there's a location in WY
	// or a doc is licensed in WY and accepts video visits.
	isRequired: (data) => 
		data.locations.locations.some((loc) => loc.state === 'WY')
		|| (data.locations.licensedStates.includes('WY') && data.locations.acceptsVideoVisits)
}

// the other states would have very similar setups
const californiaSequence = {
	id: 'california',
	pages: [
		...
	],
	isRequired: (data) => 
		data.locations.locations.some((loc) => loc.state === 'CA')
		|| (data.locations.licensedStates.includes('CA') && data.locations.acceptsVideoVisits)
}

// the main sequence
export const stateSpecificSequence = {
	id: 'state-specific',
	pages: [
		californiaSequence,
		wyomingSequence,
		georgiaSequence,
		maineSequence
	]
}
```

## Assembling the entire workflow

When all of your sequences are made, they can be assembled into a single array to be passed into React Multi Page Form.

```typescript
// this is just an array, it doesn't need to be a sequence
export const fullWorkflow = [
	personalInfoForm,
	specialtiesSequence,
	locationsSequence,
	stateSpecificSequence,
	insuranceSequence,
	softwareSequence,
	verificationPage
]
```