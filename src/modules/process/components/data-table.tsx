'use client'

import type { ColumnDef } from '@tanstack/react-table'

import {
	type ColumnLabelConfig,
	DataTableWrapper,
	type FilterConfig,
} from '@/components/ui/data-table-wrapper'
import { PROCESS_STATUS } from '@/constants/process'
import { useQueryProcesses } from '@/hooks/process/use-query-process'
import { processTableDTO } from '../shared/process-table-dto'
interface IDataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[]
}

export interface IDataTableOutput {
	id: string
	createdAt: number
	caseNumber: string
	client: string
	adverse: string | null
	status: string
}

export function DataTable<TData, TValue>({
	columns,
}: IDataTableProps<TData, TValue>) {
	const { processes } = useQueryProcesses()

	const tableData: IDataTableOutput[] = processes.map(processTableDTO)

	const filters: FilterConfig[] = [
		{
			id: 'status',
			placeholder: 'Filtrar por status',
			options: PROCESS_STATUS,
		},
	]

	const columnLabels: ColumnLabelConfig = {
		caseNumber: 'Número do Processo',
		client: 'Cliente',
		adverse: 'Parte Adversa',
		status: 'Status',
		createdAt: 'Data de Criação',
	}

	return (
		<DataTableWrapper
			columns={columns}
			data={tableData as TData[]}
			searchColumn="caseNumber"
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
