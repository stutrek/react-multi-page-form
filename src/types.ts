import type { ReactElement } from 'react';

export enum PageNeeded {
	NotNeeded = 0,
	Needed = 1,
	Unsure = 2,
}

export enum StartingPage {
	FirstIncomplete = 1,
	FirstPage = 2,
}

export type IsNeededPredicate<DataT> = (data: DataT) => PageNeeded;

export type FormPage<DataT, PageIdentifier extends string, ErrorList> = {
	id: PageIdentifier;
	isNeeded?: IsNeededPredicate<DataT>;
	isComplete: (data: DataT) => boolean;
	isFinal?: (data: DataT) => boolean;
	validate: (data: DataT) => ErrorList | undefined;
	onArrive?: (data: DataT) => void;
	onComplete?: (data: DataT) => void;
	Component: ReactElement<{ formData: DataT }>;
};

export type FormSequence<DataT, PageIdentifier extends string, ErrorList> = {
	pages: SequenceChild<DataT, PageIdentifier, ErrorList>[];
	isNeeded?: IsNeededPredicate<DataT>;
};

export type SequenceChild<DataT, PageIdentifier extends string, ErrorList> =
	| FormPage<DataT, PageIdentifier, ErrorList>
	| FormSequence<DataT, PageIdentifier, ErrorList>;

export type MultiPageFormParams<
	DataT,
	PageIdentifier extends string,
	ErrorList,
> = {
	getCurrentData: () => DataT;
	pages: Array<SequenceChild<DataT, PageIdentifier, ErrorList>>;
	startingPage?: PageIdentifier | StartingPage;
	onBeforePageChange?: (
		data: DataT,
		page: FormPage<DataT, PageIdentifier, ErrorList>,
	) => Promise<ErrorList> | ErrorList;
	onPageChange?: (
		data: DataT,
		newPage: FormPage<DataT, PageIdentifier, ErrorList>,
	) => void;
	onComplete?: (data: DataT) => void;
	onValidationError?: (errorList: ErrorList) => void;
};
