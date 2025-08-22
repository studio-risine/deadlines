## Overview

Implement the `GET /api/processes` endpoint for listing and filtering legal processes according to the PRD specifications. This endpoint will provide comprehensive filtering, searching, pagination, and sorting capabilities with proper authorization.

## Context

Currently, there is a basic `findMany` query in `convex/processes.ts` that returns all processes without filtering or pagination. This needs to be enhanced to support advanced filtering, search, pagination, and efficient data retrieval as specified in the PRD.

## Requirements

### API Specification

**Endpoint:** `GET /api/processes`

**Query Parameters:**
- `status`: Filter by status (ongoing, suspended, archived, closed)
- `court`: Filter by court name
- `area`: Filter by legal area (civil, labor, criminal, family, tax, administrative, constitutional, international)
- `case_number`: Search by case number (partial match)
- `cursor`: Pagination cursor for next page
- `numItems`: Number of items per page (default: 25, max: 100)

**Response Format:**
```json
{
  "page": [
    {
      "id": "string",
      "case_number": "string", 
      "court": "string",
      "area": "string",
      "status": "string",
      "_creationTime": "number"
    }
  ],
  "isDone": "boolean",
  "continueCursor": "string"
}
```

## User Tasks

### Convex Query Implementation
- [ ] Update `convex/processes.ts` `findMany` query to support filtering and pagination
- [ ] Implement Convex pagination using `paginationOptsValidator`
- [ ] Add filter parameters for status, court, area, and case_number
- [ ] Use database indexes for efficient filtering (by_status, by_court, by_area, by_case_number)
- [ ] Exclude soft-deleted processes from results

### Filtering Logic
- [ ] Status filtering: filter by exact status match using `by_status` index
- [ ] Court filtering: filter by exact court match using `by_court` index  
- [ ] Area filtering: filter by exact area match using `by_area` index
- [ ] Case number search: implement partial matching with `by_case_number` index
- [ ] Combine multiple filters when provided (AND logic)

### Pagination Implementation
- [ ] Use Convex `.paginate()` method with proper pagination options
- [ ] Set default page size to 25 items
- [ ] Enforce maximum page size of 100 items
- [ ] Return pagination metadata (isDone, continueCursor)
- [ ] Handle empty result sets appropriately

### Response Optimization
- [ ] Return only essential fields for list view (not full process details)
- [ ] Include: id, case_number, court, area, status, _creationTime
- [ ] Optimize query performance with proper field selection
- [ ] Ensure response format matches PRD specification exactly

### Authorization & Security
- [ ] Verify user is authenticated before returning data
- [ ] Apply user-based filtering if needed (users see their processes)
- [ ] Ensure admin users can see all processes
- [ ] Filter out sensitive data if necessary

### Performance Optimization
- [ ] Use appropriate database indexes for each filter type
- [ ] Implement efficient query patterns to avoid table scans
- [ ] Optimize for common filter combinations
- [ ] Add query performance monitoring

## Acceptance Criteria

### Functional Requirements
- [ ] Successfully returns paginated list of processes
- [ ] All filter parameters work correctly (status, court, area, case_number)
- [ ] Case number search supports partial matching
- [ ] Multiple filters can be combined effectively
- [ ] Pagination works with proper cursor handling

### Response Format
- [ ] Response matches PRD specification exactly
- [ ] Pagination metadata is accurate (isDone, continueCursor)
- [ ] Only required fields are included in response
- [ ] Empty result sets are handled gracefully

### Filtering Testing
- [ ] Status filtering returns processes with exact status match
- [ ] Court filtering returns processes from specified court
- [ ] Area filtering returns processes in specified legal area
- [ ] Case number search finds partial matches
- [ ] Combined filters work correctly (AND logic)

### Pagination Testing
- [ ] Default page size of 25 items is enforced
- [ ] Custom page sizes up to 100 are respected
- [ ] Cursor-based pagination works correctly
- [ ] Last page is properly indicated (isDone: true)
- [ ] Empty pages are handled appropriately

### Performance Requirements
- [ ] Query responds within 500ms for list operations
- [ ] Filtering uses database indexes efficiently
- [ ] Large result sets are paginated properly
- [ ] Memory usage is optimized for large datasets

### Authorization Testing
- [ ] Authenticated users can access process lists
- [ ] Unauthenticated users receive 401 error
- [ ] User-based filtering works if implemented
- [ ] Admin access to all processes is verified

## Testing Requirements

### Unit Tests
- [ ] Test successful process listing without filters
- [ ] Test each filter parameter individually
- [ ] Test combined filter scenarios
- [ ] Test pagination functionality
- [ ] Test edge cases (empty results, invalid parameters)

### Integration Tests
- [ ] Test end-to-end listing flow
- [ ] Test authentication and authorization
- [ ] Test database index usage
- [ ] Test response format compliance

### Performance Tests
- [ ] Test query performance with large datasets
- [ ] Test filtering performance with various combinations
- [ ] Test pagination performance across pages
- [ ] Test concurrent request handling

### Edge Cases
- [ ] Test with no processes in database
- [ ] Test with invalid filter values
- [ ] Test with malformed pagination parameters
- [ ] Test with extremely large page size requests

## Branch

This issue should be implemented on the `feature/simple-process-crud` branch.

## Dependencies

- Database schema with proper indexes (by_status, by_court, by_area, by_case_number)
- Updated process constants for valid filter values
- Authentication system for user verification
- Soft delete implementation to exclude deleted processes

## Definition of Done

- [ ] Convex query supports all specified filters and pagination
- [ ] Database indexes are used efficiently for filtering
- [ ] Response format matches PRD specification
- [ ] Pagination works correctly with cursor-based navigation
- [ ] Authentication and authorization are properly implemented
- [ ] Unit tests written and passing
- [ ] Integration tests written and passing
- [ ] Performance tests meet requirements
- [ ] Code review completed and approved