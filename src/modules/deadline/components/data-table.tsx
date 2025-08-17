'use client'

import type { ColumnDef } from '@tanstack/react-table'

import {
	type ColumnLabelConfig,
	DataTableWrapper,
	type FilterConfig,
} from '@/components/ui/data-table-wrapper'
import { useQueryDeadlines } from '@/hooks/deadline/use-query-deadline'
import { useQuery } from 'convex/react'
import { api } from '../../../../convex/_generated/api'

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[]
}

/**
 * Renders a configurable data table for deadlines using the provided column definitions.
 *
 * This client component fetches deadline rows via `useQueryDeadlines()` and passes them,
 * along with search, filter, column label and pagination configuration, into `DataTableWrapper`.
 *
 * @param columns - Column definitions (TanStack ColumnDef) that determine table columns and cell rendering.
 * @returns A React element containing the configured DataTableWrapper populated with deadline data.
 */
export function DataTable<TData, TValue>({
	columns,
}: DataTableProps<TData, TValue>) {
	const { deadlines } = useQueryDeadlines()

	const filters: FilterConfig[] = [
		{
			id: 'status',
			placeholder: 'Filtrar por status',
			options: [
				{ value: 'missed', label: 'Vencido' },
				{ value: 'in-progress', label: 'Em andamento' },
				{ value: 'done', label: 'Concluído' },
			],
		},
		{
			id: 'priority',
			placeholder: 'Filtrar por prioridade',
			options: [
				{ value: 'hight', label: 'Alta' },
				{ value: 'medium', label: 'Média' },
				{ value: 'low', label: 'Baixa' },
			],
		},
	]

	const columnLabels: ColumnLabelConfig = {
		header: 'Processo',
		Title: 'Descrição',
		type: 'Tipo',
		// status: 'Status',
		priorityLevel: 'Prioridade',
		limit: 'Prazo Fatal',
		assigned: 'Responsável',
	}

	return (
		<DataTableWrapper
			columns={columns}
			data={deadlines ?? []}
			searchColumn="header"
			searchPlaceholder="Filtrar por processo ou descrição..."
			filters={filters}
			columnLabels={columnLabels}
			enableRowSelection={true}
			enableColumnVisibility={true}
			pageSize={10}
			pageSizeOptions={[10, 20, 30, 40, 50]}
		/>
	)
}
