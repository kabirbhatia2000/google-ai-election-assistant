import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { assistantRouter } from './routes/assistant.routes';

import path from 'path';

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/assistant', assistantRouter);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Serve static frontend files
const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));

// Handle SPA routing
app.get('/{*splat}', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'), (err) => {
    if (err) {
      // Fallback for health check or other routes if index.html is missing
      res.status(404).send('Not Found');
    }
  });
});

app.listen(port, () => {
  console.log(`Backend API running on port ${port}`);
});
