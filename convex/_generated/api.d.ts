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
} from "convex/server";
import type * as processes_deleteProcess from "../processes/deleteProcess.js";
import type * as processes_findProcessByCaseNumber from "../processes/findProcessByCaseNumber.js";
import type * as processes_findProcessById from "../processes/findProcessById.js";
import type * as processes_insertProcess from "../processes/insertProcess.js";
import type * as processes_listProcesses from "../processes/listProcesses.js";
import type * as processes_updateProcess from "../processes/updateProcess.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  "processes/deleteProcess": typeof processes_deleteProcess;
  "processes/findProcessByCaseNumber": typeof processes_findProcessByCaseNumber;
  "processes/findProcessById": typeof processes_findProcessById;
  "processes/insertProcess": typeof processes_insertProcess;
  "processes/listProcesses": typeof processes_listProcesses;
  "processes/updateProcess": typeof processes_updateProcess;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
