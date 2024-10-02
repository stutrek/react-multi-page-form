import classNames from 'classnames';

import styles from './SequenceVisualizer.module.css';
import type { SequenceChild } from '../../../../src/types';

type SequenceVisualizerProps<T> = {
    data: T;
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    currentPage: SequenceChild<T, any, any>;
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    pages: SequenceChild<T, any, any>[];
    idPrefix?: string;
    goToPage: (page: string) => void;
};

export function SequenceVisualizer<T>({
    data,
    currentPage,
    pages,
    goToPage,
    idPrefix = '',
}: SequenceVisualizerProps<T>) {
    return (
        <div className={styles.visualizer}>
            {pages.map((page) => {
                const isNeeded = page.isNeeded?.(data) !== false;
                const isComplete =
                    isNeeded && 'isComplete' in page && page.isComplete(data);
                const isForm = 'Component' in page;
                const clickHandler = isForm
                    ? () => goToPage(`${idPrefix}${page.id}`)
                    : undefined;
                return (
                    <div
                        className={classNames(
                            styles.page,
                            `${idPrefix}${page.id}` === currentPage.id &&
                                styles.currentPage,
                            isNeeded && isComplete && styles.complete,
                            !isNeeded && styles.notNeeded,
                            isForm && 'cursor-pointer',
                        )}
                        onClick={clickHandler}
                        key={page.id}
                    >
                        <div className={styles.label}>
                            {isForm ? (isComplete ? '✅ ' : '⬜️ ') : ''}
                            {page.id
                                .replaceAll('-', ' ')
                                .replace(/([A-Z])/g, ' $1')
                                .replace(/^./, (str) => str.toUpperCase())}
                        </div>
                        {'pages' in page && (
                            <SequenceVisualizer
                                data={data}
                                currentPage={currentPage}
                                pages={page.pages}
                                idPrefix={`${idPrefix}${page.id}.`}
                                goToPage={goToPage}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
}
