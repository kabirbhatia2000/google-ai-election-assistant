import { generativeModel } from '../integrations/vertexAI';
import { getFirstTimeVoterPersona, UserContext } from './persona.service';

export interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export const generateAssistantResponse = async (
  userMessage: string,
  history: ChatMessage[],
  context: UserContext,
  fileData?: { data: string; mimeType: string } | null
): Promise<string> => {
  try {
    const systemInstruction = getFirstTimeVoterPersona(context);
    
    const chat = generativeModel.startChat({
      history: history.length > 0 ? history : undefined,
      systemInstruction: systemInstruction,
    });

    // Construct the message with optional file data
    const messageParts: any[] = [{ text: userMessage }];
    if (fileData) {
      messageParts.push({
        inlineData: {
          data: fileData.data,
          mimeType: fileData.mimeType,
        },
      });
    }

    const result = await chat.sendMessage(messageParts);
    const response = await result.response;
    
    // Extract text specifically
    const text = response.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't generate a response. Please try again later.";
    return text;
  } catch (error: any) {
    console.error('Error generating response from Vertex AI:', error);
    // Log more specific details if available
    console.error('Error details:', JSON.stringify(error, null, 2));
    throw new Error(`LLM Generation Failed: ${error.message || 'Unknown error'}`);
  }
};
