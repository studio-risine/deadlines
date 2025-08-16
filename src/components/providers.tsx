'use client'

import { useAuth } from '@clerk/nextjs'
import { ConvexQueryClient } from '@convex-dev/react-query'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ConvexReactClient } from 'convex/react'
import { ConvexProviderWithClerk } from 'convex/react-clerk'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import type * as React from 'react'

if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
	throw new Error('Missing NEXT_PUBLIC_CONVEX_URL in your .env file')
}

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL)
const convexQueryClient = new ConvexQueryClient(convex)
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			queryKeyHashFn: convexQueryClient.hashFn(),
			queryFn: convexQueryClient.queryFn(),
		},
	},
})
convexQueryClient.connect(queryClient)

/**
 * Wraps children with theme, authentication, Convex, and React Query providers.
 *
 * This component composes NextThemesProvider (theme handling), ConvexProviderWithClerk (Convex client + Clerk auth),
 * and QueryClientProvider (TanStack Query) so descendant components have access to theme context, authenticated
 * Convex client operations, and the configured React Query client.
 *
 * @param children - The React node(s) to render inside the provider tree.
 * @returns A JSX element that provides theme, auth/Convex, and React Query contexts to `children`.
 */
export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<NextThemesProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			disableTransitionOnChange
			enableColorScheme
		>
			<ConvexProviderWithClerk client={convex} useAuth={useAuth}>
				<QueryClientProvider client={queryClient}>
					{children}
				</QueryClientProvider>
			</ConvexProviderWithClerk>
		</NextThemesProvider>
	)
}
