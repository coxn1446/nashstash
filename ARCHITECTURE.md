# Architecture Documentation

> **IMPORTANT**: Keep this file updated as features are added or architecture changes.

## Last Updated
2024-12-19

## Table of Contents
- [Overview](#overview)
- [Tech Stack Summary](#tech-stack-summary)
- [System Architecture](#system-architecture)
  - [High-Level Diagram](#high-level-diagram)
- [Frontend Architecture](#frontend-architecture)
  - [Component Hierarchy](#component-hierarchy)
  - [Layout System](#layout-system)
  - [State Management](#state-management)
  - [Routing](#routing)
  - [Key Contexts](#key-contexts)
  - [Firebase Client SDK](#firebase-client-sdk)
  - [Configuration Files](#configuration-files)
  - [Icon System](#icon-system)
  - [Styling System](#styling-system)
- [Backend Architecture](#backend-architecture)
  - [Request Flow](#request-flow)
  - [Service Layer Pattern](#service-layer-pattern)
  - [Authentication Flow](#authentication-flow)
  - [Real-time Communication](#real-time-communication)
- [Database Architecture](#database-architecture)
  - [Connection Management](#connection-management)
  - [Query Organization](#query-organization)
  - [Schema Documentation](#schema-documentation)
- [API Endpoints](#api-endpoints)
- [Features](#features)
- [Integration Points](#integration-points)
- [Security](#security)
- [Performance Optimizations](#performance-optimizations)
- [Deployment](#deployment)
- [Development Workflow](#development-workflow)
- [Testing Strategy](#testing-strategy)
- [Known Issues & Limitations](#known-issues--limitations)
- [Future Improvements](#future-improvements)
- [Notes](#notes)

## Overview
Nash Stash is a collection of games for the App Store. This app shell provides the foundation for building and publishing multiple games. The architecture is designed to support multiple games within a single app, with shared infrastructure for user management, game data storage, and analytics.

Key design decisions:
- Service layer pattern for clean separation of concerns
- Redux Toolkit for centralized state management
- Capacitor for native iOS/Android deployment
- PostgreSQL for reliable data storage
- Socket.io for real-time game features (if needed)

For detailed tech stack, project structure, and configuration, see `APP_SHELL_PROMPT.md`.

## Tech Stack Summary
- Frontend: React (latest), Redux Toolkit (latest), Tailwind CSS (latest), Capacitor (latest)
- Backend: Node.js (latest LTS), Express (latest), PostgreSQL (latest)
- Authentication: Passport.js (latest) (Local, Google, Apple)
- Real-time: Socket.io (latest)
- Cloud: Google Cloud Platform (latest) (Secret Manager, Storage, Cloud SQL)

## System Architecture

### High-Level Diagram
```
[Client App] → [Express Server] → [PostgreSQL]
                    ↓
              [Socket.io]
                    ↓
              [External Services]
```

## Frontend Architecture

### Component Hierarchy
```
App
├── NativeProvider
│   └── Router
│       ├── Routes
│       └── [Game Components]
```

### State Management
- **Redux Store Structure**:
  - `auth`: Authentication state
  - `global`: Global app state
  - `native`: Native platform state
  - `[feature]`: Feature-specific state

### Routing
- **Public Routes**: `/` (Home)
- **Game Routes**: To be added as games are developed (e.g., `/games/[game-name]`)
- **Lazy Loading**: All route components are lazy loaded

### Key Contexts
- `NativeContext`: Platform detection, keyboard handling, device info
- `LayoutContext`: Layout state management (if applicable)
- `AuthContext`: Authentication state and methods (if applicable)

### Layout System
[If your app has a dynamic layout system, document it here]
- **LayoutContext**: Manages global layout state (nav collapsed/expanded, dimensions)
- **ContentArea**: Dynamic container that adjusts to layout state
- **Benefits**: No hardcoded margin values, single source of truth for layout dimensions

### Firebase Client SDK
[If using Firebase client SDK, document it here]
- **Configuration**: Firebase client SDK initialization location
- **Initialization**: When and how Firebase is initialized
- **Services**: Which Firebase services are used (Auth, Analytics, etc.)
- **Usage**: How components access Firebase services

### Configuration Files
- **Client Config** (`src/config/`): Client-side configuration files
- **Server Config** (`server/config/`): Server-side configuration files

### Icon System
[If you have a centralized icon system, document it here]
- **Centralized Icon Management**: Where icons are imported and exported from
- **Library**: Which icon library is used
- **Dynamic Icon Rendering**: Utilities for rendering icons by name string

### Utility Components
[Document reusable utility components]
- **ComponentName**: Description and usage

### Profile Picture Component
[If you have a reusable profile picture component, document it here]
- **Reusable Component**: Location and purpose
- **Features**: Responsive sizing, fallback behavior, etc.
- **Usage**: Where it's used throughout the application

### Styling System
[Document your styling approach]
- **Standardized Utilities**: Custom utilities defined in tailwind.config.js
- **Spacing System**: Consistent padding, margins, and gaps

## Backend Architecture

### Request Flow
```
HTTP Request
  → Express Middleware (CORS, body parsing, sessions, rate limiting)
  → Route Handler
  → Service Layer (business logic)
  → Query Layer (database queries)
  → Response
```

### Service Layer Pattern
- **Routes** (`server/routes/`): Handle HTTP, validation, call services
- **Services** (`server/services/`): Business logic, orchestration
- **Queries** (`server/queries/`): Raw SQL queries, data access

### Authentication Flow
1. User submits credentials
2. Passport strategy validates
3. User serialized to session
4. Session stored in PostgreSQL
5. Subsequent requests deserialize user from session

### Real-time Communication
- Socket.io for real-time features
- Room-based messaging (conversations, etc.)
- Connection tracking and cleanup

## Database Architecture

### Connection Management
- Connection pooling via `pg.Pool`
- Health checks with retries
- Graceful shutdown handling
- Separate configs for dev/prod

### Query Organization
- Queries grouped by feature domain
- Reusable query fragments
- Parameterized queries for security
- Complex queries use CTEs

## API Endpoints

### Health Check
- `GET /api/health` - Server health check

### Authentication (Placeholder - to be implemented)
- `POST /api/auth/login` - Local login (not yet implemented)
- `POST /api/auth/register` - User registration (not yet implemented)
- `GET /api/auth/google` - Initiate Google OAuth flow (not yet implemented)
- `GET /api/auth/google/callback` - Google OAuth callback (not yet implemented)
- `GET /api/auth/apple` - Initiate Apple Sign In flow (not yet implemented)
- `POST /api/auth/apple/callback` - Apple Sign In callback (not yet implemented)
- `POST /api/auth/logout` - Logout and destroy session
- `GET /api/auth/me` - Get current authenticated user

### Games (To be added as games are developed)
- Game-specific endpoints will be added here as features are built

## Features

### App Shell
- **Description**: Base application structure ready for game development
- **Components**: 
  - `App` - Main app router and layout
  - `Home` - Landing page
  - `Loading` - Loading state component
  - `NotFound` - 404 page
- **Component Organization**: `src/components/` and `src/routes/`
- **Routes**: `/` - Home page, `*` - 404 page
- **State**: Basic Redux store with auth, global, and native reducers
- **Features**: 
  - App shell structure
  - Basic routing
  - Redux store setup
  - Native platform detection
  - Loading states
- **Dependencies**: None (base shell)
- **Database**: No database tables yet - will be added as games are developed

## Integration Points

### External Services
- **Google Cloud Secret Manager (latest)**: Secrets management
- **Google Cloud Storage (latest)**: File storage
- **Firebase (latest)**: Push notifications
- **Stripe (latest)**: Payments
- **Google Places API (latest)**: Location services

### Native Integrations
- **Capacitor (latest)**: iOS/Android native features
- **Push Notifications**: Firebase Cloud Messaging
- **Camera**: Image capture
- **Keyboard**: Native keyboard handling

## Security

### Authentication
- Session-based authentication
- Password hashing with bcrypt (latest)
- OAuth integration (Google, Apple)
- Session stored in database

### Authorization
- Route-level authentication middleware
- User-based access control
- Role-based permissions (if applicable)

### Data Protection
- SQL injection prevention (parameterized queries)
- XSS prevention (CSP headers)
- CSRF protection (sameSite cookies)
- Rate limiting

## Performance Optimizations

### Frontend
- Code splitting by routes
- Lazy loading components
- Image optimization
- Redux state normalization

### Backend
- Database connection pooling
- Query optimization
- Compression middleware
- Rate limiting

## Deployment

### Environment Setup
- **Development**: Local environment
  - Local PostgreSQL database
  - Local file storage
  - Environment variables from `.env` file
- **QA**: Staging/QA environment (mirrors production)
  - Google Cloud Platform (App Engine, latest)
  - Cloud SQL (PostgreSQL, latest) - separate instance from production
  - Cloud Storage (latest) - separate bucket from production
  - Secret Manager (latest) - QA-specific secrets
  - QA-specific domain/URL
- **Production**: Google Cloud Platform (App Engine, latest)
  - Database: Cloud SQL (PostgreSQL, latest)
  - Storage: Google Cloud Storage (latest)
  - Secrets: Google Cloud Secret Manager (latest)

### QA Environment

#### Purpose
The QA environment serves as a staging environment that mirrors production for:
- Pre-production testing
- Client/stakeholder demos
- Integration testing with external services
- Performance testing
- User acceptance testing (UAT)

#### QA Environment Setup
1. **Create QA App Engine Service**:
   - Separate App Engine service for QA (e.g., `qa-service`)
   - QA-specific configuration in `app-qa.yaml`
   - QA-specific environment variables

2. **Database Setup**:
   - Create separate Cloud SQL instance for QA
   - Use same schema as production (sync from production or migrations)
   - Use test data (anonymized production data or synthetic data)
   - Regular database snapshots from production for realistic testing

3. **Storage Setup**:
   - Create separate Cloud Storage bucket for QA (e.g., `[project]-qa-storage`)
   - Separate folders for different asset types
   - Test data/images separate from production

4. **Secrets Management**:
   - Create QA-specific secrets in Google Cloud Secret Manager
   - Use test API keys for external services (Stripe test mode, etc.)
   - QA-specific OAuth credentials (if applicable)
   - QA-specific Firebase project (recommended)

5. **Configuration**:
   - QA-specific `capacitor.config.ts` settings
   - QA-specific CORS origins
   - QA-specific rate limiting (may be more lenient)
   - QA-specific logging levels (more verbose for debugging)

#### QA Deployment Process
1. **Pre-Deployment Checklist**:
   - [ ] All tests passing locally
   - [ ] Code reviewed and approved
   - [ ] Database migrations tested locally
   - [ ] Environment variables updated in Secret Manager
   - [ ] Build tested locally (`npm run build`)

2. **Deployment Steps**:
   ```bash
   # Build for QA
   npm run build
   
   # Deploy to QA App Engine service
   gcloud app deploy app-qa.yaml --version=[version] --project=[qa-project-id]
   
   # Or use specific service
   gcloud app deploy --service=qa-service --version=[version]
   ```

3. **Post-Deployment Verification**:
   - [ ] Health check endpoint responds (`/api/health`)
   - [ ] Database connection successful
   - [ ] Authentication flows work
   - [ ] Critical user paths tested
   - [ ] External service integrations verified
   - [ ] Logs checked for errors

#### QA Testing Procedures
1. **Smoke Testing**: Basic functionality verification
   - User registration/login
   - Core feature workflows
   - API endpoints responding

2. **Regression Testing**: Ensure existing features still work
   - Run full test suite
   - Manual testing of critical paths
   - Cross-browser testing (if web app)

3. **Integration Testing**: Verify external service integrations
   - Payment processing (Stripe test mode)
   - OAuth providers (test accounts)
   - File storage operations
   - Push notifications (test tokens)

4. **Performance Testing**: Verify performance under load
   - Response times
   - Database query performance
   - File upload/download speeds

5. **User Acceptance Testing (UAT)**: Stakeholder verification
   - Client/stakeholder review
   - Feature completeness verification
   - UI/UX review

#### QA Environment Variables
- `NODE_ENV=qa` or `NODE_ENV=staging`
- `QA_CLIENT_URL` - QA frontend URL
- `QA_DB_INSTANCE_UNIX_SOCKET` - QA Cloud SQL connection
- `QA_GOOGLE_CLOUD_STORAGE_BUCKET` - QA storage bucket
- Test API keys for external services
- QA-specific OAuth credentials

#### QA Data Management
- **Test Data**: Use anonymized production data or synthetic test data
- **Data Refresh**: Regular sync from production (anonymized) or reset scripts
- **Data Privacy**: Ensure no real user data in QA (GDPR/compliance)
- **Database Snapshots**: Create snapshots before major testing cycles

#### QA Rollback Procedure
If issues are found in QA:
1. Identify the problematic version
2. Rollback to previous stable version:
   ```bash
   gcloud app versions list --service=qa-service
   gcloud app versions migrate [previous-version] --service=qa-service
   ```
3. Document the issue
4. Fix and redeploy

#### QA Environment Maintenance
- **Regular Updates**: Keep QA environment in sync with production codebase
- **Database Sync**: Periodically sync QA database schema from production (anonymize data)
- **Secret Rotation**: Rotate QA secrets regularly (less critical than production but good practice)
- **Storage Cleanup**: Regularly clean up test files from QA storage bucket
- **Version Management**: Keep track of deployed versions and clean up old versions periodically
- **Monitoring**: Set up basic monitoring/alerts for QA (less critical than production)
- **Access Control**: Limit access to QA environment (separate from production access)

### Deployment Checklist

#### Pre-Production Deployment (via QA)
- [ ] Feature tested and approved in QA environment
- [ ] All QA tests passing
- [ ] Stakeholder approval received (if required)
- [ ] Database migrations tested in QA
- [ ] Performance tested in QA
- [ ] Security review completed (if applicable)
- [ ] Rollback plan documented

#### Production Deployment
- [ ] QA environment verified and stable
- [ ] Production secrets updated in Secret Manager
- [ ] Database backup created (if migrations included)
- [ ] Build tested locally
- [ ] Deploy to production
- [ ] Post-deployment verification
- [ ] Monitor logs and metrics
- [ ] Verify critical user paths

### Build Process
1. `npm run build` - Build React app
2. Deploy to QA environment for testing
3. After QA approval, deploy to production
4. Database migrations (if needed) - test in QA first

## Development Workflow

### Adding a New Feature
1. Create route file in `server/routes/`
2. Create service file in `server/services/`
3. Create query file in `server/queries/`
4. Create Redux reducer in `src/store/`
5. Create components in `src/components/[Feature]/`
6. Add route in `src/components/App.js`
7. Update documentation (this file and DATABASE_SCHEMA.md)
8. Add tests

### Database Changes
1. Make database change
2. **IMMEDIATELY update DATABASE_SCHEMA.md**
3. Update queries if needed
4. Test thoroughly

## Testing Strategy

### Unit Tests
- Component tests
- Service tests
- Utility function tests

### Integration Tests
- API endpoint tests
- Database query tests

### Test Files Location
- `src/tests/` - Frontend tests
- `server/tests/` - Backend tests (if applicable)

## Known Issues & Limitations

- [List any known issues]
- [Performance considerations]
- [Scalability notes]

## Future Improvements

- [Planned improvements]
- [Technical debt]
- [Architecture evolution plans]

## Notes

- [Any important notes about the architecture]
- [Configuration details]
- [Integration specifics]
