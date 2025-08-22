## Overview

Implement the `POST /api/processes` endpoint for creating new legal processes according to the PRD specifications. This endpoint will handle process creation with comprehensive validation, error handling, and response structure.

## Context

Currently, there is a basic `create` mutation in `convex/processes.ts` that handles simple process creation. This needs to be enhanced to support the new schema defined in the PRD and provide robust API functionality.

## Requirements

### API Specification

**Endpoint:** `POST /api/processes`

**Request Payload:**
```json
{
  "case_number": "string (required)",
  "court": "string (required)", 
  "area": "enum (required)",
  "parties": "object (required)",
  "status": "enum (required)"
}
```

**Response Codes:**
- **Success (201):** Process object with generated ID
- **Error (400):** Validation errors  
- **Error (409):** Duplicate case number
- **Error (401):** Unauthorized access

## User Tasks

### Convex Mutation Implementation
- [ ] Update `convex/processes.ts` `create` mutation to use new schema
- [ ] Implement comprehensive input validation using Convex validators
- [ ] Add case number uniqueness check before creation
- [ ] Validate `area` enum against allowed values (civil, labor, criminal, family, tax, administrative, constitutional, international)
- [ ] Validate `status` enum against allowed values (ongoing, suspended, archived, closed)
- [ ] Validate `parties` object structure contains required plaintiff and defendant

### Validation Logic
- [ ] Case number validation: alphanumeric, 10-50 characters, unique
- [ ] Court validation: non-empty string, max 200 characters
- [ ] Area validation: must be valid enum value from constants
- [ ] Parties validation: must contain at least plaintiff and defendant with required fields
- [ ] Status validation: must be valid enum value from constants

### Error Handling
- [ ] Return appropriate error messages for validation failures
- [ ] Handle duplicate case number with specific error (409 status)
- [ ] Provide field-specific error messages for better UX
- [ ] Log errors for debugging and monitoring

### Response Structure
- [ ] Return complete process object on successful creation
- [ ] Include generated `_id` and `_creationTime` fields
- [ ] Ensure response matches PRD specification format
- [ ] Add appropriate HTTP status codes

### Authentication & Authorization
- [ ] Verify user is authenticated before allowing creation
- [ ] Apply authorization rules (authenticated users can create)
- [ ] Add user context to creation metadata if needed

## Acceptance Criteria

### Functional Requirements
- [ ] Successfully creates processes with valid input data
- [ ] Rejects creation with invalid or missing required fields
- [ ] Prevents duplicate case numbers with appropriate error
- [ ] Returns properly formatted response on success
- [ ] Handles all validation scenarios correctly

### Validation Testing
- [ ] Case number uniqueness is enforced
- [ ] All enum values are validated correctly
- [ ] Parties object structure is validated properly
- [ ] Field length constraints are enforced
- [ ] Required field validation works as expected

### Error Handling
- [ ] Returns 400 for validation errors with descriptive messages
- [ ] Returns 409 for duplicate case number conflicts
- [ ] Returns 401 for unauthorized access attempts
- [ ] Error messages are user-friendly and actionable

### Performance
- [ ] Endpoint responds within 200ms for valid requests
- [ ] Uniqueness check is efficient using database index
- [ ] Validation logic is optimized for performance

### Integration
- [ ] Works correctly with updated database schema
- [ ] Integrates properly with frontend process creation forms
- [ ] Maintains compatibility with existing authentication system

## Testing Requirements

### Unit Tests
- [ ] Test successful process creation with valid data
- [ ] Test validation failures for each required field
- [ ] Test case number uniqueness constraint
- [ ] Test enum validation for area and status
- [ ] Test parties object validation

### Integration Tests  
- [ ] Test end-to-end process creation flow
- [ ] Test authentication and authorization
- [ ] Test error response formats
- [ ] Test database integration and data persistence

### Edge Cases
- [ ] Test with minimum and maximum field lengths
- [ ] Test with edge case enum values
- [ ] Test with malformed parties objects
- [ ] Test concurrent creation attempts with same case number

## Branch

This issue should be implemented on the `feature/simple-process-crud` branch.

## Dependencies

- Database schema implementation (processes table with new fields)
- Updated constants for process areas and status enums
- Updated TypeScript types for new process structure

## Definition of Done

- [ ] Convex mutation updated with new schema support
- [ ] All validation rules implemented and tested
- [ ] Error handling covers all specified scenarios
- [ ] Unit tests written and passing
- [ ] Integration tests written and passing
- [ ] API documentation updated
- [ ] Code review completed and approved