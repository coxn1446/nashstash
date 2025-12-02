const express = require('express');
const loadExpress = require('./express');
const loadPassport = require('./passport');
const loadRoutes = require('../routes');

async function init() {
  const app = express();

  // Load Express middleware
  await loadExpress(app);

  // Load Passport authentication
  loadPassport(app);

  // Load routes
  loadRoutes(app);

  // 404 handler
  app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
  });

  // Error handler
  app.use((err, req, res, next) => {
    console.error('❌ [Server] Error:', err);
    res.status(err.status || 500).json({
      error: err.message || 'Internal server error',
    });
  });

  return app;
}

module.exports = {
  init,
};

