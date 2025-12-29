import type { Express } from "express";
import { createServer, type Server } from "http";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // API Route
  app.get('/api/dramas', async (req, res) => {
    try {
      const response = await fetch("https://dramabox-api-rho.vercel.app/api/home");
      if (!response.ok) throw new Error(`External API returned ${response.status}`);
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("Failed to fetch dramas:", error);
      res.status(500).json({ message: "Failed to fetch dramas" });
    }
  });

  // API Route - Detail
  app.get('/api/dramas/:bookId', async (req, res) => {
    try {
      const { bookId } = req.params;
      const response = await fetch(`https://dramabox-api-rho.vercel.app/api/detail/${bookId}/v2`);
      if (!response.ok) throw new Error(`External API returned ${response.status}`);
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("Failed to fetch drama detail:", error);
      res.status(500).json({ message: "Failed to fetch drama detail" });
    }
  });

  // API Route - Stream
  app.get('/api/stream', async (req, res) => {
    try {
      const { bookId, episode } = req.query;
      const response = await fetch(`https://dramabox-api-rho.vercel.app/api/stream?bookId=${bookId}&episode=${episode}`);
      if (!response.ok) throw new Error(`External API returned ${response.status}`);
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("Failed to fetch stream:", error);
      res.status(500).json({ message: "Failed to fetch stream" });
    }
  });

  // API Route - Recommendations
  app.get('/api/recommendations', async (req, res) => {
    try {
      const response = await fetch("https://dramabox-api-rho.vercel.app/api/recommend");
      if (!response.ok) throw new Error(`External API returned ${response.status}`);
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("Failed to fetch recommendations:", error);
      res.status(500).json({ message: "Failed to fetch recommendations" });
    }
  });

  // Serve static index.html for all other routes
  app.use(express.static(path.join(__dirname, "../client/public")));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "../client/public/index.html"));
  });

  return httpServer;
}
