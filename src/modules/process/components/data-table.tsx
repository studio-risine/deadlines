'use client'

import type { ColumnDef } from '@tanstack/react-table'

import {
	type ColumnLabelConfig,
	DataTableWrapper,
	type FilterConfig,
} from '@/components/ui/data-table-wrapper'
import { PROCESS_STATUS } from '@/constants/process'
import { useQueryProcesses } from '@/hooks/process/use-query-process'

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[]
}

export function DataTable<TData, TValue>({
	columns,
}: DataTableProps<TData, TValue>) {
	const { processes } = useQueryProcesses()

	const filters: FilterConfig[] = [
		{
			id: 'status',
			placeholder: 'Filtrar por status',
			options: PROCESS_STATUS,
		},
	]

	const columnLabels: ColumnLabelConfig = {
		register: 'Número do Processo',
		client: 'Cliente',
		opposingParty: 'Parte Contrária',
		status: 'Status',
		_creationTime: 'Data de Criação',
	}

	return (
		<DataTableWrapper
			columns={columns}
			data={(processes ?? []) as TData[]}
			searchColumn="register"
			searchPlaceholder="Filtrar por número do processo ou cliente..."
			filters={filters}
			columnLabels={columnLabels}
			enableRowSelection={true}
			enableColumnVisibility={true}
			pageSize={10}
			pageSizeOptions={[10, 20, 30, 40, 50]}
		/>
	)
}
