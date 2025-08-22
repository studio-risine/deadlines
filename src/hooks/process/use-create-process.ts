'use client'

import type { ProcessType } from '@/modules/process/components/add-process-form'
import { useConvexMutation } from '@convex-dev/react-query'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { api } from '../../../convex/_generated/api'

type CreateProcessArgs = {
	register: string
	// client: string
	// adverse?: string
	// status?: ProcessType
}

export function useCreateProcess() {
	const queryClient = useQueryClient()

	const mutation = useMutation({
		mutationFn: useConvexMutation(api.processes.mutations.create),

		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['processes'] })
			toast.success('Processo criado com sucesso!')
		},
		onError: (error) => {
			console.error('Erro ao criar processo:', error)
			toast.error('Erro ao criar processo. Tente novamente.')
		},
	})

	const createProcess = (args: CreateProcessArgs) => {
		return mutation.mutate(args)
	}

	const createProcessAsync = async (args: CreateProcessArgs) => {
		return mutation.mutateAsync(args)
	}

	return {
		createProcess,
		createProcessAsync,
		isPending: mutation.isPending,
		isSuccess: mutation.isSuccess,
		isError: mutation.isError,
		error: mutation.error,
		data: mutation.data,
		reset: mutation.reset,
	}
}
