/**
 * @fileOverview Heuristic-based analysis engine for Job Descriptions.
 */

export const SKILL_CATEGORIES: Record<string, string[]> = {
  'Core CS': ['DSA', 'OOP', 'DBMS', 'OS', 'Networks'],
  'Languages': ['Java', 'Python', 'JavaScript', 'TypeScript', 'C', 'C++', 'C#', 'Go'],
  'Web': ['React', 'Next.js', 'Node.js', 'Express', 'REST', 'GraphQL'],
  'Data': ['SQL', 'MongoDB', 'PostgreSQL', 'MySQL', 'Redis'],
  'Cloud/DevOps': ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'CI/CD', 'Linux'],
  'Testing': ['Selenium', 'Cypress', 'Playwright', 'JUnit', 'PyTest']
};

export interface AnalysisResult {
  id: string;
  createdAt: string;
  company: string;
  role: string;
  jdText: string;
  extractedSkills: Record<string, string[]>;
  plan: { day: string; task: string }[];
  checklist: { round: string; items: string[] }[];
  questions: string[];
  readinessScore: number;
}

const QUESTION_BANK: Record<string, string[]> = {
  'DSA': ['Explain the time complexity of QuickSort.', 'How do you detect a cycle in a linked list?', 'Difference between BFS and DFS.'],
  'OOP': ['Explain polymorphism with a real-world example.', 'What are SOLID principles?', 'Interface vs Abstract Class.'],
  'React': ['How does the Virtual DOM improve performance?', 'Explain React hooks lifecycle.', 'State vs Props.'],
  'JavaScript': ['Explain closures and hoisting.', 'What is the Event Loop?', 'Difference between == and ===.'],
  'SQL': ['Explain Joins and their types.', 'What is an Index and how does it help?', 'What are ACID properties?'],
  'Node.js': ['How does Node.js handle concurrency?', 'What is middleware in Express?', 'Explain streams in Node.'],
  'Python': ['What are decorators?', 'Difference between list and tuple.', 'Explain GIL (Global Interpreter Lock).'],
  'Java': ['Explain JVM Architecture.', 'What is the Garbage Collector?', 'Checked vs Unchecked exceptions.'],
};

export function analyzeJD(company: string, role: string, jdText: string): AnalysisResult {
  const detectedSkills: Record<string, string[]> = {};
  let totalCategories = 0;

  Object.entries(SKILL_CATEGORIES).forEach(([category, skills]) => {
    const found = skills.filter(skill => 
      new RegExp(`\\b${skill.replace('.', '\\.')}\\b`, 'gi').test(jdText)
    );
    if (found.length > 0) {
      detectedSkills[category] = found;
      totalCategories++;
    }
  });

  if (Object.keys(detectedSkills).length === 0) {
    detectedSkills['General'] = ['General Fresher Stack', 'Problem Solving', 'Aptitude'];
  }

  // Score Calculation
  let score = 35;
  score += Math.min(totalCategories * 5, 30);
  if (company.trim()) score += 10;
  if (role.trim()) score += 10;
  if (jdText.length > 800) score += 10;
  score = Math.min(score, 100);

  // Checklist Generation
  const checklist = [
    { round: "Round 1: Aptitude / Basics", items: ["Logical Reasoning", "Quantitative Aptitude", "Verbal Ability", "Basic Programming MCQs", "Company History"] },
    { round: "Round 2: DSA + Core CS", items: ["Array & String manipulation", "Linked List / Trees", "Time complexity analysis", "Basic OOP concepts", "DBMS Fundamentals"] },
    { round: "Round 3: Tech Interview", items: [`Project walkthrough (${role})`, "Deep dive into detected skills", "Code refactoring", "API Design", "Live coding challenge"] },
    { round: "Round 4: Managerial / HR", items: ["Why this company?", "Strengths & Weaknesses", "Behavioral questions (STAR method)", "Notice period & Salary discussion", "Future goals"] },
  ];

  // Plan Generation
  const plan = [
    { day: "Day 1-2", task: "Revise Basics & Core CS (OS, Networks, DBMS)." },
    { day: "Day 3-4", task: `Practice DSA problems related to ${detectedSkills['Core CS']?.[0] || 'Arrays/Strings'}.` },
    { day: "Day 5", task: "Align resume projects with Job Description requirements." },
    { day: "Day 6", task: "Mock interview with focus on Behavioral and Tech specific questions." },
    { day: "Day 7", task: "Final revision of weak areas and company-specific research." },
  ];

  // Question Generation
  const flatSkills = Object.values(detectedSkills).flat();
  const questions: string[] = [];
  flatSkills.forEach(skill => {
    if (QUESTION_BANK[skill]) {
      questions.push(...QUESTION_BANK[skill]);
    }
  });
  
  // Fill with defaults if not enough
  const defaultQs = ["Describe a difficult technical challenge you solved.", "How do you keep your technical skills up to date?", "Explain your most significant project."];
  while (questions.length < 10) {
    const q = defaultQs[questions.length % defaultQs.length];
    if (!questions.includes(q)) questions.push(q);
    else questions.push(`${q} (Deep dive)`);
  }

  return {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    company,
    role,
    jdText,
    extractedSkills: detectedSkills,
    plan,
    checklist,
    questions: questions.slice(0, 10),
    readinessScore: score
  };
}
