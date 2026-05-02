import { Firestore } from '@google-cloud/firestore';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

dotenv.config();

// Determine path to key file from env
const keyPath = process.env.GOOGLE_APPLICATION_CREDENTIALS || path.resolve(process.cwd(), 'google-service-account.json');

// Initialize Firestore
const firestoreOptions: any = {
  projectId: process.env.GOOGLE_CLOUD_PROJECT,
  databaseId: process.env.GOOGLE_CLOUD_FIRESTORE_DATABASE_ID || '(default)',
};

if (keyPath && fs.existsSync(keyPath)) {
  firestoreOptions.keyFilename = keyPath;
}

export const firestore = new Firestore(firestoreOptions);

export const getSession = async (sessionId: string) => {
  const doc = await firestore.collection('sessions').doc(sessionId).get();
  if (doc.exists) {
    return doc.data();
  }
  return null;
};

export const saveSession = async (sessionId: string, data: any) => {
  try {
    await firestore.collection('sessions').doc(sessionId).set(data, { merge: true });
  } catch (error: any) {
    console.error("[!!] Firestore Save Exception:", error.message);
    if (error.details) console.error("[!!] Details:", error.details);
    if (error.code) console.error("[!!] Code:", error.code);
    throw error;
  }
};
