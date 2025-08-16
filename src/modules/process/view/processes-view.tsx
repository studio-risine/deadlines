import { PageHeader } from '@/components/page-header'
import { columns } from '../components/columns'
import { DataTable } from '../components/data-table'
import { PageProcessActions } from '../components/page-actions'

/**
 * Renders the Processes view: a page header with actions and a table of processes.
 *
 * The component returns the static layout for the "Processos" page: a PageHeader
 * containing PageProcessActions and a DataTable configured with the imported
 * `columns` definition. No props, state, or data fetching are handled here;
 * commented placeholders indicate where summary cards and interactive charts
 * may be added in the future.
 *
 * @returns The JSX element for the Processes page.
 */
export function ProcessesView() {
	return (
		<>
			<div className="flex flex-1 flex-col">
				<div className="@container/main flex flex-1 flex-col gap-2">
					<div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
						<PageHeader title="Processos">
							<PageProcessActions />
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
