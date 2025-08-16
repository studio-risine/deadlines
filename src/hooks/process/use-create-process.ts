import { useMutation } from 'convex/react'
import { api } from '../../../convex/_generated/api'

export function useCreateProcess() {
	const createProcess = useMutation(api.processes.create)

	return {
		createProcess,
	}
}
