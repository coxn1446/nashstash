const admin = require('firebase-admin');

let firebaseAdmin = null;

function initializeFirebase() {
  if (firebaseAdmin) {
    return firebaseAdmin;
  }

  try {
    const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
    
    if (!serviceAccountJson) {
      console.warn('⚠️ [Firebase] FIREBASE_SERVICE_ACCOUNT_JSON not found, Firebase Admin not initialized');
      return null;
    }

    const serviceAccount = JSON.parse(serviceAccountJson);
    
    firebaseAdmin = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });

    console.log('✅ [Firebase] Admin SDK initialized');
    return firebaseAdmin;
  } catch (error) {
    console.error('❌ [Firebase] Failed to initialize:', error.message);
    return null;
  }
}

module.exports = {
  initializeFirebase,
  getAdmin: () => firebaseAdmin,
};

