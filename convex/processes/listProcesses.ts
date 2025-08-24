import { query } from "../_generated/server"

export const listProcesses = query({
	args: {},
	handler: async (ctx) => {
		return await ctx.db.query('processes').collect()
	},
})