import { useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'

/**
 * React hook that queries and returns the list of processes and a loading flag.
 *
 * Calls the Convex query `api.processes.findMany` and returns the query result as
 * `processes`. `isLoading` is true while the query value is `undefined` (i.e., before
 * the query has resolved). This hook does not perform any additional error handling.
 *
 * @returns An object with:
 *  - `processes`: the value returned by `useQuery(api.processes.findMany)` (may be `undefined` while loading)
 *  - `isLoading`: `true` when `processes === undefined`, otherwise `false`
 */
export function useQueryProcesses() {
	const processes = useQuery(api.processes.findMany)

	return {
		processes,
		isLoading: processes === undefined,
	}
}
