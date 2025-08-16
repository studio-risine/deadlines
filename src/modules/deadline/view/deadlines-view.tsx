import { PageHeader } from '@/components/page-header'
import { SiteHeader } from '@/components/site-header'
import { columns } from '../components/columns'
import { DataTable } from '../components/data-table'
import { PageActions } from '../components/page-actions'

export function DeadlinesView() {
	return (
		<>
			<SiteHeader title="Meus Prazos" />
			<div className="flex flex-1 flex-col">
				<div className="@container/main flex flex-1 flex-col gap-2">
					<div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
						<PageHeader title="Meus Prazos">
							<PageActions />
						</PageHeader>

						{/* <SectionCards /> */}
						{/* <div className="px-4 lg:px-6"><ChartAreaInteractive /></div> */}
						<div className="px-4 lg:px-6">
							<DataTable columns={columns} />
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
