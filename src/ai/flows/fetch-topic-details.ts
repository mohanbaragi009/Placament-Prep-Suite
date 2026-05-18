'use server';
/**
 * @fileOverview A Genkit flow that acts as a "researcher" to provide detailed study material for technical topics.
 *
 * - fetchTopicDetails - A function that returns detailed information about a technical topic.
 * - FetchTopicDetailsInput - The input type for the function.
 * - FetchTopicDetailsOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FetchTopicDetailsInputSchema = z.object({
  topic: z.string().describe('The technical topic to research (e.g., "Data Structures", "System Design").'),
});
export type FetchTopicDetailsInput = z.infer<typeof FetchTopicDetailsInputSchema>;

const FetchTopicDetailsOutputSchema = z.object({
  title: z.string(),
  summary: z.string().describe('A high-level summary of the topic.'),
  coreConcepts: z.array(z.object({
    concept: z.string(),
    description: z.string(),
  })),
  interviewTips: z.array(z.string()),
  recommendedResources: z.array(z.object({
    title: z.string(),
    url: z.string(),
  })),
});
export type FetchTopicDetailsOutput = z.infer<typeof FetchTopicDetailsOutputSchema>;

export async function fetchTopicDetails(input: FetchTopicDetailsInput): Promise<FetchTopicDetailsOutput> {
  return fetchTopicDetailsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'fetchTopicDetailsPrompt',
  input: {schema: FetchTopicDetailsInputSchema},
  output: {schema: FetchTopicDetailsOutputSchema},
  prompt: `You are an expert technical instructor. Research and provide comprehensive study details for the following topic: "{{{topic}}}".

Your response should include:
1. A clear, concise summary.
2. A list of 4-5 core concepts that a candidate must master.
3. 3-4 specific interview tips or common pitfalls for this topic.
4. 2-3 recommended standard learning paths or external resource names.

Focus on accuracy and professional clarity.`,
});

const fetchTopicDetailsFlow = ai.defineFlow(
  {
    name: 'fetchTopicDetailsFlow',
    inputSchema: FetchTopicDetailsInputSchema,
    outputSchema: FetchTopicDetailsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) throw new Error('Failed to fetch topic details');
    return output;
  }
);
