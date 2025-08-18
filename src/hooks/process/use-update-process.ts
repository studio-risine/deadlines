'use client'

import type { ProcessType } from '@/types/process'
import { useConvexMutation } from '@convex-dev/react-query'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { api } from '../../../convex/_generated/api'
import type { Id } from '../../../convex/_generated/dataModel'

type UpdateProcessArgs = {
	id: Id<'processes'>
	client?: string
	opposingParty?: string
	status?: ProcessType
}

export function useUpdateProcess() {
	const queryClient = useQueryClient()

	const { mutate, mutateAsync, isError, isPending, isSuccess, error } =
		useMutation({
			mutationFn: useConvexMutation(api.processes.update),

			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ['processes'] })
				toast.success('Processo atualizado com sucesso!')
			},
			onError: (error) => {
				console.error('Erro ao atualizar processo:', error)
				toast.error('Erro ao atualizar processo. Tente novamente.')
			},
		})

	const updateProcess = (args: UpdateProcessArgs) => {
		return mutate(args)
	}

	const updateProcessAsync = async (args: UpdateProcessArgs) => {
		return mutateAsync(args)
	}

	return {
		updateProcess,
		updateProcessAsync,
		isPending: isPending,
		isSuccess: isSuccess,
		isError: isError,
		error,
	}
}
