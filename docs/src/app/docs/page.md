# Getting Started

This guide will help you get started using React Multi Page Form in combination with React Hook Form and TypeScript. For other form libraries, such as Formik or React Final Form, you will need to implement page level validation in an `onBeforePageChange` listener and a `getCurrentData` method. If you're not using typescript, you can skip the schema and component prop types.

This guide assumes that you already have a flow to implement, a form library, types for your data, and a method of saving data.

The basic steps are:

1. Install dependencies using your favorite package manager
2. Create your data types and prop types
3. Create your pages and sequences
4. Create the multi page controller
5. Save data

## Install dependencies

```sh
npm install react-multi-page-form react-hook-form
yarn add react-multi-page-form react-hook-form
```

## Create your data and prop types

To allow consistent typing throughout the library, you need a single type for your data and a single type for your component props.

### Schema

This is the shape the data takes for the entirety of the form. Not all of it will be on the screen at the same time, and you'll have a chance to save data when changing pages. This data will be Partial'd, since it won't all be available until the user is done providing it.

```typescript
type MySchema = {
    name: string;
    location: string;
    ...
}
```

### Component prop types

If you need to provide configuration that is not part of the form data, such as A/B testing or themeing, you can provide this as props to each element. By default, each component will receive a single prop: `hookForm`, which is the return value of React Hook Form's `useForm`, the type is `UseFormReturn<MySchema>`.

```typescript
type MyComponentProps = {
    hookForm: UseFormReturn<MyDataType>;
    myOtherProp: string;
}

// an example component for the page.
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

Note that you do not need to, and should not, include the form data in the props, as it will cause the page to re-render frequently.

## Create your pages and sequences

- a **page** represents a single page of the form. The user should only see one page at a time.
- a **sequence** is a list of pages and other sequences.

When designing complex workflows, there may be paths where certain pages or sequences are skipped. Often this is represented in a flow chart. It is recommended that each branch of a flow chart that has more than one page gets represented as a sequence. See [the docs for complex flows](/docs/complex-flows) for help transforming your flow into sequences.

### Making a page

```typescript
import { HookFormPage } from 'react-multi-page-forms';
import { LocationComponent } from './components/locationComponent';

// the page object
const locationPage: HookFormPage<MyDataType, MyComponentProps> = {
    id: 'location-page',
    // this is used to determine if we need to show this page to the user at all.
    // if it's not provided, it's assumend that the page is required.
    isRequired: (data) => !!data.isEarthResident,
    // this method is used to determine if we need to show the user this page again after resuming.
    isComplete: (data) => !!data.location,
    Component: LocationPageComponent
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
import type { FormSchema, ComponentProps } from './types';
import { earthSequence } from './earthSequence';

const MyMultiPageForm = () => {
    // use react-hook-form's useForm
    const hookForm = useForm<FormSchema>();
    
    // create multi-page controls
    const { 
        currentPage, // the page object
        advance, // goes to the next page
        goBack, // goes back one page
        isFinal, // if this is the last page
    } = useMultiPageHookForm<FormSchema>({
        hookForm,
        pages: [mySequence, otherPage],
    });
    
    // render the component and controls
    return (<>
        <currentPage.Component
            hookForm={hookForm}
        />
    
        {previousStep && <button onClick={goBack}>Prev</button>}
        {!isFinal ? (
            <button onClick={advance}>Next</button>
        ) : (
            <button type="submit">Submit</button>
        )}
    </>);
};
```

