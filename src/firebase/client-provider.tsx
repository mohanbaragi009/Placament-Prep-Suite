'use client';

import React, { useEffect, useState } from 'react';
import { initializeFirebase, FirebaseProvider } from './index';
import { FirebaseApp } from 'firebase/app';
import { Firestore } from 'firebase/firestore';
import { Auth } from 'firebase/auth';

export function FirebaseClientProvider({ children }: { children: React.ReactNode }) {
  const [services, setServices] = useState<{
    app: FirebaseApp | null;
    db: Firestore | null;
    auth: Auth | null;
  }>({
    app: null,
    db: null,
    auth: null
  });

  useEffect(() => {
    const initialized = initializeFirebase();
    if (initialized) {
      setServices(initialized);
    }
  }, []);

  return (
    <FirebaseProvider app={services.app} db={services.db} auth={services.auth}>
      {children}
    </FirebaseProvider>
  );
}
