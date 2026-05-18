import { AnalysisResult } from './analysis-engine';

const STORAGE_KEY = 'placement_prep_history';

export const Storage = {
  saveAnalysis: (result: AnalysisResult) => {
    const history = Storage.getHistory();
    localStorage.setItem(STORAGE_KEY, JSON.stringify([result, ...history]));
  },

  getHistory: (): AnalysisResult[] => {
    if (typeof window === 'undefined') return [];
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  },

  getById: (id: string): AnalysisResult | undefined => {
    return Storage.getHistory().find(h => h.id === id);
  },

  clearHistory: () => {
    localStorage.removeItem(STORAGE_KEY);
  }
};
