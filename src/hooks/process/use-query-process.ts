import { useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'

export function useQueryProcesses() {
	const processes = useQuery(api.processes.findMany)

	return {
		processes,
		isLoading: processes === undefined,
	}
}
