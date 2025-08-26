import type { Doc } from '../../convex/_generated/dataModel'

export type ProcessAreaType =
	| 'civil'
	| 'labor'
	| 'criminal'
	| 'family'
	| 'tax'
	| 'administrative'
	| 'constitutional'
	| 'international'
export type ProcessPartyType = 'individual' | 'company' | 'government'
export type ProcessStatusType =
	| 'active'
	| 'undefined'
	| 'dismissed'
	| 'closed'
	| 'suspended'
	| 'archived'

export interface IProcess extends Doc<'processes'> {}
