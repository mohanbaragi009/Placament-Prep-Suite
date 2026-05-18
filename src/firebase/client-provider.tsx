
'use client';

import React, { useEffect, useState } from 'react';
import { initializeFirebase, FirebaseProvider } from './index';
import { FirebaseApp } from 'firebase/app';
import { Firestore } from 'firebase/firestore';
import { Auth } from 'firebase/auth';

export function FirebaseClientProvider({ children }: { children: React.ReactNode }) {
  const [services, setServices] = useState<{
    app: FirebaseApp;
    db: Firestore;
    auth: Auth;
  } | null>(null);

  useEffect(() => {
    const initialized = initializeFirebase();
    if (initialized) {
      setServices(initialized);
    }
  }, []);

  // If Firebase isn't initialized, we still render children so the app doesn't go blank,
  // but cloud features will naturally fail or show warnings.
  if (!services) {
    return <>{children}</>;
  }

  return (
    <FirebaseProvider app={services.app} db={services.db} auth={services.auth}>
      {children}
    </FirebaseProvider>
  );
}
