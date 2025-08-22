## Overview

Implement the `PUT /api/processes/:id` endpoint for updating existing legal processes according to the PRD specifications. This endpoint will handle partial updates with validation, business rules enforcement, and audit trail integration.

## Context

Currently, there is a basic `update` mutation in `convex/processes.ts` that handles simple process updates. This needs to be enhanced to support the new schema, enforce business rules, and integrate with the audit trail system.

## Requirements

### API Specification

**Endpoint:** `PUT /api/processes/:id`

**Request Payload:**
```json
{
  "court": "string (optional)",
  "area": "enum (optional)",
  "parties": "object (optional)", 
  "status": "enum (optional)"
}
```

**Response Codes:**
- **Success (200):** Updated process object
- **Error (400):** Validation errors
- **Error (404):** Process not found
- **Error (401):** Unauthorized access
- **Error (403):** Insufficient permissions

**Business Rules:**
- `case_number` cannot be modified (immutable field)
- Changes are logged in audit trail
- Only process owners and admins can update

## User Tasks

### Convex Mutation Implementation
- [ ] Update `convex/processes.ts` `update` mutation to use new schema
- [ ] Implement partial update logic using Convex `patch` method
- [ ] Add process existence check before attempting update
- [ ] Implement field-level validation for updatable fields
- [ ] Ensure `case_number` field cannot be modified (business rule)

### Validation Logic
- [ ] Court validation: non-empty string, max 200 characters (if provided)
- [ ] Area validation: must be valid enum value from constants (if provided)
- [ ] Parties validation: must contain required structure (if provided)
- [ ] Status validation: must be valid enum value from constants (if provided)
- [ ] Reject attempts to modify `case_number` field

### Authorization Implementation
- [ ] Verify user is authenticated before allowing updates
- [ ] Check if user owns the process or has admin privileges
- [ ] Apply role-based access control (users can update own processes, admins can update all)
- [ ] Return 403 error for insufficient permissions

### Audit Trail Integration
- [ ] Log all field changes in audit trail before applying update
- [ ] Capture before and after values for modified fields
- [ ] Record user who made the change and timestamp
- [ ] Integrate with process history tracking system

### Error Handling
- [ ] Return 404 error when process ID doesn't exist
- [ ] Return 400 error for validation failures with specific field messages
- [ ] Return 403 error for unauthorized update attempts
- [ ] Handle database connection and update errors gracefully

### Response Structure
- [ ] Return complete updated process object on success
- [ ] Include all fields including unchanged ones
- [ ] Ensure response matches PRD specification format
- [ ] Add appropriate HTTP status codes

## Acceptance Criteria

### Functional Requirements
- [ ] Successfully updates processes with valid input data
- [ ] Rejects updates with invalid field values
- [ ] Prevents modification of immutable `case_number` field
- [ ] Returns updated process object on successful update
- [ ] Handles partial updates correctly (only specified fields)

### Authorization Testing
- [ ] Process owners can update their own processes
- [ ] Admins can update any process
- [ ] Non-owners cannot update other users' processes
- [ ] Unauthenticated users cannot update any process

### Validation Testing
- [ ] All enum values are validated correctly for area and status
- [ ] Parties object structure validation works properly
- [ ] Field length constraints are enforced
- [ ] Immutable field protection works (case_number)

### Error Handling
- [ ] Returns 400 for validation errors with descriptive messages
- [ ] Returns 404 for non-existent process IDs
- [ ] Returns 403 for unauthorized update attempts
- [ ] Error messages are user-friendly and actionable

### Audit Trail Integration
- [ ] All changes are logged in process history
- [ ] Before and after values are captured correctly
- [ ] User and timestamp information is recorded
- [ ] No data is lost during update operations

### Performance
- [ ] Endpoint responds within 200ms for valid requests
- [ ] Update operations are atomic and consistent
- [ ] Authorization checks are efficient

## Testing Requirements

### Unit Tests
- [ ] Test successful process update with valid data
- [ ] Test partial updates (only some fields changed)
- [ ] Test validation failures for each field
- [ ] Test immutable field protection (case_number)
- [ ] Test authorization scenarios

### Integration Tests
- [ ] Test end-to-end process update flow
- [ ] Test authentication and authorization integration
- [ ] Test audit trail integration
- [ ] Test error response formats

### Edge Cases
- [ ] Test update with empty request body
- [ ] Test update with invalid process ID format
- [ ] Test concurrent update scenarios
- [ ] Test updates that don't actually change any values

## Branch

This issue should be implemented on the `feature/simple-process-crud` branch.

## Dependencies

- Database schema implementation with new process fields
- Authorization system implementation
- Audit trail system implementation (process_history table)
- Updated constants and TypeScript types

## Definition of Done

- [ ] Convex mutation updated with new schema and business rules
- [ ] Authorization checks implemented and tested
- [ ] Audit trail integration completed
- [ ] All validation rules implemented and tested
- [ ] Unit tests written and passing
- [ ] Integration tests written and passing
- [ ] Error handling covers all specified scenarios
- [ ] Code review completed and approved