# API

The API consists of a few items:

- pages
- sequences
- `useMultiPageForm` and `useMultiPageHookForm` React hooks

## Pages

A page represents a single page of a form.

### Type
```typescript
type FormPage<DataT, ComponentProps, ErrorList> = {
    // these three are required
	id: string; // Unique identifier for the form page.
    Component: (props: ComponentProps) => JSX.Element; // React component to render the form page.
    isComplete: (data: Partial<DataT>) => boolean; // Checks if the user has already filled out this page.

	// these manage the sequence
	isFinal?: (data: Partial<DataT>) => boolean; // allows you to mark pages as end pages.
    isNeeded?: (data: Partial<DataT>) => boolean | undefined; // Determines if this page is needed based on form data.
    validate?: (data: Partial<DataT>) => ErrorList | undefined; // Determines whether or not to continue.
    
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

const myPage: FormPage<MyData, MyComponentProps, FieldError> = {
	id: 'my-page,
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
    pages: SequenceChild[]; // Array of form pages or nested sequences.
    isNeeded?: (data: Partial<DataT>) => boolean | undefined; // Determines if the sequence is needed based on form data.
};
```

### Example

```ts
const mySequence: FormSequence<MyData, MyComponentProps, FieldError> = {
	id: 'my-sequence',
	isNeeded: (data) => !!data.fieldToCheck,
	pages: [myPage, myPage2, myOtherSequence],
}
```

## `useMultiPageForm` and `useMultiPageHookForm` React hooks

Both hooks return the same controller object, and take almost the exact same parameters, but `useMultiPageHookForm` is preconfigured to work well with React Hook Form. If you need to integrate with a different library, `useMultiPageForm` will work well.

### Type

```ts
export type MultiPageFormParams<DataT, ComponentProps, ErrorList> = {
    pages: SequenceChild[]; // Array of form pages or nested sequences.
    startingPage?: string | StartingPage; // Specifies the starting page, default is StartingPage.FirstIncomplete
    onBeforePageChange?: (
        data: DataT,
        page: FormPage<DataT, ComponentProps, ErrorList>,
    ) => Promise<ErrorList | boolean>; // Callback before changing pages, returns error list or boolean to proceed.
    onPageChange?: (
        data: DataT,
        newPage: FormPage<DataT, ComponentProps, ErrorList>,
    ) => void; // Callback when navigating to a new page.
    onComplete?: (data: DataT) => void; // Callback when the form is completed.
    onValidationError?: (errorList: ErrorList) => void; // Callback when validation errors occur.

	// not needed for `useMultiPageHookForm`
	getCurrentData: () => DataT; // Retrieves the current form data.
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

// these are the props that each component in the flow must take
type MyComponentProps = {
	register: UseFormRegister<MyDataType>
}

export function MyMultiPageForm() {
    // use react-hook-form's useForm
	const hookForm = useForm<MyDataType>();

	// create multi-page controls
	const {
        currentPage, // the current page object
        advance, // goes to the next page
        goBack, // goes back one page
        nextStep, // the page object for the next step
        previousStep // the page object for the previous step
	} = useMultiPageHookForm<MyDataType, MyComponentProps>({
		hookForm,
		pages: [myPage, mySequence],
	});

    return (<>
        <currentPage.Component
            errors={errors}
            register={register}
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