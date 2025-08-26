import type { IProcess } from '@/types'
import type { IDataTableOutput } from '../components/data-table'

export function processTableDTO(process: IProcess): IDataTableOutput {
	return {
		id: process._id,
		createdAt: process._creationTime,
		caseNumber: process.case_number,
		client: process.parties.plaintiff.name,
		adverse: process.parties.defendant.name || null,
		status: process.status,
	}
}
