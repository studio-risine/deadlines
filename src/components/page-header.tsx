interface PageHeaderProps extends React.ComponentPropsWithoutRef<'header'> {
	title: string
	children?: React.ReactNode
}

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
