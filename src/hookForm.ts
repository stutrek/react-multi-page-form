import type {
    DeepPartial,
    FieldErrors,
    FieldValues,
    Path,
    UseFormReturn,
} from 'react-hook-form';
import { useMultiPageFormBase } from './base';
import type {
    FormPage,
    FormSequence,
    MultiPageFormParams,
    SequenceChild,
} from './types';

/**
 * Represents a form page configured to work with React Hook Form.
 *
 * @template DataT - The type of the form data extending FieldValues.
 * @template ComponentProps - (optional) The props passed to the component.
 */
export type HookFormPage<
    DataT extends FieldValues,
    ComponentProps = DefaultHookFormPageProps<DataT>,
> = FormPage<DataT, ComponentProps, FieldErrors<DataT>>;

/**
 * Represents a form sequence configured to work with React Hook Form.
 *
 * @template DataT - The type of the form data extending FieldValues.
 * @template ComponentProps - (optional) The props passed to the components.
 */
export type HookFormSequence<
    DataT extends FieldValues,
    ComponentProps = DefaultHookFormPageProps<DataT>,
> = FormSequence<DataT, ComponentProps, FieldErrors<DataT>>;

/**
 * Represents a sequence child (either a page or a sequence) configured to work with React Hook Form.
 *
 * @template DataT - The type of the form data extending FieldValues.
 * @template ComponentProps - (optional) The props passed to the components.
 */
export type HookFormSequenceChild<
    DataT extends FieldValues,
    ComponentProps = DefaultHookFormPageProps<DataT>,
> = SequenceChild<DataT, ComponentProps, FieldErrors<DataT>>;

/**
 * Parameters for initializing and managing a multi-page form using React Hook Form.
 *
 * @template DataT - The type of the form data extending FieldValues.
 * @template ComponentProps - (optional) The props passed to the form components.
 */
export type MultiPageReactHookFormParams<
    DataT extends FieldValues,
    ComponentProps,
> = DefaultHookFormPageProps<DataT> &
    Omit<
        MultiPageFormParams<DataT, ComponentProps, FieldErrors<DataT>>,
        'getCurrentData'
    >;

/**
 * Default props for a form page using React Hook Form.
 *
 * @template DataT - The type of the form data extending FieldValues.
 */
export type DefaultHookFormPageProps<DataT extends FieldValues> = {
    hookForm: UseFormReturn<DataT>;
};

/**
 * Recursively retrieves all mounted field names from React Hook Form's internal fields.
 *
 * @template DataT - The type of the form data extending FieldValues.
 * @param {UseFormReturn<DataT>['control']['_fields']} fields - The internal fields from React Hook Form's control object.
 * @param {Path<DataT>[]} [mountedFields=[]] - An array to collect the mounted field paths.
 * @param {string} [prefix=''] - The prefix for nested field paths.
 * @returns {Path<DataT>[]} An array of mounted field paths.
 */
function getMountedFields<DataT extends FieldValues>(
    fields: UseFormReturn<DataT>['control']['_fields'],
    mountedFields: Path<DataT>[] = [],
    prefix = '',
): Path<DataT>[] {
    for (const field in fields) {
        if (fields[field]?._f) {
            if (fields[field]?._f.mount) {
                mountedFields.push(`${prefix}${field}` as Path<DataT>);
            }
        } else {
            getMountedFields(
                fields[
                    field
                ] as unknown as UseFormReturn<DataT>['control']['_fields'],
                mountedFields,
                `${prefix}${field}.`,
            );
        }
    }
    return mountedFields;
}

/**
 * A hook that integrates multi-page form logic with React Hook Form.
 *
 * This hook wraps the `useMultiPageFormBase` hook, providing integration with React Hook Form.
 * It handles form validation, triggers, and manages form state transitions between pages.
 *
 * @template DataT - The type of the form data extending FieldValues.
 * @template ComponentProps - (optional) The props passed to the form components.
 *
 * @param {MultiPageReactHookFormParams<DataT, ComponentProps>} params - The parameters for configuring the multi-page form.
 * @returns {ReturnType<typeof useMultiPageFormBase>} An object containing the current page, navigation functions, and navigation state.
 */
export const useMultiPageHookForm = <
    DataT extends FieldValues,
    ComponentProps = DefaultHookFormPageProps<DataT>,
>({
    hookForm,
    onBeforePageChange,
    ...rest
}: MultiPageReactHookFormParams<DataT, ComponentProps>) => {
    const { trigger, reset, control } = hookForm;

    const multiPageForm = useMultiPageFormBase({
        // @ts-ignore
        getCurrentData: () => hookForm.getValues(),
        onBeforePageChange: async (data, page) => {
            if (onBeforePageChange) {
                const result = await onBeforePageChange(data, page);
                if (result !== true && result) {
                    return result;
                }
            }
            const mountedFields = getMountedFields(
                hookForm.control._fields,
            ) as Path<DataT>[];
            const valid = await trigger(mountedFields);

            if (valid) {
                reset(undefined, { keepValues: true });
            } else {
                control._updateFormState({
                    isSubmitted: true,
                });
            }
            return valid;
        },
        ...rest,
    });

    return multiPageForm;
};
