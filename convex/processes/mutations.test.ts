import { convexTest } from 'convex-test'
import { beforeEach, describe, expect, test } from 'vitest'
import { api } from '../_generated/api'
import type { Doc } from '../_generated/dataModel'
import schema from '../schema'

type CreateProcessArgs = Omit<Doc<'processes'>, '_id' | '_creationTime'>

const sampleProcess: CreateProcessArgs = {
	case_number: 'CASE-123',
	court: 'Supreme Court',
	area: 'civil',
	parties: {
		plaintiff: { name: 'Alice', type: 'individual' },
		defendant: { name: 'Bob', type: 'individual' },
	},
	status: 'ongoing',
}

describe('createProcess Mutation', () => {
	let t: ReturnType<typeof convexTest>

	beforeEach(() => {
		t = convexTest(schema)
	})

	test('should create a process and return its full data', async () => {
		const result = await t.mutation(
			api.processes.mutations.createProcess,
			sampleProcess,
		)
		expect(result).toMatchObject(sampleProcess)
		expect(result._id).toBeDefined()
		expect(typeof result._creationTime).toBe('number')
	})
})
