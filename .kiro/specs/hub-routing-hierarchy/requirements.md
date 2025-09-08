# Hub Routing Hierarchy Requirements

## Introduction

This specification defines the proper routing hierarchy for Beetle where users first land on a general hub interface after authentication, and only navigate to project-specific contribution pages when they select a specific project to work on.

## Requirements

### Requirement 1: Hub Landing Page

**User Story:** As an authenticated user, I want to land on a general hub page after login, so that I can see an overview of all my repositories and projects before selecting a specific one to work on.

#### Acceptance Criteria

1. WHEN a user successfully authenticates THEN the system SHALL redirect them to `/hub/overview`
2. WHEN a user accesses `/hub` without a specific route THEN the system SHALL default to `/hub/overview`
3. WHEN a user is on the hub overview THEN the system SHALL display a dashboard with repository summaries, recent activity across all repos, and project listings
4. WHEN a user is on the hub overview THEN the system SHALL NOT show project-specific contribution tools

### Requirement 2: Hub Navigation Structure

**User Story:** As a user on the hub, I want to navigate between different hub views, so that I can explore repositories, search for projects, and manage my settings without being tied to a specific project.

#### Acceptance Criteria

1. WHEN a user is on any `/hub/*` route THEN the system SHALL display a hub navigation bar with Overview, Projects, Insights, and Settings tabs
2. WHEN a user clicks on "Overview" THEN the system SHALL navigate to `/hub/overview`
3. WHEN a user clicks on "Projects" THEN the system SHALL navigate to `/hub/projects` 
4. WHEN a user clicks on "Insights" THEN the system SHALL navigate to `/hub/insights`
5. WHEN a user clicks on "Settings" THEN the system SHALL navigate to `/hub/settings`
6. WHEN a user performs a search THEN the system SHALL navigate to `/hub/search` with search parameters

### Requirement 3: Project Selection Flow

**User Story:** As a user browsing projects in the hub, I want to select a specific project to work on, so that I can access project-specific contribution tools and workflows.

#### Acceptance Criteria

1. WHEN a user clicks on a specific project from the hub projects list THEN the system SHALL navigate to `/contribution?project={project_id}`
2. WHEN a user selects a repository from the hub overview THEN the system SHALL navigate to `/contribution?repo={repo_id}`
3. WHEN a user navigates to `/contribution` with project/repo parameters THEN the system SHALL display the project-specific contribution interface
4. WHEN a user is on a contribution page THEN the system SHALL display project-specific navigation (how, why, manage, etc.)

### Requirement 4: Hub Overview Dashboard

**User Story:** As a user on the hub overview, I want to see a summary of all my repositories and recent activity, so that I can quickly understand my overall contribution status and find projects to work on.

#### Acceptance Criteria

1. WHEN a user views `/hub/overview` THEN the system SHALL display a list of all accessible repositories
2. WHEN a user views `/hub/overview` THEN the system SHALL show recent activity across all repositories
3. WHEN a user views `/hub/overview` THEN the system SHALL display quick stats (total repos, total contributions, etc.)
4. WHEN a user views `/hub/overview` THEN the system SHALL provide quick access buttons to create new projects or import repositories

### Requirement 5: Hub Projects View

**User Story:** As a user on the hub projects view, I want to see all projects across all repositories, so that I can manage and organize my work across multiple repositories.

#### Acceptance Criteria

1. WHEN a user views `/hub/projects` THEN the system SHALL display projects from all accessible repositories
2. WHEN a user views `/hub/projects` THEN the system SHALL provide filtering and sorting options for projects
3. WHEN a user views `/hub/projects` THEN the system SHALL allow creating new projects
4. WHEN a user clicks on a project THEN the system SHALL navigate to the project-specific contribution page

### Requirement 6: Hub Insights View

**User Story:** As a user on the hub insights view, I want to see analytics and insights across all my repositories, so that I can understand my contribution patterns and project health.

#### Acceptance Criteria

1. WHEN a user views `/hub/insights` THEN the system SHALL display analytics from all accessible repositories
2. WHEN a user views `/hub/insights` THEN the system SHALL provide filtering options by repository, time range, and metric type
3. WHEN a user views `/hub/insights` THEN the system SHALL show contribution trends, project health metrics, and performance analytics

### Requirement 7: Hub Search Functionality

**User Story:** As a user on the hub, I want to search across all repositories and projects, so that I can quickly find specific content or projects to work on.

#### Acceptance Criteria

1. WHEN a user performs a search from any hub page THEN the system SHALL navigate to `/hub/search?q={query}`
2. WHEN a user views `/hub/search` THEN the system SHALL display search results across repositories, projects, and issues
3. WHEN a user clicks on a search result THEN the system SHALL navigate to the appropriate page (hub or contribution based on result type)

### Requirement 8: Hub Settings Management

**User Story:** As a user on the hub settings, I want to manage my global preferences and account settings, so that I can configure my overall Beetle experience.

#### Acceptance Criteria

1. WHEN a user views `/hub/settings` THEN the system SHALL display global user preferences
2. WHEN a user views `/hub/settings` THEN the system SHALL allow managing connected repositories
3. WHEN a user views `/hub/settings` THEN the system SHALL provide account management options
4. WHEN a user updates settings THEN the system SHALL apply changes globally across all projects

### Requirement 9: Contribution Page Context

**User Story:** As a user working on a specific project, I want to access project-specific tools and workflows, so that I can effectively contribute to that particular project.

#### Acceptance Criteria

1. WHEN a user navigates to `/contribution` with project context THEN the system SHALL display project-specific navigation
2. WHEN a user is on `/contribution` THEN the system SHALL show tools specific to the selected project/repository
3. WHEN a user wants to return to the hub THEN the system SHALL provide a clear way to navigate back to `/hub/overview`
4. WHEN a user switches projects THEN the system SHALL update the contribution page context accordingly

### Requirement 10: Navigation Breadcrumbs and Context

**User Story:** As a user navigating between hub and contribution pages, I want clear context about where I am and how to navigate, so that I don't get lost in the application hierarchy.

#### Acceptance Criteria

1. WHEN a user is on any hub page THEN the system SHALL display "Hub" in the navigation context
2. WHEN a user is on a contribution page THEN the system SHALL display the project/repository name in the navigation context
3. WHEN a user is on a contribution page THEN the system SHALL provide a breadcrumb or back button to return to the hub
4. WHEN a user switches between hub and contribution contexts THEN the system SHALL maintain appropriate navigation state