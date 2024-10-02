import { type SyntheticEvent, useEffect, useMemo, useState } from 'react';
import { StartingPage } from './types';
import type {
    SequenceChild,
    FormPage,
    MultiPageFormParams,
    FormSequence,
} from './types';
import { useCallbackRef } from './utils';

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
function wrapChild<DataT, T extends SequenceChild<DataT, any, any>>(
    child: T,
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    parent: FormSequence<DataT, any, any>,
): T {
    return {
        ...child,
        id: `${parent.id}.${child.id}`,
        isRequired: (data: DataT) => {
            if (parent.isRequired) {
                const parentisRequired = parent.isRequired(data);
                if (parentisRequired === false) {
                    return false;
                }
            }
            if (child.isRequired) {
                return child.isRequired(data);
            }
            return true;
        },
    } as T;
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
function isRequired<DataT, Page extends FormPage<DataT, any, any>>(
    page: Page,
    data: DataT,
) {
    if (page.isRequired === undefined || page.isRequired(data) !== false) {
        return true;
    }
}

export function useMultiPageFormBase<DataT, ComponentProps, ErrorList>({
    getCurrentData,
    pages: pagesInput,
    startingPage,
    onBeforePageChange,
    onPageChange,
    onValidationError,
}: MultiPageFormParams<DataT, ComponentProps, ErrorList>) {
    const pages = useMemo(() => {
        const pages = [...pagesInput];
        for (let i = 0; i < pages.length; i++) {
            const item = pages[i];
            if ('pages' in item) {
                const sequencePages = item.pages.map((child) =>
                    wrapChild(child, item),
                );
                pages.splice(i, 1, ...sequencePages);
                i -= 1;
            }
        }
        return pages as FormPage<DataT, ComponentProps, ErrorList>[];
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
            console.warn(
                'Form page not found. Resuming from first incomplete page.',
            );
        }
        if (!startingPage || startingPage === StartingPage.FirstIncomplete) {
            const index = pages.findIndex((page) => {
                return isRequired(page, data) && !page.isComplete(data);
            });
            if (index !== -1) {
                return index;
            }
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
            const pageisRequired = isRequired(page, data);
            if (pageisRequired) {
                return page;
            }
        }
    }, [currentPageIndex, pages, getCurrentData]);

    const [nextStep, nextIncompleteStep] = useMemo(() => {
        const data = getCurrentData();
        let nextStep: FormPage<DataT, ComponentProps, ErrorList> | undefined;
        let nextIncompleteStep:
            | FormPage<DataT, ComponentProps, ErrorList>
            | undefined;
        if (!currentPage.isFinal?.(data)) {
            for (let i = currentPageIndex + 1; i < pages.length; i++) {
                const page = pages[i];
                const pageisRequired = isRequired(page, data);
                const pageIsComplete = page.isComplete(data);
                if (pageisRequired && !nextStep) {
                    nextStep = page;
                }
                if (pageisRequired && !pageIsComplete) {
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
        const validationErrors = page.validate?.(data);
        if (validationErrors) {
            if (onValidationError) {
                onValidationError(validationErrors);
            }
            return;
        }

        if (onBeforePageChange) {
            const errorList = await onBeforePageChange(
                data,
                pages[currentPageIndex],
            );
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

        for (let i = currentPageIndex + 1; i < pages.length; i++) {
            const page = pages[i];
            if (isRequired(page, data)) {
                if (currentPage.onExit) {
                    await currentPage.onExit(data);
                }
                setCurrentPageIndex(i);
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
            if (isRequired(page, data)) {
                setCurrentPageIndex(i);
                break;
            }
        }
    });

    const goTo = useCallbackRef((pageId: string) => {
        const index = pages.findIndex((page) => page.id === pageId);
        if (index !== -1) {
            setCurrentPageIndex(index);
        }
    });

    return {
        currentPage: pages[currentPageIndex],
        advance,
        goBack,
        goTo,
        previousStep,
        nextStep,
        nextIncompleteStep,
    };
}
