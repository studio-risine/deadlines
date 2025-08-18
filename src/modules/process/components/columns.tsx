'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { PROCESS_STATUS } from '@/constants/process'
import type { Process } from '@/types/process'
import type { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'
import { useState } from 'react'
import { DeleteProcessDialog } from './delete-process-dialog'
import { EditProcessDialog } from './edit-process-dialog'
import { ViewProcessDialog } from './view-process-dialog'

export const columns: ColumnDef<Process>[] = [
	{
		accessorKey: 'register',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Número do Processo
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			)
		},
		cell: ({ row }) => (
			<div className="font-medium">{row.getValue('register')}</div>
		),
	},
	{
		accessorKey: 'client',
		header: 'Cliente',
		cell: ({ row }) => (
			<div className="max-w-sm">
				<p className="w-full truncate text-foreground">
					{row.getValue('client')}
				</p>
			</div>
		),
	},
	{
		accessorKey: 'opposingParty',
		header: 'Parte Contrária',
		cell: ({ row }) => {
			const opposingParty = row.getValue('opposingParty') as string | null
			return (
				<div className="max-w-sm">
					<p className="w-full truncate text-muted-foreground text-sm">
						{opposingParty || 'Não informado'}
					</p>
				</div>
			)
		},
	},
	{
		accessorKey: 'status',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Status
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			)
		},
		cell: ({ row }) => {
			const status = row.getValue('status') as string | null

			const getStatusVariant = (status: string | null) => {
				switch (status) {
					case 'active':
						return 'default'
					case 'closed':
					case 'dismissed':
						return 'secondary'
					case 'suspended':
					case 'undefined':
						return 'outline'
					case 'archived':
						return 'destructive'
					default:
						return 'outline'
				}
			}

			const getStatusLabel = (status: string | null) => {
				const statusObj = PROCESS_STATUS.find(s => s.value === status)
				return statusObj?.label ?? 'Sem status'
			}

			return (
				<Badge variant={getStatusVariant(status)} className="px-2 py-1">
					{getStatusLabel(status)}
				</Badge>
			)
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id))
		},
	},
	{
		accessorKey: '_creationTime',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Data de Criação
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			)
		},
		cell: ({ row }) => {
			const timestamp = row.getValue('_creationTime') as number
			const date = new Date(timestamp)
			return (
				<div className="font-medium">{date.toLocaleDateString('pt-BR')}</div>
			)
		},
	},
	{
		id: 'actions',
		enableHiding: false,
		cell: ({ row }) => {
			const process = row.original
			const [editOpen, setEditOpen] = useState(false)
			const [deleteOpen, setDeleteOpen] = useState(false)
			const [viewOpen, setViewOpen] = useState(false)

			return (
				<>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" className="h-8 w-8 p-0">
								<span className="sr-only">Abrir menu</span>
								<MoreHorizontal className="h-4 w-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuLabel>Ações</DropdownMenuLabel>
							<DropdownMenuItem
								onClick={() => navigator.clipboard.writeText(process.register)}
							>
								Copiar número do processo
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem onClick={() => setViewOpen(true)}>
								Visualizar detalhes
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => setEditOpen(true)}>
								Editar processo
							</DropdownMenuItem>
							<DropdownMenuItem>Ver prazos</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem
								className="text-destructive"
								onClick={() => setDeleteOpen(true)}
							>
								Excluir
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>

					<ViewProcessDialog
						process={process}
						open={viewOpen}
						onOpenChange={setViewOpen}
					/>

					<EditProcessDialog
						process={process}
						open={editOpen}
						onOpenChange={setEditOpen}
					/>

					<DeleteProcessDialog
						process={process}
						open={deleteOpen}
						onOpenChange={setDeleteOpen}
					/>
				</>
			)
		},
	},
]
