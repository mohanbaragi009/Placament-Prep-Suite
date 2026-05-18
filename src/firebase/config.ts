'use client';

/**
 * Minimal Firebase configuration.
 * Only the API Key is retained as per request.
 * All other identifiers (Project ID, App ID, etc.) are removed.
 */
export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
};
