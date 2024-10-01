import React from 'react';
import navStyles from './nav.module.scss';
import Link from 'next/link';

type HeaderProps = {
    showLogo?: boolean;
};

export function Header({ showLogo = true }: HeaderProps) {
    return (
        <header className="p-4 border-b border-gray-300">
            <div className="container max-w-3xl mx-auto px-4">
                <nav className={navStyles.header}>
                    <ul className="flex space-x-4">
                        {showLogo ? (
                            <li>
                                <a href="/">
                                    <img
                                        src="/Logo.svg"
                                        alt="React Multi Page Form"
                                        className="h-6"
                                    />
                                </a>
                            </li>
                        ) : null}
                        <li>
                            <a href="/docs">Docs</a>
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
            </div>
        </header>
    );
}
