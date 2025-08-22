import { v } from "convex/values"
import { mutation } from "../_generated/server"
import { ResourceAlreadyExistsError } from "@/errors/resource-already-exists-error"

export const create = mutation({
	args: {
		register: v.string(),
		client: v.string(),
		opposingParty: v.optional(v.string()),
		status: v.optional(
			v.union(
				v.literal('active'),
				v.literal('undefined'),
				v.literal('dismissed'),
				v.literal('closed'),
				v.literal('suspended'),
				v.literal('archived')
			),
		),
	},
	handler: async (ctx, args) => {
		const processAlreadyExists = await ctx.db
			.query('processes')
			.withIndex('by_register', (query) => query.eq('register', args.register))
			.first()

		if (processAlreadyExists) {
			throw new ResourceAlreadyExistsError()
		}

		return await ctx.db.insert('processes', {
			register: args.register,
			// client: args.client,
			opposingParty: args.opposingParty ?? null,
			status: args.status ?? null,
		})
	},
})

export const remove = mutation({
	args: {
		id: v.id('processes'),
	},
	handler: async (ctx, args) => {
		await ctx.db.delete(args.id)
	},
})

export const update = mutation({
	args: {
		id: v.id('processes'),
		client: v.optional(v.string()),
		opposingParty: v.optional(v.string()),
		status: v.optional(
			v.union(
				v.literal('active'),
				v.literal('undefined'),
				v.literal('dismissed'),
				v.literal('closed'),
				v.literal('suspended'),
				v.literal('archived')
			),
		),
	},
	handler: async (ctx, args) => {
		const { id, ...updates } = args

		const processUpdates: Partial<{
			client: string
			opposingParty: string | null
			status: 'active' | 'undefined' | 'dismissed' | 'closed' | 'suspended' | 'archived' | null
		}> = {}

		if (updates.client !== undefined) {
			processUpdates.client = updates.client
		}

		if (updates.opposingParty !== undefined) {
			processUpdates.opposingParty = updates.opposingParty ?? null
		}

		if (updates.status !== undefined) {
			processUpdates.status = updates.status ?? null
		}

		return await ctx.db.patch(id, processUpdates)
	},
})

