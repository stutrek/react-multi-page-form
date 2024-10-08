import React from 'react';
import navStyles from './nav.module.scss';
import Link from 'next/link';

type HeaderProps = {
    showLogo?: boolean;
};

export function Header({ showLogo = true }: HeaderProps) {
    return (
        <header className="p-4y border-b border-gray-300">
            <div className="container max-w-3xl mx-auto flex justify-between items-center whitespace-nowrap">
                <nav className={navStyles.header}>
                    <ul className="flex">
                        {showLogo ? (
                            <li>
                                <Link href="/">
                                    <img
                                        src="/react-multi-page-form/Logo.svg"
                                        alt="React Multi Page Form"
                                        className="h-7"
                                    />
                                </Link>
                            </li>
                        ) : null}
                        <li>
                            <button type="button">Docs</button>
                            <ul className="shadow-lg rounded-lg">
                                <li>
                                    <Link href="/docs">Getting Started</Link>
                                </li>
                                <li>
                                    <Link href="/docs/using">
                                        Using React Multi Page Form
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/docs/api">API Reference</Link>
                                </li>
                                <li>
                                    <Link href="/docs/complex-flows">
                                        Handling Complex Flows
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/docs/testing">
                                        Testing Flows and Forms
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <button type="button">Demos</button>
                            <ul className="shadow-lg rounded-lg">
                                <li>
                                    <Link href="/demos/petrock">
                                        Pet Rock Registration Form
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/demos/building">
                                        Building Permits
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/demos/two-pager">
                                        Simple Two Pager
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>
                <nav>
                    <a href="https://github.com/stutrek/react-multi-page-form">
                        GitHub
                    </a>
                </nav>
            </div>
        </header>
    );
}
