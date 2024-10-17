import type { MDXComponents } from 'mdx/types';

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        a: (props) => {
            let href = props.href as string;
            if (href?.startsWith('/')) {
                href = `/react-multi-page-form${href}`;
            }
            return <a {...props} href={href} />;
        },
        img: (props) => {
            let src = props.src as string;
            if (src?.startsWith('/')) {
                src = `/react-multi-page-form${src}`;
            }
            // biome-ignore lint/a11y/useAltText: <explanation>
            return <img {...props} src={src} />;
        },
        ...components,
    };
}
