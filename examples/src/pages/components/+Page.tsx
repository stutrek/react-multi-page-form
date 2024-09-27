import { useForm } from 'react-hook-form';
import {
	Button,
	TextInput,
	Checkbox,
	RadioGroup,
	Radio,
	FileInput,
} from '../../FormLibrary';

const data = {
	text: 'hello',
	checkbox1: true,
	checkbox2: false,
	radio: 'fish',
	file: undefined,
};

const radioOptions = [
	{ value: 'dog', label: 'Dog' },
	{ value: 'cat', label: 'Cat' },
	{ value: 'fish', label: 'Fish' },
];

export function Page() {
	const {
		register,
		handleSubmit,
		setValue,
		getValues,
		trigger,
		reset,
		formState: { errors },
	} = useForm({
		defaultValues: data,
	});

	return (
		<div>
			<h1>Sample Components</h1>
			<form onSubmit={handleSubmit((data) => console.log(data))}>
				<TextInput
					label="Text"
					{...register('text', {
						required: 'Text is required',
						validate: (v) => {
							if (v === 'hello') {
								return 'Text cannot be "hello"';
							}
						},
					})}
					error={errors.text}
				/>
				<Checkbox
					label="Checkbox 1"
					{...register('checkbox1', { required: 'Checkbox 1 is required' })}
					error={errors.checkbox1}
				/>
				<Checkbox
					label="Checkbox 2"
					{...register('checkbox2', { required: 'Checkbox 2 is required' })}
					error={errors.checkbox2}
				/>
				<RadioGroup name="radio">
					<Radio label="Dog" value="dog" {...register('radio')} />
					<Radio label="Cat" value="cat" {...register('radio')} />
					<Radio label="Fish" value="fish" {...register('radio')} />
				</RadioGroup>

				<FileInput label="File" {...register('file')} setValue={setValue} />
				<hr />
				<Button type="submit">Submit</Button>
			</form>
		</div>
	);
}
