'use client';

import { useEffect } from 'react';
import { errorEmitter } from '@/firebase/error-emitter';
import { useToast } from '@/hooks/use-toast';

export function FirebaseErrorListener() {
  const { toast } = useToast();

  useEffect(() => {
    errorEmitter.on('permission-error', (error) => {
      // In a real development environment, this would throw or show a detailed overlay
      // For this prototype, we surface it clearly via toast
      console.error('Firebase Permission Error:', error);
      toast({
        variant: 'destructive',
        title: 'Permission Denied',
        description: `Operation ${error.context.operation} on ${error.context.path} failed. Check your security rules.`,
      });
    });
  }, [toast]);

  return null;
}
