# Database Schema Documentation

> **IMPORTANT**: This file MUST be updated whenever ANY database changes are made. Keep it synchronized with the actual database schema.

## Last Updated
2024-12-19

## Overview
Nash Stash is a collection of games for the App Store. The database will store game data, user progress, scores, and other game-related information as games are developed and added to the platform.

## Tables

### [table_name]
- **Purpose**: [What this table stores]
- **Columns**:
  - `column_name` (TYPE)` - [Description, constraints, defaults]
  - ...
- **Primary Key**: `column_name`
- **Indexes**: 
  - `index_name` on `column(s)` - [Purpose]
- **Foreign Keys**:
  - `column_name` → `referenced_table(referenced_column)` - [Relationship description]
- **Unique Constraints**:
  - `constraint_name` on `column(s)`
- **Check Constraints**:
  - `constraint_name`: [condition]
- **Triggers**:
  - `trigger_name`: [When it fires, what it does]
- **Default Values**: [Any notable defaults]
- **Last Modified**: YYYY-MM-DD

---

## Views

### [view_name]
- **Purpose**: [What this view provides]
- **Base Tables**: [Which tables it queries]
- **Columns**: [List of columns]
- **Last Modified**: YYYY-MM-DD

---

## Functions

### [function_name](parameters)
- **Purpose**: [What this function does]
- **Parameters**:
  - `param_name` (TYPE): [Description]
- **Returns**: [Return type and description]
- **Usage**: [Example usage]
- **Last Modified**: YYYY-MM-DD

---

## Stored Procedures

### [procedure_name](parameters)
- **Purpose**: [What this procedure does]
- **Parameters**:
  - `param_name` (TYPE): [Description]
- **Returns**: [What it returns]
- **Last Modified**: YYYY-MM-DD

---

## Triggers

### [trigger_name]
- **Table**: [Which table]
- **Event**: [INSERT/UPDATE/DELETE]
- **Timing**: [BEFORE/AFTER]
- **Function**: [Which function it calls]
- **Purpose**: [What it accomplishes]
- **Last Modified**: YYYY-MM-DD

---

## Indexes

### [index_name]
- **Table**: [Which table]
- **Columns**: [Which columns] (include DESC if applicable)
- **Type**: [B-tree, Hash, GIN, GiST, etc.]
- **Unique**: [Yes/No] (note if enforced by constraint)
- **Purpose**: [Why this index exists, what queries it optimizes]
- **Last Modified**: YYYY-MM-DD

---

## Constraints

### Foreign Key Constraints
- `constraint_name`: `table.column` → `referenced_table.referenced_column`
  - **On Delete**: [CASCADE/RESTRICT/SET NULL]
  - **On Update**: [CASCADE/RESTRICT/SET NULL]

### Check Constraints
- `constraint_name` on `table.column`: [condition]

### Unique Constraints
- `constraint_name` on `table(columns)`

---

## Relationships Diagram

```
[Table1] --< [Table2]
[Table1] --> [Table3]
```

---

## Migration History

### YYYY-MM-DD - [Migration Name]
- **Description**: [What changed]
- **Tables Created**: [List of new tables]
- **Tables Modified**: [List of modified tables]
- **Columns Added**: [List of new columns]
- **Columns Modified**: [List of modified columns]
- **Functions Created**: [List of new functions]
- **Triggers Created**: [List of new triggers]
- **Indexes Created**: [List of new indexes]
- **Breaking Changes**: [Any breaking changes]
- **Rollback**: [How to rollback if needed]

---

## Notes

- [Any important notes about the schema]
- [Performance considerations]
- [Known issues or limitations]
- [Session table management details]
- [Password hashing approach]
- [OAuth user considerations]
- [Timestamp storage format]

---

## Initial Setup SQL

[Include complete SQL for setting up the database from scratch. This should include all tables, indexes, constraints, triggers, and functions in the correct order. This serves as both documentation and a reference for setting up new environments.]

```sql
-- Create users table
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  -- [column definitions]
);

-- Create indexes
CREATE INDEX idx_users_username ON users(username);

-- [Continue with all tables, indexes, constraints, triggers, and functions]
```

