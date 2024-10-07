import type { PropsWithChildren } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Very Long Building Form',
};
export default function Layout({ children }: PropsWithChildren) {
    return <>{children}</>;
}
