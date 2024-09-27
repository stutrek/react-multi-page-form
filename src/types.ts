export enum StartingPage {
    FirstIncomplete = 1,
    FirstPage = 2,
}

export type IsNeededPredicate<DataT> = (
    data: Partial<DataT>,
) => boolean | undefined;

export type FormPage<DataT, ComponentProps, ErrorList> = {
    id: string;
    isNeeded?: IsNeededPredicate<DataT>;
    isComplete: (data: Partial<DataT>) => boolean;
    isFinal?: (data: Partial<DataT>) => boolean;
    validate?: (data: Partial<DataT>) => ErrorList | undefined;
    onArrive?: (data: Partial<DataT>) => void;
    onExit?: (data: Partial<DataT>) => Promise<void> | void;
    Component: (props: ComponentProps) => JSX.Element;
};

export type FormSequence<DataT, ComponentProps, ErrorList> = {
    id: string;
    pages: SequenceChild<DataT, ComponentProps, ErrorList>[];
    isNeeded?: IsNeededPredicate<DataT>;
    Component?: (props: ComponentProps) => JSX.Element;
};

export type SequenceChild<DataT, ComponentProps, ErrorList> =
    | FormPage<DataT, ComponentProps, ErrorList>
    | FormSequence<DataT, ComponentProps, ErrorList>;

export type MultiPageFormParams<DataT, ComponentProps, ErrorList> = {
    getCurrentData: () => DataT;
    pages: Array<SequenceChild<DataT, ComponentProps, ErrorList>>;
    startingPage?: ComponentProps | StartingPage;
    onBeforePageChange?: (
        data: DataT,
        page: FormPage<DataT, ComponentProps, ErrorList>,
    ) => Promise<ErrorList | boolean> | ErrorList | boolean;
    onPageChange?: (
        data: DataT,
        newPage: FormPage<DataT, ComponentProps, ErrorList>,
    ) => void;
    onComplete?: (data: DataT) => void;
    onValidationError?: (errorList: ErrorList) => void;
};
