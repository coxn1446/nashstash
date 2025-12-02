# Documentation Guide

This guide explains how to use the documentation templates and maintain documentation throughout the project lifecycle.

## Files Overview

### 1. `APP_SHELL_PROMPT.md`
**Purpose**: Comprehensive prompt for generating new app shells based on this architecture.

### 2. `CONTEXT_PROMPT.md` (NEW)
**Purpose**: Standardized context prompt for AI assistants working on the codebase.

**When to use**:
- Copy this prompt and include it when asking AI assistants to make changes
- Use it as a reference to ensure consistent development practices
- Include relevant sections in your prompts

**How to use**:
1. Copy `CONTEXT_PROMPT.md` content or reference it in your prompts
2. Customize if needed for project-specific requirements
3. Use it consistently across all development tasks

### 3. `DATABASE_SCHEMA.md` (create from template)

**When to use**: 
- When starting a new project
- Copy this file to your new project
- Use it as a prompt for AI assistants to generate the app structure

**How to use**:
1. Copy `APP_SHELL_PROMPT.md` to your new project
2. Customize the app name and any project-specific details
3. Use it as a prompt: "Create an app shell using the specifications in APP_SHELL_PROMPT.md"

### 4. `DATABASE_SCHEMA.md` (create from template)
**Purpose**: Complete documentation of your database structure.

**When to update**: 
- **IMMEDIATELY** after ANY database change:
  - Creating/modifying tables
  - Adding/removing columns
  - Creating indexes
  - Adding triggers
  - Creating functions
  - Modifying constraints

**How to maintain**:
1. Start with `DATABASE_SCHEMA_TEMPLATE.md` as a base
2. Copy it to `DATABASE_SCHEMA.md` in your project
3. Update it **synchronously** with every database change
4. Include migration notes with dates
5. Keep it accurate - it's your source of truth

**Example workflow**:
```sql
-- You run this SQL:
ALTER TABLE users ADD COLUMN phone_number VARCHAR(20);

-- IMMEDIATELY update DATABASE_SCHEMA.md:
### users
- **Columns**:
  - ...
  - `phone_number` (VARCHAR(20))` - User's phone number
- **Last Modified**: 2024-01-15
```

### 5. `ARCHITECTURE.md` (create from template)
**Purpose**: High-level architecture documentation and feature descriptions.

**When to update**:
- When adding new features
- When architecture patterns change
- When adding new integrations
- When deployment process changes
- Periodically to keep it current

**How to maintain**:
1. Start with `ARCHITECTURE_TEMPLATE.md` as a base
2. Copy it to `ARCHITECTURE.md` in your project
3. Update sections as you build features
4. Keep API endpoint documentation current
5. Document integration points

**Example workflow**:
```javascript
// You add a new feature: Comments
// 1. Build the feature
// 2. Update ARCHITECTURE.md:

## Features

### Comments
- **Description**: Users can comment on posts
- **Components**: CommentList, CommentForm, CommentItem
- **Routes**: /api/comments
- **Services**: commentService.js
- **State**: comments reducer
- **Dependencies**: Posts, Users
```

## Documentation Workflow

### Starting a New Project

1. **Copy templates**:
   ```bash
   cp DATABASE_SCHEMA_TEMPLATE.md DATABASE_SCHEMA.md
   cp ARCHITECTURE_TEMPLATE.md ARCHITECTURE.md
   cp APP_SHELL_PROMPT.md APP_SHELL_PROMPT.md
   cp CONTEXT_PROMPT.md CONTEXT_PROMPT.md
   ```

2. **Customize templates**:
   - Update project name
   - Update dates
   - Add initial project description

3. **Use APP_SHELL_PROMPT.md** to generate the app structure

### During Development

#### When Making Database Changes

1. **Make the change** (SQL, migration, etc.)
2. **IMMEDIATELY update DATABASE_SCHEMA.md**:
   - Add/modify table documentation
   - Update indexes, constraints, triggers
   - Add migration note with date
3. **Commit both together**:
   ```bash
   git add migration_file.sql DATABASE_SCHEMA.md
   git commit -m "Add phone_number to users table"
   ```

#### When Adding Features

1. **Build the feature**
2. **Update ARCHITECTURE.md**:
   - Add feature description
   - Document components, routes, services
   - Update API endpoints section
3. **Update DATABASE_SCHEMA.md** if database changed
4. **Update tests** (see Testing section)

#### When Adding Tests

1. **Write tests** in `src/tests/` or `server/tests/`
2. **Update setupTests.js** if new utilities needed
3. **Document test coverage** in ARCHITECTURE.md

## Best Practices

### Database Documentation
- ✅ Update immediately after changes
- ✅ Include dates for all changes
- ✅ Document the "why" not just the "what"
- ✅ Keep migration history
- ❌ Don't let it get out of sync
- ❌ Don't document in multiple places

### Architecture Documentation
- ✅ Update when features are complete
- ✅ Keep API endpoints current
- ✅ Document integration points
- ✅ Include diagrams when helpful
- ❌ Don't document incomplete features
- ❌ Don't duplicate code comments

### General
- ✅ Keep documentation in the codebase
- ✅ Review documentation during code reviews
- ✅ Use clear, concise language
- ✅ Include examples when helpful
- ❌ Don't let documentation become stale
- ❌ Don't document implementation details (that's what code is for)

## Quick Reference Checklist

### Database Change Checklist
- [ ] Make database change
- [ ] Update DATABASE_SCHEMA.md immediately
- [ ] Add migration note with date
- [ ] Update related queries if needed
- [ ] Test the change
- [ ] Commit database change + documentation together

### Feature Addition Checklist
- [ ] Build the feature
- [ ] Update ARCHITECTURE.md with feature details
- [ ] Update DATABASE_SCHEMA.md if database changed
- [ ] Add/update tests
- [ ] Update API documentation
- [ ] Review documentation for accuracy

### Code Review Checklist
- [ ] Check if DATABASE_SCHEMA.md was updated for DB changes
- [ ] Check if ARCHITECTURE.md was updated for new features
- [ ] Verify documentation accuracy
- [ ] Ensure tests were added/updated

## Benefits of This Approach

1. **Context for AI Assistants**: When you ask for changes, the AI can read DATABASE_SCHEMA.md to understand the database structure
2. **Onboarding**: New developers can understand the system quickly
3. **Maintenance**: Easier to make changes when you understand the full picture
4. **Debugging**: Clear documentation helps identify issues faster
5. **Planning**: Architecture docs help plan new features

## Example: Complete Feature Addition

Let's say you're adding a "Likes" feature:

1. **Database Change**:
   ```sql
   CREATE TABLE likes (
     like_id SERIAL PRIMARY KEY,
     user_id INTEGER REFERENCES users(user_id),
     item_id INTEGER,
     item_type VARCHAR(20),
     created_at TIMESTAMPTZ DEFAULT NOW()
   );
   ```

2. **Update DATABASE_SCHEMA.md**:
   ```markdown
   ### likes
   - **Purpose**: Stores user likes on posts, comments, etc.
   - **Columns**:
     - `like_id` (SERIAL PRIMARY KEY)
     - `user_id` (INTEGER) - References users.user_id
     - `item_id` (INTEGER) - ID of liked item
     - `item_type` (VARCHAR(20)) - Type: 'post', 'comment', etc.
     - `created_at` (TIMESTAMPTZ) - When like was created
   - **Foreign Keys**: user_id → users(user_id)
   - **Indexes**: idx_likes_user_item on (user_id, item_id, item_type)
   - **Last Modified**: 2024-01-15
   ```

3. **Build Feature** (routes, services, components)

4. **Update ARCHITECTURE.md**:
   ```markdown
   ### Likes
   - **Description**: Users can like posts and comments
   - **Components**: LikeButton, LikeCount
   - **Routes**: POST /api/likes, DELETE /api/likes/:id
   - **Services**: likesService.js
   - **State**: posts reducer (includes like state)
   - **Dependencies**: Posts, Comments
   ```

5. **Add Tests**: Test like creation, deletion, counts

6. **Commit Everything Together**

---

**Remember**: Documentation is not a chore, it's an investment. Well-maintained documentation makes development faster and more reliable, especially when working with AI assistants.

## Using the Context Prompt

The `CONTEXT_PROMPT.md` file provides a standardized way to instruct AI assistants. You can:

1. **Copy the entire prompt** into your AI assistant conversation when starting work
2. **Reference specific sections** when making focused changes
3. **Customize it** for project-specific needs while maintaining core structure

Example usage:
```
When making updates, ensure you follow these guidelines from @CONTEXT_PROMPT.md:
- Follow the architecture described in @APP_SHELL_PROMPT.md
- Keep documentation synchronized with @DATABASE_SCHEMA.md and @ARCHITECTURE.md
- Maintain test coverage as described in @README.md
- Follow Tailwind CSS standards
```

