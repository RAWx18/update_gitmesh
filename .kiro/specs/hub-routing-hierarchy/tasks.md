# Hub Routing Hierarchy Implementation Tasks

## Implementation Plan

Convert the current routing structure to implement a proper hub-first navigation hierarchy where users land on `/hub/overview` after authentication and only navigate to `/contribution` when selecting specific projects.

- [x] 1. Create Hub Route Structure
  - Create new `/hub` route directory with proper Next.js app router structure
  - Set up hub layout component with navigation
  - Implement route guards for authentication
  - _Requirements: 1.1, 1.2, 1.3_

- [x] 1.1 Create hub directory structure
  - Create `app/hub/` directory
  - Create `app/hub/layout.tsx` for hub-specific layout
  - Create `app/hub/page.tsx` that redirects to `/hub/overview`
  - _Requirements: 1.2_

- [x] 1.2 Create hub overview route
  - Create `app/hub/overview/page.tsx` 
  - Move existing overview dashboard logic to hub context
  - Update to show cross-repository summary instead of single repository
  - _Requirements: 1.1, 4.1, 4.2, 4.3, 4.4_

- [x] 1.3 Create hub projects route
  - Create `app/hub/projects/page.tsx`
  - Implement cross-repository project listing
  - Add project filtering and creation capabilities
  - _Requirements: 5.1, 5.2, 5.3, 5.4_

- [x] 1.4 Create hub activity route
  - Create `app/hub/activity/page.tsx`
  - Implement cross-repository activity feed
  - Add filtering by repository and activity type
  - _Requirements: 6.1, 6.2, 6.3_

- [x] 1.5 Create hub search route
  - Create `app/hub/search/page.tsx`
  - Implement global search functionality across repositories
  - Handle search parameters from URL
  - _Requirements: 7.1, 7.2, 7.3_

- [x] 1.6 Create hub settings route
  - Create `app/hub/settings/page.tsx`
  - Implement global user settings management
  - Add repository connection management
  - _Requirements: 8.1, 8.2, 8.3, 8.4_

- [x] 2. Update Authentication Flow
  - Modify authentication redirect to go to `/hub/overview` instead of `/contribution`
  - Update main page redirect logic for authenticated users
  - Ensure proper context initialization on hub landing
  - _Requirements: 1.1, 1.2_

- [x] 2.1 Update main page redirect
  - Modify `app/page.tsx` to redirect authenticated users to `/hub/overview`
  - Update OAuth callback handling to redirect to hub
  - Remove direct `/contribution` redirects from landing page
  - _Requirements: 1.1_

- [x] 2.2 Update authentication context
  - Ensure authentication context works properly with hub routes
  - Update demo mode to land on hub instead of contribution
  - Handle authentication state properly across hub navigation
  - _Requirements: 1.1, 1.2_

- [x] 3. Create Hub Navigation Component
  - Build new navigation component for hub interface
  - Implement tab-based navigation for hub views
  - Add search functionality to navigation
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

- [x] 3.1 Create HubNavigation component
  - Create `components/hub/HubNavigation.tsx`
  - Implement tab navigation for Overview, Projects, Activity, Settings
  - Add search bar with proper routing to `/hub/search`
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

- [x] 3.2 Update hub layout to use new navigation
  - Integrate HubNavigation into `app/hub/layout.tsx`
  - Ensure proper active state management
  - Handle navigation state persistence
  - _Requirements: 2.1_

- [ ] 4. Update Contribution Routes for Project Context
  - Modify contribution routes to require project/repository context
  - Add project selection flow from hub to contribution
  - Implement breadcrumb navigation back to hub
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 9.1, 9.2, 9.3, 9.4_

- [ ] 4.1 Update contribution page routing
  - Modify `app/contribution/page.tsx` to require project context from URL parameters
  - Add project/repository context validation
  - Implement fallback redirect to hub if no context provided
  - _Requirements: 3.1, 3.2, 9.1, 9.2_

- [ ] 4.2 Add project context provider
  - Create project context provider for contribution routes
  - Handle project/repository data loading from URL parameters
  - Manage project-specific state and data
  - _Requirements: 3.3, 9.2, 9.4_

- [ ] 4.3 Update contribution navigation
  - Modify contribution navigation to show project context
  - Add breadcrumb or back button to return to hub
  - Update navigation to be project-aware
  - _Requirements: 9.3, 10.2, 10.3_

- [ ] 5. Implement Project Selection Flow
  - Add project selection capabilities to hub views
  - Create navigation from hub to contribution with proper context
  - Ensure smooth transition between hub and contribution interfaces
  - _Requirements: 3.1, 3.2, 5.4_

- [ ] 5.1 Add project selection to hub overview
  - Update hub overview to show repository cards with selection capability
  - Implement click handlers to navigate to contribution with repository context
  - Add "Open in Beetle" or similar action buttons
  - _Requirements: 3.2, 4.4_

- [ ] 5.2 Add project selection to hub projects
  - Update hub projects view with project selection capability
  - Implement navigation to contribution with project context
  - Handle both repository-level and project-level selection
  - _Requirements: 3.1, 5.4_

- [ ] 5.3 Add project selection to search results
  - Update search results to allow navigation to contribution
  - Handle different result types (repositories, projects, issues)
  - Route appropriately based on selection type
  - _Requirements: 7.3_

- [ ] 6. Update Existing Hub Components
  - Modify existing hub components to work in new hub context
  - Remove repository-specific context from hub components
  - Update to handle cross-repository data
  - _Requirements: 4.1, 4.2, 4.3, 5.1, 5.2, 6.1, 6.2_

- [ ] 6.1 Update OverviewDashboard for hub context
  - Modify `components/hub/overview/OverviewDashboard.tsx` to show cross-repository data
  - Remove single repository dependency
  - Add repository selection capabilities
  - _Requirements: 4.1, 4.2, 4.3, 4.4_

- [ ] 6.2 Update ProjectsView for hub context
  - Modify `components/hub/projects/ProjectsView.tsx` to show cross-repository projects
  - Add repository filtering capabilities
  - Update project creation to work across repositories
  - _Requirements: 5.1, 5.2, 5.3, 5.4_

- [ ] 6.3 Update ActivityFeed for hub context
  - Modify `components/hub/activity/ActivityFeed.tsx` to show cross-repository activity
  - Add repository filtering options
  - Update activity items to show repository context
  - _Requirements: 6.1, 6.2, 6.3_

- [ ] 7. Implement Navigation Context and Breadcrumbs
  - Create navigation context provider for tracking current location
  - Implement breadcrumb system for hub/contribution navigation
  - Add proper back navigation capabilities
  - _Requirements: 10.1, 10.2, 10.3, 10.4_

- [ ] 7.1 Create navigation context provider
  - Create `contexts/NavigationContext.tsx`
  - Track current context (hub vs contribution)
  - Manage breadcrumb state and navigation history
  - _Requirements: 10.1, 10.2, 10.4_

- [ ] 7.2 Add breadcrumb component
  - Create `components/ui/Breadcrumb.tsx`
  - Implement breadcrumb display for contribution pages
  - Add click handlers for navigation back to hub
  - _Requirements: 10.2, 10.3_

- [ ] 7.3 Update layouts with navigation context
  - Integrate navigation context into hub and contribution layouts
  - Display appropriate navigation indicators
  - Handle context switching properly
  - _Requirements: 10.1, 10.2, 10.4_

- [ ] 8. Add Route Guards and Error Handling
  - Implement authentication guards for all routes
  - Add project context validation for contribution routes
  - Create proper error pages and fallback routing
  - _Requirements: All requirements for error handling_

- [ ] 8.1 Create route guard middleware
  - Implement authentication checking for protected routes
  - Add project context validation for contribution routes
  - Handle permission checking for repositories and projects
  - _Requirements: All authentication and context requirements_

- [ ] 8.2 Create error pages and fallbacks
  - Create error pages for invalid contexts
  - Implement fallback routing for missing or invalid routes
  - Add user-friendly error messages with navigation options
  - _Requirements: Error handling for all requirements_

- [ ] 8.3 Add loading states for context switching
  - Implement loading indicators for hub/contribution transitions
  - Add skeleton screens for data loading
  - Handle async context initialization properly
  - _Requirements: Performance and UX requirements_

- [ ] 9. Update Search Functionality
  - Implement global search that works across all repositories
  - Add search routing and parameter handling
  - Create search results page with proper navigation
  - _Requirements: 7.1, 7.2, 7.3_

- [ ] 9.1 Create global search component
  - Create `components/hub/search/GlobalSearch.tsx`
  - Implement search across repositories, projects, and issues
  - Add search suggestions and autocomplete
  - _Requirements: 7.1, 7.2_

- [ ] 9.2 Update search routing
  - Handle search parameters in `/hub/search` route
  - Implement search result navigation
  - Add search history and saved searches
  - _Requirements: 7.1, 7.3_

- [ ] 10. Testing and Validation
  - Test all navigation flows between hub and contribution
  - Validate authentication and context handling
  - Ensure proper error handling and fallbacks
  - _Requirements: All requirements validation_

- [ ] 10.1 Test hub navigation flows
  - Test navigation between all hub views
  - Validate search functionality and routing
  - Test authentication and route guards
  - _Requirements: 1.1, 1.2, 2.1-2.5, 7.1-7.3, 8.1-8.4_

- [ ] 10.2 Test project selection and contribution flow
  - Test project selection from hub views
  - Validate contribution page context handling
  - Test breadcrumb navigation back to hub
  - _Requirements: 3.1-3.4, 9.1-9.4, 10.1-10.4_

- [ ] 10.3 Test error handling and edge cases
  - Test invalid project contexts
  - Validate permission handling
  - Test network error scenarios and recovery
  - _Requirements: All error handling requirements_

- [ ] 10.4 Performance and UX testing
  - Test loading states and transitions
  - Validate responsive design across devices
  - Test accessibility and keyboard navigation
  - _Requirements: Performance and accessibility requirements_