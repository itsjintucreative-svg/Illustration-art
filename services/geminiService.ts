import { GoogleGenAI } from "@google/genai";
import type { AspectRatio } from '../types';

export const generateIllustration = async (prompt: string, aspectRatio: AspectRatio): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: `Create a visually stunning, high-quality illustration with artistic color grading. Style: digital art, fantasy, vibrant. Prompt: ${prompt}`,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/jpeg',
          aspectRatio,
        },
    });

    if (response.generatedImages && response.generatedImages.length > 0 && response.generatedImages[0].image.imageBytes) {
      const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
      return `data:image/jpeg;base64,${base64ImageBytes}`;
    } else {
      throw new Error("Image generation failed: No image data received.");
    }
  } catch (error) {
    console.error("Error generating illustration:", error);
    throw new Error("Failed to generate illustration. Please check your prompt or API key.");
  }
};
