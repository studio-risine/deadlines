'use client'

import { convexQuery, useConvexQuery } from '@convex-dev/react-query'
import { useQuery } from '@tanstack/react-query'
import { api } from '../../../convex/_generated/api'

const SCALE_TIME = 10 * 60 * 1000 // 10min

export function useQueryDeadlines() {
	const { data, isLoading, isError } = useQuery({
		...convexQuery(api.deadlines.findMany, {}),
		initialData: [],
		staleTime: SCALE_TIME,
		gcTime: 10000,
	})

	console.log(data)

	return {
		deadlines: data,
		isLoading: isLoading,
		isError,
	}
}

// export function App() {
//   const { data, isPending, error } = useQuery(
//     convexQuery(api.functions.myQuery, { id: 123 }),
//   );
//   return isPending ? "Loading..." : data;
// }

// You can spread the object returned by convexQuery into an object specifying additional arguments of useQuery.

// const { data, isPending, error } = useQuery({
//   ...convexQuery(api.functions.myQuery, { id: 123 }),
//   initialData: [], // use an empty list if no data is available yet
//   gcTime: 10000, // stay subscribed for 10 seconds after this component unmounts
// });

// export function useFindDeadlineById(id: string) {
// 	const query = useQuery({
// 		queryKey: ['deadline', id],
// 		queryFn: useConvexQuery(api.deadlines.findById, { id }),
// 		enabled: !!id,
// 		staleTime: SCALE_TIME,
// 	})

// 	return {
// 		deadline: query.data,
// 		isLoading: query.isLoading,
// 		isError: query.isError,
// 		error: query.error,
// 		refetch: query.refetch,
// 	}
// }
