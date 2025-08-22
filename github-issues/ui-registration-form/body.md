## Overview

Implement the Process Registration Form UI component according to the PRD specifications. This form will enable users to create new legal processes with comprehensive validation, proper user experience, and integration with the API.

## Context

Currently, there is a basic `AddProcessForm` component in `src/modules/process/components/add-process-form.tsx` that handles simple process creation. This needs to be enhanced to support the new schema fields, improved validation, and better user experience as specified in the PRD.

## Requirements

### UI Specification

**Location:** `/dashboard/processes/new`

**Form Fields:**
- Case Number (text input, required) - replaces current "register" field
- Court (text input, required) - new field
- Area (select dropdown, required) - new field with legal area options
- Parties (structured input, required) - new complex field replacing client/opposing party
- Status (select dropdown, required) - enhanced with new status options

**Design Requirements:**
- Use ShadcnUI components for consistency
- Follow Slate theme design system
- Responsive design for mobile and desktop
- Loading states and proper error handling

## User Tasks

### Form Component Enhancement
- [ ] Update `src/modules/process/components/add-process-form.tsx` to use new schema
- [ ] Replace "register" field with "case_number" field
- [ ] Add "court" text input field with validation
- [ ] Add "area" dropdown with legal area options (civil, labor, criminal, family, tax, administrative, constitutional, international)
- [ ] Replace client/opposing party with structured "parties" input
- [ ] Update "status" dropdown with new options (ongoing, suspended, archived, closed)

### Parties Input Implementation
- [ ] Create structured parties input component or use textarea with validation
- [ ] Support plaintiff information (name, type, document)
- [ ] Support defendant information (name, type, document)
- [ ] Optional lawyers section for both parties
- [ ] Validate parties structure before submission

### Validation Implementation
- [ ] Update form schema to use new field validations
- [ ] Case number validation: alphanumeric, 10-50 characters, required
- [ ] Court validation: non-empty string, max 200 characters, required
- [ ] Area validation: must be valid enum value, required
- [ ] Parties validation: must contain plaintiff and defendant, required
- [ ] Status validation: must be valid enum value, required

### Form User Experience
- [ ] Real-time field validation with error messages
- [ ] Duplicate case number check with API integration
- [ ] Required field indicators (*) 
- [ ] Clear form reset functionality
- [ ] Loading state during submission
- [ ] Success feedback after creation

### ShadcnUI Integration
- [ ] Use Form, FormField, FormItem, FormLabel, FormControl components
- [ ] Use Input component for text fields
- [ ] Use Select component for dropdown fields
- [ ] Use Button component for actions
- [ ] Ensure consistent spacing and styling
- [ ] Follow Slate theme color scheme

### API Integration
- [ ] Update form submission to use new API endpoint
- [ ] Handle API validation errors appropriately
- [ ] Display server-side error messages
- [ ] Implement duplicate case number error handling
- [ ] Add success redirect or callback

## Acceptance Criteria

### Functional Requirements
- [ ] Form accepts all required fields according to new schema
- [ ] Successfully creates processes with valid input data
- [ ] Prevents submission with invalid or missing required fields
- [ ] Shows appropriate error messages for validation failures
- [ ] Handles API responses correctly (success and error cases)

### Field Validation
- [ ] Case number validation works correctly (format, length, required)
- [ ] Court validation enforces requirements (non-empty, max length)
- [ ] Area dropdown only accepts valid legal area values
- [ ] Parties input validates required structure
- [ ] Status dropdown only accepts valid status values

### User Experience
- [ ] Form is intuitive and easy to use
- [ ] Real-time validation provides immediate feedback
- [ ] Loading states are clear and informative
- [ ] Success and error messages are user-friendly
- [ ] Form reset functionality works correctly

### Design Compliance
- [ ] Follows ShadcnUI component patterns
- [ ] Maintains Slate theme consistency
- [ ] Responsive design works on mobile and desktop
- [ ] Proper spacing and layout alignment
- [ ] Accessibility standards are met

### API Integration
- [ ] Integrates correctly with POST /api/processes endpoint
- [ ] Handles API validation errors gracefully
- [ ] Displays server-side error messages appropriately
- [ ] Implements duplicate case number detection
- [ ] Provides appropriate success feedback

## Testing Requirements

### Unit Tests
- [ ] Test form rendering with correct fields
- [ ] Test field validation rules
- [ ] Test form submission with valid data
- [ ] Test error handling scenarios
- [ ] Test form reset functionality

### Integration Tests
- [ ] Test end-to-end form submission flow
- [ ] Test API integration and error handling
- [ ] Test validation integration with backend
- [ ] Test success and error user flows

### User Experience Tests
- [ ] Test form accessibility compliance
- [ ] Test responsive design on different screen sizes
- [ ] Test loading states and user feedback
- [ ] Test error message clarity and helpfulness

### Edge Cases
- [ ] Test with minimum and maximum field lengths
- [ ] Test with invalid case number formats
- [ ] Test with malformed parties data
- [ ] Test concurrent form submissions

## Branch

This issue should be implemented on the `feature/simple-process-crud` branch.

## Dependencies

- Enhanced database schema with new process fields
- POST /api/processes endpoint implementation
- Updated constants for legal areas and process status
- Updated TypeScript types for new process structure

## Definition of Done

- [ ] Form component updated with all new schema fields
- [ ] All validation rules implemented and tested
- [ ] ShadcnUI components properly integrated
- [ ] API integration working correctly
- [ ] Responsive design implemented
- [ ] Unit tests written and passing
- [ ] Integration tests written and passing
- [ ] Accessibility compliance verified
- [ ] Code review completed and approved