'use client'

import type { ColumnDef } from '@tanstack/react-table'

import {
	type ColumnLabelConfig,
	DataTableWrapper,
	type FilterConfig,
} from '@/components/ui/data-table-wrapper'

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[]
	data: TData[]
}

export function DataTable<TData, TValue>({
	columns,
	data,
}: DataTableProps<TData, TValue>) {
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
		description: 'Descrição',
		type: 'Tipo',
		status: 'Status',
		priority: 'Prioridade',
		limit: 'Prazo Fatal',
		assigned: 'Responsável',
	}

	return (
		<DataTableWrapper
			columns={columns}
			data={data}
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
