## Overview

Implement the enhanced database schema for the Process Module as specified in the PRD. This involves updating the existing `processes` table schema to align with the comprehensive requirements and adding necessary indexes for performance and relationships.

## Context

The current `processes` table has a basic schema with fields like `register`, `client`, `opposingParty`, and `status`. The PRD specifies a more comprehensive schema that includes legal case management fields such as `case_number`, `court`, `area`, `parties`, and enhanced status options.

## Requirements

### Database Schema Updates

#### Processes Table Fields
Update the `processes` table to include:

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `case_number` | String | Required, Unique | Legal case number (replaces `register`) |
| `court` | String | Required | Court name/jurisdiction |
| `area` | Enum | Required | Legal area (civil, labor, criminal, family, tax, administrative, constitutional, international) |
| `parties` | Object | Required | Structured data for party names and roles |
| `status` | Enum | Required | Process status (ongoing, suspended, archived, closed) |

#### Indexes
Implement the following indexes:
- `by_case_number`: Index on `case_number` for unique constraint and fast lookup
- `by_court`: Index on `court` for filtering
- `by_area`: Index on `area` for filtering  
- `by_status`: Index on `status` for filtering
- `by_creation_time`: Index on `_creationTime` for ordering

#### Relationships
- **One-to-Many:** `processes` → `deadlines` (one process can have multiple deadlines)
- Ensure `processId` field in `deadlines` table references `processes._id`

## User Tasks

### Database Schema Implementation
- [ ] Update `convex/schema.ts` to modify the `processes` table definition
- [ ] Remove deprecated fields: `register`, `client`, `opposingParty`
- [ ] Add new required fields: `case_number`, `court`, `area`, `parties`
- [ ] Update `status` enum values to match PRD (ongoing, suspended, archived, closed)
- [ ] Implement `parties` field as structured object with plaintiff, defendant, and lawyers
- [ ] Add all required indexes as specified in PRD

### Data Migration
- [ ] Create data migration script to transform existing records
- [ ] Map `register` field to `case_number`
- [ ] Transform `client` and `opposingParty` to structured `parties` object
- [ ] Update status values to new enum format
- [ ] Handle any data inconsistencies during migration

### Constants and Types
- [ ] Create `src/constants/process-areas.ts` with legal area enum values
- [ ] Create `src/constants/process-status.ts` with status enum values
- [ ] Update `src/types/process.ts` with new schema interfaces
- [ ] Define `ProcessParties` interface structure

### Validation
- [ ] Update Convex validators for new schema fields
- [ ] Implement case number format validation (alphanumeric, 10-50 characters)
- [ ] Add court name validation (non-empty string, max 200 characters)
- [ ] Validate parties structure contains required plaintiff and defendant

## Acceptance Criteria

### Schema Validation
- [ ] `processes` table matches PRD specification exactly
- [ ] All required indexes are created and functional
- [ ] Enum values for `area` and `status` match PRD definitions
- [ ] `parties` field accepts structured object with required fields

### Data Integrity
- [ ] Case number uniqueness is enforced
- [ ] All required fields have proper validation
- [ ] Existing data is successfully migrated without loss
- [ ] Relationships with `deadlines` table work correctly

### Performance
- [ ] Index queries execute efficiently (< 100ms for filtered queries)
- [ ] Case number lookups are fast due to unique index
- [ ] Court and area filtering performs well with respective indexes

### Testing
- [ ] Unit tests pass for all new validators
- [ ] Integration tests verify schema changes work with existing code
- [ ] Migration script tested with sample data
- [ ] Database queries work correctly with new schema

## Branch

This issue should be implemented on the `feature/simple-process-crud` branch.

## Dependencies

- Review existing codebase that uses `processes` table
- Coordinate with API endpoint updates to use new schema
- Ensure UI components will work with updated data structure

## Definition of Done

- [ ] Schema updated in `convex/schema.ts`
- [ ] All indexes implemented and tested
- [ ] Migration script created and tested
- [ ] Types and constants updated
- [ ] Existing tests updated to work with new schema
- [ ] Documentation updated to reflect schema changes
- [ ] Code review completed and approved