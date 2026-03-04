import React from 'react';
import clsx from 'clsx';

type HeaderBaseProps = React.ComponentPropsWithRef<'header'>;

type HeaderComponent = React.FC<HeaderBaseProps> & {
	Title: React.FC<HeaderBaseProps>;
};

export const Header: HeaderComponent = ({ children, className, ...props }) => {
	return (
		<header
			{ ...props }
			className={clsx(
				'sticky top-0 z-10 h-12 bg-[#202020]/5 backdrop-blur-md border-b border-white/20 flex items-center justify-center',
				className
			)}
		>
			{children}
		</header>
	);
}

Header.Title = ({ children, className }) => {
	return (
		<h1 
			className={clsx(
				'text-sm font-semibold text-[#202020] tracking-wide',
				className
			)}
		>
			{children}	
		</h1>
	);
}