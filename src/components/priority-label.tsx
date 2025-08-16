import type { PriorityLevelType } from '@/types'

type PriorityProps = {
	level: PriorityLevelType | null
}

const PriorityMap: Record<PriorityLevelType, string> = {
	high: 'Alta',
	medium: 'Média',
	low: 'Baixa',
}

export function PriorityLabel({ level }: PriorityProps) {
	if (!level) return

	return (
		<div className="flex items-center gap-2">
			{level === 'high' && (
				<span data-testid="badge" className="h-2 w-2 rounded-full bg-red-500" />
			)}

			{level === 'medium' && (
				<span
					data-testid="badge"
					className="h-2 w-2 rounded-full bg-yellow-500"
				/>
			)}

			{level === 'low' && (
				<span
					data-testid="badge"
					className="h-2 w-2 rounded-full bg-green-500"
				/>
			)}

			<span className="font-medium text-muted-foreground">
				{PriorityMap[level]}
			</span>
		</div>
	)
}
