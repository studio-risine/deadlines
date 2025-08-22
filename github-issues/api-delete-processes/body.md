## Overview

Implement the `DELETE /api/processes/:id` endpoint for deleting legal processes according to the PRD specifications. This endpoint will handle soft deletion with proper authorization, cascade behavior, and audit trail integration.

## Context

Currently, there is a basic `remove` mutation in `convex/processes.ts` that performs hard deletion. This needs to be enhanced to implement soft deletion, enforce admin-only access, handle cascade behavior for related entities, and integrate with the audit trail system.

## Requirements

### API Specification

**Endpoint:** `DELETE /api/processes/:id`

**Response Codes:**
- **Success (204):** No content (successful deletion)
- **Error (403):** Insufficient permissions (admin-only operation)
- **Error (404):** Process not found
- **Error (401):** Unauthorized access

**Business Rules:**
- Admin-only operation (enhanced security)
- Soft delete implementation (mark as deleted, don't remove)
- Cascade behavior for related entities (deadlines, cases)
- Full audit trail logging

## User Tasks

### Convex Mutation Implementation
- [ ] Update `convex/processes.ts` `remove` mutation to implement soft deletion
- [ ] Add `deleted` boolean field to process schema for soft delete tracking
- [ ] Add `deletedAt` timestamp field for deletion tracking
- [ ] Add `deletedBy` field to track which admin performed the deletion
- [ ] Implement process existence check before attempting deletion

### Soft Delete Logic
- [ ] Mark process as deleted instead of removing from database
- [ ] Set `deleted: true`, `deletedAt: Date.now()`, and `deletedBy: userId`
- [ ] Preserve all original process data for audit purposes
- [ ] Update queries to exclude deleted processes by default
- [ ] Add admin-only query to retrieve deleted processes

### Authorization Implementation
- [ ] Verify user is authenticated before allowing deletion
- [ ] Check if user has admin role/permissions
- [ ] Return 403 error for non-admin users attempting deletion
- [ ] Log unauthorized deletion attempts for security monitoring

### Cascade Behavior
- [ ] Handle related deadlines - mark as archived or reassign
- [ ] Handle related cases - maintain relationships but update status
- [ ] Ensure data integrity across related entities
- [ ] Document cascade behavior for stakeholders

### Audit Trail Integration
- [ ] Log deletion action in process history before marking as deleted
- [ ] Record admin user who performed deletion
- [ ] Capture complete process state before deletion
- [ ] Maintain full audit trail for compliance

### Query Updates
- [ ] Update `findMany` query to exclude deleted processes
- [ ] Update `findById` query to handle deleted processes appropriately
- [ ] Add `findDeleted` admin-only query for deleted process retrieval
- [ ] Ensure all process queries respect soft delete status

## Acceptance Criteria

### Functional Requirements
- [ ] Successfully marks processes as deleted (soft delete)
- [ ] Preserves all process data in database
- [ ] Excludes deleted processes from normal queries
- [ ] Returns 204 status code on successful deletion
- [ ] Handles non-existent process IDs correctly

### Authorization Testing
- [ ] Only admin users can delete processes
- [ ] Regular users receive 403 error when attempting deletion
- [ ] Unauthenticated users receive 401 error
- [ ] Admin role verification works correctly

### Soft Delete Implementation
- [ ] Deleted processes are marked with appropriate flags
- [ ] Deletion timestamp and user are recorded
- [ ] Original process data remains intact
- [ ] Normal queries exclude deleted processes
- [ ] Admin queries can retrieve deleted processes

### Cascade Behavior
- [ ] Related deadlines are handled appropriately
- [ ] Related cases maintain data integrity
- [ ] No orphaned data is created
- [ ] Cascade operations are documented and tested

### Audit Trail Integration
- [ ] Deletion action is logged in process history
- [ ] Complete process state is captured before deletion
- [ ] Admin user and timestamp are recorded
- [ ] Audit trail is complete and accurate

### Error Handling
- [ ] Returns 404 for non-existent process IDs
- [ ] Returns 403 for unauthorized deletion attempts
- [ ] Returns 401 for unauthenticated users
- [ ] Error messages are appropriate and secure

## Testing Requirements

### Unit Tests
- [ ] Test successful soft deletion by admin user
- [ ] Test authorization failure for regular users
- [ ] Test handling of non-existent process IDs
- [ ] Test cascade behavior with related entities
- [ ] Test audit trail logging

### Integration Tests
- [ ] Test end-to-end deletion flow
- [ ] Test authentication and authorization integration
- [ ] Test soft delete impact on other queries
- [ ] Test cascade behavior integration

### Security Tests
- [ ] Test admin role verification
- [ ] Test unauthorized access attempts
- [ ] Test data preservation during soft deletion
- [ ] Test audit trail completeness

### Edge Cases
- [ ] Test deletion of already deleted processes
- [ ] Test deletion with invalid process ID format
- [ ] Test concurrent deletion attempts
- [ ] Test deletion of processes with many related entities

## Branch

This issue should be implemented on the `feature/simple-process-crud` branch.

## Dependencies

- Database schema updates for soft delete fields (deleted, deletedAt, deletedBy)
- Authorization system implementation with admin role checking
- Audit trail system implementation (process_history table)
- Updated queries to handle soft delete filtering

## Definition of Done

- [ ] Soft delete implementation completed
- [ ] Admin-only authorization implemented and tested
- [ ] Cascade behavior defined and implemented
- [ ] Audit trail integration completed
- [ ] All queries updated to handle soft deletion
- [ ] Unit tests written and passing
- [ ] Integration tests written and passing
- [ ] Security tests written and passing
- [ ] Code review completed and approved
- [ ] Documentation updated with cascade behavior details