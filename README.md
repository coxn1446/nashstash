# Nash Stash

A collection of games for the App Store, built with React, Express, and PostgreSQL.

## Tech Stack

### Frontend
- React 18+ with React Router DOM
- Redux Toolkit for state management
- Tailwind CSS for styling
- Ionic React for UI components
- Capacitor for iOS/Android

### Backend
- Node.js with Express
- PostgreSQL database
- Passport.js authentication (Local, Google, Apple) - placeholder, to be implemented
- Socket.io for real-time features
- Google Cloud Platform (Secret Manager, Storage, Cloud SQL)

## Project Structure

```
/
├── serverIndex.js          # Server entry point
├── server/                 # Backend code
│   ├── config/            # Configuration files
│   ├── db/                # Database connection
│   ├── loaders/           # Middleware loaders
│   ├── routes/            # API routes
│   ├── services/          # Business logic
│   ├── queries/           # SQL queries
│   └── socket/            # Socket.io handlers
├── src/                   # Frontend code
│   ├── components/        # React components
│   ├── routes/            # Route components
│   ├── store/             # Redux store
│   ├── hooks/             # Custom hooks
│   ├── utils/             # Utility functions
│   └── helpers/           # Helper functions
└── public/                # Static assets
```

## Getting Started

### Prerequisites
- Node.js (LTS version)
- PostgreSQL (for local development)
- Google Cloud Platform account (for production)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables (development):
```bash
export NODE_ENV=development
export REACT_APP_DB_user=your_db_user
export REACT_APP_DB_password=your_db_password
export REACT_APP_DB_database=nashstash_dev
export REACT_APP_DB_port=5432
export REACT_APP_SESSION_SECRET=your_session_secret
```

3. Set up the database:
```bash
# Create database
createdb nashstash_dev

# Database schema will be added as games are developed
# See DATABASE_SCHEMA.md for schema documentation
```

### Development

Run the development servers:

```bash
# Terminal 1 - Frontend (port 3000)
npm run start:dev

# Terminal 2 - Backend (port 8080)
npm run server:dev
```

### Production

Build and deploy:

```bash
# Build frontend
npm run build

# Deploy to App Engine
gcloud app deploy
```

## Documentation

- **ARCHITECTURE.md** - Architecture documentation and feature descriptions
- **DATABASE_SCHEMA.md** - Database schema documentation (update when making database changes)
- **APP_SHELL_PROMPT.md** - App shell generation prompt
- **CONTEXT_PROMPT.md** - Standardized context prompt for AI assistants
- **DOCUMENTATION_GUIDE.md** - Guide for maintaining documentation

## Current Status

This is an app shell with no functionality yet. It provides:
- ✅ Project structure and organization
- ✅ Server setup with Express, Passport, Socket.io
- ✅ Client setup with React, Redux, Routing
- ✅ Configuration files (Capacitor, Tailwind, etc.)
- ✅ Basic components (App, Home, Loading, NotFound)
- ✅ Testing infrastructure setup
- ⏳ Authentication (placeholder - to be implemented)
- ⏳ Database schema (to be added as games are developed)
- ⏳ Game features (to be added)

## Next Steps

1. Design and implement database schema for games
2. Add authentication functionality
3. Build first game
4. Add game management features
5. Set up analytics and tracking

## Testing

Run tests:
```bash
npm test
```

## License

[Add your license here]

