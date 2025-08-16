import type { DEADLINE_TYPES, PRIORITY_LEVELS } from '@/constants'

export type DeadlineType = (typeof DEADLINE_TYPES)[number]
export type PriorityLevelType = (typeof PRIORITY_LEVELS)[number]
