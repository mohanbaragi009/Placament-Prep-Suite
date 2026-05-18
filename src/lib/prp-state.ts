
export const PRP_STEPS = [
  "Foundation (Landing Page)",
  "Core Shell (Dashboard Layout)",
  "AI Analysis Engine",
  "Interactive Results",
  "Practice Ecosystem",
  "Resources Researcher",
  "Quality Assurance Checklist",
  "Final Shipment"
];

export interface FinalSubmission {
  lovable: string;
  github: string;
  deployment: string;
}

export const PrpState = {
  getSteps: (): boolean[] => {
    if (typeof window === 'undefined') return new Array(PRP_STEPS.length).fill(false);
    const saved = localStorage.getItem('prp_steps_completed');
    return saved ? JSON.parse(saved) : new Array(PRP_STEPS.length).fill(false);
  },

  saveSteps: (steps: boolean[]) => {
    localStorage.setItem('prp_steps_completed', JSON.stringify(steps));
  },

  getChecklistPassed: (): boolean => {
    if (typeof window === 'undefined') return false;
    const saved = localStorage.getItem('prp_test_checklist');
    if (!saved) return false;
    const checklist = JSON.parse(saved);
    return Object.values(checklist).filter(v => v === true).length === 10;
  },

  getSubmission: (): FinalSubmission => {
    if (typeof window === 'undefined') return { lovable: '', github: '', deployment: '' };
    const saved = localStorage.getItem('prp_final_submission');
    return saved ? JSON.parse(saved) : { lovable: '', github: '', deployment: '' };
  },

  saveSubmission: (sub: FinalSubmission) => {
    localStorage.setItem('prp_final_submission', JSON.stringify(sub));
  },

  isShipped: (): boolean => {
    const steps = PrpState.getSteps();
    const allStepsDone = steps.every(s => s === true);
    const checklistDone = PrpState.getChecklistPassed();
    const sub = PrpState.getSubmission();
    const linksDone = !!(sub.lovable && sub.github && sub.deployment);
    return allStepsDone && checklistDone && linksDone;
  }
};
