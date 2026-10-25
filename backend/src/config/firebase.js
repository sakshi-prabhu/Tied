const admin = require("firebase-admin");

// Verifying ID tokens only needs the project ID — no service account key required
if (!admin.apps.length) {
  admin.initializeApp({ projectId: process.env.FIREBASE_PROJECT_ID });
}

module.exports = admin;
