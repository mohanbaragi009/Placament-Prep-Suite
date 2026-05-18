
import { AnalysisResult } from './analysis-engine';

const STORAGE_KEY = 'placement_prep_history';

export const Storage = {
  saveAnalysis: (result: AnalysisResult) => {
    const history = Storage.getHistory();
    localStorage.setItem(STORAGE_KEY, JSON.stringify([result, ...history]));
  },

  updateAnalysis: (updatedResult: AnalysisResult) => {
    const history = Storage.getHistory();
    const index = history.findIndex(h => h.id === updatedResult.id);
    if (index !== -1) {
      history[index] = {
        ...updatedResult,
        updatedAt: new Date().toISOString()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    }
  },

  getHistory: (): AnalysisResult[] => {
    if (typeof window === 'undefined') return [];
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    
    try {
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      
      // Filter out corrupted entries missing vital fields
      return parsed.filter(item => {
        const isValid = 
          item && 
          item.id && 
          item.extractedSkills && 
          item.checklist && 
          item.plan7Days && // Ensure the 7-day plan exists
          Array.isArray(item.plan7Days) &&
          Array.isArray(item.checklist) &&
          Array.isArray(item.questions);
          
        if (!isValid) console.warn("Skipping corrupted or outdated history entry:", item?.id);
        return isValid;
      });
    } catch (e) {
      console.error("Corrupted history detected, clearing key.");
      return [];
    }
  },

  getById: (id: string): AnalysisResult | undefined => {
    return Storage.getHistory().find(h => h.id === id);
  },

  clearHistory: () => {
    localStorage.removeItem(STORAGE_KEY);
  }
};
