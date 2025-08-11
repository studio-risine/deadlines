import { IconInnerShadowTop } from '@tabler/icons-react'

interface NavBrandProps {
	href: string
}

export function NavBrand({ href }: NavBrandProps) {
	return (
		<a href={href}>
			<IconInnerShadowTop className="!size-5" />
			<span className="font-semibold text-base">Acme Inc.</span>
		</a>
	)
}
