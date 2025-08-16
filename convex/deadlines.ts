import { DEADLINE_TYPES } from '@/constants/deadline-types.js'
import { PRIORITY_LEVELS } from '@/constants/priority-levels.js'
// import { ResourceAlreadyExistsError } from '@workspace/errors'
import { v } from 'convex/values'
import { mutation, query } from './_generated/server.js'

export const findMany = query({
	handler: async (ctx) => {
		return ctx.db.query('deadlines').collect()
	},
})

export const findById = query({
	args: {
		id: v.id('processes'),
	},
	handler: async (ctx, args) => {
		return await ctx.db.get(args.id)
	},
})

export const findByRegister = query({
	args: {
		register: v.string(),
	},
	handler: async (ctx, args) => {
		const process = await ctx.db
			.query('processes')
			// .withIndex('by_register', (query) => query.eq('register', args.register))
			.first()

		return process
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
			v.union(v.literal('open'), v.literal('closed'), v.literal('pending')),
		),
	},
	handler: async (ctx, args) => {
		const { id, ...updates } = args

		const processUpdates: Partial<{
			client: string
			opposingParty: string | null
			status: 'open' | 'closed' | 'pending' | null
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

export const create = mutation({
	args: {
		title: v.string(),
		type: v.union(...DEADLINE_TYPES.map((type) => v.literal(type))),
		priorityLevel: v.optional(
			v.union(...PRIORITY_LEVELS.map((level) => v.literal(level))),
		),
		assignedTo: v.optional(v.string()),
		infos: v.optional(v.string()),
	},
	handler: async (ctx, args) => {
		return await ctx.db.insert('deadlines', {
			title: args.title,
			type: args.type,
			priorityLevel: args.priorityLevel ?? 'medium',
			assignedTo: args.assignedTo ?? undefined,
			infos: args.infos ?? undefined,
		})
	},
})
