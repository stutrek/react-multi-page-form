import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';
import forms from '@tailwindcss/forms';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        container: {
            center: true,
        },
        extend: {
            // @ts-ignore
            typography: (theme) => ({
                DEFAULT: {
                    css: {
                        code: {
                            padding: '0.2em 0.4em',
                            border: `1px solid ${theme('colors.gray.200')}`,
                            borderRadius: '0.3em',
                            fontWeight: 'inherit',
                        },
                        'code::before': {
                            content: '""', // Remove the default backticks
                        },
                        'code::after': {
                            content: '""', // Remove the default backticks
                        },
                        pre: {
                            border: '1px solid theme("colors.gray.300")',
                            'border-radius': '0.5rem', // Equivalent to rounded-lg
                        },
                    },
                },
            }),
        },
    },
    plugins: [typography, forms],
};
export default config;
