import type { PropsWithChildren } from 'react';
import { Header } from '../header';

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
