/**
 * @fileOverview Standardized analysis engine for Job Descriptions.
 */

export const SKILL_CATEGORIES: Record<string, string[]> = {
  coreCS: ['DSA', 'OOP', 'DBMS', 'OS', 'Networks'],
  languages: ['Java', 'Python', 'JavaScript', 'TypeScript', 'C', 'C++', 'C#', 'Go'],
  web: ['React', 'Next.js', 'Node.js', 'Express', 'REST', 'GraphQL'],
  data: ['SQL', 'MongoDB', 'PostgreSQL', 'MySQL', 'Redis'],
  cloud: ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'CI/CD', 'Linux'],
  testing: ['Selenium', 'Cypress', 'Playwright', 'JUnit', 'PyTest']
};

export interface AnalysisResult {
  id: string;
  createdAt: string;
  updatedAt: string;
  company: string;
  role: string;
  jdText: string;
  extractedSkills: {
    coreCS: string[];
    languages: string[];
    web: string[];
    data: string[];
    cloud: string[];
    testing: string[];
    other: string[];
  };
  roundMapping: { roundTitle: string; focusAreas: string[]; whyItMatters: string }[];
  checklist: { roundTitle: string; items: string[] }[];
  plan7Days: { day: string; focus: string; tasks: string[] }[];
  questions: string[];
  baseScore: number;
  finalScore: number;
  skillConfidenceMap: Record<string, 'know' | 'practice'>;
}

const QUESTION_BANK: Record<string, string[]> = {
  'DSA': ['Explain the time complexity of QuickSort.', 'How do you detect a cycle in a linked list?', 'Difference between BFS and DFS.'],
  'OOP': ['Explain polymorphism with a real-world example.', 'What are SOLID principles?', 'Interface vs Abstract Class.'],
  'React': ['How does the Virtual DOM improve performance?', 'Explain React hooks lifecycle.', 'State vs Props.'],
  'JavaScript': ['Explain closures and hoisting.', 'What is the Event Loop?', 'Difference between == and ===.'],
  'SQL': ['Explain Joins and their types.', 'What is an Index and how does it help?', 'What are ACID properties?'],
  'Node.js': ['How does Node.js handle concurrency?', 'What is middleware in Express?', 'Explain streams in Node.'],
};

export function analyzeJD(company: string, role: string, jdText: string): AnalysisResult {
  const extractedSkills: any = {
    coreCS: [],
    languages: [],
    web: [],
    data: [],
    cloud: [],
    testing: [],
    other: []
  };

  let totalCategories = 0;
  Object.entries(SKILL_CATEGORIES).forEach(([catKey, skills]) => {
    const found = skills.filter(skill => 
      new RegExp(`\\b${skill.replace('.', '\\.')}\\b`, 'gi').test(jdText)
    );
    if (found.length > 0) {
      extractedSkills[catKey] = found;
      totalCategories++;
    }
  });

  // Default behavior if no skills detected
  const flatDetected = Object.values(extractedSkills).flat() as string[];
  if (flatDetected.length === 0) {
    extractedSkills.other = ["Communication", "Problem solving", "Basic coding", "Projects"];
  }

  // Initial confidence map
  const skillConfidenceMap: Record<string, 'know' | 'practice'> = {};
  Object.values(extractedSkills).flat().forEach((skill: any) => {
    skillConfidenceMap[skill] = 'practice';
  });

  // Base Score Calculation
  let baseScore = 35;
  baseScore += Math.min(totalCategories * 5, 30);
  if (company.trim()) baseScore += 10;
  if (role.trim()) baseScore += 10;
  if (jdText.length > 800) baseScore += 10;
  baseScore = Math.min(baseScore, 100);

  // Checklist & Plan
  const checklist = [
    { roundTitle: "Round 1: Aptitude / Basics", items: ["Logical Reasoning", "Quantitative Aptitude", "Verbal Ability", "Basic Programming MCQs"] },
    { roundTitle: "Round 2: DSA + Core CS", items: ["Array & String manipulation", "Time complexity analysis", "Basic OOP concepts", "DBMS Fundamentals"] },
    { roundTitle: "Round 3: Tech Interview", items: [`Project walkthrough (${role})`, "Deep dive into detected skills", "Code refactoring", "Live coding challenge"] },
    { roundTitle: "Round 4: Managerial / HR", items: ["Why this company?", "Strengths & Weaknesses", "Behavioral questions (STAR method)", "Future goals"] },
  ];

  const roundMapping = checklist.map(c => ({
    roundTitle: c.roundTitle,
    focusAreas: c.items.slice(0, 2),
    whyItMatters: "Determines core technical proficiency and fit for the specific role requirements."
  }));

  const plan7Days = [
    { day: "Day 1-2", focus: "Core CS", tasks: ["Revise Basics", "Study OS/DBMS Concepts"] },
    { day: "Day 3-4", focus: "DSA", tasks: ["Practice Arrays/Strings", "Solve Sliding Window problems"] },
    { day: "Day 5", focus: "Projects", tasks: ["Resume alignment", "Prepare project deep-dives"] },
    { day: "Day 6", focus: "Mocks", tasks: ["Behavioral practice", "Technical drills"] },
    { day: "Day 7", focus: "Final", tasks: ["Revision of weak areas", "Company research"] },
  ];

  // Question Generation
  const questions: string[] = [];
  Object.values(extractedSkills).flat().forEach((skill: any) => {
    if (QUESTION_BANK[skill]) questions.push(...QUESTION_BANK[skill]);
  });
  
  const defaultQs = ["Describe a difficult technical challenge you solved.", "How do you keep your skills up to date?", "Explain your most significant project."];
  while (questions.length < 10) {
    const q = defaultQs[questions.length % defaultQs.length];
    if (!questions.includes(q)) questions.push(q);
    else questions.push(`${q} (Part ${questions.length})`);
  }

  const result: AnalysisResult = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    company: company || "",
    role: role || "",
    jdText,
    extractedSkills,
    roundMapping,
    checklist,
    plan7Days,
    questions: questions.slice(0, 10),
    baseScore,
    skillConfidenceMap,
    finalScore: calculateLiveScore(baseScore, skillConfidenceMap)
  };

  return result;
}

export function calculateLiveScore(baseScore: number, confidenceMap: Record<string, 'know' | 'practice'>): number {
  let adjustment = 0;
  Object.values(confidenceMap).forEach(status => {
    if (status === 'know') adjustment += 2;
    if (status === 'practice') adjustment -= 2;
  });
  return Math.max(0, Math.min(100, baseScore + adjustment));
}
