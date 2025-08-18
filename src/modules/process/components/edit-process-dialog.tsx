'use client'

import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import type { Process } from '@/types/process'
import { EditProcessForm } from './edit-process-form'

interface EditProcessDialogProps {
	process: Process
	open: boolean
	onOpenChange: (open: boolean) => void
}

export function EditProcessDialog({
	process,
	open,
	onOpenChange,
}: EditProcessDialogProps) {
	const handleSuccess = () => {
		onOpenChange(false)
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[500px]">
				<DialogHeader>
					<DialogTitle>Editar Processo</DialogTitle>
					<DialogDescription>
						Atualize os dados do processo. O número do processo não pode ser
						alterado.
					</DialogDescription>
				</DialogHeader>
				<EditProcessForm process={process} onSuccess={handleSuccess} />
			</DialogContent>
		</Dialog>
	)
}
