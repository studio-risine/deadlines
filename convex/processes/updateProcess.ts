import { v } from "convex/values"
import { mutation } from "../_generated/server"

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