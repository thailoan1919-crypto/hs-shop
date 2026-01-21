import { GoogleGenAI } from "@google/genai";

// Safely access process.env to avoid ReferenceError in browser environments
const apiKey = (typeof process !== 'undefined' && process.env?.API_KEY) || '';
const ai = new GoogleGenAI({ apiKey });

export const generateProductDescription = async (productName: string, category: string): Promise<string> => {
  if (!apiKey) return "Please set API_KEY to use AI features.";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Write a short, exciting, and appealing marketing description (max 2 sentences) for a K-pop product. 
      Product Name: ${productName}
      Category: ${category}
      Target Audience: K-pop fans (stans).
      Tone: Enthusiastic, trendy.`,
    });
    return response.text?.trim() || "No description generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Could not generate description at this time.";
  }
};