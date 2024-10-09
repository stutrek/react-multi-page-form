import {
    type SyntheticEvent,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { StartingPage } from './types';
import type {
    DecisionNode,
    DeepPartial,
    FormPage,
    MultiPageFormParams,
} from './types';
import {
    flattenPages,
    getNextPageIndex,
    isDecisionNode,
    useCallbackRef,
} from './utils';

function isRequired<
    DataT,
    Page extends FormPage<DataT, any, any> | DecisionNode<DataT>,
>(page: Page, data: DeepPartial<DataT>) {
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
    const pagesRefChangeCounter = useRef(0);
    const [pages, pagesMap] = useMemo(() => {
        if (process.env.NODE_ENV !== 'production') {
            if (pagesRefChangeCounter.current > 0) {
                console.warn(
                    'useMultiPageFormBase: pages changed after first render, this can lead to performance issues and unexpected behavior.',
                );
            }
            pagesRefChangeCounter.current++;
        }
        return flattenPages(pagesInput);
    }, [pagesInput]);

    const [currentPageIndex, setCurrentPageIndex] = useState(() => {
        const data = getCurrentData();
        let initialIndex = 0;

        if (typeof startingPage === 'string') {
            const found = pages.findIndex((page) => {
                return page.id === startingPage;
            });
            if (found !== -1) {
                initialIndex = found;
            }
            console.warn('Form page not found. Resuming from first page.');
        }
        if (!startingPage || startingPage === StartingPage.FirstIncomplete) {
            const index = pages.findIndex((page) => {
                return (
                    !isDecisionNode(page) &&
                    isRequired(page, data) &&
                    !page.isComplete(data)
                );
            });
            if (index !== -1) {
                initialIndex = index;
            }
        }

        const initialNode = pages[initialIndex];
        if (isDecisionNode(initialNode)) {
            return getNextPageIndex(data, pages, initialIndex, false) ?? 0;
        }
        return initialIndex;
    });

    const navigationStack = useRef<number[]>([]);
    const currentPage = pages[currentPageIndex] as FormPage<
        DataT,
        ComponentProps,
        ErrorList
    >;

    const previousPageIndex = useMemo(() => {
        if (navigationStack.current.length) {
            return navigationStack.current[navigationStack.current.length - 1];
        }
        const currentData = getCurrentData();
        for (let i = currentPageIndex - 1; i > -1; i--) {
            const page = pages[i];
            if (page && isRequired(page, currentData)) {
                return i;
            }
        }
    }, [pages, currentPageIndex, getCurrentData]);

    /**
     * Effect hook that triggers when the current page changes.
     * It invokes the `onPageChange` and `currentPage.onArrive` callbacks if they are provided.
     */
    // biome-ignore lint/correctness/useExhaustiveDependencies: onPageChange should be excluded.
    useEffect(() => {
        const data = getCurrentData();

        if (onPageChange) {
            onPageChange(data, pagesMap[currentPage.id]);
        }
        if (currentPage?.onArrive) {
            currentPage.onArrive(data);
        }
    }, [currentPage]);

    const advanceAndNavState = useRef({
        navigating: false,
        goToCalledInNavigation: false,
    });

    /**
     * Navigates to a specific page by its identifier.
     *
     * @param {string} pageId - The identifier of the page to navigate to.
     */
    const goTo = useCallbackRef(async (pageId: string) => {
        const index = pages.findIndex((page) => page.id === pageId);
        if (index !== -1) {
            if (advanceAndNavState.current.navigating) {
                advanceAndNavState.current.goToCalledInNavigation = true;
            }
            if (currentPage.onExit) {
                const data = getCurrentData();
                await currentPage.onExit(data);
            }

            setCurrentPageIndex(index);
            navigationStack.current.push(currentPageIndex);
        } else {
            console.warn(`Page with ID '${pageId}' not found.`);
        }
    });

    /**
     * Advances to the next required page.
     *
     * This function performs validation before advancing. It checks for validation errors
     * on the current page, invokes `onBeforePageChange`, and handles any errors returned.
     *
     * @param {SyntheticEvent} [event] - An optional event to prevent default behavior.
     */
    const advance = useCallbackRef(
        async (event?: SyntheticEvent, toNextIncomplete = false) => {
            if (advanceAndNavState.current.navigating) {
                console.warn('Navigation already in progress.');
                return;
            }
            if (event) {
                event.preventDefault();
            }
            const data = getCurrentData();

            const page = pages[currentPageIndex] as FormPage<
                DataT,
                ComponentProps,
                ErrorList
            >;
            const validationErrors = page.validate?.(data);
            if (validationErrors) {
                if (onValidationError) {
                    onValidationError(validationErrors);
                }
                return;
            }

            advanceAndNavState.current.navigating = true;
            if (onBeforePageChange) {
                const errorList = await onBeforePageChange(
                    data,
                    pagesMap[pages[currentPageIndex].id],
                );
                if (errorList === false) {
                    advanceAndNavState.current.navigating = false;
                    return;
                }
                if (errorList !== true && errorList) {
                    if (onValidationError) {
                        onValidationError(errorList);
                    }
                    advanceAndNavState.current.navigating = false;
                    return;
                }
            }

            if (advanceAndNavState.current.goToCalledInNavigation === false) {
                const nextPageIndex = getNextPageIndex(
                    data,
                    pages,
                    currentPageIndex,
                    toNextIncomplete,
                );
                if (nextPageIndex === undefined) {
                    console.warn('No next page found.');
                    return;
                }
                if (currentPageIndex !== nextPageIndex) {
                    await currentPage.onExit?.(data);
                    setCurrentPageIndex(nextPageIndex);
                }
            }
            navigationStack.current.push(currentPageIndex);
            advanceAndNavState.current.navigating = false;
            advanceAndNavState.current.goToCalledInNavigation = false;
        },
    );

    const advanceToNextIncomplete = useCallbackRef(
        async (event?: SyntheticEvent) => {
            await advance(event, true);
        },
    );

    /**
     * Navigates back to the previous required page.
     *
     * @param {SyntheticEvent} [event] - An optional event to prevent default behavior.
     */
    const goBack = useCallbackRef(async (event?: SyntheticEvent) => {
        if (event) {
            event.preventDefault();
        }
        if (advanceAndNavState.current.navigating) {
            console.warn('Navigation already in progress.');
            return;
        }
        advanceAndNavState.current.navigating = true;
        const data = getCurrentData();
        let nextPageIndex: number | undefined;

        if (navigationStack.current.length) {
            if (currentPage.onExit) {
                await currentPage.onExit(data);
            }
            nextPageIndex = navigationStack.current?.pop();
        } else {
            for (let i = currentPageIndex - 1; i >= 0; i--) {
                const page = pages[i];
                if (isRequired(page, data)) {
                    if (currentPage.onExit) {
                        await currentPage.onExit(data);
                    }
                    nextPageIndex = i;
                    break;
                }
            }
        }
        if (nextPageIndex !== currentPageIndex) {
            await currentPage.onExit?.(data);
            if (nextPageIndex !== undefined) {
                setCurrentPageIndex(nextPageIndex);
            } else {
                console.warn('No previous page found.');
            }
        }

        advanceAndNavState.current.navigating = false;
        advanceAndNavState.current.goToCalledInNavigation = false;
    });

    return {
        sequence: pages,
        currentPage: pagesMap[pages[currentPageIndex]?.id],
        isFinal:
            currentPageIndex === pages.length - 1 ||
            currentPage?.isFinal?.(getCurrentData()),
        isFirst: previousPageIndex === undefined,
        advance,
        advanceToNextIncomplete,
        goBack,
        goTo,
    };
}
