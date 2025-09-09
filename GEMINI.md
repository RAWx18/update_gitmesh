# GEMINI.md

## Dos
- Do centralize all GitHub token-based functionality by adding new methods to the already present class for any new API uses.
- Do implement all backend logic exclusively in Python and Fastapi.
- Do use Supabase for all database and authentication services.
- Do structure API endpoints to logically serve the `/hub` and `/contribution` views.
- Do enforce a strict separation between hub-level and contribution-level components.
- Do pass project and repository context to `/contribution` routes via URL parameters.
- Do use a context provider on the frontend to parse and manage data from URL parameters.
- Do implement server-side route guards in fastapi for authentication and permissions.
- Do redirect unauthenticated users from protected routes to the landing page.
- Do redirect to a parent route like `/hub/overview` for invalid contexts or URLs.
- Do provide clear breadcrumb navigation from any `/contribution` view back to the `/hub`.
- Do lazy load components specific to the `/contribution` layout.
- Do write comprehensive unit, integration, and E2E tests for routing and API calls.
- Do ensure fastapi data models strictly match the TypeScript interfaces.
- Do handle API errors gracefully on the frontend and show appropriate user feedback.
- Do remove all dummy data and hardcoded values from the codebase.
- Do build the global search to query the backend across all user-repositories.
- Do ensure all frontend state is derived either from API calls or URL state.
- Do ensure to use given files from ui/app and ui/components dir for /contribution page and id: 'what' as default.

## Don'ts
- Don't try to simplify the ui of /contribution routing any page just fix the issue and make it working when enter to any repository from projects page
- Don't hardcode the GitHub token; it must be securely retrieved from the user's login session class which is present in the codebase.
- Don't mix hub-level state with contribution-level state.
- Don't embed contribution-specific UI or logic within the `/hub` layout.
- Don't manage the active project context using global state instead of URL parameters.
- Don't allow direct access to `/contribution` without a valid `project` or `repo` parameter.
- Don't fetch detailed project data until a user navigates to a `/contribution` view.
- Don't couple frontend components directly to backend database models.
- Don't create a single monolithic API endpoint; separate concerns by resource.
- Don't neglect loading and error states for data fetching and navigation.
- Don't commit any sensitive credentials, API keys, or secrets to the repository.
- Don't allow the frontend to directly modify the database.
- Don't implement navigation logic inside presentation components.
- Don't omit server-side validation for all incoming API requests.
- Don't build the UI without considering accessibility for keyboard navigation and screen readers.