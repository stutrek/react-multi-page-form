import Input from '@mui/joy/Input';
import JoyCheckbox from '@mui/joy/Checkbox';
import JoyRadioGroup from '@mui/joy/RadioGroup';
import JoyRadio from '@mui/joy/Radio';
import JoyButton from '@mui/joy/Button';
import { type ChangeEvent, forwardRef, type PropsWithChildren } from 'react';
import type {
	FieldError,
	FieldErrorsImpl,
	Merge,
	UseFormSetValue,
} from 'react-hook-form';
import { FormControl, FormHelperText, FormLabel } from '@mui/joy';

export const Button = JoyButton;
export const RadioGroup = JoyRadioGroup;
export const Radio = JoyRadio;

type AdditionalProps = {
	error?: FieldError | undefined;
	label?: string;
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
type InputProps<T extends (props: any) => any> = Omit<
	Parameters<T>[0],
	'error' | 'name'
> &
	AdditionalProps & { name: string };

type FormFieldContainerProps = {
	labelAfter?: boolean;
} & AdditionalProps;

export const FormFieldContainer = ({
	children,
	label,
	error,
	labelAfter,
}: PropsWithChildren<FormFieldContainerProps>) => (
	<FormControl error={!!error}>
		{labelAfter ? null : <FormLabel>{label}</FormLabel>}
		{children}
		{labelAfter ? <FormLabel>{label}</FormLabel> : null}
		<FormHelperText>{error?.message ?? <span>&nbsp;</span>}</FormHelperText>
	</FormControl>
);

export const TextInput = forwardRef<HTMLInputElement, InputProps<typeof Input>>(
	(props, ref) => {
		const { error, label, ...rest } = props;
		return (
			<FormFieldContainer label={label} error={error}>
				<Input {...rest} ref={ref} />
			</FormFieldContainer>
		);
	},
);

export const Checkbox = forwardRef<
	HTMLInputElement,
	InputProps<typeof JoyCheckbox>
>((props, ref) => {
	const { error, ...rest } = props;
	return (
		<FormControl error={!!error}>
			<JoyCheckbox {...rest} ref={ref} />
			<FormHelperText>{error?.message ?? <span>&nbsp;</span>}</FormHelperText>
		</FormControl>
	);
});

export const FileInput = forwardRef<
	HTMLInputElement,
	InputProps<typeof JoyCheckbox> & {
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		setValue: UseFormSetValue<any>;
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		error?: any;
	}
>((props, ref) => {
	const { error, onChange, onBlur, setValue, name, ...rest } = props;
	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.checked) {
			setValue(name, {
				fileName: `${name}.pdf`,
				fileSize: 1000,
				fileType: 'application/pdf',
			});
		} else {
			setValue(name, undefined);
		}
	};
	return (
		<FormControl error={!!error}>
			<JoyCheckbox name={name} {...rest} onChange={handleChange} ref={ref} />
			<FormHelperText>{error?.message ?? <span>&nbsp;</span>}</FormHelperText>
		</FormControl>
	);
});
