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
    setServices(initialized);
  }, []);

  if (!services) return null;

  return (
    <FirebaseProvider app={services.app} db={services.db} auth={services.auth}>
      {children}
    </FirebaseProvider>
  );
}
