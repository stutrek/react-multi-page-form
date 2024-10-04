import {
    type SyntheticEvent,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { StartingPage } from './types';
import type { FormPage, MultiPageFormParams } from './types';
import { flattenPages, useCallbackRef } from './utils';

function isRequired<DataT, Page extends FormPage<DataT, any, any>>(
    page: Page,
    data: DataT,
) {
    if (page.isRequired === undefined || page.isRequired(data) !== false) {
        return true;
    }
}

/**
 * A hook that manages the state and navigation of a multi-page form.
 * This base hook provides core functionality for form sequence management,
 * including page navigation, validation, and event handling.
 *
 * @template DataT - The type of the form data.
 * @template ComponentProps - The type of the component props passed to each form page.
 * @template ErrorList - The type representing validation errors.
 *
 * @param {MultiPageFormParams<DataT, ComponentProps, ErrorList>} params - The parameters for configuring the multi-page form.
 * @param {() => DataT} params.getCurrentData - Function to retrieve the current form data.
 * @param {SequenceChild[]} params.pages - Array of form pages or nested sequences.
 * @param {string | StartingPage} [params.startingPage] - The starting page ID or a StartingPage enum value.
 * @param {(data: DataT, page: FormPage) => Promise<ErrorList | boolean> | ErrorList | boolean} [params.onBeforePageChange] - Callback invoked before changing pages. Return false or an ErrorList to prevent navigation.
 * @param {(data: DataT, newPage: FormPage) => void} [params.onPageChange] - Callback invoked when navigating to a new page.
 * @param {(errorList: ErrorList) => void} [params.onValidationError] - Callback invoked when validation errors occur.
 *
 * @returns {object} An object containing the current page, navigation functions, and navigation state.
 */
export function useMultiPageFormBase<DataT, ComponentProps, ErrorList>({
    getCurrentData,
    pages: pagesInput,
    startingPage,
    onBeforePageChange,
    onPageChange,
    onValidationError,
}: MultiPageFormParams<DataT, ComponentProps, ErrorList>) {
    const pageChangeCount = useRef(0);
    const pages = useMemo(() => {
        if (process.env.NODE_ENV !== 'production') {
            if (pageChangeCount.current > 0) {
                console.warn(
                    'useMultiPageFormBase: pages changed after first render, this can lead to performance issues and unexpected behavior.',
                );
            }
            pageChangeCount.current++;
        }
        return flattenPages(pagesInput);
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

    /**
     * Effect hook that triggers when the current page changes.
     * It invokes the `onPageChange` and `currentPage.onArrive` callbacks if they are provided.
     */
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

    /**
     * Computes the previous required page.
     *
     * @returns {FormPage<DataT, ComponentProps, ErrorList> | undefined} The previous required page, or undefined if none exists.
     */
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

    /**
     * Computes the next required page and the next incomplete required page.
     *
     * @returns {[FormPage<DataT, ComponentProps, ErrorList> | undefined, FormPage<DataT, ComponentProps, ErrorList> | undefined]} A tuple containing the next required page and the next incomplete required page.
     */
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

    /**
     * Advances to the next required page.
     *
     * This function performs validation before advancing. It checks for validation errors
     * on the current page, invokes `onBeforePageChange`, and handles any errors returned.
     *
     * @param {SyntheticEvent} [event] - An optional event to prevent default behavior.
     */
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

    /**
     * Navigates back to the previous required page.
     *
     * @param {SyntheticEvent} [event] - An optional event to prevent default behavior.
     */
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

    /**
     * Navigates to a specific page by its identifier.
     *
     * @param {string} pageId - The identifier of the page to navigate to.
     */
    const goTo = useCallbackRef((pageId: string) => {
        const index = pages.findIndex((page) => page.id === pageId);
        if (index !== -1) {
            setCurrentPageIndex(index);
        }
    });

    return {
        sequence: pages,
        currentPage: pages[currentPageIndex],
        advance,
        goBack,
        goTo,
        previousStep,
        nextStep,
        nextIncompleteStep,
    };
}
