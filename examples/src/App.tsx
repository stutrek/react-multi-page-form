import './App.css';
import {
	type FieldErrors,
	useForm,
	type UseFormRegister,
	type SubmitHandler,
} from 'react-hook-form';
import { Button, TextInput } from './FormLibrary';

import type { SequenceChild } from '../../src/types';
import { useMultiPageForm } from '../../src/index';
import { useCallbackRef } from '../../src/utils';
import { useState } from 'react';

type FormModel = {
	name: string;
	pet: string;
};

type PageProps = {
	errors: FieldErrors<FormModel>;
	register: UseFormRegister<FormModel>;
};

const FirstPage = (props: PageProps) => {
	const { errors, register } = props;
	return (
		<>
			<TextInput
				label="Name"
				{...register('name', {
					required: true,
					validate: (v) => {
						if (!v) {
							return 'Name is required';
						}
						if (v === 'Chungus') {
							return 'Name cannot be Chungus';
						}
					},
				})}
				error={errors.name}
			/>
		</>
	);
};

const SecondPage = (props: PageProps) => {
	const { errors, register } = props;
	return (
		<>
			<TextInput
				label="Pet"
				{...register('pet', {
					required: true,
					validate: (v, data) => {
						console.log(v, data);
						if (!v) {
							return 'Pet is required';
						}
						if (v === data.name) {
							console.log('hi');
							return 'Pet cannot be the same as a person';
						}
					},
				})}
				error={errors.pet}
			/>
		</>
	);
};

const sequence: SequenceChild<FormModel, string, FieldErrors<FormModel>>[] = [
	{
		id: 'first',
		isComplete: (data) => !!data.name?.length,
		validate: () => undefined,
		Component: FirstPage,
	},
	{
		id: 'second',
		isComplete: (data) => !!data.pet?.length,
		validate: () => undefined,
		Component: SecondPage,
	},
] as const;

function App() {
	const {
		register,
		handleSubmit,
		getValues,
		trigger,
		reset,
		clearErrors,
		formState: { errors },
	} = useForm<FormModel>({});

	// rest.getValues

	const { currentPage, advance, goBack, nextStep, previousStep } =
		useMultiPageForm({
			getCurrentData: () => getValues(),
			pages: sequence,
			onBeforePageChange: async () => {
				const valid = await trigger();
				if (valid) {
					clearErrors();
					reset(undefined, { keepValues: true, keepIsSubmitted: false });
				}
				return valid;
			},
			onPageChange: (data) => {
				console.log('saving', data);
			},
		});

	const onSubmit: SubmitHandler<FormModel> = (data) => {
		console.log('submit', data);
	};
	return (
		<>
			<h1>Multi Page Form Example</h1>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="card">
					<currentPage.Component errors={errors} register={register} />
				</div>
				<div className="card">
					{previousStep && <Button onClick={goBack}>Prev</Button>}
					{nextStep ? (
						<Button onClick={advance}>Next</Button>
					) : (
						<Button type="submit">Submit</Button>
					)}
				</div>
			</form>
		</>
	);
}

export default App;
