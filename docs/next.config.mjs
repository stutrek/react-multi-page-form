import createMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';
import rehypeShiki from '@leafac/rehype-shiki';
import * as shiki from 'shiki';

/** @type {import('next').NextConfig} */
const nextConfig = {
    // Configure `pageExtensions` to include markdown and MDX files
    pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
    // Optionally, add any other Next.js config below
};

async function getConfig() {
    const highlighter = await shiki.getHighlighter({
        theme: 'light-plus',
    });

    const withMDX = createMDX({
        extension: /\.mdx?$/,
        // Add markdown plugins here, as desired
        options: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [
                [
                    rehypeShiki,
                    {
                        highlighter,
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
        },
    });

    // Merge MDX config with Next.js config
    return withMDX(nextConfig);
}

export default await getConfig();
