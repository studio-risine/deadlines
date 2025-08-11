import AuthLayout from '@/modules/auth/ui/layouts/auth-layout'
import type { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
	return <AuthLayout>{children}</AuthLayout>
}
