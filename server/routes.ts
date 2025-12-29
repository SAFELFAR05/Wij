import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.get(api.dramas.list.path, async (req, res) => {
    try {
      // Fetch from the external API provided by the user
      const response = await fetch("https://dramabox-api-rho.vercel.app/api/home");
      if (!response.ok) {
        throw new Error(`External API returned ${response.status}`);
      }
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("Failed to fetch dramas:", error);
      res.status(500).json({ message: "Failed to fetch dramas" });
    }
  });

  return httpServer;
}
