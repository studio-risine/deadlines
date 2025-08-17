import type * as React from 'react'

import { cn } from '@/lib/utils'

/**
 * Styled wrapper around a native `<input>` element that forwards all standard input props.
 *
 * Renders an input with a comprehensive set of default utility classes (layout, sizing, border, focus/aria-invalid styles, file-input variants, disabled and dark-mode handling). The `type` prop is passed through to the underlying input and a `data-slot="input"` attribute is added.
 *
 * @param className - Additional class names that are merged with the component's default classes.
 * @returns A JSX element representing the styled input.
 */
function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
	return (
		<input
			type={type}
			data-slot="input"
			className={cn(
				'flex h-10 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs outline-none transition-[color,box-shadow] selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:font-medium file:text-foreground file:text-sm placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30',
				'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
				'aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40',
				className,
			)}
			{...props}
		/>
	)
}

export { Input }
