const express = require('express');
const cors = require('cors');
const compression = require('compression');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const rateLimit = require('express-rate-limit');
const path = require('path');
const db = require('../db');

const isProduction = process.env.NODE_ENV === 'production';
const isQA = process.env.NODE_ENV === 'qa';

module.exports = async function loadExpress(app) {
  // Compression
  app.use(compression());

  // Body parsing
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // CORS
  const allowedOrigins = isProduction || isQA
    ? [process.env.DEFAULT_CLIENT_URL || process.env.QA_CLIENT_URL]
    : ['http://localhost:3000', 'https://localhost:3000'];

  app.use(cors({
    origin: allowedOrigins,
    credentials: true,
  }));

  // Rate limiting
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: isProduction ? 100 : 1000, // Limit each IP to 100 requests per windowMs in production
    message: 'Too many requests from this IP, please try again later.',
  });
  app.use('/api/', limiter);

  // Session configuration
  const sessionConfig = {
    secret: process.env.SESSION_SECRET || process.env.REACT_APP_SESSION_SECRET || 'dev-secret-change-in-production',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: isProduction || isQA,
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    },
  };

  if (isProduction || isQA) {
    // Use PostgreSQL session store in production/QA
    const pool = db.getPool();
    sessionConfig.store = new pgSession({
      pool: pool,
      tableName: 'session',
      createTableIfMissing: true,
    });
  }

  app.use(session(sessionConfig));

  // Serve static files from React build
  if (isProduction || isQA) {
    app.use(express.static(path.join(__dirname, '../../build')));
  }

  console.log('✅ [Express] Middleware loaded');
};

