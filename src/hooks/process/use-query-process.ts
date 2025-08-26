'use client'

import { useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'

export function useQueryProcesses() {
	const data = useQuery(api.processes.listProcesses)

	return {
		processes: data ?? [],
		isLoading: data ?? false,
	}
}
