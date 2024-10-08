import type { MDXComponents } from 'mdx/types';

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        a: (props) => {
            let href = props.href as string;
            if (href?.startsWith('/')) {
                href = `/react-multi-page-form${href}`;
            }
            return <a href={href} {...props} />;
        },
        ...components,
    };
}
