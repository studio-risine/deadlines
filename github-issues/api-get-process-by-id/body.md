## Overview

Implement the `GET /api/processes/:id` endpoint for retrieving detailed information about a specific legal process according to the PRD specifications. This endpoint will provide comprehensive process details including related deadlines and cases.

## Context

Currently, there is a basic `findById` query in `convex/processes.ts` that returns basic process information. This needs to be enhanced to provide complete process details, include related entities (deadlines, cases), and ensure proper authorization and error handling.

## Requirements

### API Specification

**Endpoint:** `GET /api/processes/:id`

**Response Format:**
```json
{
  "id": "string",
  "case_number": "string",
  "court": "string", 
  "area": "string",
  "parties": "object",
  "status": "string",
  "_creationTime": "number",
  "deadlines": [
    {
      "id": "string",
      "title": "string",
      "due_date": "string",
      "status": "string"
    }
  ],
  "cases": [
    {
      "id": "string", 
      "title": "string",
      "status": "string"
    }
  ]
}
```

**Response Codes:**
- **Success (200):** Complete process object with related data
- **Error (404):** Process not found or deleted
- **Error (401):** Unauthorized access
- **Error (403):** Insufficient permissions

## User Tasks

### Convex Query Implementation
- [ ] Update `convex/processes.ts` `findById` query to return complete process details
- [ ] Ensure all process fields are included in response (case_number, court, area, parties, status)
- [ ] Add validation to check if process exists before returning
- [ ] Exclude soft-deleted processes from results
- [ ] Handle invalid process ID formats gracefully

### Related Data Integration
- [ ] Fetch related deadlines for the process using `processId` relationship
- [ ] Fetch related cases for the process (if case management exists)
- [ ] Format related deadlines with required fields (id, title, due_date, status)
- [ ] Format related cases with required fields (id, title, status)
- [ ] Ensure related data is properly sorted and structured

### Authorization Implementation
- [ ] Verify user is authenticated before returning data
- [ ] Apply user-based access control (users can view their processes)
- [ ] Allow admin users to view any process
- [ ] Return 403 error for unauthorized access attempts
- [ ] Ensure sensitive data is protected

### Response Formatting
- [ ] Return complete process object matching PRD specification
- [ ] Include all process fields with proper data types
- [ ] Format parties object with structured data
- [ ] Include properly formatted related entities arrays
- [ ] Ensure response is JSON-serializable

### Error Handling
- [ ] Return 404 error when process ID doesn't exist
- [ ] Return 404 error for soft-deleted processes
- [ ] Return 403 error for unauthorized access
- [ ] Handle database connection errors gracefully
- [ ] Provide meaningful error messages

### Performance Optimization
- [ ] Use single query to fetch process with related data when possible
- [ ] Implement efficient joins or sub-queries for related entities
- [ ] Optimize for common access patterns
- [ ] Ensure response time meets performance requirements

## Acceptance Criteria

### Functional Requirements
- [ ] Successfully returns complete process details for valid IDs
- [ ] Includes all required process fields from PRD specification
- [ ] Returns related deadlines with proper formatting
- [ ] Returns related cases with proper formatting (if applicable)
- [ ] Handles non-existent process IDs appropriately

### Response Format
- [ ] Response matches PRD specification exactly
- [ ] All process fields are included with correct data types
- [ ] Parties object maintains structured format
- [ ] Related entities are properly formatted arrays
- [ ] JSON response is well-formed and consistent

### Authorization Testing
- [ ] Process owners can view their own processes
- [ ] Admin users can view any process
- [ ] Non-owners cannot view other users' processes
- [ ] Unauthenticated users receive 401 error

### Error Handling
- [ ] Returns 404 for non-existent process IDs
- [ ] Returns 404 for soft-deleted processes
- [ ] Returns 403 for unauthorized access attempts
- [ ] Returns 400 for malformed process IDs
- [ ] Error responses include helpful messages

### Related Data Integration
- [ ] Related deadlines are included and properly formatted
- [ ] Related cases are included and properly formatted
- [ ] Empty arrays are returned when no related data exists
- [ ] Related data sorting is consistent and logical

### Performance Requirements
- [ ] Endpoint responds within 200ms for single record operations
- [ ] Related data fetching is efficient
- [ ] Database queries are optimized
- [ ] Memory usage is appropriate

## Testing Requirements

### Unit Tests
- [ ] Test successful process retrieval with valid ID
- [ ] Test response format compliance
- [ ] Test handling of non-existent process IDs
- [ ] Test authorization scenarios
- [ ] Test related data inclusion

### Integration Tests
- [ ] Test end-to-end process detail retrieval
- [ ] Test authentication and authorization integration
- [ ] Test related entities integration
- [ ] Test error response formats

### Performance Tests
- [ ] Test response time requirements
- [ ] Test with processes having many related entities
- [ ] Test concurrent access scenarios
- [ ] Test database query efficiency

### Edge Cases
- [ ] Test with invalid process ID formats
- [ ] Test with processes having no related data
- [ ] Test with soft-deleted processes
- [ ] Test with very large related data sets

## Branch

This issue should be implemented on the `feature/simple-process-crud` branch.

## Dependencies

- Database schema with complete process fields and relationships
- Related entities implementation (deadlines, cases)
- Authorization system with role-based access control
- Soft delete implementation to filter deleted processes

## Definition of Done

- [ ] Convex query returns complete process details
- [ ] Related entities are included and properly formatted
- [ ] Authorization checks are implemented and tested
- [ ] Response format matches PRD specification exactly
- [ ] Error handling covers all specified scenarios
- [ ] Unit tests written and passing
- [ ] Integration tests written and passing
- [ ] Performance requirements are met
- [ ] Code review completed and approved