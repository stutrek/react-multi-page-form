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
            <body className="antialiased">
                {children}
                <div className="container max-w-3xl mx-auto p-4 text-sm text-gray-400">
                    <hr className="mb-3" />
                    &copy; 2024 Stu Kabakoff
                </div>
            </body>
            <script
                defer
                src="https://umami.stutrek.com/script.js"
                data-website-id="3af56b1c-38b6-421c-b59c-64fe9fb50784"
            />
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
