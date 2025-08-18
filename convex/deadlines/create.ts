import { v } from 'convex/values'
import { mutation } from '../_generated/server'

export const create = mutation({
	args: {
		title: v.string(),
		type: v.union(
			v.literal('Contestação'),
			v.literal('Audiência de Conciliação'),
			v.literal('Recurso'),
			v.literal('Petição Inicial'),
			v.literal('Alegações Finais'),
			v.literal('Embargos de Declaração'),
			v.literal('Apelação'),
			v.literal('Contra-razões'),
		),
		priorityLevel: v.optional(
			v.union(v.literal('high'), v.literal('medium'), v.literal('low')),
		),
		assignedTo: v.optional(v.string()),
		infos: v.optional(v.string()),
	},
	handler: async (ctx, args) => {
		return await ctx.db.insert('deadlines', {
			title: args.title,
			type: args.type,
			priorityLevel: args.priorityLevel ?? 'medium',
			assignedTo: args.assignedTo,
			infos: args.infos,
		})
	},
})
