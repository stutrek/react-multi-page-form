import type { DefaultValues, FieldValues } from 'react-hook-form';
import { FormPageTester } from './FormPageTester';
import type { HookFormPage } from '../../hookForm';

export function FormPageMultipleTester<
    DataT extends FieldValues,
    ComponentProps,
>({
    page,
    sampleData,
    additionalProps,
    validator,
}: {
    page: HookFormPage<DataT, ComponentProps>;
    sampleData: DefaultValues<DataT>;
    additionalProps?: Partial<ComponentProps>;
    validator?: any; // Replace 'any' with the appropriate type for the validator
}): JSX.Element {
    return (
        <div>
            <h2>{page.id}</h2>
            <div style={{ display: 'flex' }}>
                <div style={{ flex: 1, padding: '0 10px' }}>
                    {/* Instance with no data and no validation */}
                    <FormPageTester
                        page={page}
                        additionalProps={additionalProps}
                        validator={validator}
                    />
                </div>
                <div style={{ flex: 1, padding: '0 10px' }}>
                    {/* Instance with no data and validation */}
                    <FormPageTester
                        page={page}
                        additionalProps={additionalProps}
                        validator={validator}
                        shouldValidate={true}
                    />
                </div>
                <div style={{ flex: 1, padding: '0 10px' }}>
                    {/* Instance with sample data */}
                    <FormPageTester
                        page={page}
                        defaultValues={sampleData}
                        additionalProps={additionalProps}
                        validator={validator}
                    />
                </div>
            </div>
        </div>
    );
}
