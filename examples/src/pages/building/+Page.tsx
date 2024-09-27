import { useForm, type SubmitHandler } from 'react-hook-form';
import { useMultiPageHookForm } from '../../../../src/hookForm';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '../../FormLibrary';
import { sample, type BuildingPermitApplication } from './data';
import { buildingPermitApplicationSequence } from './sequence';
import { StartingPage } from '../../../../src/types';
import { BuildingPermitApplicationSchema } from './validator';

export function Page() {
	const formApi = useForm<BuildingPermitApplication>({
		defaultValues: sample,
		resolver: zodResolver(BuildingPermitApplicationSchema),
	});
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		getValues,
		watch,
	} = formApi;

	// rest.getValues
	console.log(formApi);

	const { currentPage, advance, goBack, nextStep, previousStep } =
		useMultiPageHookForm({
			formApi,
			pages: buildingPermitApplicationSequence.pages,
			startingPage: StartingPage.FirstPage,
			onPageChange(data, newPage) {
				console.log('onPageChange', data, newPage);
			},
		});

	const onSubmit: SubmitHandler<BuildingPermitApplication> = (data) => {
		console.log('submit', data);
	};

	console.log(errors);
	return (
		<>
			<h1>Multi Page Form Example</h1>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="card">
					<currentPage.Component
						errors={errors}
						register={register}
						setValue={setValue}
						getValues={getValues}
						watch={watch}
					/>
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
