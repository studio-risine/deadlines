import { z } from 'zod'

export const processTypeSchema = z.enum([
	'active',
	'undefined',
	'dismissed',
	'closed',
	'suspended',
	'archived',
])

export type ProcessType = z.infer<typeof processTypeSchema>

export const processSchema = z.object({
	_id: z.string(),
	register: z.string(),
	client: z.string(),
	opposingParty: z.string().nullable(),
	status: processTypeSchema.nullable(),
	_creationTime: z.number(),
})

export type Process = z.infer<typeof processSchema>

export const processFormSchema = z.object({
	register: z.string().min(1, {
		message: 'Número do processo é obrigatório.',
	}),
	client: z.string().min(1, {
		message: 'Cliente é obrigatório.',
	}),
	opposingParty: z.string().optional(),
	status: processTypeSchema.optional(),
})

export type ProcessFormValues = z.infer<typeof processFormSchema>
