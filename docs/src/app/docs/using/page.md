# Using React Multi Page Form

## `isComplete` vs `validate`

Each page must have an `isComplete` predicate, and _may_ have a `validate` method. These are similar, but play different roles. The isComplete predicate determines if the user has provided enough information to proceed to the next page. It doesn’t perform thorough validation but checks for basic completeness. The `validate` method performs thorough validation of the page’s data, potentially including asynchronous operations like server-side checks, and returns a list of errors if validation fails.

- `isComplete` returns a boolean allowing the user to skip to the next page they haven't seen.
- `validate` thoroughly validates data, potentially calling the server for confirmation, and returns errors.

```typescript
// Example of isComplete
isComplete: (data) => !!data.email && !!data.password,

// Example of validate
validate: async (data) => {
  const errors: ErrorList = {};
  if (!validateEmailFormat(data.email)) {
    errors.email = 'Invalid email format';
  }
  const isEmailTaken = await checkEmailAvailability(data.email);
  if (isEmailTaken) {
    errors.email = 'Email is already taken';
  }
  return Object.keys(errors).length ? errors : undefined;
},
```

## Advancing Pages and Why `page.validate` is Usually Not Needed

When advancing to the next page, all inputs in the DOM are automatically validated. If you need to do more complex or async work, you may need to use a `validate` method.

If `validate` returns errors, they will be added to React Hook Form's state and the form state will be set to submitted state, allowing re-validation as the user enters data. When the page advances, state will be switched back to unsubmitted, switching the default mode to verify on submit.

If you need a solution for validating your schema, there are many high quality validation libraries, and [React Hook Form offers integrations](https://react-hook-form.com/get-started#SchemaValidation) with many of them, including [Zod](https://zod.dev/) and [Yup](https://github.com/jquense/yup).


## Saving Progress

React Multi Page Form does not come with any methods of persisting data, but it has hooks to allow you to save data.

The recommended way is to save data between page views using `onPageChange`. Using this callback and React Hook Form's state tracking, you can save data to multiple endpoints if needed.

```typescript
const saveData = (key, value) => {
  // Implement your data persistence logic here, e.g., API call or localStorage
};

const MyMultiPageForm = () => {
    // use react-hook-form's useForm
    const hookForm = useForm();
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