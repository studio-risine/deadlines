'use client'

import type { DeadlineType, PriorityLevelType } from '@/types'
import { useConvexMutation } from '@convex-dev/react-query'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../../../convex/_generated/api'

type CreateDeadlineArgs = {
	title: string
	type: DeadlineType
	priorityLevel?: PriorityLevelType
	assignedTo?: string
	infos?: string
}

/**
 * Hook that provides helpers to create a deadline via the Convex API and exposes mutation state.
 *
 * Uses a Convex mutation (api.deadlines.create) integrated with React Query. On successful creation it invalidates the 'deadlines' query so related lists are refetched. Exposes both a synchronous fire-and-forget `createDeadline` and an async `createDeadlineAsync`, plus mutation state and control.
 *
 * @returns An object with:
 * - `createDeadline(args)` — trigger the mutation (non-async).
 * - `createDeadlineAsync(args)` — trigger the mutation and await its result.
 * - `isPending` — true while the mutation is in flight.
 * - `isSuccess` — true if the last mutation succeeded.
 * - `isError` — true if the last mutation failed.
 * - `error` — error object from the last mutation, if any.
 * - `data` — data returned by the mutation on success.
 * - `reset()` — reset the mutation state.
 */
export function useCreateDeadline() {
	const queryClient = useQueryClient()

	const mutation = useMutation({
		mutationFn: useConvexMutation(api.deadlines.create),

		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['deadlines'] })
		},
		onError: (error) => {
			console.error('Failed to create deadline:', error)
		},
	})

	const createDeadline = (args: CreateDeadlineArgs) => {
		return mutation.mutate(args)
	}

	const createDeadlineAsync = async (args: CreateDeadlineArgs) => {
		return mutation.mutateAsync(args)
	}

	return {
		createDeadline,
		createDeadlineAsync,
		isPending: mutation.isPending,
		isSuccess: mutation.isSuccess,
		isError: mutation.isError,
		error: mutation.error,
		data: mutation.data,
		reset: mutation.reset,
	}
}
