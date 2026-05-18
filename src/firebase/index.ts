'use client';

import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';
import { firebaseConfig } from './config';

let app: FirebaseApp | null = null;
let db: Firestore | null = null;
let auth: Auth | null = null;

/**
 * Initializes Firebase services.
 * Falls back to Local Mode if the minimal config is not provided.
 */
export function initializeFirebase() {
  // Only the API Key is required to attempt initialization, 
  // though Project ID is typically needed for full cloud services.
  if (!firebaseConfig.apiKey) {
    console.info("Firebase API Key is missing. The app is running in Local Mode (Browser Storage only).");
    return null;
  }

  try {
    if (getApps().length === 0) {
      // Note: Firebase usually requires a Project ID. Without it, initializeApp might throw.
      // This catch block handles the fallback to Local Mode gracefully.
      app = initializeApp(firebaseConfig as any);
    } else {
      app = getApp();
    }
    db = getFirestore(app);
    auth = getAuth(app);
    return { app, db, auth };
  } catch (error) {
    console.info("Cloud Services unavailable (Missing Project ID). Defaulting to Local Mode.");
    return null;
  }
}

export { FirebaseProvider, useFirebase, useFirebaseApp, useFirestore, useAuth } from './provider';
export { FirebaseClientProvider } from './client-provider';
export { useCollection } from './firestore/use-collection';
export { useDoc } from './firestore/use-doc';
export { useUser } from './auth/use-user';
