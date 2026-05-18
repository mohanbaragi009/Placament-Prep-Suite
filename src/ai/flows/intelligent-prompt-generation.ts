'use server';
/**
 * @fileOverview This file implements a Genkit flow for the Intelligent Prompt Architect feature.
 * It refines high-level build instructions provided by the user into precise, actionable code prompts.
 *
 * - intelligentPromptGeneration - A function to refine build instructions.
 * - IntelligentPromptGenerationInput - The input type for the refinement process.
 * - IntelligentPromptGenerationOutput - The output type for the refined prompt.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const IntelligentPromptGenerationInputSchema = z.object({
  highLevelInstructions: z
    .string()
    .describe(
      'High-level build instructions provided by the developer, e.g., "build a user authentication form with email and password".'
    ),
});
export type IntelligentPromptGenerationInput = z.infer<
  typeof IntelligentPromptGenerationInputSchema
>;

const IntelligentPromptGenerationOutputSchema = z.object({
  refinedPrompt: z
    .string()
    .describe(
      'A precise, actionable, and detailed code prompt suitable for a code-generating AI, derived from the high-level instructions.'
    ),
});
export type IntelligentPromptGenerationOutput = z.infer<
  typeof IntelligentPromptGenerationOutputSchema
>;

export async function intelligentPromptGeneration(
  input: IntelligentPromptGenerationInput
): Promise<IntelligentPromptGenerationOutput> {
  return intelligentPromptGenerationFlow(input);
}

const intelligentPromptGenerationPrompt = ai.definePrompt({
  name: 'intelligentPromptGenerationPrompt',
  input: { schema: IntelligentPromptGenerationInputSchema },
  output: { schema: IntelligentPromptGenerationOutputSchema },
  prompt: `You are an expert AI prompt engineer specializing in transforming high-level development instructions into precise, actionable, and detailed code prompts. Your goal is to create a prompt that is unambiguous and directly usable by a code-generating AI.

Take the following high-level build instructions and expand them into a comprehensive code prompt. Ensure it includes all necessary details a developer would consider, such as technology stack, specific components, functionalities, and any constraints or desired outcomes implied by the high-level instruction.

High-level instructions: {{{highLevelInstructions}}}`,
});

const intelligentPromptGenerationFlow = ai.defineFlow(
  {
    name: 'intelligentPromptGenerationFlow',
    inputSchema: IntelligentPromptGenerationInputSchema,
    outputSchema: IntelligentPromptGenerationOutputSchema,
  },
  async (input) => {
    const { output } = await intelligentPromptGenerationPrompt(input);
    return output!;
  }
);
