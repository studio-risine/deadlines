import { useMutation } from 'convex/react'
import { api } from '../../../convex/_generated/api'

/**
 * React hook that exposes a Convex mutation for creating a process.
 *
 * Returns an object with `createProcess`, a mutation function that invokes the server-side
 * `processes.create` mutation. Call `createProcess(...)` from components to create a new process
 * via the Convex backend.
 */
export function useCreateProcess() {
	const createProcess = useMutation(api.processes.create)

	return {
		createProcess,
	}
}
