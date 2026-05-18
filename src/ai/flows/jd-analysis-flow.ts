
'use server';
/**
 * @fileOverview AI-powered Job Description analysis flow.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const JDAnalysisInputSchema = z.object({
  company: z.string().describe('The name of the company hiring.'),
  role: z.string().describe('The job title or role.'),
  jdText: z.string().describe('The full text of the job description.'),
});
export type JDAnalysisInput = z.infer<typeof JDAnalysisInputSchema>;

const JDAnalysisOutputSchema = z.object({
  extractedSkills: z.record(z.array(z.string())).describe('Skills categorized by type (e.g., "Web", "Cloud")'),
  plan: z.array(z.object({
    day: z.string().describe('Day or day range (e.g., "Day 1")'),
    task: z.string().describe('The preparation task for that day')
  })).describe('A 7-day intensive preparation plan'),
  checklist: z.array(z.object({
    round: z.string().describe('Interview round name'),
    items: z.array(z.string()).describe('Specific checklist items for this round')
  })).describe('Round-wise preparation checklist'),
  questions: z.array(z.string()).describe('Top 10 likely technical interview questions'),
  readinessScore: z.number().describe('Calculated readiness score from 0 to 100 based on JD complexity'),
});
export type JDAnalysisOutput = z.infer<typeof JDAnalysisOutputSchema>;

export async function analyzeJobDescription(input: JDAnalysisInput): Promise<JDAnalysisOutput> {
  return analyzeJobDescriptionFlow(input);
}

const analyzeJobDescriptionPrompt = ai.definePrompt({
  name: 'analyzeJobDescriptionPrompt',
  input: { schema: JDAnalysisInputSchema },
  output: { schema: JDAnalysisOutputSchema },
  prompt: `You are an expert career coach and technical recruiter at a top tech firm. Your task is to analyze a job description (JD) and provide a comprehensive preparation strategy for a candidate.

Job Details:
Company: {{{company}}}
Role: {{{role}}}
Description:
{{{jdText}}}

Based on the provided JD, please:
1. Extract and categorize technical skills into logical groups (e.g., Languages, Web, Data, Cloud/DevOps, Core CS).
2. Create a structured 7-day intensive preparation plan.
3. Define a 4-round interview checklist (e.g., Round 1: Aptitude, Round 2: Tech/DSA, etc.).
4. Generate the top 10 most likely technical interview questions based specifically on the skills found in the JD.
5. Provide a readiness score (0-100) based on how complex the requirements are compared to a standard entry-level baseline.

Be specific, actionable, and professional. Respond only with the requested JSON structure.`,
});

const analyzeJobDescriptionFlow = ai.defineFlow(
  {
    name: 'analyzeJobDescriptionFlow',
    inputSchema: JDAnalysisInputSchema,
    outputSchema: JDAnalysisOutputSchema,
  },
  async (input) => {
    const { output } = await analyzeJobDescriptionPrompt(input);
    if (!output) throw new Error('Failed to generate analysis');
    return output;
  }
);
