import type { PropsWithChildren } from 'react';
import { Header } from '../header';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        template: '%s | Demos',
        default: 'Demos',
    },
};

export default function DemoLayout({ children }: PropsWithChildren) {
    return (
        <>
            <Header />
            <div className="container max-w-3xl mx-auto prose p-4">
                {children}
            </div>
        </>
    );
}
