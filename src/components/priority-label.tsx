import type { PriorityLevelType } from '@/types'

type PriorityProps = {
	level: PriorityLevelType | null
}

const PriorityMap: Record<PriorityLevelType, string> = {
	high: 'Alta',
	medium: 'Média',
	low: 'Baixa',
}

/**
 * Renders a priority label with a colored badge and the Portuguese label for the given priority level.
 *
 * If `level` is falsy the component renders nothing. For a valid level it shows a small colored dot and the corresponding label:
 * - 'high' → red dot, "Alta"
 * - 'medium' → yellow dot, "Média"
 * - 'low' → green dot, "Baixa"
 *
 * @param level - The priority level to display; when falsy the component returns nothing.
 * @returns A JSX element with the badge and label when `level` is provided, otherwise `undefined`.
 */
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
