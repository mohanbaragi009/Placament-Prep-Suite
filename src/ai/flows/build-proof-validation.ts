'use server';
/**
 * @fileOverview An AI agent for validating build proofs against step objectives.
 *
 * - buildProofValidation - A function that handles the build proof validation process.
 * - BuildProofValidationInput - The input type for the buildProofValidation function.
 * - BuildProofValidationOutput - The return type for the buildProofValidation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const BuildProofValidationInputSchema = z.object({
  proofDataUri: z
    .string()
    .describe(
      "A data URI of the build proof (e.g., screenshot, code snippet) that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  proofDescription: z
    .string()
    .describe(
      'A textual description of the build proof, providing context especially if the proof is an image.'
    ),
  stepObjectives: z.string().describe('The objectives or requirements for the current build step.'),
});
export type BuildProofValidationInput = z.infer<typeof BuildProofValidationInputSchema>;

const BuildProofValidationOutputSchema = z.object({
  isValid: z
    .boolean()
    .describe('True if the provided proof accurately meets the step objectives, false otherwise.'),
  feedback: z
    .string()
    .describe(
      'Detailed feedback explaining the validation result, including reasons for acceptance or rejection, and suggestions for improvement if not valid.'
    ),
});
export type BuildProofValidationOutput = z.infer<typeof BuildProofValidationOutputSchema>;

export async function buildProofValidation(
  input: BuildProofValidationInput
): Promise<BuildProofValidationOutput> {
  return buildProofValidationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'buildProofValidationPrompt',
  input: {schema: BuildProofValidationInputSchema},
  output: {schema: BuildProofValidationOutputSchema},
  prompt: `You are an expert build validator for the KodNest Premium Build System. Your role is to critically assess a developer's submitted proof against specified step objectives. Respond concisely and professionally.

Critique the provided build proof against the current step objectives. Determine if the proof accurately reflects that the objectives have been met. Provide clear and actionable feedback.

Step Objectives: {{{stepObjectives}}}

Proof Description: {{{proofDescription}}}

Build Proof: {{media url=proofDataUri}}`,
});

const buildProofValidationFlow = ai.defineFlow(
  {
    name: 'buildProofValidationFlow',
    inputSchema: BuildProofValidationInputSchema,
    outputSchema: BuildProofValidationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
