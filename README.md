# StageGate Project Overview

## Introduction
StageGate is a SaaS platform designed to streamline and enhance the process of creating, tracking, and managing software releases. It replaces the cumbersome process of using spreadsheets for managing features, pull requests, and reviews with a web application that offers better organization, tracking, and collaboration capabilities.

## Key Features
- **Workspace Management**: Create and manage workspaces for different projects.
- **Release Management**: Plan and manage software releases with detailed tracking of features and reviews.
- **Feature Tracking**: Track individual features, their status, and associated pull requests.
- **Review Process**: Assign reviewers, conduct reviews, and track the review status of features.
- **Notifications**: Automated notifications for various events like review status updates and release approvals.
- **Statistics and Reports**: Generate reports on developer performance, feature progress, and release status.

## Technology Stack
- **Backend**: Node.js with TypeScript, Express.js, Prisma ORM
- **Database**: PostgreSQL
- **API**: GraphQL

## Data Model
- **Workspace**: Contains information about a project workspace.
- **Release**: Details of a software release within a workspace.
- **Feature**: Information about individual features included in a release.
- **FeatureReview**: Details of the review process for each feature.
- **User**: Information about users of the system.
- **UserLogin**: Authentication details for users.
- **UserNotification**: Notifications sent to users regarding various events.
- **Log**: Logs of application activities for auditing purposes.

# User Use Cases

## Use Case 1: Create a Workspace
**Actor**: Manager

**Description**: A manager creates a new workspace to organize a new project.

**Steps**:
1. The manager logs into StageGate.
2. The manager navigates to the "Create Workspace" section.
3. The manager enters the workspace details (name, description, repository link, logo).
4. The manager sets workspace settings (maximum managers, maximum collaborators, number of reviewers per feature).
5. The manager saves the workspace.

**Outcome**: A new workspace is created and available for collaborators to join.

## Use Case 2: Join a Workspace
**Actor**: Collaborator

**Description**: A collaborator joins an existing workspace using a unique workspace code.

**Steps**:
1. The collaborator logs into StageGate.
2. The collaborator navigates to the "Join Workspace" section.
3. The collaborator enters the workspace code provided by the manager.
4. The collaborator submits the request to join.
5. The manager approves the collaborator's request to join the workspace.

**Outcome**: The collaborator becomes a member of the workspace and can participate in managing releases and features.

## Use Case 3: Create a Release
**Actor**: Manager

**Description**: A manager creates a new release within a workspace.

**Steps**:
1. The manager logs into StageGate and selects the desired workspace.
2. The manager navigates to the "Create Release" section.
3. The manager enters the release details (version, description, start date, end date).
4. The manager selects the features to include in the release.
5. The manager assigns developers and reviewers to each feature.
6. The manager saves the release.

**Outcome**: A new release is created and tracked within the workspace.

## Use Case 4: Add a Feature
**Actor**: Manager

**Description**: A manager adds a new feature to an existing release.

**Steps**:
1. The manager logs into StageGate and selects the desired workspace.
2. The manager navigates to the release details page.
3. The manager clicks "Add Feature" and enters the feature details (name, pull request link, ticket link).
4. The manager assigns a developer and reviewers to the feature.
5. The manager saves the feature.

**Outcome**: A new feature is added to the release and assigned for development and review.

## Use Case 5: Review a Feature
**Actor**: Reviewer

**Description**: A reviewer reviews a feature and updates its status.

**Steps**:
1. The reviewer logs into StageGate and navigates to their assigned reviews.
2. The reviewer selects a feature to review.
3. The reviewer checks the code via the provided pull request link.
4. The reviewer tests the feature functionality and checks code quality (clean code, SOLID principles, unit tests).
5. The reviewer updates the review status (approved/rejected) and adds comments if needed.
6. The reviewer saves their review.

**Outcome**: The review status of the feature is updated, and the developer is notified of the review outcome.

## Use Case 6: Update a Feature
**Actor**: Developer

**Description**: A developer updates a feature based on review comments.

**Steps**:
1. The developer logs into StageGate and navigates to their assigned features.
2. The developer selects a feature that needs updates.
3. The developer reads the review comments and updates the feature accordingly.
4. The developer updates the pull request and marks the feature status as updated.
5. The developer saves the update.

**Outcome**: The feature is updated and marked for re-review.

## Use Case 7: Approve a Release
**Actor**: Manager

**Description**: A manager approves a release once all features are reviewed and approved.

**Steps**:
1. The manager logs into StageGate and navigates to the release details page.
2. The manager verifies that all features are reviewed and approved.
3. The manager updates the release status to approved.
4. The manager notifies the infrastructure team to merge the release to staging.

**Outcome**: The release is approved and ready for deployment.