import type React from 'react';
import { type ChangeEvent, forwardRef, type PropsWithChildren } from 'react';
import type { FieldError, UseFormSetValue } from 'react-hook-form';

type AdditionalProps = {
    error?: FieldError | undefined | string;
    label?: string;
};

// Helper Types
export interface DocumentReference {
    fileName: string;
    fileType: string;
    fileSize: number; // in bytes
    fileUrl?: string; // URL if the file is stored remotely
}

type HTMLInputProps<T extends HTMLElement> = Omit<
    React.HTMLProps<T>,
    'error' | 'name'
> &
    AdditionalProps & { name: string };

type FormFieldContainerProps = {
    labelAfter?: boolean;
    hideError?: boolean;
} & AdditionalProps;

function ErrorText({ error }: { error: FieldError | undefined | string }) {
    return typeof error === 'string' ? (
        error
    ) : error?.message ? (
        <span className="text-rose-900">{error.message}</span>
    ) : (
        <span>&nbsp;</span>
    );
}

export const FormFieldContainer = ({
    children,
    label,
    error,
    labelAfter,
    hideError,
}: PropsWithChildren<FormFieldContainerProps>) => (
    <div className={`${error ? 'text-rose-900' : ''} my-2`}>
        {labelAfter ? (
            <>
                <label>
                    {children} {label}
                </label>
            </>
        ) : (
            <>
                <label>{label}</label>
                {children}
            </>
        )}

        {!hideError ? (
            <div>
                <ErrorText error={error} />
            </div>
        ) : null}
    </div>
);

export const Button = forwardRef<
    HTMLButtonElement,
    React.HTMLProps<HTMLButtonElement> & { variant?: 'primary' | 'secondary' }
>((props, ref) => {
    const { children, type, variant, ...rest } = props;
    const colorClasses =
        variant === 'secondary'
            ? 'text-black bg-gray-300 hover:bg-gray-400'
            : 'text-white bg-indigo-600 hover:bg-indigo-700';
    return (
        <button
            className={`px-4 py-2 mr-2 ${colorClasses} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-indigo-200`}
            type={type as 'button' | 'submit' | 'reset' | undefined}
            ref={ref}
            {...rest}
        >
            {children}
        </button>
    );
});

export const TextInput = forwardRef<
    HTMLInputElement,
    HTMLInputProps<HTMLInputElement>
>((props, ref) => {
    const { error, label, ...rest } = props;
    return (
        <FormFieldContainer label={label} error={error}>
            <input
                type="text"
                className={`${error ? 'border-rose-900' : 'border-gray-300'} mt-1 block w-full rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
                {...rest}
                ref={ref}
            />
        </FormFieldContainer>
    );
});

type SelectOption = {
    label: string;
    value: string;
};

export const Select = forwardRef<
    HTMLSelectElement,
    HTMLInputProps<HTMLSelectElement> & {
        options: SelectOption[];
    }
>((props, ref) => {
    const { error, label, options, ...rest } = props;
    return (
        <FormFieldContainer label={label} error={error}>
            <select
                className={`${error ? 'border-rose-900' : 'border-gray-300'} block w-full mt-1 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
                {...rest}
                ref={ref}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </FormFieldContainer>
    );
});

export const Checkbox = forwardRef<
    HTMLInputElement,
    React.HTMLProps<HTMLInputElement> & AdditionalProps
>((props, ref) => {
    const { error, label, ...rest } = props;
    return (
        <FormFieldContainer label={label} error={error} labelAfter hideError>
            <input type="checkbox" {...rest} ref={ref} />
        </FormFieldContainer>
    );
});

export const Radio = forwardRef<
    HTMLInputElement,
    React.HTMLProps<HTMLInputElement> & AdditionalProps
>((props, ref) => {
    const { error, label, ...rest } = props;
    return (
        <FormFieldContainer label={label} error={error} labelAfter hideError>
            <input type="radio" {...rest} ref={ref} />
        </FormFieldContainer>
    );
});

export const FileInput = forwardRef<
    HTMLInputElement,
    React.HTMLProps<HTMLInputElement> &
        Omit<AdditionalProps, 'error'> & {
            // biome-ignore lint/suspicious/noExplicitAny: <explanation>
            setValue: UseFormSetValue<any>;
            name: string;
            error?: Partial<{ [K in keyof DocumentReference]: FieldError }>;
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
        <Checkbox
            name={name}
            error={
                error?.fileName ||
                error?.fileSize ||
                error?.fileType ||
                error?.fileUrl
            }
            {...rest}
            onChange={handleChange}
            ref={ref}
        />
    );
});
