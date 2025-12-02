const express = require('express');
const router = express.Router();

// Placeholder route files - will be implemented as features are added
// const authRoutes = require('./auth');
// const usersRoutes = require('./users');

// API routes
router.use('/api', router);

// Placeholder routes
router.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Nash Stash API is running' });
});

// Mount feature routes here when implemented
// router.use('/api/auth', authRoutes);
// router.use('/api/users', usersRoutes);

module.exports = function loadRoutes(app) {
  app.use(router);
};

