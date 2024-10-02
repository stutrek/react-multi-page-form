# Getting Started

This guide will help you get started using React Multi Page Form in combination with React Hook Form. When the process must be changed for other libraries, it will be noted.

It is assumed that you already have a flow to implement, a form library, types for your data, and a method of saving data.

The basic steps are:

1. Install dependencies using your favorite package manager
2. Create your data types and prop types
2. Create your pages and sequences
3. Create the multi page controller
4. Save data

## Install dependencies

```sh
npm install react-multi-page-form react-hook-form
yarn add react-multi-page-form react-hook-form
```

## Create your data and prop types

To allow consistent typing throughout the library, you need a single type for your data and a single type for your component props.

### Data Type

This is the shape the data takes for the entirety of the form. Not all of it will be on the screen at the same time, and you'll have a chance to save data when changing pages.

```typescript
type MyDataT = {
    name: string;
    location: string
}
```

### Component prop types

With React Multi Page Form, every component should take the same props. It's ok for components to only use a subset of the props, but to make typing easy and efficient, it's best if all pages are passed the same props. You may work around this with unions, but it is not recommended.

By default, you will get a single prop: `hookForm`, which comes from React Hook Form's `UseFormReturn<DataT>`. Note that you do not need to, and should not, include the form data in the props, as it will cause the page to re-render frequently.

```typescript
type MyComponentProps = {
    hookForm: UseFormReturn<MyDataType>;
    myOtherProp: 'string';
}

// an example component for the a page.
const MyComponent = (props: MyComponentProps) => {
    const {
        register,
        formState
    } = props.hookForm
    return <div>
        <input type="text" {...register('name', {required: true})}>
        {formState.errors.name && <span className="error">{formState.errors.name.message}</span>}
    </div>
}
```

## Create your pages and sequences

- a **page** represents a single page of the form. The user should only see one page at a time.
- a **sequence** is a list of pages and other sequences.

When designing complex workflows, there may be paths where certain pages or sequences are skipped. Often this is represented in a flow chart. It is recommended that each branch of a flow chart that has more than one page gets represented as a sequence. See [the docs for complex flows](/docs/complex-flows) for help transforming your flow into sequences.

### Making a page

```typescript
import { HookFormPage } from 'react-multi-page-forms';
import { MyFormComponent } from './components/pageOne';

// the page object
const locationPage: HookFormPage<MyDataType, MyComponentProps> = {
    id: 'location-page',
    isComplete: (data) => !!data.location,
    isRequired: (data) => !!data.personLivesOnEarth,
    Component: MyFormComponent
}
```

### Making a sequence

Sequences allow you to bundle multiple pages together. For example, if a user lives on Earth, you might want to ask them about their location, favorite food, and pets.

Here's how you create a sequence for those pages:

```typescript
import { HookFormSequence } from 'react-multi-page-forms';
import { locationPage, foodPage, petPage } from './pages/earth';

const earthSequence: HookFormSequence<MyDataType, MyComponentProps> = {
    id: 'earth-sequece',
    isRequired: (data) => !!data.personLivesOnEarth,
    pages: [
        locationPage,
        foodPage,
        petPage
    ]
}
```

## Creating the controller

```typescript
import { useForm } from 'react-hook-form';
import { useMultiPageHookForm } from 'react-multi-page-forms';
import { earthSequence } from './earthSequence';

const MyMultiPageForm = () => {
    // use react-hook-form's useForm
    const hookForm = useForm<MyDataT>();
    
    // create multi-page controls
    const { 
        currentPage, // the page object
        advance, // goes to the next page
        goBack, // goes back one page
        nextStep, // the page object for the next step
        previousStep // the page object for the previous step
    } = useMultiPageHookForm({
        hookForm,
        pages: [mySequence, otherPage],
    });
    
    // render the component and controls
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
};
```

## Saving Data

React Multi Page Form does not come with any methods of persisting data, but it has hooks to allow you to save data.

The recommended way is to save data between page views using `onPageChange`. Using this callback and React Hook Form's state tracking, you can save data to multiple endpoints if needed.

```typescript
const MyMultiPageForm = () => {
    // use react-hook-form's useForm
    const hookForm = useForm<DataT>();
    const {
        formState
    } = hookForm;
    
    const { 
        // ...
    } = useMultiPageHookForm({
        hookForm,
        pages: [mySequence, otherPage],
        onPageChange: (data) => {
            // saving only dirty fields. Play around here:
            // https://codesandbox.io/p/sandbox/react-hook-form-submit-only-dirty-fields-forked-sddgq2
            if (formState.isDirty) {
                for (const key in formState.dirtyFields) {
                    saveData(key, data[key]);
                }
            }
        },
        onComplete: (data) => {
            // possibly the same as above.
        }
    });
    // ...
};
```