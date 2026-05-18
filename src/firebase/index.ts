
'use client';

import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';
import { firebaseConfig } from './config';

let app: FirebaseApp | null = null;
let db: Firestore | null = null;
let auth: Auth | null = null;

export function initializeFirebase() {
  // Check for minimum required config to avoid crashes during deployment
  if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
    console.info("Firebase configuration is incomplete. The app will run in Local Mode (Local Storage only).");
    return null;
  }

  try {
    if (getApps().length === 0) {
      app = initializeApp(firebaseConfig);
    } else {
      app = getApp();
    }
    db = getFirestore(app);
    auth = getAuth(app);
    return { app, db, auth };
  } catch (error) {
    console.error("Failed to initialize Firebase:", error);
    return null;
  }
}

export { FirebaseProvider, useFirebase, useFirebaseApp, useFirestore, useAuth } from './provider';
export { FirebaseClientProvider } from './client-provider';
export { useCollection } from './firestore/use-collection';
export { useDoc } from './firestore/use-doc';
export { useUser } from './auth/use-user';
