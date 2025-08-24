import { query } from "../_generated/server"

import { v } from "convex/values"

export const findProcessById = query({
	args: {
		id: v.id('processes'),
	},
	handler: async (ctx, args) => {
		return await ctx.db.get(args.id)
	},
})