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
  // Serve static files
  app.use(express.static(path.join(__dirname, "../client/public")));
  
  // Serve index.html for all other routes (SPA routing)
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "../client/public/index.html"));
  });

  return httpServer;
}
