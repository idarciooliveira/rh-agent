import { z } from "zod";

export const swotItemSchema = z.object({
	title: z.string(),
	detail: z.string(),
});

export const swotQuadrantsSchema = z.object({
	strengths: z.array(swotItemSchema).min(2).max(5),
	weaknesses: z.array(swotItemSchema).min(2).max(5),
	opportunities: z.array(swotItemSchema).min(2).max(5),
	threats: z.array(swotItemSchema).min(2).max(5),
});

export const goalAlignmentSchema = z.object({
	score: z.number().min(0).max(10),
	maxScore: z.number(),
	summary: z.string(),
});

export const strategicSuggestionSchema = z.object({
	priority: z.enum(["high", "medium", "low"]),
	text: z.string(),
	category: z.string(),
	timeframe: z.string(),
});

export const swotAnalysisSchema = z.object({
	profileScore: z.number().min(0).max(100),
	goalAlignment: goalAlignmentSchema,
	swot: swotQuadrantsSchema,
	strategicSuggestions: z.array(strategicSuggestionSchema).min(1).max(8),
	quickWins: z.array(z.string()).min(1).max(8),
});

export const experienceRecommendationSchema = z.object({
	index: z.number().int().min(0),
	improvedDescription: z.array(z.string()).min(1),
});

export const recommendationsSchema = z.object({
	headline: z.object({ improved: z.string() }),
	about: z.object({ improved: z.string() }),
	experiences: z.array(experienceRecommendationSchema),
	skills: z.object({ suggested: z.array(z.string()) }),
	suggestedActivityPost: z.string(),
});

export const fullAnalysisSchema = z.object({
	swotAnalysis: swotAnalysisSchema,
	recommendations: recommendationsSchema,
});

export type SwotItem = z.infer<typeof swotItemSchema>;
export type SwotQuadrants = z.infer<typeof swotQuadrantsSchema>;
export type GoalAlignment = z.infer<typeof goalAlignmentSchema>;
export type StrategicSuggestion = z.infer<typeof strategicSuggestionSchema>;
export type SwotAnalysis = z.infer<typeof swotAnalysisSchema>;
export type ExperienceRecommendation = z.infer<
	typeof experienceRecommendationSchema
>;
export type Recommendations = z.infer<typeof recommendationsSchema>;
export type FullAnalysis = z.infer<typeof fullAnalysisSchema>;
