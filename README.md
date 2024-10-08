![React Multi Page Form](https://stutrek.github.io/react-multi-page-form/Logo.svg "")

This is a tool for managing the sequence and flow of multi-page workflows. Given a long series of screens, it can put them in the proper order makes it easy to show and hide screens based on previous input.

Workflows can be composed, allowing you to reuse parts of a flow.

This should be used in combination with a component library and validation schema to improve your form management.

An integration with React Hook Form is provided, but the base could be used with any library.

[View the docs](https://stutrek.github.io/react-multi-page-form/)

## Basic Usage

- Create an array of pages and/or sequences. One for each page of the form.
- Set up `react-hook-form` 
- Pass the pages and the hook for API into `useMultiPageHookForm` to get the multi-page state and controls.

```typescript
import { useForm } from 'react-hook-form';
import { useMultiPageHookForm } from 'react-multi-page-forms';

// create a list of pages for the form
const pages = [
    {
        id: 'first',
        Component: FirstPage,
    },
    {
        id: 'second',
        Component: SecondPage,
    },
]
const MyMultiPageForm = () => {
    // use react-hook-form's useForm
    const hookForm = useForm<FormModel>();
    
    // create multi-page controls
    const { 
        currentPage, // the page object
        advance, // goes to the next page
        goBack, // goes back one page
        isFinal, // if this is the last page
        isFirst, // if this is the first page
    } = useMultiPageHookForm({
        hookForm,
        pages,
    });
    
    // render the component and controls
    return (<>
        <currentPage.Component
            errors={errors}
            register={register}
        />
    
        {!isFirst && <button onClick={goBack}>Prev</button>}
        {!isFinal ? (
            <button onClick={advance}>Next</button>
        ) : (
            <button type="submit">Submit</button>
        )}
    </>);
};
```
[View the docs](https://stutrek.github.io/react-multi-page-form/)


### Pages and Sequences

A **page** represents a single screen that will be shown to the user as part of this multi-step form. It can have as many fields or as few as you'd like. It can even have logic to show and hide fields built in.

A **sequence** is an array of pages and sequences that represent a specific flow. For example, they may be a series of screens specific to a certain country.

```typescript
type FormPage<DataT, ComponentProps, ErrorList> = {
    id: string;
    // determines whether or not this page is needed
    isRequired?: (data: DeepPartial<DataT>) => boolean | undefined
    // determines if the page is already complete
    isComplete: (data: DeepPartial<DataT>) => boolean;
    // determines if this should be a final step in the flow
    isFinal?: (data: DeepPartial<DataT>) => boolean;
    // if you need to break the flow of the sequence, this makes that possible
    alternateNextPage?: (data: DeepPartial<DataT>) => Boolean
    // Mounted inputs are automatically validated.
    // If you need specific validation logic, put it here.
    validate?: (data: DeepPartial<DataT>) => ErrorList | undefined;
    // callback on arrival
    onArrive?: (data: DeepPartial<DataT>) => void;
    // callback on departure
    onExit?: (data: DeepPartial<DataT>) => Promise<void> | void;
    // the component that will be rendered
    Component: (props: ComponentProps) => JSX.Element;
};

export type FormSequence<DataT, ComponentProps, ErrorList> = {
    id: string;
    // an array of pages or sequences that make up this sequence
    pages: SequenceChild<DataT, ComponentProps, ErrorList>[];
    // determines if this sequence is needed
    isRequired?: isRequiredPredicate<DataT>;
};
```

[View the docs](https://stutrek.github.io/react-multi-page-form/)


## A More Complete Example

```typescript
import { useMultiPageHookForm } from 'react-multi-page-forms'

const pages = [
    {
        id: 'first',
        isComplete: (data) => !!data.name?.length,
        Component: FirstPage,
    },
    {
        id: 'second',
        isComplete: (data) => !!data.pet?.length,
        Component: SecondPage,
    },
]

export function MyMultiPageForm() {
    // set up React Hook Form
    const hookForm = useForm<FormModel>({});
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = hookForm;
    
    // set up the multi-page controls
    const { 
        currentPage,
        advance,
        goBack,
        isFinal,
        isFirst
    } = useMultiPageHookForm({
        hookForm,
        pages: sequence,
    });
    
    const onSubmit: SubmitHandler<FormModel> = (data) => {
        console.log('submit', data);
    };
    
    return (
        <>
            <h1>Multi Page Form Example</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="card">
                    {/* render the current page */}
                    <currentPage.Component
                        errors={errors}
                        register={register}
                    />
                </div>
                <div className="card">
                    {!isFirst && <button onClick={goBack}>Prev</button>}
                    {!isFinal ? (
                        <button onClick={advance}>Next</button>
                    ) : (
                        <button type="submit">Submit</button>
                    )}
                </div>
            </form>
        </>
    );
}
```
[View the docs](https://stutrek.github.io/react-multi-page-form/)


