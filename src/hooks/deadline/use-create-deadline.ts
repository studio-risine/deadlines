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
