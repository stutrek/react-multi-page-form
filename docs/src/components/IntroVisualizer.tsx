'use client';

import { useForm } from 'react-hook-form';
import type { FormPage } from '../../../src/types';
import { type PropsWithChildren, useMemo } from 'react';
import { Checkbox } from './FormLibrary';

type DataModel = {
    needsConfirmation: boolean;
    needsAdditionalForm: boolean;
    state: string;
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const IntroPages: FormPage<DataModel, any, any>[] = [
    {
        id: 'First Page',
        isComplete: () => false,
        Component: () => <div>Start</div>,
    },
    {
        id: 'Additional Form',
        isComplete: () => false,
        isRequired: (data) => data.needsAdditionalForm,
        Component: () => <div>Add'l Form</div>,
    },
    {
        id: 'State Information',
        isComplete: () => false,
        Component: () => <div>Location Info</div>,
    },
    {
        id: 'California Exceptions',
        isComplete: () => false,
        isRequired: (data) => data.state === 'California',
        Component: () => <div>CA</div>,
    },
    {
        id: 'New York Additional Data',
        isComplete: () => false,
        isRequired: (data) => data.state === 'New York',
        Component: () => <div>NY</div>,
    },
    {
        id: 'Tennesse Music Data',
        isComplete: () => false,
        isRequired: (data) => data.state === 'Tennesse',
        Component: () => <div>TN</div>,
    },
    {
        id: 'Texas Lone Star Data',
        isComplete: () => false,
        isRequired: (data) => data.state === 'Texas',
        Component: () => <div>TX</div>,
    },
    {
        id: 'Confirmation',
        isComplete: () => false,
        isRequired: (data) => data.needsConfirmation,
        Component: () => <div>Confirm</div>,
    },
];

function Page({
    children,
    location,
    className,
}: PropsWithChildren<{
    location: { x: number; y: number };
    className: string;
}>) {
    return (
        <div
            className={`${className} w-20 h-24 p-2 transition-all ease-in-out duration-500 flex justify-around items-center text-center shadow-md rounded-lg border bg-white`}
            style={{ position: 'absolute', left: location.x, top: location.y }}
        >
            {children}
        </div>
    );
}

export function IntroVisualizer() {
    const { register, watch } = useForm<DataModel>({
        defaultValues: {
            needsAdditionalForm: true,
            state: 'New York',
        },
    });

    const data = watch();
    const components: {
        location: { x: number; y: number };
        shown: boolean;
        page: (typeof IntroPages)[number];
    }[] = useMemo(() => {
        let shownCount = 0;
        let hiddenCount = 0;
        return IntroPages.map((page) => {
            if (!page.isRequired || page.isRequired(data)) {
                const location = {
                    x: shownCount * 85,
                    y: 0,
                };
                shownCount++;
                return {
                    location,
                    shown: true,
                    page,
                };
            }
            const location = {
                x: hiddenCount * 85,
                y: 125,
            };
            hiddenCount++;
            return {
                location,
                shown: false,
                page,
            };
        });
    }, [data]);

    return (
        <div className="text-center not-prose">
            <div className="inline-flex gap-3 m-x-auto justify-items-center text-left border border-gray-300 p-4 rounded-lg">
                <div>
                    <b>Current form data</b>
                    <Checkbox
                        label="Needs Additional Form"
                        {...register('needsAdditionalForm')}
                    />
                    <Checkbox
                        label="Needs Confirmation"
                        {...register('needsConfirmation')}
                    />
                    <select {...register('state')}>
                        <option>New York</option>
                        <option>California</option>
                        <option>Tennesse</option>
                        <option>Texas</option>
                        <option>Other</option>
                    </select>
                </div>
                <div>
                    <b>Form sequence</b>
                    <div
                        style={{
                            position: 'relative',
                            height: 250,
                            width: 500,
                        }}
                    >
                        {components.map(({ location, shown, page }) => (
                            <Page
                                key={page.id}
                                className={
                                    shown
                                        ? 'text-inherit border-neutral-950'
                                        : 'text-neutral-400 border-neutral-400'
                                }
                                location={location}
                            >
                                <page.Component />
                            </Page>
                        ))}
                        <i
                            style={{ position: 'absolute', top: 100, left: 0 }}
                            className="text-neutral-400"
                        >
                            Unused
                        </i>
                    </div>
                </div>
            </div>
        </div>
    );
}
