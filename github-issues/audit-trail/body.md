## Overview

Implement a comprehensive audit trail system for the Process Module according to the PRD specifications. This includes creating the process history table, implementing change tracking logic, and providing a user interface to display the complete audit trail.

## Context

Currently, there is no audit trail system for tracking changes to processes. This implementation will establish complete change tracking, compliance with audit requirements, and provide transparency for all process modifications.

## Requirements

### Database Schema (from PRD)

**Process History Table:** `process_history`

| Field | Type | Description |
|-------|------|-------------|
| `id` | ID | Primary Key |
| `process_id` | ID | Reference to process |
| `user_id` | ID | User who made the change |
| `action` | Enum | Type of action (create, update, delete) |
| `field_changes` | Object | Before/after values |
| `timestamp` | Number | When the change occurred |

**Tracked Events:**
- Process creation
- Field modifications
- Status changes
- Deletion/archival

## User Tasks

### Database Schema Implementation
- [ ] Add `process_history` table to `convex/schema.ts`
- [ ] Define table fields with proper types and constraints
- [ ] Add indexes for efficient querying: `by_process_id`, `by_user_id`, `by_timestamp`
- [ ] Ensure relationship integrity with processes and users tables

### Audit Trail Logic Implementation
- [ ] Create audit trail utility functions in `convex/audit.ts`
- [ ] Implement change detection for process updates
- [ ] Create history entry creation functions
- [ ] Add before/after value comparison logic

### Process Creation Tracking
- [ ] Modify process creation mutation to log creation event
- [ ] Record user who created the process
- [ ] Log initial process state in audit trail
- [ ] Ensure creation timestamp is captured

### Process Update Tracking
- [ ] Modify process update mutation to track all changes
- [ ] Detect which fields were modified
- [ ] Capture before and after values for each changed field
- [ ] Log user who made the changes and timestamp

### Process Deletion Tracking
- [ ] Modify process deletion mutation to log deletion event
- [ ] Record admin user who performed deletion
- [ ] Capture complete process state before deletion
- [ ] Maintain audit trail even for soft-deleted processes

### Field Change Detection
- [ ] Implement field-by-field comparison logic
- [ ] Handle different data types (strings, objects, enums)
- [ ] Special handling for complex fields like parties object
- [ ] Efficient change detection to minimize audit overhead

### Audit Query Implementation
- [ ] Create `getProcessHistory` query to retrieve audit trail
- [ ] Support filtering by process ID, user, action type
- [ ] Implement chronological ordering (newest first)
- [ ] Add pagination for processes with extensive history

### UI Integration
- [ ] Add History tab to process detail view
- [ ] Display audit trail entries chronologically
- [ ] Format field changes in user-friendly way
- [ ] Show user names and timestamps clearly
- [ ] Handle different action types (create, update, delete)

## Acceptance Criteria

### Database Schema
- [ ] `process_history` table created with all required fields
- [ ] Proper indexes implemented for query performance
- [ ] Relationships with processes and users tables work correctly
- [ ] Data types and constraints match specification

### Change Tracking
- [ ] All process creation events are logged
- [ ] All field modifications are tracked accurately
- [ ] Before/after values are captured correctly
- [ ] User and timestamp information is recorded

### Audit Trail Completeness
- [ ] Process creation generates audit entry
- [ ] Field updates generate detailed change entries
- [ ] Status changes are specifically tracked
- [ ] Deletion events are logged before soft deletion

### Data Integrity
- [ ] Audit trail entries are immutable once created
- [ ] No audit data is lost during process operations
- [ ] Audit trail survives process soft deletion
- [ ] Historical data remains accessible

### Performance
- [ ] Change detection is efficient and doesn't slow updates
- [ ] Audit queries perform well with proper indexes
- [ ] Large audit trails are paginated appropriately
- [ ] Minimal impact on normal process operations

### UI Display
- [ ] History tab shows complete chronological audit trail
- [ ] Field changes are formatted clearly and understandably
- [ ] User names and timestamps are displayed properly
- [ ] Different action types are visually distinguished

## Testing Requirements

### Unit Tests
- [ ] Test audit trail utility functions
- [ ] Test change detection logic for various field types
- [ ] Test history entry creation
- [ ] Test audit query functionality
- [ ] Test data formatting for UI display

### Integration Tests
- [ ] Test end-to-end audit trail creation
- [ ] Test audit trail integration with process operations
- [ ] Test UI display of audit trail
- [ ] Test audit trail with user permissions

### Data Integrity Tests
- [ ] Test audit trail completeness across operations
- [ ] Test audit data immutability
- [ ] Test audit trail survival of process deletion
- [ ] Test concurrent operation audit handling

### Performance Tests
- [ ] Test change tracking performance impact
- [ ] Test audit query performance with large datasets
- [ ] Test UI performance with extensive audit trails
- [ ] Test system performance under audit load

## Implementation Details

### Change Detection Example
```typescript
function detectChanges(before: Process, after: Process) {
  const changes: FieldChange[] = [];
  
  for (const [field, newValue] of Object.entries(after)) {
    const oldValue = before[field];
    if (oldValue !== newValue) {
      changes.push({
        field,
        before: oldValue,
        after: newValue
      });
    }
  }
  
  return changes;
}
```

### Audit Entry Creation
```typescript
async function createAuditEntry(ctx: any, {
  processId,
  userId,
  action,
  fieldChanges
}: AuditEntryData) {
  await ctx.db.insert("process_history", {
    process_id: processId,
    user_id: userId,
    action,
    field_changes: fieldChanges,
    timestamp: Date.now()
  });
}
```

## Branch

This issue should be implemented on the `feature/simple-process-crud` branch.

## Dependencies

- Enhanced process schema for audit integration
- User authentication system for user tracking
- Process CRUD operations to integrate audit calls
- UI components for displaying audit trail

## Definition of Done

- [ ] `process_history` table implemented with proper schema
- [ ] Audit trail logic integrated with all process operations
- [ ] Change detection works accurately for all field types
- [ ] Audit queries support filtering and pagination
- [ ] UI displays audit trail in user-friendly format
- [ ] All tracked events generate appropriate audit entries
- [ ] Unit tests written and passing
- [ ] Integration tests written and passing
- [ ] Performance tests meet requirements
- [ ] Code review completed and approved
- [ ] Documentation includes audit trail usage and compliance notes