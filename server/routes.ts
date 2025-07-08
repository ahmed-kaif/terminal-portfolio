import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPublicationSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Publications routes
  app.get("/api/publications", async (req, res) => {
    try {
      const type = req.query.type as 'conference' | 'journal' | undefined;
      const publications = type 
        ? await storage.getPublicationsByType(type)
        : await storage.getPublications();
      res.json(publications);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch publications" });
    }
  });

  app.get("/api/publications/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const publication = await storage.getPublication(id);
      if (publication) {
        res.json(publication);
      } else {
        res.status(404).json({ error: "Publication not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch publication" });
    }
  });

  app.post("/api/publications", async (req, res) => {
    try {
      const validated = insertPublicationSchema.parse(req.body);
      const publication = await storage.createPublication(validated);
      res.status(201).json(publication);
    } catch (error) {
      res.status(400).json({ error: "Invalid publication data" });
    }
  });

  app.put("/api/publications/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validated = insertPublicationSchema.partial().parse(req.body);
      const publication = await storage.updatePublication(id, validated);
      if (publication) {
        res.json(publication);
      } else {
        res.status(404).json({ error: "Publication not found" });
      }
    } catch (error) {
      res.status(400).json({ error: "Invalid publication data" });
    }
  });

  app.delete("/api/publications/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deletePublication(id);
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: "Publication not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to delete publication" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
