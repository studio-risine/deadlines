'use client'

import * as DialogPrimitive from '@radix-ui/react-dialog'
import { XIcon } from 'lucide-react'
import type * as React from 'react'

import { cn } from '@/lib/utils'

/**
 * Root dialog wrapper that renders Radix's DialogPrimitive.Root with a slot attribute.
 *
 * Renders DialogPrimitive.Root with `data-slot="dialog"` and forwards all received props to the underlying primitive.
 *
 * @returns A DialogPrimitive.Root element.
 */
function Dialog({
	...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
	return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

/**
 * Wrapper around Radix UI's Dialog Trigger that adds a `data-slot="dialog-trigger"` attribute and forwards all props.
 *
 * @param props - Props to pass through to `DialogPrimitive.Trigger`.
 */
function DialogTrigger({
	...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
	return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

/**
 * Dialog portal wrapper that injects a slot attribute and forwards all props.
 *
 * Renders `DialogPrimitive.Portal` with `data-slot="dialog-portal"` for slot-based styling hooks.
 * All received props (including `children`) are passed through to the underlying Radix Portal.
 */
function DialogPortal({
	...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
	return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

/**
 * Wrapper around Radix's DialogPrimitive.Close that adds a `data-slot="dialog-close"` attribute.
 *
 * Renders DialogPrimitive.Close and forwards all props to the underlying primitive.
 */
function DialogClose({
	...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
	return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

/**
 * Backdrop overlay for dialogs with built-in state-based animations and styling.
 *
 * Renders a Radix Overlay with `data-slot="dialog-overlay"`, applies default backdrop
 * classes (fixed inset, semi-transparent black, z-index) and data-state driven
 * animation classes, merges any provided `className`, and forwards all other props.
 */
function DialogOverlay({
	className,
	...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
	return (
		<DialogPrimitive.Overlay
			data-slot="dialog-overlay"
			className={cn(
				'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50 data-[state=closed]:animate-out data-[state=open]:animate-in',
				className,
			)}
			{...props}
		/>
	)
}

/**
 * Renders dialog content inside a Portal with an overlay and optional close button.
 *
 * The component composes DialogPortal, DialogOverlay, and Radix DialogPrimitive.Content,
 * applies consistent styling and data-slot attributes for slot-based theming, and forwards
 * all remaining props to DialogPrimitive.Content.
 *
 * @param className - Additional classes to merge with the component's default styling.
 * @param children - Content to render inside the dialog panel.
 * @param showCloseButton - If true (default), renders a positioned close button with an accessible "Close" label.
 * @returns A React element wrapping the dialog content, overlay, and portal.
 */
function DialogContent({
	className,
	children,
	showCloseButton = true,
	...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
	showCloseButton?: boolean
}) {
	return (
		<DialogPortal data-slot="dialog-portal">
			<DialogOverlay />
			<DialogPrimitive.Content
				data-slot="dialog-content"
				className={cn(
					'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-6 rounded-lg border bg-background p-6 shadow-lg duration-200 data-[state=closed]:animate-out data-[state=open]:animate-in sm:max-w-lg',
					className,
				)}
				{...props}
			>
				{children}
				{showCloseButton && (
					<DialogPrimitive.Close
						data-slot="dialog-close"
						className="absolute top-4 right-4 rounded-xs opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0"
					>
						<XIcon />
						<span className="sr-only">Close</span>
					</DialogPrimitive.Close>
				)}
			</DialogPrimitive.Content>
		</DialogPortal>
	)
}

/**
 * Layout wrapper for a dialog header region.
 *
 * Renders a div with `data-slot="dialog-header"`, applies default header layout and typography
 * classes (stacked, small gap, centered on small screens / left-aligned on larger screens),
 * and forwards all other props to the underlying element.
 *
 * @param className - Optional additional CSS classes to merge with the component's defaults.
 */
function DialogHeader({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="dialog-header"
			className={cn('flex flex-col gap-2 text-center sm:text-left', className)}
			{...props}
		/>
	)
}

/**
 * Footer container for Dialog content with responsive layout for action controls.
 *
 * Renders a div with `data-slot="dialog-footer"`, applies responsive spacing and alignment
 * (stacked column-reverse on small screens, row aligned to end on larger screens),
 * merges any provided `className`, and forwards all other props to the underlying element.
 */
function DialogFooter({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="dialog-footer"
			className={cn(
				'flex flex-col-reverse gap-2 sm:flex-row sm:justify-end',
				className,
			)}
			{...props}
		/>
	)
}

/**
 * Title element for the dialog that applies slot metadata and default title styles.
 *
 * Renders a Radix Dialog Title with a `data-slot="dialog-title"` attribute and default
 * typography classes; any `className` passed in is merged with the defaults.
 *
 * @param className - Additional CSS classes to merge with the component's defaults
 */
function DialogTitle({
	className,
	...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
	return (
		<DialogPrimitive.Title
			data-slot="dialog-title"
			className={cn('font-semibold text-lg leading-none', className)}
			{...props}
		/>
	)
}

/**
 * Renders a styled Dialog description slot.
 *
 * Wraps `DialogPrimitive.Description`, adding `data-slot="dialog-description"` and
 * merging a default "text-muted-foreground text-sm" class with any provided `className`.
 */
function DialogDescription({
	className,
	...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
	return (
		<DialogPrimitive.Description
			data-slot="dialog-description"
			className={cn('text-muted-foreground text-sm', className)}
			{...props}
		/>
	)
}

export {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogOverlay,
	DialogPortal,
	DialogTitle,
	DialogTrigger,
}
