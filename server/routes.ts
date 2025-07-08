import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPublicationSchema, insertProjectSchema } from "@shared/schema";

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

  // Projects routes
  app.get("/api/projects", async (req, res) => {
    try {
      const featured = req.query.featured === 'true';
      const projects = featured 
        ? await storage.getFeaturedProjects()
        : await storage.getProjects();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch projects" });
    }
  });

  app.get("/api/projects/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const project = await storage.getProject(id);
      if (project) {
        res.json(project);
      } else {
        res.status(404).json({ error: "Project not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch project" });
    }
  });

  app.post("/api/projects", async (req, res) => {
    try {
      const validated = insertProjectSchema.parse(req.body);
      const project = await storage.createProject(validated);
      res.status(201).json(project);
    } catch (error) {
      res.status(400).json({ error: "Invalid project data" });
    }
  });

  app.put("/api/projects/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validated = insertProjectSchema.partial().parse(req.body);
      const project = await storage.updateProject(id, validated);
      if (project) {
        res.json(project);
      } else {
        res.status(404).json({ error: "Project not found" });
      }
    } catch (error) {
      res.status(400).json({ error: "Invalid project data" });
    }
  });

  app.delete("/api/projects/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteProject(id);
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: "Project not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to delete project" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
