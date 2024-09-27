// https://vike.dev/onRenderClient
export { onRenderClient };
import { createRoot } from 'react-dom/client';
import { PageLayout } from './PageLayout';
import type { ComponentType } from 'react';

interface PageContext {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	Page: ComponentType<any>;
}

async function onRenderClient(pageContext: PageContext): Promise<void> {
	const { Page } = pageContext;
	// biome-ignore lint/style/noNonNullAssertion: <explanation>
	createRoot(document.getElementById('root')!).render(
		<PageLayout>
			<Page />
		</PageLayout>,
	);
}
