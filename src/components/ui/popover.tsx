'use client'

import * as PopoverPrimitive from '@radix-ui/react-popover'
import type * as React from 'react'

import { cn } from '@/lib/utils'

/**
 * Wrapper around Radix UI's Popover root that standardizes slot attribute and forwards props.
 *
 * Renders a PopoverPrimitive.Root with data-slot="popover" and forwards all received props.
 *
 * @returns The Popover root element.
 */
function Popover({
	...props
}: React.ComponentProps<typeof PopoverPrimitive.Root>) {
	return <PopoverPrimitive.Root data-slot="popover" {...props} />
}

/**
 * A thin wrapper around Radix's Popover Trigger that marks the element for tooling.
 *
 * Renders PopoverPrimitive.Trigger and forwards all received props to it. Adds
 * the attribute `data-slot="popover-trigger"` for consistent identification.
 */
function PopoverTrigger({
	...props
}: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
	return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />
}

/**
 * Popover content rendered inside a Portal with standardized styling and animations.
 *
 * Renders Radix's PopoverPrimitive.Content wrapped in a Portal, applies a composed
 * set of utility classes for entrance/exit animations, sizing, and positioning, and
 * merges any provided `className`. Also sets `data-slot="popover-content"`.
 *
 * @param className - Additional class names to merge with the default styling.
 * @param align - Content alignment relative to the trigger (defaults to `'center'`).
 * @param sideOffset - Offset in pixels from the trigger on the chosen side (defaults to `4`).
 * @returns A React element representing the popover content.
 */
function PopoverContent({
	className,
	align = 'center',
	sideOffset = 4,
	...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) {
	return (
		<PopoverPrimitive.Portal>
			<PopoverPrimitive.Content
				data-slot="popover-content"
				align={align}
				sideOffset={sideOffset}
				className={cn(
					'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-hidden data-[state=closed]:animate-out data-[state=open]:animate-in',
					className,
				)}
				{...props}
			/>
		</PopoverPrimitive.Portal>
	)
}

/**
 * Wraps Radix's Popover Anchor primitive and forwards all props.
 *
 * This component renders `PopoverPrimitive.Anchor` with a `data-slot="popover-anchor"`
 * attribute for identification and forwards any received props (including children and event handlers).
 *
 * @returns A React element rendering the Radix Popover Anchor.
 */
function PopoverAnchor({
	...props
}: React.ComponentProps<typeof PopoverPrimitive.Anchor>) {
	return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />
}

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor }
