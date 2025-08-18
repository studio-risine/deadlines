import type { ProcessType } from '@/types/process'

export const PROCESS_STATUS: { value: ProcessType; label: string }[] = [
	{ value: 'active', label: 'Ativo' },
	{ value: 'undefined', label: 'Indefinido' },
	{ value: 'dismissed', label: 'Baixado' },
	{ value: 'closed', label: 'Encerrado' },
	{ value: 'suspended', label: 'Suspenso' },
	{ value: 'archived', label: 'Arquivado' },
]
