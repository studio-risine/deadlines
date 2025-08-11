import '@/styles/global.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({
	subsets: ['latin'],
	display: 'swap',
})

export const metadata: Metadata = {
	title: 'tc96/next-starter',
	description:
		'This is a boilerplate to help you quickly set up and start building applications with Next.js. It includes essential configurations, tools, and best practices to get you started.',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="pt-BR">
			<body className={`${inter.className} antialiased`}>
				<div className="flex h-screen items-center justify-center">
					{children}
				</div>
			</body>
		</html>
	)
}
