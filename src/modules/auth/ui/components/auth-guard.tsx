'use client'

import { AuthLoading, Authenticated, Unauthenticated } from 'convex/react'
import AuthLayout from '../layouts/auth-layout'
import { SignInView } from '../views/sign-in-view'

export default function AuthGuard({ children }: { children: React.ReactNode }) {
	return (
		<>
			<AuthLoading>
				<AuthLayout>
					<div>Loading...</div>
				</AuthLayout>
			</AuthLoading>
			<Authenticated>{children}</Authenticated>
			<Unauthenticated>
				<AuthLayout>
					<SignInView />
				</AuthLayout>
			</Unauthenticated>
		</>
	)
}
