// import { v } from 'convex/values'
// import { mutation, query } from './_generated/server.js'

// export const findMany = query({
// 	args: {},
// 	handler: async (ctx) => {
// 		return await ctx.db.query('processes').collect()
// 	},
// })

// export const findById = query({
// 	args: {
// 		id: v.id('processes'),
// 	},
// 	handler: async (ctx, args) => {
// 		return await ctx.db.get(args.id)
// 	},
// })

// export const findByRegister = query({
// 	args: {
// 		register: v.string(),
// 	},
// 	handler: async (ctx, args) => {
// 		const process = await ctx.db
// 			.query('processes')
// 			.withIndex('by_register', (query) => query.eq('register', args.register))
// 			.first()

// 		return process
// 	},
// })

