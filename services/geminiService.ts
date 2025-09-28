
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const reviewCode = async (code: string, language: string): Promise<string> => {
  const model = 'gemini-2.5-flash';
  const selectedLanguage = language.charAt(0).toUpperCase() + language.slice(1);

  const prompt = `
    You are an expert software engineer acting as an automated code review tool. Your name is "Gemini Code Critic".
    Analyze the following ${selectedLanguage} code. Provide a comprehensive review covering the following aspects:

    1.  **Correctness & Bugs**: Identify potential logical errors, edge cases, or bugs.
    2.  **Best Practices & Readability**: Suggest improvements for clarity, maintainability, and adherence to idiomatic ${selectedLanguage} conventions.
    3.  **Performance**: Highlight any potential performance bottlenecks and suggest optimizations.
    4.  **Security**: Point out any potential security vulnerabilities.

    Provide your feedback in well-structured Markdown format. Use headings for each section, bullet points for specific suggestions, and include code snippets where appropriate to illustrate your points. Be constructive and professional.

    Here is the code to review:
    \`\`\`${language}
    ${code}
    \`\`\`
  `;

  try {
    const response = await ai.models.generateContent({
        model: model,
        contents: prompt
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to communicate with the Gemini API. Please check your connection and API key.");
  }
};
