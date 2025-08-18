'use client'

import { useConvexMutation } from '@convex-dev/react-query'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { api } from '../../../convex/_generated/api'
import type { Id } from '../../../convex/_generated/dataModel'

type DeleteProcessArgs = {
	id: Id<'processes'>
}

export function useDeleteProcess() {
	const queryClient = useQueryClient()

	const mutation = useMutation({
		mutationFn: useConvexMutation(api.processes.remove),

		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['processes'] })
			toast.success('Processo excluído com sucesso!')
		},
		onError: (error) => {
			console.error('Erro ao excluir processo:', error)
			toast.error('Erro ao excluir processo. Tente novamente.')
		},
	})

	const deleteProcess = (args: DeleteProcessArgs) => {
		return mutation.mutate(args)
	}

	const deleteProcessAsync = async (args: DeleteProcessArgs) => {
		return mutation.mutateAsync(args)
	}

	return {
		deleteProcess,
		deleteProcessAsync,
		isPending: mutation.isPending,
		isSuccess: mutation.isSuccess,
		isError: mutation.isError,
		error: mutation.error,
		data: mutation.data,
		reset: mutation.reset,
	}
}
