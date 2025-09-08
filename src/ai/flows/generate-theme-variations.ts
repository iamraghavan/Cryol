'use server';

/**
 * @fileOverview Generates visual theme variations based on company preferences.
 *
 * - generateThemeVariations - A function that generates visual theme variations.
 * - GenerateThemeVariationsInput - The input type for the generateThemeVariations function.
 * - GenerateThemeVariationsOutput - The return type for the generateThemeVariations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateThemeVariationsInputSchema = z.object({
  primaryColor: z.string().describe('The primary color of the theme.'),
  secondaryColor: z.string().optional().describe('The secondary color of the theme.'),
  font: z.string().optional().describe('The font to use for the theme.'),
  layout: z.string().optional().describe('The layout style of the theme (e.g., minimalist, modern).'),
});
export type GenerateThemeVariationsInput = z.infer<typeof GenerateThemeVariationsInputSchema>;

const GenerateThemeVariationsOutputSchema = z.object({
  themeVariations: z.array(
    z.object({
      description: z.string().describe('A description of the theme variation.'),
      primaryColor: z.string().describe('The primary color for this variation.'),
      secondaryColor: z.string().optional().describe('The secondary color for this variation.'),
      font: z.string().optional().describe('The font used for this variation.'),
      layout: z.string().optional().describe('The layout style of this variation.'),
    })
  ).describe('An array of visual theme variations.'),
});
export type GenerateThemeVariationsOutput = z.infer<typeof GenerateThemeVariationsOutputSchema>;

export async function generateThemeVariations(input: GenerateThemeVariationsInput): Promise<GenerateThemeVariationsOutput> {
  return generateThemeVariationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateThemeVariationsPrompt',
  input: {schema: GenerateThemeVariationsInputSchema},
  output: {schema: GenerateThemeVariationsOutputSchema},
  prompt: `You are an experienced web designer tasked with generating visual theme variations for a company website.

  Based on the company preferences below, generate three distinct theme variations, providing a description for each.

  Preferences:
  Primary Color: {{{primaryColor}}}
  {{#if secondaryColor}}Secondary Color: {{{secondaryColor}}}{{/if}}
  {{#if font}}Font: {{{font}}}{{/if}}
  {{#if layout}}Layout Style: {{{layout}}}{{/if}}

  Each theme variation should include:
  - A creative description of the theme.
  - A primary color.
  - Optionally, a secondary color if it enhances the theme.
  - Optionally, a font suggestion if it improves the theme.
  - Optionally, a layout style if it makes a difference.

  Ensure each variation is visually appealing and suitable for a modern business website.
  `,
});

const generateThemeVariationsFlow = ai.defineFlow(
  {
    name: 'generateThemeVariationsFlow',
    inputSchema: GenerateThemeVariationsInputSchema,
    outputSchema: GenerateThemeVariationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
