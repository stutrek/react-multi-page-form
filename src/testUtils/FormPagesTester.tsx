import React from 'react';
import type { DecisionNode, DeepPartial, FormPage } from '../types'; // Adjust the import path as needed
import { FormPageMultipleTester } from './components/FormPageMultipleTester'; // Adjust the import path as needed
import type { DefaultValues, FieldValues } from 'react-hook-form';
import { isDecisionNode } from '../utils';

/**
 * A React component that renders multiple `FormPageMultipleTester` components for testing multiple `FormPage`s.
 *
 * It takes an array of `FormPage`s and renders a `FormPageMultipleTester` for each one,
 * placing a divider between each page.
 *
 * @template DataT - The type of the form data.
 * @template ComponentProps - The props passed to the `FormPage` components.
 *
 * @param {object} props - The component props.
 * @param {HookFormPage<DataT, ComponentProps>[]} props.pages - An array of `FormPage` objects to be tested.
 * @param {DeepPartial<DataT>} props.sampleData - Sample data to use for testing.
 * @param {DeepPartial<ComponentProps>} [props.additionalProps] - Optional additional props to pass to the components.
 * @param {Resolver<DataT>} [props.validator] - Optional React Hook Form resolver for validation.
 *
 * @returns {JSX.Element} The rendered component.
 */
export function FormPagesTester<DataT extends FieldValues, ComponentProps>({
    pages,
    sampleData,
    additionalProps,
    validator,
}: {
    pages: (FormPage<DataT, ComponentProps, any> | DecisionNode<DataT>)[];
    sampleData: DefaultValues<DataT>;
    additionalProps?: DeepPartial<ComponentProps>;
    validator?: any; // Replace 'any' with the appropriate type for the validator
}): JSX.Element {
    return (
        <div>
            {pages.map((page, index) =>
                isDecisionNode(page) ? (
                    <div key={page.id}>Decision Node: {page.id}</div>
                ) : (
                    <React.Fragment key={page.id}>
                        <FormPageMultipleTester<DataT, ComponentProps>
                            page={page}
                            sampleData={sampleData}
                            additionalProps={additionalProps}
                            validator={validator}
                        />
                        {index < pages.length - 1 && <hr />}
                    </React.Fragment>
                ),
            )}
        </div>
    );
}
