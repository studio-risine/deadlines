import { SiteHeader } from '@/components/site-header'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Separator } from '@radix-ui/react-separator'

export function DeadlineView({ id }: { id: string }) {
	return (
		<>
			<Separator orientation="vertical" className="mr-2 h-4" />
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem className="hidden md:block">
						<BreadcrumbLink href="/dash/deadlines">Deadlines</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator className="hidden md:block" />
					<BreadcrumbItem>
						<BreadcrumbPage>id: {id}</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			<SiteHeader title="Deadline" />
			<div className="w-full p-4 lg:p-6">id: {id}</div>
		</>
	)
}
