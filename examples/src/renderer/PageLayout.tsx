import React, { type ReactNode } from 'react';
import './PageLayout.css';

interface Props {
	children: ReactNode;
}

export const PageLayout = ({ children }: Props) => {
	return (
		<React.StrictMode>
			<Navigation>
				<a href="/">Home</a>
				<a href="/about">About</a>
			</Navigation>
			<Content>{children}</Content>
		</React.StrictMode>
	);
};
const Navigation = ({ children }: Props) => {
	return (
		<div
			style={{
				paddingBottom: 25,
				paddingTop: 5,
				fontSize: '1.2em',
				display: 'flex',
				justifyContent: 'center',
				gap: 25,
			}}
		>
			{children}
		</div>
	);
};
const Content = ({ children }: Props) => {
	return <div>{children}</div>;
};
