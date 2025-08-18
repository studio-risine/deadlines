import '@/styles/global.css'

import { Providers } from '@/components/providers'
import { fontFamily } from '@/config/font-family'
import { ClerkProvider } from '@clerk/nextjs'

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="pt-BR" suppressHydrationWarning>
			<body className={`${fontFamily.className} antialiased`}>
				<ClerkProvider>
					<Providers>{children}</Providers>
				</ClerkProvider>
			</body>
		</html>
	)
}
