export type Priority = 'high' | 'medium' | 'low'

type PriorityProps = {
	value: Priority | null
}

const PriorityMap: Record<Priority, string> = {
	high: 'Alta',
	medium: 'Média',
	low: 'Baixa',
}

export function PriorityLabel({ value }: PriorityProps) {
	if (!value) return

	return (
		<div className="flex items-center gap-2">
			{value === 'high' && (
				<span data-testid="badge" className="h-2 w-2 rounded-full bg-red-500" />
			)}

			{value === 'medium' && (
				<span
					data-testid="badge"
					className="h-2 w-2 rounded-full bg-yellow-500"
				/>
			)}

			{value === 'low' && (
				<span
					data-testid="badge"
					className="h-2 w-2 rounded-full bg-green-500"
				/>
			)}

			<span className="font-medium text-muted-foreground">
				{PriorityMap[value]}
			</span>
		</div>
	)
}
