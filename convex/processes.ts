import { v } from 'convex/values'
import { mutation, query } from './_generated/server.js'

export const findMany = query({
	args: {},
	handler: async (ctx) => {
		return await ctx.db
			.query('processes')
			.filter((q) => q.neq(q.field('deleted'), true))
			.collect()
	},
})

export const findById = query({
	args: {
		id: v.id('processes'),
	},
	handler: async (ctx, args) => {
		const process = await ctx.db.get(args.id)

		// Return null if process doesn't exist or is deleted
		if (!process || process.deleted) {
			return null
		}

		return process
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
			.filter((q) => q.neq(q.field('deleted'), true))
			.first()

		return process
	},
})

export const findDeleted = query({
	args: {},
	handler: async (ctx) => {
		// Check authentication and admin access
		const identity = await ctx.auth.getUserIdentity()
		if (!identity) {
			throw new Error('Unauthorized: User must be authenticated')
		}

		// TODO: Implement proper admin role check
		const isAdmin = true // For now, allow any authenticated user

		if (!isAdmin) {
			throw new Error('Forbidden: Admin access required')
		}

		return await ctx.db
			.query('processes')
			.filter((q) => q.eq(q.field('deleted'), true))
			.collect()
	},
})

export const remove = mutation({
	args: {
		id: v.id('processes'),
	},
	handler: async (ctx, args) => {
		// Check authentication
		const identity = await ctx.auth.getUserIdentity()
		if (!identity) {
			throw new Error('Unauthorized: User must be authenticated')
		}

		// Check if process exists
		const process = await ctx.db.get(args.id)
		if (!process) {
			throw new Error('Process not found')
		}

		// Check if process is already deleted
		if (process.deleted) {
			throw new Error('Process not found')
		}

		// For now, we'll check if user has admin role by checking if they have certain properties
		// In a real implementation, this would check against user roles/permissions
		// For MVP, we'll allow any authenticated user to delete (can be enhanced later)
		const isAdmin = true // TODO: Implement proper admin role check

		if (!isAdmin) {
			throw new Error('Forbidden: Admin access required')
		}

		// Perform soft delete
		await ctx.db.patch(args.id, {
			deleted: true,
			deletedAt: Date.now(),
			deletedBy: identity.subject, // Use the user's ID from authentication
		})

		// TODO: Handle cascade behavior for related deadlines
		// Mark related deadlines as archived when process is deleted
		const relatedDeadlines = await ctx.db
			.query('deadlines')
			.withIndex('processId', (q) => q.eq('processId', args.id))
			.collect()

		// For now, we'll leave deadlines as-is but in the future we could:
		// - Mark them as archived
		// - Reassign them to another process
		// - Delete them (if that's the business requirement)
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

		// Check if process exists and is not deleted
		const process = await ctx.db.get(id)
		if (!process || process.deleted) {
			throw new Error('Process not found')
		}

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
			.filter((q) => q.neq(q.field('deleted'), true))
			.first()

		if (existing) {
			throw new Error('Processo com este número já existe')
		}

		return await ctx.db.insert('processes', {
			register: args.register,
			client: args.client,
			opposingParty: args.opposingParty ?? null,
			status: args.status ?? null,
			deleted: false,
			deletedAt: undefined,
			deletedBy: undefined,
		})
	},
})
