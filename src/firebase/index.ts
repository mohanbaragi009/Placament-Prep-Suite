'use client';

import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';
import { firebaseConfig } from './config';

let app: FirebaseApp | null = null;
let db: Firestore | null = null;
let auth: Auth | null = null;

/**
 * Initializes Firebase services with a fail-safe fallback.
 * If credentials are missing, it returns null, signaling the app to use Local Storage.
 */
export function initializeFirebase() {
  const apiKey = firebaseConfig.apiKey;
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

  // We require both API Key and Project ID for a functional cloud connection.
  if (!apiKey || !projectId) {
    return null;
  }

  try {
    if (getApps().length === 0) {
      app = initializeApp({
        apiKey,
        projectId,
        authDomain: `${projectId}.firebaseapp.com`,
        storageBucket: `${projectId}.appspot.com`,
      });
    } else {
      app = getApp();
    }
    db = getFirestore(app);
    auth = getAuth(app);
    return { app, db, auth };
  } catch (error) {
    console.warn("Firebase initialization failed. Defaulting to Local Mode.");
    return null;
  }
}

export { FirebaseProvider, useFirebase, useFirebaseApp, useFirestore, useAuth } from './provider';
export { FirebaseClientProvider } from './client-provider';
export { useCollection } from './firestore/use-collection';
export { useDoc } from './firestore/use-doc';
export { useUser } from './auth/use-user';
