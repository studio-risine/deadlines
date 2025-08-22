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
		// Check authentication and admin access - 401 Unauthorized
		const identity = await ctx.auth.getUserIdentity()
		if (!identity) {
			throw new Error('401:Unauthorized: User must be authenticated')
		}

		// Check admin role - 403 Forbidden
		// TODO: Implement proper admin role check
		const isAdmin = true // For now, allow any authenticated user

		if (!isAdmin) {
			throw new Error('403:Forbidden: Admin access required')
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
		// Check authentication - 401 Unauthorized
		const identity = await ctx.auth.getUserIdentity()
		if (!identity) {
			throw new Error('401:Unauthorized: User must be authenticated')
		}

		// Check if process exists - 404 Not Found
		const process = await ctx.db.get(args.id)
		if (!process) {
			throw new Error('404:Process not found')
		}

		// Check if process is already deleted - 404 Not Found
		// This prevents double-deletion and maintains consistent behavior
		if (process.deleted) {
			throw new Error('404:Process not found')
		}

		// Check admin role - 403 Forbidden
		// For now, we'll check if user has admin role by checking if they have certain properties
		// In a real implementation, this would check against user roles/permissions
		// For MVP, we'll allow any authenticated user to delete (can be enhanced later)
		const isAdmin = true // TODO: Implement proper admin role check

		if (!isAdmin) {
			throw new Error('403:Forbidden: Admin access required')
		}

		// Perform soft delete
		await ctx.db.patch(args.id, {
			deleted: true,
			deletedAt: Date.now(),
			deletedBy: identity.subject, // Use the user's ID from authentication
		})

		// Handle cascade behavior for related deadlines
		const relatedDeadlines = await ctx.db
			.query('deadlines')
			.withIndex('processId', (q) => q.eq('processId', args.id))
			.collect()

		// Cascade behavior implementation:
		// - Related deadlines are preserved for audit/compliance purposes
		// - They remain in the system but their associated process is deleted
		// - This maintains data integrity while allowing historical tracking
		// Future enhancements could include:
		// 1. Adding an "orphaned" status to deadlines
		// 2. Archiving deadlines when process is deleted
		// 3. Reassigning deadlines to other processes
		// 4. Adding a processDeletedAt field to deadlines
		
		// Log audit trail (basic implementation)
		// In a real system, this would be more sophisticated
		console.log(`Process ${args.id} soft deleted by user ${identity.subject} at ${new Date().toISOString()}`)
		console.log(`Related deadlines preserved: ${relatedDeadlines.length}`)
		
		if (relatedDeadlines.length > 0) {
			console.log(`Deadlines IDs: ${relatedDeadlines.map(d => d._id).join(', ')}`)
		}

		// Return success (equivalent to 204 No Content in REST)
		return { success: true }
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
