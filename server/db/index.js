const { Pool } = require('pg');

let pool = null;

const getPool = () => {
  if (!pool) {
    throw new Error('Database pool not initialized. Call initialize() first.');
  }
  return pool;
};

async function initialize() {
  if (pool) {
    console.log('✅ [DB] Pool already initialized');
    return pool;
  }

  const isProduction = process.env.NODE_ENV === 'production';
  const isQA = process.env.NODE_ENV === 'qa';

  let config;

  if (isProduction || isQA) {
    // Cloud SQL configuration
    config = {
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE || 'nashstash',
      host: process.env.DB_INSTANCE_UNIX_SOCKET || '/cloudsql/' + process.env.INSTANCE_CONNECTION_NAME,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    };
  } else {
    // Local development configuration
    config = {
      user: process.env.REACT_APP_DB_user || 'postgres',
      password: process.env.REACT_APP_DB_password || 'postgres',
      database: process.env.REACT_APP_DB_database || 'nashstash',
      host: process.env.REACT_APP_DB_host || 'localhost',
      port: process.env.REACT_APP_DB_port || 5432,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    };
  }

  pool = new Pool(config);

  // Test connection
  let retries = 5;
  while (retries > 0) {
    try {
      const client = await pool.connect();
      await client.query('SELECT NOW()');
      client.release();
      console.log('✅ [DB] Database connection established');
      break;
    } catch (error) {
      retries--;
      if (retries === 0) {
        console.error('❌ [DB] Failed to connect to database after retries:', error.message);
        throw error;
      }
      console.log(`⏳ [DB] Retrying connection... (${5 - retries}/5)`);
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }

  // Handle pool errors
  pool.on('error', (err) => {
    console.error('❌ [DB] Unexpected error on idle client', err);
  });

  return pool;
}

async function close() {
  if (pool) {
    await pool.end();
    pool = null;
    console.log('✅ [DB] Database pool closed');
  }
}

module.exports = {
  initialize,
  close,
  getPool,
  query: (text, params) => getPool().query(text, params),
};

