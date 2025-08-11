import DashLayout from '@/modules/dash/layouts/dash-layout'

export default function Page({ children }: { children: React.ReactNode }) {
	return <DashLayout>{children}</DashLayout>
}
