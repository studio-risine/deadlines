'use client'

import type {
	ProcessAreaType,
	ProcessPartyType,
	ProcessStatusType,
} from '@/types'
import { useConvexMutation } from '@convex-dev/react-query'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { api } from '../../../convex/_generated/api'
import type { Doc } from '../../../convex/_generated/dataModel'

export interface ProcessInput
	extends Omit<Doc<'processes'>, '_id' | '_creationTime'> {
	case_number: string
	tribunal_name: string
	area: ProcessAreaType
	parties: {
		defendant: {
			name: string
			type: ProcessPartyType
			document?: string | undefined
		}
		plaintiff: {
			name: string
			type: ProcessPartyType
			document?: string | undefined
		}
		lawyers?: {
			defendant?: string[] | undefined
			plaintiff?: string[] | undefined
		}
	}
	status: ProcessStatusType
}

export function useInsertProcess() {
	const queryClient = useQueryClient()

	const mutation = useMutation({
		mutationFn: useConvexMutation(api.processes.insertProcess),
		mutationKey: ['processes'],

		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['processes'] })
			toast.success('Processo criado com sucesso!')
		},
		onError: (error) => {
			console.error('Erro ao criar processo:', error)
			toast.error('Erro ao criar processo. Tente novamente.')
		},
	})

	const insertProcess = (args: ProcessInput) => {
		return mutation.mutate(args)
	}

	const insertProcessAsync = async (args: ProcessInput) => {
		return mutation.mutateAsync(args)
	}

	return {
		insertProcess,
		insertProcessAsync,
		isPending: mutation.isPending,
		isSuccess: mutation.isSuccess,
		isError: mutation.isError,
		error: mutation.error,
		data: mutation.data,
		reset: mutation.reset,
	}
}
