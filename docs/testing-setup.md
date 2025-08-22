# Testing Setup with Convex-Test

This document summarizes the decisions and configuration for testing Convex functions using `convex-test` and Vitest.

## 1. Dependencies
- Installed `vitest` and `convex-test`:
  ```bash
  pnpm install --save-dev vitest convex-test @edge-runtime/vm
  ```

## 2. Vitest Configuration (`vitest.config.mts`)
- **Environment:** `edge-runtime` to match Convex runtime.
- **Globals:** Enabled to use `expect`, `test`, etc. without imports.
- **Inline Dependencies:** Inlined `convex-test` to ensure Vite bundles tests correctly.
```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'edge-runtime',
    globals: true,
    server: {
      deps: { inline: ['convex-test'] },
    },
    coverage: { reporter: ['text', 'lcov'] },
  },
})
```

## 3. Test File (`convex/processes.test.ts`)
- **Import**: `convexTest` from `convex-test`, `api` from `_generated/api`, and `schema`.
- **Test Runner Initialization**: Created `t` with `convexTest(schema)` in `beforeEach`.
- **Test Data Typing**: Used `Omit<Doc<'processes'>, '_id' | '_creationTime'>` for input shape.
- **Sample Test**: Covered `createProcess` mutation, asserting the returned object matches input and includes `_id` and `_creationTime`.

```ts
import { convexTest } from 'convex-test'
import { beforeEach, describe, test, expect } from 'vitest'
import { api } from './_generated/api'
import type { Doc } from './_generated/dataModel'
import schema from './schema'

type CreateProcessArgs = Omit<Doc<'processes'>, '_id' | '_creationTime'>
const sampleProcess: CreateProcessArgs = { /* ... */ }

describe('createProcess Mutation', () => {
  let t: ReturnType<typeof convexTest>
  beforeEach(() => { t = convexTest(schema) })

  test('should create a process and return its full data', async () => {
    const result = await t.mutation(api.processes.mutations.createProcess, sampleProcess)
    expect(result).toMatchObject(sampleProcess)
    expect(result._id).toBeDefined()
    expect(typeof result._creationTime).toBe('number')
  })
})
```

## 4. Decisions and Considerations
- **Edge Runtime**: Matches Convex's Vercel Edge computed environment for consistency.
- **Inline Dependencies**: `convex-test` must be bundled to avoid missing imports in Vitest.
- **Type Safety**: Leveraged generated `Doc<>` types to ensure test inputs align with schema.
- **Auto-Discovery**: Rely on `convex-test` auto-discovery of functions via schema import.

## 5. Running Tests
Use:
```bash
pnpm test          # interactive watch mode
pnpm test:once     # single run
pnpm test:coverage # coverage report
```
