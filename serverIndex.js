require('dotenv').config({ quiet: true });

const express = require('express');
const path = require('path');
const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');

// Initialize secrets and start server
async function initializeSecrets() {
  const isProduction = process.env.NODE_ENV === 'production';
  const isQA = process.env.NODE_ENV === 'qa';
  
  if (isProduction || isQA) {
    const client = new SecretManagerServiceClient();
    
    // Define secrets to load - map secret names to environment variable names
    const secretMappings = [
      { secretName: 'SESSION_SECRET', envName: 'SESSION_SECRET' },
      { secretName: 'DB_PASSWORD', envName: 'DB_PASSWORD' },
      { secretName: 'DB_USER', envName: 'DB_USER' },
      { 
        secretName: isQA ? 'QA_DB_DATABASE' : 'DB_DATABASE', 
        envName: 'DB_DATABASE' 
      },
      { 
        secretName: isQA ? 'QA_DB_INSTANCE_UNIX_SOCKET' : 'DB_INSTANCE_UNIX_SOCKET', 
        envName: 'DB_INSTANCE_UNIX_SOCKET' 
      },
      { 
        secretName: isQA ? 'QA_DEFAULT_CLIENT_URL' : 'DEFAULT_CLIENT_URL', 
        envName: 'DEFAULT_CLIENT_URL' 
      },
      { 
        secretName: isQA ? 'QA_INSTANCE_CONNECTION_NAME' : 'INSTANCE_CONNECTION_NAME', 
        envName: 'INSTANCE_CONNECTION_NAME' 
      },
      { secretName: 'GOOGLE_CLIENT_ID', envName: 'GOOGLE_CLIENT_ID' },
      { secretName: 'GOOGLE_CLIENT_SECRET', envName: 'GOOGLE_CLIENT_SECRET' },
      { secretName: 'GOOGLE_PLACES_API_KEY', envName: 'GOOGLE_PLACES_API_KEY' },
      { secretName: 'APPLE_CLIENT_ID', envName: 'APPLE_CLIENT_ID' },
      { secretName: 'APPLE_TEAM_ID', envName: 'APPLE_TEAM_ID' },
      { secretName: 'APPLE_KEY_ID', envName: 'APPLE_KEY_ID' },
      { secretName: 'APPLE_KEY', envName: 'APPLE_KEY' },
      { secretName: 'FIREBASE_SERVICE_ACCOUNT_JSON', envName: 'FIREBASE_SERVICE_ACCOUNT_JSON' },
      { secretName: 'GOOGLE_CLOUD_STORAGE_KEY', envName: 'GOOGLE_CLOUD_STORAGE_KEY' },
      { secretName: 'GOOGLE_CLOUD_STORAGE_BUCKET', envName: 'GOOGLE_CLOUD_STORAGE_BUCKET' },
      { secretName: 'STRIPE_SECRET_KEY', envName: 'STRIPE_SECRET_KEY' },
      { secretName: 'STRIPE_PUBLISHABLE_KEY', envName: 'STRIPE_PUBLISHABLE_KEY' },
    ];

    let loadedCount = 0;
    for (const { secretName, envName } of secretMappings) {
      try {
        const [version] = await client.accessSecretVersion({
          name: `projects/${process.env.GOOGLE_CLOUD_PROJECT}/secrets/${secretName}/versions/latest`,
        });
        const secretData = version.payload.data;
        process.env[envName] = Buffer.isBuffer(secretData) 
          ? secretData.toString('utf8') 
          : secretData.toString();
        
        if (envName === 'FIREBASE_SERVICE_ACCOUNT_JSON' || envName === 'GOOGLE_CLOUD_STORAGE_KEY') {
          try {
            JSON.parse(process.env[envName]);
          } catch (parseError) {
            console.warn(`🔐 [Server] Secret ${envName} is not valid JSON`);
          }
        }
        loadedCount++;
      } catch (error) {
        console.warn(`🔐 [Server] Failed to load secret ${secretName}:`, error.message);
      }
    }
  }
}

async function startServer(retryCount = 0) {
  try {
    // Initialize secrets first
    await initializeSecrets();

    // Initialize database
    const db = require('./server/db');
    await db.initialize();

    // Initialize Firebase Admin SDK (after secrets are loaded)
    const { initializeFirebase } = require('./server/config/firebase');
    const firebaseAdmin = initializeFirebase();

    // Load Express app
    const loaders = require('./server/loaders');
    const app = await loaders.init();

    const PORT = process.env.PORT || 8080;

    // Serve static files from React build
    const isProduction = process.env.NODE_ENV === 'production';
    const isQA = process.env.NODE_ENV === 'qa';
    
    if (isProduction || isQA) {
      app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'build', 'index.html'));
      });
    }

    // Start server
    const server = app.listen(PORT, () => {
      console.log(`✅ [Server] Nash Stash server running on port ${PORT}`);
      console.log(`📱 [Server] Environment: ${process.env.NODE_ENV || 'development'}`);
    });

    // Initialize Socket.io
    const { initializeSocket } = require('./server/socket');
    initializeSocket(server);

    // Graceful shutdown
    const shutdown = async () => {
      console.log('\n🛑 [Server] Shutting down gracefully...');
      server.close(async () => {
        console.log('✅ [Server] HTTP server closed');
        await db.close();
        process.exit(0);
      });
    };

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);

  } catch (error) {
    console.error('❌ [Server] Failed to start:', error);
    
    // Retry logic
    if (retryCount < 3) {
      console.log(`⏳ [Server] Retrying in 5 seconds... (${retryCount + 1}/3)`);
      setTimeout(() => startServer(retryCount + 1), 5000);
    } else {
      console.error('❌ [Server] Max retries reached. Exiting.');
      process.exit(1);
    }
  }
}

startServer();

