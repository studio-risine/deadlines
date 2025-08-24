import { query } from "../_generated/server"

import { v } from "convex/values"

export const findProcessByCaseNumber = query({
	args: {
		caseNumber: v.string(),
	},
	handler: async (ctx, args) => {
		return await ctx.db.query('processes').filter((q) => q.eq(q.field('case_number'), args.caseNumber)).first()
	},
})  

