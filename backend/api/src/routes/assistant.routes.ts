import { Router } from 'express';
import multer from 'multer';
import { onboardUser, chatHandler } from '../controllers/assistant.controller';

export const assistantRouter = Router();
const upload = multer({ storage: multer.memoryStorage() });

assistantRouter.post('/onboard', onboardUser);
assistantRouter.post('/chat', upload.single('file'), chatHandler);
