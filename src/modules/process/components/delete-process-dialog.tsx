'use client'

import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { useDeleteProcess } from '@/hooks/process/use-delete-process'
import type { Process } from '@/types/process'
import type { Id } from '../../../../convex/_generated/dataModel'

interface DeleteProcessDialogProps {
	process: Process
	open: boolean
	onOpenChange: (open: boolean) => void
}

export function DeleteProcessDialog({
	process,
	open,
	onOpenChange,
}: DeleteProcessDialogProps) {
	const { deleteProcess, isPending } = useDeleteProcess()

	const handleDelete = () => {
		deleteProcess({ id: process._id as Id<'processes'> })
		onOpenChange(false)
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Excluir Processo</DialogTitle>
					<DialogDescription>
						Tem certeza que deseja excluir o processo{' '}
						<strong>{process.register}</strong>?
						<br />
						Esta ação não pode ser desfeita e todos os prazos associados também
						serão excluídos.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<Button
						variant="outline"
						onClick={() => onOpenChange(false)}
						disabled={isPending}
					>
						Cancelar
					</Button>
					<Button
						variant="destructive"
						onClick={handleDelete}
						disabled={isPending}
					>
						{isPending ? 'Excluindo...' : 'Excluir'}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
