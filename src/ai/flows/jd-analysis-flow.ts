'use server';
/**
 * @fileOverview Standardized AI-powered Job Description analysis flow.
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
  extractedSkills: z.object({
    coreCS: z.array(z.string()),
    languages: z.array(z.string()),
    web: z.array(z.string()),
    data: z.array(z.string()),
    cloud: z.array(z.string()),
    testing: z.array(z.string()),
    other: z.array(z.string()),
  }),
  roundMapping: z.array(z.object({
    roundTitle: z.string(),
    focusAreas: z.array(z.string()),
    whyItMatters: z.string()
  })),
  checklist: z.array(z.object({
    roundTitle: z.string(),
    items: z.array(z.string())
  })),
  plan7Days: z.array(z.object({
    day: z.string(),
    focus: z.string(),
    tasks: z.array(z.string())
  })),
  questions: z.array(z.string()),
  baseScore: z.number(),
});
export type JDAnalysisOutput = z.infer<typeof JDAnalysisOutputSchema>;

export async function analyzeJobDescription(input: JDAnalysisInput): Promise<JDAnalysisOutput> {
  return analyzeJobDescriptionFlow(input);
}

const analyzeJobDescriptionPrompt = ai.definePrompt({
  name: 'analyzeJobDescriptionPrompt',
  input: { schema: JDAnalysisInputSchema },
  output: { schema: JDAnalysisOutputSchema },
  prompt: `You are an expert career coach. Analyze the Job Description (JD) and provide a standardized preparation strategy.

Job Details:
Company: {{{company}}}
Role: {{{role}}}
Description: {{{jdText}}}

Return a JSON following the strict schema:
1. extractedSkills: Categorize technical keywords. If none, fill 'other' with standard prep skills.
2. roundMapping: Explain 4 interview rounds for this role.
3. checklist: Specific action items for each of the 4 rounds.
4. plan7Days: A day-by-day tasks for 1 week.
5. questions: Top 10 likely technical questions.
6. baseScore: Difficulty/Readiness baseline (35-100).`,
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
