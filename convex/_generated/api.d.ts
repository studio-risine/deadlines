/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
	ApiFromModules,
	FilterApi,
	FunctionReference,
} from 'convex/server'
import type * as deadlines from '../deadlines.js'
import type * as deadlines_create from '../deadlines/create.js'
import type * as deadlines_findById from '../deadlines/findById.js'
import type * as processes from '../processes.js'

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
	'deadlines/create': typeof deadlines_create
	'deadlines/findById': typeof deadlines_findById
	deadlines: typeof deadlines
	processes: typeof processes
}>
export declare const api: FilterApi<
	typeof fullApi,
	FunctionReference<any, 'public'>
>
export declare const internal: FilterApi<
	typeof fullApi,
	FunctionReference<any, 'internal'>
>
