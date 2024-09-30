import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import vike from 'vike/plugin';
import mdx from '@mdx-js/rollup';
import rehypeShiki from '@leafac/rehype-shiki';
import * as shiki from 'shiki';

// https://vitejs.dev/config/
export default defineConfig(async () => ({
    plugins: [
        mdx({
            // Enable server-side rendering for MDX
            // jsx: true,
            // Add rehype-shiki to the rehype plugins
            rehypePlugins: [
                [
                    // @ts-ignore
                    rehypeShiki,
                    {
                        highlighter: await shiki.getHighlighter({
                            theme: 'light-plus',
                        }),
                        theme: 'light-plus', // You can choose from Shiki's supported themes
                        langs: [
                            'javascript',
                            'typescript',
                            'python',
                            'css',
                            'html',
                        ],
                    },
                ],
            ],
        }),
        react(),
        vike({ prerender: true }),
    ],
}));
