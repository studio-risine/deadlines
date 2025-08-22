import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
	users: defineTable({
		name: v.string(),
		email: v.string(),
	}),

	processes: defineTable({
		register: v.string(),
		client: v.string(),
		opposingParty: v.union(v.string(), v.null()),
		status: v.union(
			v.literal('open'),
			v.literal('closed'),
			v.literal('pending'),
			v.null(),
		),
		deleted: v.optional(v.boolean()),
		deletedAt: v.optional(v.number()),
		deletedBy: v.optional(v.string()),
	})
		.index('by_register', ['register'])
		.index('by_deleted', ['deleted']),

	deadlines: defineTable({
		title: v.string(),
		type: v.string(),
		priorityLevel: v.string(),
		assignedTo: v.optional(v.string()),
		infos: v.optional(v.string()),
		processId: v.optional(v.id('processes')),
	})
		.index('processId', ['processId'])
		.index('assignedTo', ['assignedTo'])
		.index('type', ['type'])
		.index('priorityLevel', ['priorityLevel']),
})
