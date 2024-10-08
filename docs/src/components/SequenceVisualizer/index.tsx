import classNames from 'classnames';

import styles from './SequenceVisualizer.module.css';
import type { DeepPartial, SequenceChild } from '../../../../src/types';

type SequenceVisualizerProps<T> = {
    data: DeepPartial<T>;
    currentPage: SequenceChild<T, any, any>;
    pages: SequenceChild<T, any, any>[];
    goToPage: (page: string) => void;
};

export function SequenceVisualizer<T>({
    data,
    currentPage,
    pages,
    goToPage,
}: SequenceVisualizerProps<T>) {
    return (
        <div className={styles.visualizer}>
            {pages.map((page) => {
                const isRequired = page.isRequired?.(data) !== false;
                const isComplete =
                    isRequired && 'isComplete' in page && page.isComplete(data);
                const isForm = 'Component' in page;
                const clickHandler = isForm
                    ? () => goToPage(page.id)
                    : undefined;
                return (
                    <div
                        className={classNames(
                            styles.page,
                            !('pages' in page) &&
                                page.id === currentPage.id &&
                                styles.currentPage,
                            isRequired && isComplete && styles.complete,
                            !isRequired && styles.notNeeded,
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
                                goToPage={goToPage}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
}
