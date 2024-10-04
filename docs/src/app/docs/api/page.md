# API

The API consists of a few items:

- pages
- sequences
- `useMultiPageForm` and `useMultiPageHookForm` React hooks

## Pages

A page represents a single page of a form.

### Type
```typescript
type HookFormPage<DataT, ComponentProps = { hookForm: UseFormReturn }> = {
    // these three are required
	id: string; // Unique identifier for the form page.
    Component: (props: ComponentProps) => JSX.Element; // React component to render the form page.
    isComplete: (data: Partial<DataT>) => boolean; // Checks if the user has already filled out this page.

	// these manage the sequence
	isFinal?: (data: Partial<DataT>) => boolean; // return true if this should be the final page of the form.
    isRequired?: (data: Partial<DataT>) => boolean | undefined; // Determines if this page is needed based on form data. Default: () => true
    validate?: (data: Partial<DataT>) => Promise<FieldErrors | undefined>; // Determines whether or not to continue.
    
	// event handlers
	onArrive?: (data: Partial<DataT>) => void; // Function to execute upon arriving at this page.
    onExit?: (data: Partial<DataT>) => Promise<void> | void; // Function to execute when exiting the page.
};
```

### Example

```typescript
type MyComponentProps = {
	register: UseFormRegister<MyData>;
}

const myPage: HookFormPage<MyData> = {
	id: 'my-page',
	isComplete: (data) => !!data.myField,
	Component: ({register}) => {
		return <div>
			Name:
			<input type="text" {...register('name')} />
		</div>;
	}
}
```

## Sequence

A sequence contains pages or more sequences that represent a single workflow. They can be nested infinitely.

### Type

```ts
export type FormSequence<DataT, ComponentProps, ErrorList> = {
    id: string; // Unique identifier for the form sequence.
    pages: HookFormSequenceChild[]; // A SequenceChild is either a FormPage or a FormSequence.
    isRequired?: (data: Partial<DataT>) => boolean | undefined; // Determines if the sequence is needed based on form data.
};
```

### Example

```ts
const mySequence: FormSequence<MyData, MyComponentProps, FieldError> = {
	id: 'my-sequence',
	isRequired: (data) => !!data.fieldToCheck,
	pages: [myPage, myPage2, myOtherSequence],
}
```

## `useMultiPageForm` and `useMultiPageHookForm` React hooks

Both hooks return the same controller object, and take almost the exact same parameters, but `useMultiPageHookForm` is preconfigured to work well with React Hook Form. If you need to integrate with a different library, `useMultiPageForm` will work well.

### Type

```ts
export type MultiPageHookFormParams<DataT> = {
    pages: HookFormSequenceChild[]; // Array of form pages or nested sequences.
    startingPage?: string | StartingPage; // Specifies the starting page, default is StartingPage.FirstIncomplete
    onBeforePageChange?: (
        data: DataT,
        page: HookFormPage<DataT>,
    ) => Promise<FieldErrors | boolean>; // Callback before changing pages, returns error list or boolean to proceed.
    onPageChange?: (
        data: DataT,
        newPage: HookFormPage<DataT>,
    ) => void; // Callback when navigating to a new page.
    onComplete?: (data: DataT) => void; // Callback when the form is completed.
    onValidationError?: (errorList: FieldErrors) => void; // Callback when validation errors occur.
};
```

### Example

```ts
import { useForm, UseFormRegister } from 'react-hook-form';
import { useMultiPageHookForm, StartingPage } from 'react-multi-page-form/hookForm';

// this is the data model for the flow
type MyDataType = {
	name: string,
	location: string,
}

// these are the props for each component in the flow.
// The default is { hookForm: UseFormReturn }
type MyComponentProps = {
    theme: string,
    hookForm: UseFormReturn
}

export function MyMultiPageForm() {
    // use react-hook-form's useForm
	const hookForm = useForm<MyDataType>();
    // create multi-page controls
	const {
        currentPage, // the current page object
        advance, // goes to the next page
        goBack, // goes back one page
        goTo, // goes to a page by id
        nextStep, // the page object for the next step
        previousStep // the page object for the previous step
	} = useMultiPageHookForm<MyDataType, MyComponentProps>({
		hookForm,
		pages: [myPage, mySequence],
	});

    return (<>
        <currentPage.Component
            theme="dark"
            hookForm={hookForm}
        />
    
        {previousStep && <button onClick={goBack}>Prev</button>}
        {nextStep ? (
            <button onClick={advance}>Next</button>
        ) : (
            <button type="submit">Submit</button>
        )}
    </>);
}
```