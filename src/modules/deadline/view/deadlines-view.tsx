import { PageHeader } from '@/components/page-header'
import { SiteHeader } from '@/components/site-header'
import { columns } from '../components/columns'
import { DataTable } from '../components/data-table'
import { PageDeadlineActions } from '../components/page-actions'

/**
 * Renders the "Meus Prazos" page: site header, page header with actions, and the deadlines data table.
 *
 * This is a presentational component that composes SiteHeader, PageHeader (with PageDeadlineActions),
 * and DataTable (configured with the imported `columns`). Optional overview sections (cards, chart)
 * are currently commented out.
 *
 * @returns The page's JSX element.
 */
export function DeadlinesView() {
	return (
		<>
			<SiteHeader title="Meus Prazos" />
			<div className="flex flex-1 flex-col">
				<div className="@container/main flex flex-1 flex-col gap-2">
					<div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
						<PageHeader title="Meus Prazos">
							<PageDeadlineActions />
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
