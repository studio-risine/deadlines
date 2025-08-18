'use client'

import { convexQuery } from '@convex-dev/react-query'
import { useQuery } from '@tanstack/react-query'
import { api } from '../../../convex/_generated/api'
import type { Id } from '../../../convex/_generated/dataModel'

const SCALE_TIME = 10 * 60 * 1000 // 10min

export function useQueryProcessById(id: Id<'processes'> | null) {
	const { data, isLoading, isError } = useQuery({
		...convexQuery(api.processes.findById, id ? { id } : 'skip'),
		enabled: id !== null,
		staleTime: SCALE_TIME,
		gcTime: 10000,
	})

	return {
		process: data,
		isLoading: isLoading && id !== null,
		isError,
	}
}
