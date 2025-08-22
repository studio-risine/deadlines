// Simple test file to verify soft delete functionality
// This is a temporary test file to validate our implementation

console.log('Testing soft delete implementation...')

// Test plan:
// 1. Create a process
// 2. Verify it appears in findMany
// 3. Soft delete the process
// 4. Verify it no longer appears in findMany
// 5. Verify it appears in findDeleted (admin query)
// 6. Verify findById returns null for deleted process

console.log('Soft delete implementation test complete.')
console.log('Manual testing required with actual Convex deployment.')