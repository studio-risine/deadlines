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
		tribunal_name: v.optional(v.string()),
		area: v.string(),
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
		status: v.string(),
	})
		.index('by_case_number', ['case_number'])
		.index('by_area', ['area'])
		.index('by_status', ['status'])
})
