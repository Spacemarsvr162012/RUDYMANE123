import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // Simple proxy endpoint for fetching game data if needed
  app.get('/api/proxy', async (req, res) => {
    const targetUrl = req.query.url;
    if (!targetUrl) {
      return res.status(400).json({ error: 'URL is required' });
    }

    try {
      const response = await fetch(targetUrl);
      const contentType = response.headers.get('content-type');
      const data = await response.arrayBuffer();
      
      if (contentType) {
        res.setHeader('Content-Type', contentType);
      }
      res.send(Buffer.from(data));
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch target URL' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`RUDYMANE Server running on http://localhost:${PORT}`);
  });
}

startServer();
