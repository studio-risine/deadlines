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
			v.literal('active'),
			v.literal('undefined'),
			v.literal('dismissed'),
			v.literal('closed'),
			v.literal('suspended'),
			v.literal('archived'),
			v.null(),
		),
	}).index('by_register', ['register']),

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
