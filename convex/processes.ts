import { v } from 'convex/values'
import { mutation, query } from './_generated/server.js'

export const findMany = query({
	args: {},
	handler: async (ctx) => {
		return await ctx.db.query('processes').collect()
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
			.withIndex('by_register', (query) => query.eq('register', args.register))
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
		register: v.string(),
		client: v.string(),
		opposingParty: v.optional(v.string()),
		status: v.optional(
			v.union(v.literal('open'), v.literal('closed'), v.literal('pending')),
		),
	},
	handler: async (ctx, args) => {
		const existing = await ctx.db
			.query('processes')
			.withIndex('by_register', (query) => query.eq('register', args.register))
			.first()

		if (existing) {
			throw new Error('Processo com este número já existe')
		}

		return await ctx.db.insert('processes', {
			register: args.register,
			client: args.client,
			opposingParty: args.opposingParty ?? null,
			status: args.status ?? null,
		})
	},
})
