import { z } from 'zod'
import type { Control } from 'react-hook-form'
import { PROCESS_AREAS, PROCESS_STATUS } from '@/constants/process'

export const processSchema = z.object({
	case_number: z.string().min(1, 'Número do processo é obrigatório'),
	tribunal_name: z.string().min(1, 'Tribunal é obrigatório'),
	area: z.enum(
		PROCESS_AREAS.map((area) => area.value) as [string, ...string[]],
	),
	status: z.enum(
		PROCESS_STATUS.map((status) => status.value) as [string, ...string[]],
	),
	defendant: z.object({
		name: z.string().min(1, 'Nome do requerido é obrigatório'),
		type: z.enum(['individual', 'company', 'government'] as const),
		document: z.string().optional(),
		lawyers: z.string().optional(),
	}),
	plaintiff: z.object({
		name: z.string().min(1, 'Nome do requerente é obrigatório'),
		type: z.enum(['individual', 'company', 'government'] as const),
		document: z.string().optional(),
		lawyers: z.string().optional(),
	}),
})

export type ProcessFormData = z.infer<typeof processSchema>

export interface FormStepProps {
	control: Control<ProcessFormData>
}
