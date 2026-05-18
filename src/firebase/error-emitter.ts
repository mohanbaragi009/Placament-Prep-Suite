'use client';

type ErrorHandler = (error: any) => void;

class ErrorEmitter {
  private listeners: { [key: string]: ErrorHandler[] } = {};

  on(event: string, handler: ErrorHandler) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(handler);
  }

  emit(event: string, data: any) {
    if (this.listeners[event]) {
      this.listeners[event].forEach((handler) => handler(data));
    }
  }
}

export const errorEmitter = new ErrorEmitter();
