import { PageActions } from '@/components/page-actions'
import { AddProcessDialog } from './add-process-dialog'

/**
 * Page action controls for the Process page.
 *
 * Renders a PageActions container wrapping an AddProcessDialog. This is a simple presentational component with no props or state.
 *
 * @returns The component's JSX element.
 */
export function PageProcessActions() {
	return (
		<PageActions>
			<AddProcessDialog />
		</PageActions>
	)
}
