import { Input } from '@mui/base/Input';
import type { InputProps as MuiInputProps } from '@mui/base/Input';
import { forwardRef } from 'react';
import type { FieldError } from 'react-hook-form';
import styles from './FormLibrary.module.css';

export { Button } from '@mui/base';

type AdditionalProps = {
	error?: FieldError | undefined;
	label?: string;
};

type InputProps = Omit<MuiInputProps<'input'>, 'error'> & AdditionalProps;

export const TextInput = forwardRef<HTMLInputElement, InputProps>(
	(props, ref) => {
		const { error, label, ...rest } = props;
		return (
			<label>
				{label}
				{/* @ts-expect-error */}
				<Input {...rest} ref={ref} />
				{error && (
					<span className={styles.error}>
						{error.message || 'This field is required'}
					</span>
				)}
			</label>
		);
	},
);
