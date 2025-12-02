# Context Prompt for AI Assistants

Use this prompt when working on this codebase to ensure consistency and proper documentation.

## Standard Context Prompt

When making updates, ensure you follow these guidelines:

### Architecture & Organization
- **Follow the architecture** described in `@APP_SHELL_PROMPT.md`:
  - Service layer pattern: Components → Helpers → Routes → Services → Queries
  - UI components (`src/components/`) should strictly render UI, no business logic
  - Helpers (`src/helpers/`) contain functions called by UI components
  - Routes (`server/routes/`) handle HTTP requests/responses and validation
  - Services (`server/services/`) contain business logic
  - Queries (`server/queries/`) contain raw SQL queries
  - Feature-based folder structure for components

### Documentation Maintenance
- **Keep documentation synchronized** with code changes:
  - **Database changes**: IMMEDIATELY update `@DATABASE_SCHEMA.md` when making ANY database change (tables, columns, indexes, constraints, triggers, functions). Include:
    - Updated table documentation with new/modified columns
    - New indexes with their purpose
    - Updated foreign key relationships
    - Migration note in Migration History section with date
  - **Feature additions**: Update `@ARCHITECTURE.md` when adding features:
    - Add feature description in Features section
    - Document components, routes, services, and state management
    - Update API Endpoints section with new endpoints
    - Document component organization and dependencies
  - **Architecture changes**: Update `@ARCHITECTURE.md` when patterns change:
    - Layout system modifications
    - New contexts or providers
    - Integration point changes
    - Deployment process updates

### Testing
- **Maintain test coverage** when adding features:
  - First read `@src/tests/README.md` to understand the testing structure and organization
  - Add tests to appropriate files in `src/tests/` or create new files if needed to separate concerns
  - Follow test organization principles:
    - Component tests: `ComponentName.test.js`
    - Route tests: `[RouteName].test.js` or add to `App.test.js` for integration
    - Helper tests: `[helperName]Helpers.test.js`
    - Reducer tests: `[reducerName].reducer.test.js`
    - Game tests: `[GameName].test.js`
  - Use `waitFor` for lazy-loaded route components
  - Include React Router future flags in route tests to avoid deprecation warnings
  - Test new components, services, routes, and utilities
  - Update `setupTests.js` if new test utilities are needed
  - Document test coverage in `@ARCHITECTURE.md` Testing Strategy section

### Styling Standards
- **Follow Tailwind CSS standards**:
  - Use standardized spacing utilities from `tailwind.config.js` for consistent padding, margins, and gaps
  - Follow the styling system documented in `@ARCHITECTURE.md` (if applicable)
  - Maintain consistency with existing component styles
  - Use semantic spacing values rather than arbitrary values

### Code Quality
- **Follow established patterns**:
  - Use parameterized queries for all database operations (SQL injection prevention)
  - Implement proper error handling and validation
  - Follow the loader pattern for server initialization
  - Use lazy loading for route components
  - Implement proper loading states and error boundaries

### QA Environment
- **Test in QA before production**:
  - Deploy changes to QA environment first
  - Verify all functionality works in QA
  - Test database migrations in QA before production
  - Ensure QA environment mirrors production setup
  - Follow QA deployment checklist in `@ARCHITECTURE.md`

## Example Usage

When adding a new feature, the workflow should be:

1. **Plan**: Review `@ARCHITECTURE.md` to understand existing patterns
2. **Database** (if needed): 
   - Make database changes
   - **IMMEDIATELY** update `@DATABASE_SCHEMA.md` with:
     - Table/column changes
     - New indexes and their purposes
     - Migration note with date
3. **Backend**:
   - Create query file in `server/queries/`
   - Create service file in `server/services/`
   - Create route file in `server/routes/`
   - Add route to `server/routes/index.js`
4. **Frontend**:
   - Create helper functions in `src/helpers/`
   - Create components in `src/components/[Feature]/`
   - Add route in `src/components/App.js`
   - Update Redux store if needed
5. **Documentation**:
   - Update `@ARCHITECTURE.md` with feature details
   - Update API Endpoints section
   - Document component organization
6. **Testing**:
   - Read `@src/tests/README.md` for testing structure and patterns
   - Add tests following the organization principles:
     - Create component tests for new components
     - Create route tests for new routes
     - Create helper tests for new helpers
     - Create reducer tests for new reducers
     - Create game tests for new games
   - Test components, services, routes, and utilities
   - Use appropriate test patterns (see `@src/tests/README.md` for examples)
7. **Review**: Ensure all documentation is accurate and complete

## Quick Reference

- **Architecture patterns**: See `@APP_SHELL_PROMPT.md`
- **Database schema**: See `@DATABASE_SCHEMA.md` for complete schema reference
- **API endpoints**: See `@ARCHITECTURE.md` API Endpoints section
- **Testing structure**: See `@src/tests/README.md` for test organization and patterns
- **Styling standards**: See `tailwind.config.js` and `@ARCHITECTURE.md` Styling System section

---

**Remember**: Well-maintained documentation makes development faster and more reliable, especially when working with AI assistants. Keep documentation synchronized with code changes.

