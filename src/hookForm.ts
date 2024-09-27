import type {
    FieldErrors,
    FieldValues,
    Path,
    UseFormReturn,
} from 'react-hook-form';
import { useMultiPageForm } from '.';
import type { MultiPageFormParams } from './types';

type MultiPageReactHookFormParams<
    DataT extends FieldValues,
    ComponentProps,
    ErrorList,
> = { formApi: UseFormReturn<DataT> } & Omit<
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
    formApi,
    onBeforePageChange,
    ...rest
}: MultiPageReactHookFormParams<DataT, ComponentProps, FieldErrors>) => {
    const { trigger, reset } = formApi;

    const multiPageForm = useMultiPageForm({
        getCurrentData: () => formApi.getValues(),
        onBeforePageChange: async (data, page) => {
            if (onBeforePageChange) {
                const result = await onBeforePageChange(data, page);
                if (result !== true && result) {
                    return result;
                }
            }
            const mountedFields = getMountedFields(
                formApi.control._fields,
            ) as Path<DataT>[];
            const valid = await trigger(mountedFields);

            if (valid) {
                reset(undefined, { keepValues: true });
            }
            return valid;
        },
        ...rest,
    });

    return multiPageForm;
};
