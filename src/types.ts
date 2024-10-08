export enum StartingPage {
    FirstIncomplete = 1,
    FirstPage = 2,
}

/**
 * Represents a single page in a form workflow.
 *
 * @typeParam DataT - The type of the form data.
 * @typeParam ComponentProps - The props passed to the component.
 * @typeParam ErrorList - The type representing validation errors.
 */
export type FormPage<DataT, ComponentProps, ErrorList> = {
    /**
     * Unique identifier for the form page.
     */
    id: string;

    /**
     * Optional predicate to determine if this page is needed based on the current form data.
     *
     * @param data - DeepPartial form data available at the current step.
     * @returns A boolean indicating whether the page is needed.
     */
    isRequired?: (data: DeepPartial<DataT>) => boolean | undefined;

    /**
     * Function to determine if the page is complete based on the current form data.
     * This can be loose, it should not include validation. It is used to determine
     * what the next incomplete page is when navigating the form.
     *
     * @param data - DeepPartial form data available at the current step.
     * @returns A boolean indicating whether the page is complete.
     */
    isComplete: (data: DeepPartial<DataT>) => boolean;

    /**
     * Optional predicate to determine if this page is the final page in the form sequence.
     *
     * @param data - DeepPartial form data available at the current step.
     * @returns A boolean indicating whether this is the final page.
     */
    isFinal?: (data: DeepPartial<DataT>) => boolean;

    /**
     * Optional function to validate the form data for this page. If using React Hook Form,
     * all fields in the DOM will automatically be vaidated. This is useful for further
     * validation that may be asynchronous or require multiple fields.
     *
     * @param data - DeepPartial form data available at the current step.
     * @returns An ErrorList if validation fails, or undefined if validation passes.
     */
    validate?: (data: DeepPartial<DataT>) => ErrorList | undefined;

    /**
     * Optional function to execute when arriving at this page.
     *
     * @param data - DeepPartial form data available at the current step.
     */
    onArrive?: (data: DeepPartial<DataT>) => void;

    /**
     * Optional function to execute when exiting this page.
     *
     * @param data - DeepPartial form data available at the current step.
     * @returns A Promise or void. If a Promise is returned, the form will wait for it to resolve.
     */
    onExit?: (data: DeepPartial<DataT>) => Promise<void> | void;

    /**
     * Function to determine the next page by ID. For use in special
     * circumstances where using a sequence is not possible or practical.
     *
     * @param data - DeepPartial form data available at the current step.
     * @returns The ID of the next page, or undefined if the next page should be the default.
     */
    alternateNextPage?: (data: DeepPartial<DataT>) => string | undefined;

    /**
     * The React component that renders the content of this form page.
     *
     * @param props - The props passed to the component, including form methods and errors.
     * @returns A JSX element representing the form page.
     */
    Component: (props: ComponentProps) => JSX.Element;
};

/**
 * Represents a sequence of form pages or nested sequences in a form workflow.
 *
 * @typeParam DataT - The type of the form data.
 * @typeParam ComponentProps - The props passed to the component.
 * @typeParam ErrorList - The type representing validation errors.
 */
export type FormSequence<DataT, ComponentProps, ErrorList> = {
    /**
     * Unique identifier for the form sequence.
     */
    id: string;

    /**
     * An array of form pages or nested sequences that are part of this sequence.
     */
    pages: SequenceChild<DataT, ComponentProps, ErrorList>[];

    /**
     * Optional predicate to determine if this sequence is needed based on the current form data.
     *
     * @param data - DeepPartial form data available at the current step.
     * @returns A boolean indicating whether the sequence is needed.
     */
    isRequired?: (data: DeepPartial<DataT>) => boolean | undefined;
};

export type SequenceChild<DataT, ComponentProps, ErrorList> =
    | FormPage<DataT, ComponentProps, ErrorList>
    | FormSequence<DataT, ComponentProps, ErrorList>;

/**
 * Represents the parameters required to initialize and manage a multi-page form workflow.
 *
 * @typeParam DataT - The type of the form data.
 * @typeParam ComponentProps - The props passed to the form components.
 * @typeParam ErrorList - The type representing validation errors.
 */
export type MultiPageFormParams<DataT, ComponentProps, ErrorList> = {
    /**
     * Retrieves the current form data.
     *
     * @returns The current data of type DataT.
     */
    getCurrentData: () => DeepPartial<DataT>;

    /**
     * An array of form pages or nested sequences that constitute the form workflow.
     */
    pages: Array<SequenceChild<DataT, ComponentProps, ErrorList>>;

    /**
     * Specifies the starting page of the form workflow. Options are:
     * - the id of the desired starting page
     * - `StartingPage.FirstIncomplete`: the first incomplete page in the sequence (default)
     * - `StartingPage.FirstPage`: the first page in the sequence
     */
    startingPage?: string | StartingPage;

    /**
     * Callback function that is invoked before changing to a new page.
     *
     * @param data - The current form data.
     * @param page - The current form page being navigated away from.
     * @returns A Promise resolving to an ErrorList or a boolean indicating whether to proceed with the page change.
     */
    onBeforePageChange?: (
        data: DeepPartial<DataT>,
        page: FormPage<DataT, ComponentProps, ErrorList>,
    ) => Promise<ErrorList | boolean> | ErrorList | boolean;

    /**
     * Callback function that is invoked when the form navigates to a new page.
     *
     * @param data - The current form data.
     * @param newPage - The new form page being navigated to.
     */
    onPageChange?: (
        data: DeepPartial<DataT>,
        newPage: FormPage<DataT, ComponentProps, ErrorList>,
    ) => void;

    /**
     * Callback function that is invoked when the form is successfully completed.
     * A form is complete when `currentPage.isFinal` returns true or when the last page is reached.
     *
     * @param data - The final form data.
     */
    onComplete?: (data: DeepPartial<DataT>) => void;

    /**
     * Callback function that is invoked when there are validation errors in the form.
     *
     * @param errorList - The list of validation errors.
     */
    onValidationError?: (errorList: ErrorList) => void;
};

// https://pendletonjones.com/deep-partial
export type DeepPartial<T> = unknown extends T
    ? T
    : T extends object
      ? {
            [P in keyof T]?: T[P] extends Array<infer U>
                ? Array<DeepPartial<U>>
                : T[P] extends ReadonlyArray<infer U>
                  ? ReadonlyArray<DeepPartial<U>>
                  : DeepPartial<T[P]>;
        }
      : T;
