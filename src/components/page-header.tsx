interface PageHeaderProps extends React.ComponentPropsWithoutRef<'header'> {
	title: string
	children?: React.ReactNode
}

/**
 * Renders a simple page header with a left-aligned title and an optional right-side slot.
 *
 * The component outputs a <header> containing an <h1> with the provided `title` and renders
 * `children` to the right. Note: although the props type extends standard header attributes,
 * this implementation does not forward extra header props to the rendered element.
 *
 * @param title - Visible header title text.
 * @param children - Optional node(s) rendered to the right of the title (e.g., controls or actions).
 * @returns A JSX element representing the page header.
 */
export function PageHeader({ title, children }: PageHeaderProps) {
	return (
		<header className="flex items-center justify-between px-4 lg:px-6">
			<div>
				<h1 className="font-bold text-xl">{title}</h1>
			</div>
			{children}
		</header>
	)
}
