#!/bin/bash

# Script to create GitHub Issues for Process Module Requirements
# Run this script from the repository root directory

echo "Creating GitHub Issues for Process Module Requirements..."

# Check if gh CLI is authenticated
if ! gh auth status &> /dev/null; then
    echo "Error: GitHub CLI is not authenticated. Please run 'gh auth login' first."
    exit 1
fi

# Set milestone (optional - create milestone first if needed)
MILESTONE="Process Module v1.0"

# Create Database Schema issue
echo "Creating Database Schema issue..."
gh issue create \
    --title "$(cat github-issues/database-schema/title.txt)" \
    --body "$(cat github-issues/database-schema/body.md)" \
    --label "enhancement,database,process-module" \
    --assignee "@me"

# Create API endpoint issues
echo "Creating API endpoint issues..."

gh issue create \
    --title "$(cat github-issues/api-post-processes/title.txt)" \
    --body "$(cat github-issues/api-post-processes/body.md)" \
    --label "enhancement,api,process-module" \
    --assignee "@me"

gh issue create \
    --title "$(cat github-issues/api-put-processes/title.txt)" \
    --body "$(cat github-issues/api-put-processes/body.md)" \
    --label "enhancement,api,process-module" \
    --assignee "@me"

gh issue create \
    --title "$(cat github-issues/api-delete-processes/title.txt)" \
    --body "$(cat github-issues/api-delete-processes/body.md)" \
    --label "enhancement,api,process-module" \
    --assignee "@me"

gh issue create \
    --title "$(cat github-issues/api-get-processes/title.txt)" \
    --body "$(cat github-issues/api-get-processes/body.md)" \
    --label "enhancement,api,process-module" \
    --assignee "@me"

gh issue create \
    --title "$(cat github-issues/api-get-process-by-id/title.txt)" \
    --body "$(cat github-issues/api-get-process-by-id/body.md)" \
    --label "enhancement,api,process-module" \
    --assignee "@me"

# Create UI component issues
echo "Creating UI component issues..."

gh issue create \
    --title "$(cat github-issues/ui-registration-form/title.txt)" \
    --body "$(cat github-issues/ui-registration-form/body.md)" \
    --label "enhancement,ui,process-module" \
    --assignee "@me"

gh issue create \
    --title "$(cat github-issues/ui-list-view/title.txt)" \
    --body "$(cat github-issues/ui-list-view/body.md)" \
    --label "enhancement,ui,process-module" \
    --assignee "@me"

gh issue create \
    --title "$(cat github-issues/ui-detail-view/title.txt)" \
    --body "$(cat github-issues/ui-detail-view/body.md)" \
    --label "enhancement,ui,process-module" \
    --assignee "@me"

gh issue create \
    --title "$(cat github-issues/ui-edit-form/title.txt)" \
    --body "$(cat github-issues/ui-edit-form/body.md)" \
    --label "enhancement,ui,process-module" \
    --assignee "@me"

# Create Authorization and Audit Trail issues
echo "Creating Authorization and Audit Trail issues..."

gh issue create \
    --title "$(cat github-issues/authorization-rules/title.txt)" \
    --body "$(cat github-issues/authorization-rules/body.md)" \
    --label "enhancement,security,process-module" \
    --assignee "@me"

gh issue create \
    --title "$(cat github-issues/audit-trail/title.txt)" \
    --body "$(cat github-issues/audit-trail/body.md)" \
    --label "enhancement,audit,process-module" \
    --assignee "@me"

echo "All GitHub issues have been created successfully!"
echo "Issues are linked to the feature/simple-process-crud branch for tracking."
echo "Please review the created issues and update assignees, milestones, or labels as needed."