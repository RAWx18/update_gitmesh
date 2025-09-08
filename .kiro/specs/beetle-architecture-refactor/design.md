# Design Document

## Overview

This design document outlines the comprehensive architectural refactoring of the Beetle application to address three critical issues: frontend modularization, backend consolidation, and real data implementation. The refactor will transform Beetle from a mixed-architecture system with monolithic components into a clean, maintainable, production-ready application following modern best practices.

The design prioritizes incremental, safe changes that maintain system functionality throughout the migration process while establishing a solid foundation for future development.

## Architecture

### Current State Analysis

**Frontend Issues:**
- Monolithic `BranchWhat.tsx` component (838+ lines) containing multiple view components
- Mixed routing logic embedded within components
- Tight coupling between presentation and business logic
- Difficult to test and maintain individual features

**Backend Issues:**
- Dual backend architecture: Node.js/Express + Python/FastAPI
- Inconsistent API patterns between backends
- Complex deployment and maintenance overhead
- Mixed data access patterns

**Data Issues:**
- Extensive use of dummy/mock data throughout the application
- Inconsistent error handling for failed API calls
- No clear separation between real and test data

### Target Architecture

**Frontend Architecture:**
```
ui/
├── app/
│   └── contribution/
│       ├── layout.tsx                    # Main layout
│       ├── page.tsx                      # Hub router component
│       ├── overview/
│       │   └── page.tsx                  # Overview route
│       ├── projects/
│       │   └── page.tsx                  # Projects route
│       ├── activity/
│       │   └── page.tsx                  # Activity route
│       └── insights/
│           └── page.tsx                  # Insights route
├── components/
│   └── hub/
│       ├── HubLayout.tsx                 # Main hub layout
│       ├── HubNavigation.tsx             # Navigation component
│       ├── overview/
│       │   ├── OverviewDashboard.tsx     # Overview dashboard
│       │   ├── RepositoryCard.tsx        # Repository display
│       │   └── QuickActions.tsx          # Quick action buttons
│       ├── projects/
│       │   ├── ProjectsView.tsx          # Projects main view
│       │   ├── ProjectCard.tsx           # Individual project card
│       │   └── ProjectFilters.tsx        # Filtering controls
│       ├── activity/
│       │   ├── ActivityFeed.tsx          # Activity timeline
│       │   ├── ActivityItem.tsx          # Individual activity
│       │   └── ActivityFilters.tsx       # Activity filtering
│       └── insights/
│           ├── InsightsView.tsx          # Analytics dashboard
│           ├── MetricsCard.tsx           # Metric display cards
│           └── ChartComponents.tsx       # Chart visualizations
├── lib/
│   ├── api/
│   │   ├── hub-api.ts                    # Hub-specific API calls
│   │   ├── projects-api.ts               # Projects API
│   │   └── activity-api.ts               # Activity API
│   └── hooks/
│       ├── useHubData.ts                 # Hub data management
│       ├── useProjects.ts                # Projects data hook
│       └── useActivity.ts                # Activity data hook
└── types/
    └── hub.ts                            # Hub-specific types
```

**Backend Architecture:**
```
beetle_backend_django/                    # New Django backend
├── manage.py
├── beetle/
│   ├── __init__.py
│   ├── settings/
│   │   ├── __init__.py
│   │   ├── base.py                       # Base settings
│   │   ├── development.py                # Dev settings
│   │   └── production.py                 # Prod settings
│   ├── urls.py                           # Main URL config
│   └── wsgi.py
├── apps/
│   ├── authentication/                   # Auth app
│   │   ├── models.py                     # User models
│   │   ├── views.py                      # Auth views
│   │   ├── serializers.py                # API serializers
│   │   └── urls.py                       # Auth URLs
│   ├── github_integration/               # GitHub app
│   │   ├── models.py                     # GitHub models
│   │   ├── views.py                      # GitHub API views
│   │   ├── services.py                   # GitHub services
│   │   └── urls.py                       # GitHub URLs
│   ├── projects/                         # Projects app
│   │   ├── models.py                     # Project models
│   │   ├── views.py                      # Project views
│   │   ├── serializers.py                # Project serializers
│   │   └── urls.py                       # Project URLs
│   ├── analytics/                        # Analytics app
│   │   ├── models.py                     # Analytics models
│   │   ├── views.py                      # Analytics views
│   │   └── urls.py                       # Analytics URLs
│   ├── chat/                             # Chat/AI app
│   │   ├── models.py                     # Chat models
│   │   ├── views.py                      # Chat views
│   │   ├── consumers.py                  # WebSocket consumers
│   │   └── urls.py                       # Chat URLs
│   └── webhooks/                         # Webhooks app
│       ├── models.py                     # Webhook models
│       ├── views.py                      # Webhook views
│       └── urls.py                       # Webhook URLs
├── core/
│   ├── __init__.py
│   ├── models.py                         # Base models
│   ├── permissions.py                    # Custom permissions
│   ├── pagination.py                     # Custom pagination
│   └── exceptions.py                     # Custom exceptions
└── requirements/
    ├── base.txt                          # Base requirements
    ├── development.txt                   # Dev requirements
    └── production.txt                    # Prod requirements
```

## Components and Interfaces

### Frontend Component Architecture

#### 1. Hub Router Component (`app/contribution/page.tsx`)
**Responsibility:** Route management and component orchestration
```typescript
interface HubRouterProps {
  searchParams: URLSearchParams;
}

interface HubState {
  currentView: 'overview' | 'projects' | 'activity' | 'insights';
  repository: Repository | null;
  user: User | null;
}
```

#### 2. Overview Components
**OverviewDashboard.tsx**
- Repository information display
- Quick statistics and metrics
- Recent activity summary
- Quick action buttons

**RepositoryCard.tsx**
- Repository metadata display
- Language breakdown visualization
- Contributor information
- Repository actions

#### 3. Projects Components
**ProjectsView.tsx**
- Project listing and management
- Project creation and editing
- Project status tracking
- Team collaboration features

#### 4. Activity Components
**ActivityFeed.tsx**
- Real-time activity stream
- Activity filtering and search
- Activity type categorization
- Pagination and infinite scroll

#### 5. Insights Components
**InsightsView.tsx**
- Analytics dashboard
- Performance metrics
- Trend analysis
- Custom reporting

### Backend API Architecture

#### 1. Authentication Service
```python
# apps/authentication/models.py
class User(AbstractUser):
    github_id = models.CharField(max_length=100, unique=True, null=True)
    github_username = models.CharField(max_length=100, null=True)
    avatar_url = models.URLField(null=True)
    access_token = models.TextField(null=True)
    
# apps/authentication/views.py
class GitHubOAuthView(APIView):
    def get(self, request):
        # Handle GitHub OAuth callback
        
class UserProfileView(APIView):
    def get(self, request):
        # Get user profile data
```

#### 2. GitHub Integration Service
```python
# apps/github_integration/models.py
class Repository(models.Model):
    github_id = models.BigIntegerField(unique=True)
    name = models.CharField(max_length=255)
    full_name = models.CharField(max_length=255)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    
class Branch(models.Model):
    repository = models.ForeignKey(Repository, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    
# apps/github_integration/services.py
class GitHubService:
    def __init__(self, access_token: str):
        self.client = Github(access_token)
    
    def get_repositories(self) -> List[Repository]:
        # Fetch real repository data
        
    def get_repository_details(self, repo_id: int) -> Repository:
        # Fetch detailed repository information
```

#### 3. Projects Service
```python
# apps/projects/models.py
class Project(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    repository = models.ForeignKey(Repository, on_delete=models.CASCADE)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    
# apps/projects/views.py
class ProjectViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]
```

#### 4. Chat/AI Service
```python
# apps/chat/models.py
class ChatSession(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    repository = models.ForeignKey(Repository, on_delete=models.CASCADE, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
class ChatMessage(models.Model):
    session = models.ForeignKey(ChatSession, on_delete=models.CASCADE)
    content = models.TextField()
    is_user = models.BooleanField()
    timestamp = models.DateTimeField(auto_now_add=True)
    
# apps/chat/consumers.py
class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        # Handle WebSocket connection
        
    async def receive(self, text_data):
        # Handle incoming messages
```

## Data Models

### Database Schema (Supabase/PostgreSQL)

#### Core Tables
```sql
-- Users table (extends Django's User model)
CREATE TABLE auth_user (
    id SERIAL PRIMARY KEY,
    username VARCHAR(150) UNIQUE NOT NULL,
    email VARCHAR(254),
    github_id VARCHAR(100) UNIQUE,
    github_username VARCHAR(100),
    avatar_url TEXT,
    access_token TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Repositories table
CREATE TABLE github_repository (
    id SERIAL PRIMARY KEY,
    github_id BIGINT UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    description TEXT,
    owner_id INTEGER REFERENCES auth_user(id),
    language VARCHAR(100),
    stargazers_count INTEGER DEFAULT 0,
    forks_count INTEGER DEFAULT 0,
    private BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Projects table
CREATE TABLE projects_project (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    repository_id INTEGER REFERENCES github_repository(id),
    owner_id INTEGER REFERENCES auth_user(id),
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Chat sessions table
CREATE TABLE chat_session (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES auth_user(id),
    repository_id INTEGER REFERENCES github_repository(id),
    title VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Chat messages table
CREATE TABLE chat_message (
    id SERIAL PRIMARY KEY,
    session_id INTEGER REFERENCES chat_session(id),
    content TEXT NOT NULL,
    is_user BOOLEAN NOT NULL,
    timestamp TIMESTAMP DEFAULT NOW()
);
```

#### Indexes and Constraints
```sql
-- Performance indexes
CREATE INDEX idx_repository_owner ON github_repository(owner_id);
CREATE INDEX idx_repository_github_id ON github_repository(github_id);
CREATE INDEX idx_project_repository ON projects_project(repository_id);
CREATE INDEX idx_chat_session_user ON chat_session(user_id);
CREATE INDEX idx_chat_message_session ON chat_message(session_id);
CREATE INDEX idx_chat_message_timestamp ON chat_message(timestamp);

-- Unique constraints
ALTER TABLE github_repository ADD CONSTRAINT unique_github_repo UNIQUE(github_id);
ALTER TABLE auth_user ADD CONSTRAINT unique_github_user UNIQUE(github_id);
```

### Data Access Patterns

#### Repository Pattern Implementation
```python
# core/repositories.py
class BaseRepository:
    def __init__(self, model_class):
        self.model_class = model_class
    
    def get_by_id(self, id: int):
        try:
            return self.model_class.objects.get(id=id)
        except self.model_class.DoesNotExist:
            return None
    
    def create(self, **kwargs):
        return self.model_class.objects.create(**kwargs)

class RepositoryRepository(BaseRepository):
    def __init__(self):
        super().__init__(Repository)
    
    def get_by_github_id(self, github_id: int):
        try:
            return self.model_class.objects.get(github_id=github_id)
        except self.model_class.DoesNotExist:
            return None
    
    def get_user_repositories(self, user_id: int):
        return self.model_class.objects.filter(owner_id=user_id)
```

## Error Handling

### Frontend Error Boundaries
```typescript
// components/ErrorBoundary.tsx
interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<PropsWithChildren, ErrorBoundaryState> {
  constructor(props: PropsWithChildren) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    // Send to error reporting service
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }
    return this.props.children;
  }
}
```

### API Error Handling
```typescript
// lib/api/base-api.ts
interface ApiError {
  message: string;
  status: number;
  code?: string;
}

class ApiClient {
  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const error: ApiError = {
        message: `HTTP ${response.status}: ${response.statusText}`,
        status: response.status
      };
      
      try {
        const errorData = await response.json();
        error.message = errorData.message || error.message;
        error.code = errorData.code;
      } catch {
        // Use default error message
      }
      
      throw error;
    }
    
    return response.json();
  }
}
```

### Backend Error Handling
```python
# core/exceptions.py
from rest_framework.views import exception_handler
from rest_framework.response import Response
from rest_framework import status

def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)
    
    if response is not None:
        custom_response_data = {
            'error': True,
            'message': 'An error occurred',
            'details': response.data
        }
        
        if hasattr(exc, 'detail'):
            custom_response_data['message'] = str(exc.detail)
        
        response.data = custom_response_data
    
    return response

# apps/github_integration/exceptions.py
class GitHubAPIError(Exception):
    def __init__(self, message: str, status_code: int = 500):
        self.message = message
        self.status_code = status_code
        super().__init__(self.message)
```

## Testing Strategy

### Frontend Testing
```typescript
// __tests__/components/hub/OverviewDashboard.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import { OverviewDashboard } from '@/components/hub/overview/OverviewDashboard';

describe('OverviewDashboard', () => {
  it('displays repository information when data is loaded', async () => {
    const mockRepository = {
      name: 'test-repo',
      description: 'Test repository',
      stargazers_count: 42
    };
    
    render(<OverviewDashboard repository={mockRepository} />);
    
    await waitFor(() => {
      expect(screen.getByText('test-repo')).toBeInTheDocument();
      expect(screen.getByText('42')).toBeInTheDocument();
    });
  });
  
  it('displays error message when data loading fails', async () => {
    render(<OverviewDashboard repository={null} error="Failed to load" />);
    
    expect(screen.getByText(/Failed to load/)).toBeInTheDocument();
  });
});
```

### Backend Testing
```python
# apps/github_integration/tests/test_views.py
from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status

User = get_user_model()

class GitHubIntegrationTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            username='testuser',
            github_id='123456'
        )
        self.client.force_authenticate(user=self.user)
    
    def test_get_repositories_success(self):
        response = self.client.get('/api/github/repositories/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('repositories', response.data)
    
    def test_get_repositories_unauthenticated(self):
        self.client.force_authenticate(user=None)
        response = self.client.get('/api/github/repositories/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
```

### Integration Testing
```python
# tests/integration/test_full_flow.py
from django.test import TransactionTestCase
from channels.testing import WebsocketCommunicator
from beetle.routing import application

class ChatIntegrationTests(TransactionTestCase):
    async def test_chat_websocket_flow(self):
        communicator = WebsocketCommunicator(application, "/ws/chat/")
        connected, subprotocol = await communicator.connect()
        self.assertTrue(connected)
        
        # Send a message
        await communicator.send_json_to({
            'type': 'chat_message',
            'message': 'Hello, AI!'
        })
        
        # Receive response
        response = await communicator.receive_json_from()
        self.assertEqual(response['type'], 'chat_response')
        
        await communicator.disconnect()
```

## Migration Strategy

### Phase 1: Frontend Modularization (Week 1-2)
1. **Component Extraction**
   - Extract RepositoryView from BranchWhat.tsx
   - Create OverviewDashboard component
   - Extract ProjectsView components
   - Extract ActivityFeed components
   - Extract InsightsView components

2. **Routing Implementation**
   - Implement Next.js App Router structure
   - Create route-specific page components
   - Implement navigation logic
   - Test routing functionality

3. **State Management**
   - Implement data hooks for each view
   - Create API service layers
   - Implement error boundaries
   - Test component isolation

### Phase 2: Backend Migration (Week 3-4)
1. **Django Setup**
   - Initialize Django project structure
   - Configure Supabase connection
   - Set up Django apps (auth, github, projects, chat, etc.)
   - Configure Django REST Framework

2. **Model Migration**
   - Create Django models matching current data structures
   - Set up database migrations
   - Implement model relationships
   - Create initial data fixtures

3. **API Implementation**
   - Implement authentication endpoints
   - Create GitHub integration endpoints
   - Implement project management endpoints
   - Create chat/WebSocket endpoints

### Phase 3: Data Layer Implementation (Week 5)
1. **Real Data Integration**
   - Remove all dummy data from frontend
   - Implement proper error handling
   - Create loading states for all data fetching
   - Implement retry mechanisms

2. **Testing and Validation**
   - Test all API endpoints
   - Validate data consistency
   - Test error scenarios
   - Performance testing

### Phase 4: Deployment and Cleanup (Week 6)
1. **Production Deployment**
   - Deploy Django backend
   - Configure Supabase production database
   - Set up environment variables
   - Configure CI/CD pipeline

2. **Legacy Cleanup**
   - Remove JavaScript backend
   - Clean up unused dependencies
   - Update documentation
   - Final testing

## Performance Considerations

### Frontend Optimization
- Implement React.lazy() for code splitting
- Use React.memo() for expensive components
- Implement virtual scrolling for large lists
- Optimize bundle size with tree shaking

### Backend Optimization
- Implement database connection pooling
- Use Django's select_related() and prefetch_related()
- Implement caching with Redis
- Use database indexes for common queries

### Caching Strategy
- Browser caching for static assets
- API response caching with Redis
- Database query result caching
- CDN for global asset delivery

This design provides a comprehensive roadmap for transforming Beetle into a modern, maintainable, and scalable application while preserving all existing functionality.