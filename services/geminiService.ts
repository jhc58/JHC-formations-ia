
import { GoogleGenAI } from "@google/genai";

export async function getAIAssistantAdvice(query: string, customApiKey?: string) {
  const activeKey = customApiKey || process.env.API_KEY;
  
  if (!activeKey) {
    return "L'Oracle a besoin d'une clé API pour répondre. Vous pouvez en configurer une dans le menu en haut à droite.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey: activeKey });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Tu es un expert en outils IA. L'utilisateur veut faire : "${query}". 
      Basé sur ces outils gratuits : Perplexity (recherche web), Claude (gros docs, style naturel, code complexe), ChatGPT (généraliste, créatif, analyse de données), NotebookLM (synthèse multi-sources, audio), Gemini (Google ecosystem, YouTube), Mistral (image/français).
      Donne le meilleur conseil en 2 phrases max.`,
      config: {
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error: any) {
    console.error("Gemini Error:", error);
    if (error.message?.includes("API key")) {
      return "La clé API semble invalide. Veuillez la vérifier dans les réglages.";
    }
    return "Désolé, je n'ai pas pu analyser votre demande pour le moment.";
  }
}
