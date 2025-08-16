import { PageActions } from '@/components/page-actions'
import { AddDeadlineDialog } from './add-deadline-dialog'

/**
 * Renders page action controls for deadlines.
 *
 * Displays a PageActions wrapper that contains the AddDeadlineDialog component.
 */
export function PageDeadlineActions() {
	return (
		<PageActions>
			<AddDeadlineDialog />
		</PageActions>
	)
}
