import { type SyntheticEvent, useEffect, useMemo, useState } from 'react';
import { PageNeeded, StartingPage } from './types';
import type {
	SequenceChild,
	FormPage,
	MultiPageFormParams,
	IsNeededPredicate,
} from './types';
import { useCallbackRef } from './utils';

function wrapChild<
	DataT,
	PageIdentifier extends string,
	ErrorList,
	T extends SequenceChild<DataT, PageIdentifier, ErrorList>,
>(isNeeded: IsNeededPredicate<DataT>, child: T): T {
	return {
		...child,
		isNeeded: (data: DataT) => {
			if (isNeeded) {
				const parentIsNeeded = isNeeded(data);
				if (parentIsNeeded === PageNeeded.NotNeeded) {
					return PageNeeded.NotNeeded;
				}
				if (child.isNeeded) {
					return child.isNeeded(data);
				}
				return PageNeeded.Needed;
			}
		},
	};
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
function isNeeded<DataT, Page extends FormPage<DataT, any, any>>(
	page: Page,
	data: DataT,
) {
	if (
		page.isNeeded === undefined ||
		page.isNeeded(data) !== PageNeeded.NotNeeded
	) {
		return true;
	}
}

export function useMultiPageForm<
	DataT,
	PageIdentifier extends string,
	ErrorList,
>({
	getCurrentData,
	pages: pagesInput,
	startingPage,
	onBeforePageChange,
	onPageChange,
	onValidationError,
}: MultiPageFormParams<DataT, PageIdentifier, ErrorList>) {
	const pages = useMemo(() => {
		const pages = [...pagesInput];
		for (let i = 0; i < pages.length; i++) {
			const item = pages[i];
			if ('pages' in item) {
				if (item.isNeeded) {
					const isNeeded = item.isNeeded;
					const sequencePages = item.pages.map((child) =>
						wrapChild(isNeeded, child),
					);
					pages.splice(i, 1, ...sequencePages);
				}
				pages.splice(i, 1, ...item.pages);
				i -= 1;
			}
		}
		return pages as FormPage<DataT, PageIdentifier, ErrorList>[];
	}, [pagesInput]);

	const [currentPageIndex, setCurrentPageIndex] = useState(() => {
		const data = getCurrentData();

		if (startingPage === StartingPage.FirstPage) {
			return 0;
		}
		if (typeof startingPage === 'string') {
			const found = pages.findIndex((page) => {
				return page.id === startingPage;
			});
			if (found !== -1) {
				return found;
			}
			console.warn('Form page not found. Resuming from first incomplete page.');
		}
		if (!startingPage || startingPage === StartingPage.FirstIncomplete) {
			return pages.findIndex((page) => {
				return isNeeded(page, data) && !page.isComplete(data);
			});
		}
		return 0;
	});

	const currentPage = pages[currentPageIndex];

	// biome-ignore lint/correctness/useExhaustiveDependencies: onPageChange should be excluded.
	useEffect(() => {
		const data = getCurrentData();
		if (onPageChange) {
			onPageChange(data, currentPage);
		}
		if (currentPage.onArrive) {
			currentPage.onArrive(data);
		}
	}, [currentPage]);

	const previousStep = useMemo(() => {
		const data = getCurrentData();

		for (let i = currentPageIndex - 1; i >= 0; i--) {
			const page = pages[i];
			const pageIsNeeded = isNeeded(page, data);
			if (pageIsNeeded) {
				return page;
			}
		}
	}, [currentPageIndex, pages, getCurrentData]);

	const [nextStep, nextIncompleteStep] = useMemo(() => {
		const data = getCurrentData();
		let nextStep: FormPage<DataT, PageIdentifier, ErrorList> | undefined;
		let nextIncompleteStep:
			| FormPage<DataT, PageIdentifier, ErrorList>
			| undefined;
		if (!currentPage.isFinal?.(data)) {
			for (let i = currentPageIndex + 1; i < pages.length; i++) {
				const page = pages[i];
				const pageIsNeeded = isNeeded(page, data);
				const pageIsComplete = page.isComplete(data);
				if (pageIsNeeded && !nextStep) {
					nextStep = page;
				}
				if (pageIsNeeded && !pageIsComplete) {
					nextIncompleteStep = page;
					break;
				}
			}
		}
		return [nextStep, nextIncompleteStep];
	}, [currentPage, currentPageIndex, pages, getCurrentData]);

	const advance = useCallbackRef(async (event?: SyntheticEvent) => {
		if (event) {
			event.preventDefault();
		}
		const data = getCurrentData();

		const page = pages[currentPageIndex];
		const validationErrors = page.validate(data);
		if (validationErrors) {
			if (onValidationError) {
				onValidationError(validationErrors);
			}
			return;
		}

		if (onBeforePageChange) {
			const errorList = await onBeforePageChange(data, pages[currentPageIndex]);
			if (errorList === false) {
				return;
			}
			if (errorList !== true && errorList) {
				if (onValidationError) {
					onValidationError(errorList);
				}
				return;
			}
		}

		let nextPage: FormPage<DataT, PageIdentifier, ErrorList> | undefined;
		let nextPageIndex: number | undefined;
		for (let i = currentPageIndex + 1; i < pages.length; i++) {
			const page = pages[i];
			if (isNeeded(page, data)) {
				if (currentPage.onExit) {
					await currentPage.onExit(data);
				}
				setCurrentPageIndex(i);
				nextPage = page;
				nextPageIndex = i;
				break;
			}
		}
	});

	const goBack = useCallbackRef(async (event?: SyntheticEvent) => {
		if (event) {
			event.preventDefault();
		}
		const data = getCurrentData();
		for (let i = currentPageIndex - 1; i >= 0; i--) {
			const page = pages[i];
			if (isNeeded(page, data)) {
				setCurrentPageIndex(i);
				break;
			}
		}
	});

	return {
		currentPage: pages[currentPageIndex],
		advance,
		goBack,
		previousStep,
		nextStep,
		nextIncompleteStep,
	};
}
