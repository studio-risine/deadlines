import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
	users: defineTable({
		name: v.string(),
		email: v.string(),
	}),

	clients: defineTable({
		name: v.string(),
		email: v.optional(v.string()),
		phone: v.optional(v.string()),
	}),

	processes: defineTable({
		case_number: v.string(),
		court: v.string(),
		area: v.union(
			v.literal('civil'),
			v.literal('labor'),
			v.literal('criminal'),
			v.literal('family'),
			v.literal('tax'),
			v.literal('administrative'),
			v.literal('constitutional'),
			v.literal('international'),
		),
		parties: v.object({
			defendant: v.object({
				name: v.string(),
				type: v.union(
					v.literal('individual'),
					v.literal('company'),
					v.literal('government'),
				),
				document: v.optional(v.string()),
			}),
			plaintiff: v.object({
				name: v.string(),
				type: v.union(
					v.literal('individual'),
					v.literal('company'),
					v.literal('government'),
				),
				document: v.optional(v.string()),
			}),
			lawyers: v.optional(
				v.object({
					defendant: v.optional(v.array(v.string())),
					plaintiff: v.optional(v.array(v.string())),
				}),
			),
		}),
		status: v.union(
			v.literal('active'),
			v.literal('undefined'),
			v.literal('dismissed'),
			v.literal('closed'),
			v.literal('suspended'),
			v.literal('archived'),
		),
		_creationTime: v.number(),
		_id: v.id('processes'),
	})
		.index('by_case_number', ['case_number'])
		.index('by_court', ['court'])
		.index('by_area', ['area'])
		.index('by_status', ['status']),

	// deadlines: defineTable({
	// 	title: v.string(),
	// 	type: v.string(),
	// 	priorityLevel: v.string(),
	// 	assignedTo: v.optional(v.string()),
	// 	// infos: v.optional(v.string()),
	// 	processId: v.optional(v.id('processes')),
	// })
	// 	.index('processId', ['processId'])
	// 	.index('assignedTo', ['assignedTo'])
	// 	.index('type', ['type'])
	// 	.index('priorityLevel', ['priorityLevel']),
})
