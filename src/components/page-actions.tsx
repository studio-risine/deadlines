/**
 * Right-aligned container for action elements.
 *
 * Renders a flex container that aligns its children to the right, centers them vertically, and applies spacing between items.
 *
 * @param children - Action elements (buttons, links, etc.) to display in the container.
 * @returns A JSX element wrapping the provided children.
 */
export function PageActions({ children }: { children: React.ReactNode }) {
	return <div className="flex items-center justify-end gap-4">{children}</div>
}
