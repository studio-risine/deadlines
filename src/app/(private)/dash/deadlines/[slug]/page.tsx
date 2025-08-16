import { DeadlineView } from '@/modules/deadline/view/deadline-view'
import { useParams } from 'next/navigation'

export default async function Page({
	params,
}: {
	params: Promise<{ slug: string }>
}) {
	const { slug } = await params
	return <DeadlineView id={slug} />
}
