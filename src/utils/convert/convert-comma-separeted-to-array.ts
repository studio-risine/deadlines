export function convertCommaSeparatedToArray(
	value: string | undefined | null,
	separator = ',',
): string[] {
	if (!value) return []

	return value
		.split(separator)
		.map((item) => item.trim())
		.filter(Boolean)
}
