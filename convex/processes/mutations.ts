import { ResourceAlreadyExistsError } from '@/errors/resource-already-exists-error'
import { v } from 'convex/values'
import { mutation } from '../_generated/server'

export const createProcess = mutation({
	args: {
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
			plaintiff: v.object({
				name: v.string(),
				type: v.union(
					v.literal('individual'),
					v.literal('company'),
					v.literal('government'),
				),
				document: v.optional(v.string()),
			}),
			defendant: v.object({
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
					plaintiff: v.optional(v.array(v.string())),
					defendant: v.optional(v.array(v.string())),
				}),
			),
		}),
		status: v.union(
			v.literal('ongoing'),
			v.literal('suspended'),
			v.literal('archived'),
			v.literal('closed'),
		),
	},
	returns: v.object({
		_id: v.id('processes'),
		_creationTime: v.number(),
		case_number: v.string(),
		court: v.string(),
		area: v.string(),
		parties: v.object({
			plaintiff: v.object({
				name: v.string(),
				type: v.union(
					v.literal('individual'),
					v.literal('company'),
					v.literal('government'),
				),
				document: v.optional(v.string()),
			}),
			defendant: v.object({
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
					plaintiff: v.optional(v.array(v.string())),
					defendant: v.optional(v.array(v.string())),
				}),
			),
		}),
		status: v.string(),
	}),
	handler: async (ctx, args) => {
		const caseNumberAlreadyExists = await ctx.db
			.query('processes')
			.withIndex('by_case_number', (query) =>
				query.eq('case_number', args.case_number),
			)
			.first()

		if (caseNumberAlreadyExists) {
			throw new ResourceAlreadyExistsError()
		}

		const id = await ctx.db.insert('processes', {
			case_number: args.case_number,
			court: args.court,
			area: args.area,
			parties: args.parties,
			status: args.status,
		})
		const process = await ctx.db.get(id)
		if (!process) throw new Error('Created process not found')
		return process
	},
})

export const deleteProcess = mutation({
	args: {
		id: v.id('processes'),
	},
	handler: async (ctx, args) => {
		await ctx.db.delete(args.id)
	},
})

export const updateProcess = mutation({
	args: {
		id: v.id('processes'),
		court: v.optional(v.string()),
		area: v.optional(
			v.union(
				v.literal('civil'),
				v.literal('labor'),
				v.literal('criminal'),
				v.literal('family'),
				v.literal('tax'),
				v.literal('administrative'),
				v.literal('constitutional'),
				v.literal('international'),
			),
		),
		parties: v.optional(
			v.object({
				plaintiff: v.object({
					name: v.string(),
					type: v.union(
						v.literal('individual'),
						v.literal('company'),
						v.literal('government'),
					),
					document: v.optional(v.string()),
				}),
				defendant: v.object({
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
						plaintiff: v.optional(v.array(v.string())),
						defendant: v.optional(v.array(v.string())),
					}),
				),
			}),
		),
		status: v.optional(
			v.union(
				v.literal('ongoing'),
				v.literal('suspended'),
				v.literal('archived'),
				v.literal('closed'),
			),
		),
	},
	handler: async (ctx, args) => {
		const { id, ...updates } = args
		return await ctx.db.patch(id, updates)
	},
})
