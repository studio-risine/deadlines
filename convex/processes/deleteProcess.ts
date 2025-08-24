import { v } from 'convex/values'
import { mutation } from '../_generated/server'

export const deleteProcess = mutation({
	args: {
		id: v.id('processes'),
	},
	handler: async (ctx, args) => {
		await ctx.db.delete(args.id)
	},
})