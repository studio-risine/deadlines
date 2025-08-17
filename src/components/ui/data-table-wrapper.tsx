'use client'

import type {
	ColumnDef,
	ColumnFiltersState,
	SortingState,
	VisibilityState,
} from '@tanstack/react-table'
import {
	flexRender,
	getCoreRowModel,
	getFacetedRowModel,
	getFacetedUniqueValues,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import {
	ChevronDown,
	ChevronLeft,
	ChevronRight,
	ChevronsLeft,
	ChevronsRight,
	Search,
	Settings2,
} from 'lucide-react'

export interface FilterConfig {
	id: string
	placeholder: string
	options?: { value: string; label: string }[]
	type?: 'text' | 'select'
}

export interface ColumnLabelConfig {
	[key: string]: string
}

interface DataTableWrapperProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[]
	data: TData[]
	searchColumn?: string
	searchPlaceholder?: string
	filters?: FilterConfig[]
	columnLabels?: ColumnLabelConfig
	enableRowSelection?: boolean
	enableColumnVisibility?: boolean
	pageSize?: number
	pageSizeOptions?: number[]
}

/**
 * Renders a configurable, feature-rich data table built on TanStack React Table.
 *
 * The component provides global search (targeting a configurable column), per-column filters
 * (text or select), column visibility toggles, optional row selection, and pagination with
 * page-size controls. UI labels and placeholders in this implementation are in Portuguese.
 *
 * Notable props and default behaviors:
 * - `searchColumn` (default: `"header"`): column id used for the global search input.
 * - `filters` (default: `[]`): list of per-column filters; each can be `text` or `select`.
 * - `enableRowSelection` (default: `true`) and `enableColumnVisibility` (default: `true`) toggle
 *   the respective UI and state handling.
 * - `pageSize` (default: `10`) and `pageSizeOptions` (default: `[10, 20, 30, 40, 50]`) control pagination.
 *
 * The component is generic over table row data (`TData`) and cell value type (`TValue`) and expects
 * `columns` to be TanStack ColumnDef definitions and `data` to be the array of rows to display.
 *
 * @returns A React element containing the rendered data table and its controls.
 */
export function DataTableWrapper<TData, TValue>({
	columns,
	data,
	searchColumn = 'header',
	searchPlaceholder = 'Filtrar...',
	filters = [],
	columnLabels = {},
	enableRowSelection = true,
	enableColumnVisibility = true,
	pageSize = 10,
	pageSizeOptions = [10, 20, 30, 40, 50],
}: DataTableWrapperProps<TData, TValue>) {
	const [sorting, setSorting] = React.useState<SortingState>([])
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[],
	)
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({})
	const [rowSelection, setRowSelection] = React.useState({})

	const table = useReactTable({
		data,
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		getFacetedRowModel: getFacetedRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues(),
		initialState: {
			pagination: {
				pageSize,
			},
		},
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
		},
		enableRowSelection,
	})

	const getColumnLabel = (columnId: string): string => {
		return columnLabels[columnId] || columnId
	}

	return (
		<div className="w-full space-y-4">
			<div className="flex items-center justify-between">
				<div className="flex flex-1 items-center space-x-2">
					<div className="relative">
						<Search className="absolute top-2.5 left-2 h-4 w-4 text-muted-foreground" />
						<Input
							placeholder={searchPlaceholder}
							value={
								(table.getColumn(searchColumn)?.getFilterValue() as string) ??
								''
							}
							onChange={(event) =>
								table
									.getColumn(searchColumn)
									?.setFilterValue(event.target.value)
							}
							className="max-w-sm pl-8"
						/>
					</div>

					{filters.map((filter) => (
						<Select
							key={filter.id}
							value={
								(
									table.getColumn(filter.id)?.getFilterValue() as string[]
								)?.join(',') ?? 'all'
							}
							onValueChange={(value) =>
								table
									.getColumn(filter.id)
									?.setFilterValue(
										value && value !== 'all' ? [value] : undefined,
									)
							}
						>
							<SelectTrigger className="w-[180px]">
								<SelectValue placeholder={filter.placeholder} />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">Todos</SelectItem>
								{filter.options?.map((option) => (
									<SelectItem key={option.value} value={option.value}>
										{option.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					))}
				</div>

				{enableColumnVisibility && (
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline" className="ml-auto">
								<Settings2 className="mr-2 h-4 w-4" />
								Colunas
								<ChevronDown className="ml-2 h-4 w-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" className="w-[200px]">
							{table
								.getAllColumns()
								.filter(
									(column) =>
										typeof column.accessorFn !== 'undefined' &&
										column.getCanHide(),
								)
								.map((column) => {
									return (
										<DropdownMenuCheckboxItem
											key={column.id}
											className="capitalize"
											checked={column.getIsVisible()}
											onCheckedChange={(value) =>
												column.toggleVisibility(!!value)
											}
										>
											{getColumnLabel(column.id)}
										</DropdownMenuCheckboxItem>
									)
								})}
						</DropdownMenuContent>
					</DropdownMenu>
				)}
			</div>

			<div className="rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id} colSpan={header.colSpan}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext(),
													)}
										</TableHead>
									)
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && 'selected'}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									Nenhum resultado encontrado.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>

			<div className="flex items-center justify-between space-x-2 py-4">
				{enableRowSelection && (
					<div className="flex-1 text-muted-foreground text-sm">
						{table.getFilteredSelectedRowModel().rows.length} de{' '}
						{table.getFilteredRowModel().rows.length} linha(s) selecionada(s).
					</div>
				)}

				<div className="flex items-center space-x-6 lg:space-x-8">
					<div className="flex items-center space-x-2">
						<p className="font-medium text-sm">Linhas por página</p>

						<Select
							value={`${String(table.getState().pagination.pageSize)}`}
							onValueChange={(value) => {
								table.setPageSize(Number(value))
							}}
						>
							<SelectTrigger className="h-8 w-[70px]">
								<SelectValue
									placeholder={table.getState().pagination.pageSize}
								/>
							</SelectTrigger>
							<SelectContent side="top">
								{pageSizeOptions.map((size) => (
									<SelectItem key={size} value={`${String(size)}`}>
										{size}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					<div className="flex w-[100px] items-center justify-center font-medium text-sm">
						Página {table.getState().pagination.pageIndex + 1} de{' '}
						{table.getPageCount()}
					</div>

					<div className="flex items-center space-x-2">
						<Button
							variant="outline"
							className="hidden h-8 w-8 p-0 lg:flex"
							onClick={() => table.setPageIndex(0)}
							disabled={!table.getCanPreviousPage()}
						>
							<span className="sr-only">Ir para primeira página</span>
							<ChevronsLeft className="h-4 w-4" />
						</Button>
						<Button
							variant="outline"
							className="h-8 w-8 p-0"
							onClick={() => table.previousPage()}
							disabled={!table.getCanPreviousPage()}
						>
							<span className="sr-only">Ir para página anterior</span>
							<ChevronLeft className="h-4 w-4" />
						</Button>
						<Button
							variant="outline"
							className="h-8 w-8 p-0"
							onClick={() => table.nextPage()}
							disabled={!table.getCanNextPage()}
						>
							<span className="sr-only">Ir para próxima página</span>
							<ChevronRight className="h-4 w-4" />
						</Button>
						<Button
							variant="outline"
							className="hidden h-8 w-8 p-0 lg:flex"
							onClick={() => table.setPageIndex(table.getPageCount() - 1)}
							disabled={!table.getCanNextPage()}
						>
							<span className="sr-only">Ir para última página</span>
							<ChevronsRight className="h-4 w-4" />
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}
