import { VertexAI } from '@google-cloud/vertexai';
import dotenv from 'dotenv';
dotenv.config();

const project = process.env.GOOGLE_CLOUD_PROJECT;
// Default location for free tier / broad availability
const location = process.env.GOOGLE_CLOUD_LOCATION || 'us-central1';

const vertex_ai = new VertexAI({
  project: project || 'election-assistant-494606',
  location: location
});

export const generativeModel = vertex_ai.getGenerativeModel({
  model: 'gemini-2.5-flash',
  generationConfig: {
    maxOutputTokens: 2048,
    temperature: 0.8,
    topP: 0.8,
    topK: 40,
  },
});
