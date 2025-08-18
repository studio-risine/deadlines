'use client'

import { convexQuery, useConvexQuery } from '@convex-dev/react-query'
import { useQuery } from '@tanstack/react-query'
import { api } from '../../../convex/_generated/api'

const SCALE_TIME = 10 * 60 * 1000 // 10min

export function useQueryDeadlines() {
	const { data, isLoading, isError } = useQuery({
		...convexQuery(api.deadlines.findMany, {}),
		initialData: [],
		staleTime: SCALE_TIME,
		gcTime: 10000,
	})

	return {
		deadlines: data,
		isLoading: isLoading,
		isError,
	}
}
