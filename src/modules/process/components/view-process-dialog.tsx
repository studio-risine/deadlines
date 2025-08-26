// 'use client'

// import { Badge } from '@/components/ui/badge'
// import { Button } from '@/components/ui/button'
// import {
// 	Dialog,
// 	DialogContent,
// 	DialogDescription,
// 	DialogHeader,
// 	DialogTitle,
// } from '@/components/ui/dialog'
// import { Separator } from '@/components/ui/separator'
// import { PROCESS_STATUS } from '@/constants/process'
// import type { Process } from '@/types/process'
// import { Edit } from 'lucide-react'
// import { useState } from 'react'
// import { EditProcessDialog } from './edit-process-dialog'

// interface ViewProcessDialogProps {
// 	process: Process
// 	open: boolean
// 	onOpenChange: (open: boolean) => void
// }

// export function ViewProcessDialog({
// 	process,
// 	open,
// 	onOpenChange,
// }: ViewProcessDialogProps) {
// 	const [editOpen, setEditOpen] = useState(false)

// 	const getStatusVariant = (status: string | null) => {
// 		switch (status) {
// 			case 'active':
// 				return 'default'
// 			case 'closed':
// 			case 'dismissed':
// 				return 'secondary'
// 			case 'suspended':
// 			case 'undefined':
// 				return 'outline'
// 			case 'archived':
// 				return 'destructive'
// 			default:
// 				return 'outline'
// 		}
// 	}

// 	const getStatusLabel = (status: string | null) => {
// 		const statusObj = PROCESS_STATUS.find((s) => s.value === status)
// 		return statusObj?.label ?? 'Sem status'
// 	}

// 	const formatDate = (timestamp: number) => {
// 		return new Date(timestamp).toLocaleDateString('pt-BR', {
// 			day: '2-digit',
// 			month: '2-digit',
// 			year: 'numeric',
// 			hour: '2-digit',
// 			minute: '2-digit',
// 		})
// 	}

// 	return (
// 		<>
// 			<Dialog open={open} onOpenChange={onOpenChange}>
// 				<DialogContent className="sm:max-w-[600px]">
// 					<DialogHeader>
// 						<div className="flex items-center justify-between">
// 							<div>
// 								<DialogTitle>Detalhes do Processo</DialogTitle>
// 								<DialogDescription>
// 									Informações completas do processo judicial
// 								</DialogDescription>
// 							</div>
// 							<Button
// 								variant="outline"
// 								size="sm"
// 								onClick={() => setEditOpen(true)}
// 							>
// 								<Edit className="mr-2 h-4 w-4" />
// 								Editar
// 							</Button>
// 						</div>
// 					</DialogHeader>

// 					{/* <div className="space-y-6">
// 						<div className="grid grid-cols-2 gap-4">
// 							<div>
// 								<h4 className="mb-2 font-semibold text-muted-foreground text-sm">
// 									Número do Processo
// 								</h4>
// 								<p className="rounded bg-muted p-2 font-mono text-sm">
// 									{process.case_number}
// 								</p>
// 							</div>
// 							<div>
// 								<h4 className="mb-2 font-semibold text-muted-foreground text-sm">
// 									Status
// 								</h4>
// 								<Badge variant={getStatusVariant(process.status)}>
// 									{getStatusLabel(process.status)}
// 								</Badge>
// 							</div>
// 						</div>

// 						<Separator />

// 						<div>
// 							<h4 className="mb-2 font-semibold text-muted-foreground text-sm">
// 								Cliente
// 							</h4>
// 							<p className="text-sm">{process.client}</p>
// 						</div>

// 						<div>
// 							<h4 className="mb-2 font-semibold text-muted-foreground text-sm">
// 								Parte Contrária
// 							</h4>
// 							<p className="text-muted-foreground text-sm">
// 								{process.opposingParty || 'Não informado'}
// 							</p>
// 						</div>

// 						<Separator />

// 						<div>
// 							<h4 className="mb-2 font-semibold text-muted-foreground text-sm">
// 								Data de Criação
// 							</h4>
// 							<p className="text-sm">{formatDate(process._creationTime)}</p>
// 						</div>
// 					</div> */}
// 				</DialogContent>
// 			</Dialog>

// 			<EditProcessDialog
// 				process={process}
// 				open={editOpen}
// 				onOpenChange={setEditOpen}
// 			/>
// 		</>
// 	)
// }
