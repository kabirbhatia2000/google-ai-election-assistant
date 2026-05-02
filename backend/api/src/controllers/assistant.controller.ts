import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { getSession, saveSession } from '../integrations/firestore';
import { generateAssistantResponse } from '../services/llm.service';

export const onboardUser = async (req: Request, res: Response) => {
  try {
    const { context } = req.body;
    if (!context) {
      return res.status(400).json({ error: 'Context is required' });
    }

    const sessionId = uuidv4();
    await saveSession(sessionId, { context, history: [] });

    res.json({ sessionId, message: 'Onboarding successful. Session created.' });
  } catch (error) {
    console.error("[!!] Onboarding Firestore Error:", error);
    res.status(500).json({ error: 'Failed to onboard due to backend database error.' });
  }
};

export const chatHandler = async (req: Request, res: Response) => {
  // Extract data from multi-part or body
  const sessionId = req.body.sessionId;
  const message = req.body.message;
  const file = (req as any).file; // Assuming multer or similar is used

  if (!sessionId || !message) {
    return res.status(400).json({ error: 'sessionId and message are required' });
  }

  try {
    const session = await getSession(sessionId);
    if (!session) {
      return res.status(404).json({ error: 'Session not found. Please onboard first.' });
    }

    const context = session.context;
    const apiHistory = session.history.map((msg: any) => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.text }]
    }));

    // Pass file to LLM if present
    let fileData = null;
    if (file) {
      fileData = {
        data: file.buffer.toString('base64'),
        mimeType: file.mimetype
      };
    }

    const assistantReply = await generateAssistantResponse(message, apiHistory, context, fileData);

    const updatedHistory = [
      ...session.history,
      { role: 'user', text: message, timestamp: new Date().toISOString() },
      { role: 'assistant', text: assistantReply, timestamp: new Date().toISOString() }
    ];

    await saveSession(sessionId, { history: updatedHistory });
    res.json({ reply: assistantReply });
  } catch (error: any) {
    console.error('Chat Handler Error:', error);
    res.status(500).json({ error: 'Internal server error while processing chat' });
  }
};
