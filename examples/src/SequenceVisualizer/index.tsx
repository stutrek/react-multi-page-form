import classNames from 'classnames';
import type { SequenceChild } from '../../../src/types';
import styles from './SequenceVisualizer.module.css';

type SequenceVisualizerProps<T> = {
    data: T;
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    currentPage: SequenceChild<T, any, any>;
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    pages: SequenceChild<T, any, any>[];
    idPrefix: string;
};

export function SequenceVisualizer<T>({
    data,
    currentPage,
    pages,
    idPrefix = '',
}: SequenceVisualizerProps<T>) {
    return (
        <div>
            {pages.map((page) => {
                return (
                    <div
                        className={classNames(
                            styles.page,
                            `${idPrefix}${page.id}` === currentPage.id &&
                                styles.currentPage,
                            'isComplete' in page &&
                                page.isComplete(data) &&
                                styles.complete,
                            page.isNeeded?.(data) === false && styles.notNeeded,
                        )}
                        key={page.id}
                    >
                        <div className={styles.label}>
                            {page.id
                                .replace(/([A-Z])/g, ' $1')
                                .replace(/^./, (str) => str.toUpperCase())}
                        </div>
                        {'pages' in page && (
                            <SequenceVisualizer
                                data={data}
                                currentPage={currentPage}
                                pages={page.pages}
                                idPrefix={`${idPrefix}${page.id}.`}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
}
