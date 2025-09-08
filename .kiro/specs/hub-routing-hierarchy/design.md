# Hub Routing Hierarchy Design

## Overview

This design implements a two-tier routing system where users first interact with a general hub interface for repository and project management, then drill down into project-specific contribution workflows. This creates a clear separation between high-level project management and focused contribution work.

## Architecture

### Routing Structure

```
/                           # Landing page (unauthenticated)
├── /hub                    # Main hub interface (authenticated)
│   ├── /overview          # Default hub view - repository dashboard
│   ├── /projects          # Cross-repository project management
│   ├── /activity          # Activity feed across all repositories
│   ├── /search            # Global search functionality
│   └── /settings          # Global user settings
└── /contribution          # Project-specific contribution interface
    ├── ?project={id}      # Project context parameter
    ├── ?repo={id}         # Repository context parameter
    ├── /how               # Project-specific how-to guides
    ├── /why               # Project-specific motivation
    ├── /manage            # Project-specific management
    ├── /import            # Project-specific data import
    └── /profile           # Project-specific profile/stats
```

### Component Hierarchy

```
App Layout
├── AuthProvider
├── ThemeProvider
└── Router
    ├── Landing Page (/)
    ├── Hub Layout (/hub/*)
    │   ├── HubNavigation
    │   ├── HubOverview (/hub/overview)
    │   ├── HubProjects (/hub/projects)
    │   ├── HubActivity (/hub/activity)
    │   ├── HubSearch (/hub/search)
    │   └── HubSettings (/hub/settings)
    └── Contribution Layout (/contribution)
        ├── ContributionNavigation
        ├── ProjectProvider (context from URL params)
        └── Contribution Routes
```

## Components and Interfaces

### Hub Layout Component

**Location:** `app/hub/layout.tsx`

**Purpose:** Provides the main hub interface with navigation and context management for cross-repository operations.

**Key Features:**
- Hub navigation bar
- Global repository and project context
- Search functionality
- User profile access

### Hub Router Component

**Location:** `components/hub/HubRouter.tsx`

**Purpose:** Manages routing and state for hub-level operations.

**Key Features:**
- Route management for hub views
- Global state management
- Search parameter handling
- Navigation state persistence

### Hub Overview Dashboard

**Location:** `app/hub/overview/page.tsx`

**Purpose:** Main dashboard showing repository summaries and recent activity.

**Key Features:**
- Repository grid/list view
- Recent activity feed
- Quick stats and metrics
- Quick action buttons (create project, import repo)

### Hub Projects View

**Location:** `app/hub/projects/page.tsx`

**Purpose:** Cross-repository project management interface.

**Key Features:**
- Projects from all repositories
- Advanced filtering and sorting
- Project creation workflow
- Project status management

### Contribution Layout Component

**Location:** `app/contribution/layout.tsx`

**Purpose:** Provides project-specific contribution interface with context-aware navigation.

**Key Features:**
- Project-specific navigation
- Repository/project context from URL parameters
- Breadcrumb navigation back to hub
- Project-specific tools and workflows

## Data Models

### Hub Context

```typescript
interface HubContext {
  user: User;
  repositories: Repository[];
  projects: Project[];
  currentView: HubView;
  searchQuery?: string;
  filters: HubFilters;
}

type HubView = 'overview' | 'projects' | 'activity' | 'search' | 'settings';

interface HubFilters {
  repositories?: string[];
  projectStatus?: ProjectStatus[];
  activityType?: ActivityType[];
  dateRange?: DateRange;
}
```

### Contribution Context

```typescript
interface ContributionContext {
  project?: Project;
  repository?: Repository;
  branch?: string;
  currentView: ContributionView;
  hubReturnPath: string;
}

type ContributionView = 'overview' | 'how' | 'why' | 'manage' | 'import' | 'profile';
```

### Navigation State

```typescript
interface NavigationState {
  currentContext: 'hub' | 'contribution';
  hubView?: HubView;
  contributionView?: ContributionView;
  projectContext?: {
    projectId?: string;
    repositoryId?: string;
  };
  breadcrumbs: BreadcrumbItem[];
}
```

## Error Handling

### Route Protection

1. **Authentication Guard:** All `/hub/*` and `/contribution` routes require authentication
2. **Project Context Guard:** `/contribution` routes require valid project or repository context
3. **Permission Guard:** Users can only access repositories and projects they have permission for

### Error States

1. **Invalid Project Context:** Redirect to `/hub/overview` with error message
2. **Permission Denied:** Show error page with option to return to hub
3. **Network Errors:** Show retry options while maintaining navigation context

### Fallback Routing

1. **Invalid Hub Route:** Redirect to `/hub/overview`
2. **Invalid Contribution Route:** Redirect to `/contribution` (project overview)
3. **Missing Context:** Redirect to appropriate parent route

## Testing Strategy

### Unit Tests

1. **Navigation Components:** Test route changes and state management
2. **Context Providers:** Test context switching and data flow
3. **Route Guards:** Test authentication and permission checks

### Integration Tests

1. **Hub Navigation Flow:** Test navigation between hub views
2. **Project Selection Flow:** Test transition from hub to contribution
3. **Search Functionality:** Test search across different contexts
4. **Breadcrumb Navigation:** Test return navigation from contribution to hub

### E2E Tests

1. **Complete User Journey:** Login → Hub → Project Selection → Contribution → Return to Hub
2. **Multi-Project Workflow:** Switch between different projects
3. **Search and Discovery:** Find and access projects through search
4. **Settings Management:** Update global settings and see effects

## Implementation Notes

### URL Parameter Handling

- Use Next.js `searchParams` for project/repository context in contribution routes
- Maintain clean URLs with meaningful parameters
- Support deep linking to specific project contexts

### State Management

- Use React Context for hub-level state
- Use URL parameters for contribution context
- Implement proper cleanup when switching contexts

### Performance Considerations

- Lazy load contribution components when project is selected
- Cache hub data to avoid refetching on navigation
- Implement proper loading states for context switches

### Accessibility

- Ensure proper focus management during navigation
- Provide clear landmarks for screen readers
- Implement keyboard navigation for all interfaces

## Migration Strategy

### Phase 1: Create Hub Routes

1. Create new `/hub` route structure
2. Move existing hub components to new locations
3. Update authentication flow to redirect to `/hub/overview`

### Phase 2: Update Contribution Routes

1. Add project context handling to contribution routes
2. Update contribution navigation to be context-aware
3. Add breadcrumb navigation back to hub

### Phase 3: Update Navigation Components

1. Create new HubNavigation component
2. Update existing navigation to be context-aware
3. Implement proper route guards and error handling

### Phase 4: Testing and Refinement

1. Test all navigation flows
2. Optimize performance and loading states
3. Refine user experience based on feedback