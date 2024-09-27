import type { FieldErrors, FieldValues, UseFormReturn } from 'react-hook-form';
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
			const valid = await trigger();
			if (valid) {
				reset(undefined, { keepValues: true });
			}
			return valid;
		},
		...rest,
	});

	return multiPageForm;
};
