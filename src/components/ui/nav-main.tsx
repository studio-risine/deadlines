'use client'

import type { RemixiconComponentType } from '@remixicon/react'
import Link from 'next/link'
import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from './sidebar'

export function NavMain({
	items,
}: {
	items: {
		title: string
		url: string
		icon?: RemixiconComponentType
	}[]
}) {
	return (
		<SidebarGroup>
			<SidebarGroupContent className="flex flex-col gap-2">
				<SidebarMenu>
					{items.map((item) => (
						<SidebarMenuItem key={item.title}>
							<SidebarMenuButton tooltip={item.title}>
								<Link
									href={item.url}
									className="flex w-full grow items-center gap-2"
								>
									{item.icon && <item.icon className="size-3" />}
									<span>{item.title}</span>
								</Link>
							</SidebarMenuButton>
						</SidebarMenuItem>
					))}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	)
}
