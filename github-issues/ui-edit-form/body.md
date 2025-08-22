## Overview

Implement the Process Edit Form UI component according to the PRD specifications. This form will enable users to update existing legal processes with proper validation, authorization, and user experience while enforcing business rules like immutable case numbers.

## Context

Currently, there might be a basic edit form component. This needs to be enhanced or created to support the new schema fields, proper authorization, immutable field handling, and integration with the audit trail system as specified in the PRD.

## Requirements

### UI Specification

**Location:** `/dashboard/processes/:id/edit`

**Form Fields:**
- Case Number (read-only, disabled input)
- Court (text input, editable)
- Area (select dropdown, editable)
- Parties (structured input, editable)
- Status (select dropdown, editable)

**Design Requirements:**
- Use ShadcnUI components for consistency
- Follow Slate theme design system
- Pre-populate form with existing process data
- Clear visual indication of read-only fields

## User Tasks

### Form Component Implementation
- [ ] Create or update process edit form component
- [ ] Pre-populate all fields with existing process data
- [ ] Make case number field read-only (disabled input with clear styling)
- [ ] Implement editable fields: court, area, parties, status
- [ ] Use ShadcnUI Form components for consistent styling

### Read-Only Field Handling
- [ ] Display case number as disabled input with clear read-only styling
- [ ] Add visual indicator or helper text explaining case number immutability
- [ ] Ensure case number is never included in update payload
- [ ] Maintain proper form accessibility for disabled fields

### Validation Implementation
- [ ] Update form schema for edit-specific validations
- [ ] Court validation: non-empty string, max 200 characters
- [ ] Area validation: must be valid enum value
- [ ] Parties validation: must contain required structure
- [ ] Status validation: must be valid enum value
- [ ] Exclude case number from validation rules

### Parties Input Enhancement
- [ ] Pre-populate parties structure from existing data
- [ ] Support editing plaintiff information (name, type, document)
- [ ] Support editing defendant information (name, type, document)
- [ ] Allow modification of lawyers section
- [ ] Validate parties structure before submission

### Authorization Integration
- [ ] Check user permissions before allowing edit access
- [ ] Ensure only process owners and admins can edit
- [ ] Display appropriate error message for unauthorized users
- [ ] Redirect unauthorized users appropriately

### Form User Experience
- [ ] Real-time field validation with error messages
- [ ] Clear indication of unsaved changes
- [ ] Confirmation dialog for navigation with unsaved changes
- [ ] Loading state during update submission
- [ ] Success feedback after successful update

### API Integration
- [ ] Integrate with PUT /api/processes/:id endpoint
- [ ] Handle API validation errors appropriately
- [ ] Display server-side error messages
- [ ] Implement proper error recovery
- [ ] Add success redirect or callback

### Navigation and Actions
- [ ] Cancel button returning to detail view
- [ ] Update button with loading state
- [ ] Breadcrumb navigation for context
- [ ] Proper handling of navigation events

## Acceptance Criteria

### Functional Requirements
- [ ] Form pre-populates with existing process data
- [ ] Successfully updates processes with valid input changes
- [ ] Prevents submission with invalid field values
- [ ] Enforces case number immutability (business rule)
- [ ] Handles API responses correctly (success and error cases)

### Field Validation
- [ ] Case number field is read-only and clearly marked
- [ ] Court validation works correctly (non-empty, max length)
- [ ] Area dropdown only accepts valid legal area values
- [ ] Parties input validates required structure
- [ ] Status dropdown only accepts valid status values

### Authorization
- [ ] Only authorized users can access edit form
- [ ] Process owners can edit their own processes
- [ ] Admin users can edit any process
- [ ] Unauthorized users receive appropriate error handling

### User Experience
- [ ] Form is intuitive with clear edit vs. read-only fields
- [ ] Real-time validation provides immediate feedback
- [ ] Unsaved changes warning works correctly
- [ ] Loading states are clear and informative
- [ ] Success and error messages are user-friendly

### Design Compliance
- [ ] Follows ShadcnUI form component patterns
- [ ] Maintains Slate theme consistency
- [ ] Read-only fields have appropriate visual styling
- [ ] Responsive design works on mobile and desktop
- [ ] Accessibility standards are met

### API Integration
- [ ] Integrates correctly with PUT /api/processes/:id endpoint
- [ ] Handles API validation errors gracefully
- [ ] Displays server-side error messages appropriately
- [ ] Implements proper success handling
- [ ] Maintains data consistency

## Testing Requirements

### Unit Tests
- [ ] Test form rendering with pre-populated data
- [ ] Test field validation rules (excluding case number)
- [ ] Test form submission with valid changes
- [ ] Test case number immutability enforcement
- [ ] Test authorization scenarios

### Integration Tests
- [ ] Test end-to-end edit form functionality
- [ ] Test API integration and error handling
- [ ] Test navigation and unsaved changes handling
- [ ] Test success and error user flows

### Authorization Tests
- [ ] Test process owner access permissions
- [ ] Test admin access permissions
- [ ] Test unauthorized access scenarios
- [ ] Test permission-based form restrictions

### User Experience Tests
- [ ] Test form accessibility compliance
- [ ] Test responsive design on different screen sizes
- [ ] Test unsaved changes warning functionality
- [ ] Test error message clarity and helpfulness

### Edge Cases
- [ ] Test with corrupted or incomplete process data
- [ ] Test with invalid process IDs
- [ ] Test concurrent edit scenarios
- [ ] Test network failures during submission

## Branch

This issue should be implemented on the `feature/simple-process-crud` branch.

## Dependencies

- PUT /api/processes/:id endpoint implementation
- Authorization system with role-based access control
- Updated process schema and validation rules
- Navigation routing and breadcrumb components

## Definition of Done

- [ ] Edit form component pre-populates with existing data
- [ ] Case number immutability is properly enforced
- [ ] All validation rules implemented and tested
- [ ] Authorization checks integrated and working
- [ ] API integration working correctly
- [ ] Unsaved changes handling implemented
- [ ] Unit tests written and passing
- [ ] Integration tests written and passing
- [ ] Accessibility compliance verified
- [ ] Code review completed and approved