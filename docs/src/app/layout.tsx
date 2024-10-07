import type { Metadata } from 'next';
import './globals.css';
import './markdown.css';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="antialiased">{children}</body>
        </html>
    );
}

export const metadata: Metadata = {
    title: {
        template: '%s | React Multi Page Form',
        default: 'React Multi Page Form',
    },
    description: 'A multi-page form library for React',
};
