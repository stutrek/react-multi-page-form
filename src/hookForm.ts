import type {
    FieldErrors,
    FieldValues,
    Path,
    UseFormReturn,
} from 'react-hook-form';
import { useMultiPageFormBase } from './base';
import type { FormPage, FormSequence, MultiPageFormParams } from './types';

export type HookFormPage<
    DataT extends FieldValues,
    ComponentProps = { hookForm: UseFormReturn<DataT> },
> = FormPage<DataT, ComponentProps, FieldErrors>;

export type HookFormSequence<
    DataT extends FieldValues,
    ComponentProps = { hookForm: UseFormReturn<DataT> },
> = FormSequence<DataT, ComponentProps, FieldErrors>;

export type MultiPageReactHookFormParams<
    DataT extends FieldValues,
    ComponentProps,
    ErrorList,
> = { hookForm: UseFormReturn<DataT> } & Omit<
    MultiPageFormParams<DataT, ComponentProps, ErrorList>,
    'getCurrentData'
>;

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

export const useMultiPageHookForm = <
    DataT extends FieldValues,
    ComponentProps,
>({
    hookForm,
    onBeforePageChange,
    ...rest
}: MultiPageReactHookFormParams<DataT, ComponentProps, FieldErrors>) => {
    const { trigger, reset, control } = hookForm;

    const multiPageForm = useMultiPageFormBase({
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
