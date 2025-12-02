const { Server } = require('socket.io');

let io = null;

function initializeSocket(server) {
  if (io) {
    return io;
  }

  const isProduction = process.env.NODE_ENV === 'production';
  const isQA = process.env.NODE_ENV === 'qa';
  
  const allowedOrigins = isProduction || isQA
    ? [process.env.DEFAULT_CLIENT_URL || process.env.QA_CLIENT_URL]
    : ['http://localhost:3000', 'https://localhost:3000'];

  io = new Server(server, {
    cors: {
      origin: allowedOrigins,
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  // Connection handling
  io.on('connection', (socket) => {
    console.log(`✅ [Socket] Client connected: ${socket.id}`);

    socket.on('disconnect', () => {
      console.log(`❌ [Socket] Client disconnected: ${socket.id}`);
    });

    // Placeholder event handlers - to be implemented as features are added
  });

  console.log('✅ [Socket] Socket.io initialized');
  return io;
}

function getIO() {
  if (!io) {
    throw new Error('Socket.io not initialized. Call initializeSocket() first.');
  }
  return io;
}

module.exports = {
  initializeSocket,
  getIO,
};

