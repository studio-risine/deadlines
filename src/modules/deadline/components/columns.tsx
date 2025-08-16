'use client'

import { PriorityLabel } from '@/components/priority-label'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Label } from '@/components/ui/label'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import type { PriorityLevelType } from '@/types'
import type { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'
import { z } from 'zod'

export const deadlineSchema = z.object({
	id: z.number(),
	header: z.string(),
	title: z.string(),
	type: z.string(),
	status: z.string(),
	limit: z.string(),
	priorityLevel: z.enum(['high', 'medium', 'low']),
	assigned: z.string(),
})

export type Deadline = z.infer<typeof deadlineSchema>

export const columns: ColumnDef<Deadline>[] = [
	{
		accessorKey: 'header',
		header: 'Processo',
		cell: ({ row }) => (
			<div className="font-medium">{row.getValue('header')}</div>
		),
	},
	{
		accessorKey: 'title',
		header: 'Title',
		cell: ({ row }) => (
			<div className="max-w-sm">
				<p className="w-full truncate text-muted-foreground text-sm">
					{row.getValue('title')}
				</p>
			</div>
		),
	},
	{
		accessorKey: 'type',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Tipo
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			)
		},
		cell: ({ row }) => (
			<Badge variant="outline" className="px-2 py-1">
				{row.getValue('type')}
			</Badge>
		),
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id))
		},
	},
	// {
	// 	accessorKey: 'status',
	// 	header: 'Status',
	// 	cell: ({ row }) => {
	// 		const status = row.getValue('status') as string
	// 		return (
	// 			<Badge
	// 				variant={status === 'Vencido' ? 'destructive' : 'secondary'}
	// 				className="px-2 py-1"
	// 			>
	// 				{status}
	// 			</Badge>
	// 		)
	// 	},
	// 	filterFn: (row, id, value) => {
	// 		return value.includes(row.getValue(id))
	// 	},
	// },
	{
		accessorKey: 'priorityLevel',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Prioridade
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			)
		},
		cell: ({ row }) => {
			const priority = row.getValue('priorityLevel') as PriorityLevelType

			return (
				<Badge variant="outline" className="px-2 py-1">
					<PriorityLabel level={priority} />
				</Badge>
			)
		},
	},
	// {
	// 	accessorKey: 'limit',
	// 	header: ({ column }) => {
	// 		return (
	// 			<Button
	// 				variant="ghost"
	// 				onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
	// 			>
	// 				Prazo Fatal
	// 				<ArrowUpDown className="ml-2 h-4 w-4" />
	// 			</Button>
	// 		)
	// 	},
	// 	cell: ({ row }) => {
	// 		const limit = row.getValue('limit') as string
	// 		const today = new Date()
	// 		const limitDate = new Date(limit.split('/').reverse().join('-'))
	// 		const isOverdue = limitDate < today

	// 		return (
	// 			<div
	// 				className={`font-medium ${isOverdue ? 'text-red-600' : 'text-foreground'}`}
	// 			>
	// 				{limit}
	// 			</div>
	// 		)
	// 	},
	// },
	{
		accessorKey: 'assignedTo',
		header: 'Responsável',
		cell: ({ row }) => {
			const assigned = row.getValue('assignedTo') as string
			const isAssigned = assigned !== 'Assigned to'

			if (isAssigned) {
				return <div className="font-medium">{assigned}</div>
			}

			return (
				<>
					<Label htmlFor={`${row.original.id}-assigned`} className="sr-only">
						Responsável
					</Label>
					<Select>
						<SelectTrigger
							className="w-[180px]"
							size="sm"
							id={`${row.original.id}-assigned`}
						>
							<SelectValue placeholder="Selecionar responsável" />
						</SelectTrigger>
						<SelectContent align="end">
							<SelectItem value="Dr. João Advogado">
								Dr. João Advogado
							</SelectItem>
							<SelectItem value="Dra. Maria Silva">Dra. Maria Silva</SelectItem>
							<SelectItem value="Dr. Pedro Santos">Dr. Pedro Santos</SelectItem>
						</SelectContent>
					</Select>
				</>
			)
		},
	},
	{
		id: 'actions',
		enableHiding: false,
		cell: ({ row }) => {
			const deadline = row.original

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Open menu</span>
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Ações</DropdownMenuLabel>
						<DropdownMenuItem
							onClick={() =>
								navigator.clipboard.writeText(deadline.id.toString())
							}
						>
							Copiar ID
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem>Visualizar detalhes</DropdownMenuItem>
						<DropdownMenuItem>Editar prazo</DropdownMenuItem>
						<DropdownMenuItem>Marcar como concluído</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem className="text-destructive">
							Excluir
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			)
		},
	},
]
