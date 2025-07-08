const serverless = require('serverless-http');
const express = require('express');
const { drizzle } = require('drizzle-orm/neon-http');
const { neon } = require('@neondatabase/serverless');
const { users, publications, projects } = require('./schema');
const { eq } = require('drizzle-orm');

const app = express();

// Middleware
app.use(express.json());

// CORS middleware for Netlify
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Initialize database connection
let db;
if (process.env.DATABASE_URL) {
  const sql = neon(process.env.DATABASE_URL);
  db = drizzle(sql);
}

// Fallback sample data when no database is available
const samplePublications = [
  {
    id: 1,
    title: "Deep Learning Approaches for Real-Time Object Detection",
    authors: "John Doe, Jane Smith, Bob Johnson",
    type: "conference",
    venue: "IEEE Conference on Computer Vision and Pattern Recognition (CVPR)",
    year: 2024,
    abstract: "This paper presents novel deep learning approaches for real-time object detection in autonomous vehicles.",
    doi: "10.1109/CVPR.2024.12345",
    pdfUrl: "https://example.com/papers/cvpr2024.pdf",
    keywords: ["deep learning", "object detection", "computer vision"],
    status: "published",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: "Blockchain-Based Security Framework for IoT Networks",
    authors: "John Doe, Robert Chen, Lisa Wong",
    type: "conference", 
    venue: "International Conference on Network Security (ICNS)",
    year: 2024,
    abstract: "A novel blockchain-based security framework that enhances IoT network security.",
    doi: "10.1007/978-3-031-12345-6_15",
    pdfUrl: "https://example.com/papers/icns2024.pdf",
    keywords: ["blockchain", "IoT", "security"],
    status: "published",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

const sampleProjects = [
  {
    id: 1,
    name: "AI-Powered Analytics Dashboard",
    description: "A comprehensive analytics dashboard that leverages machine learning to provide real-time insights and predictive analytics for business intelligence applications.",
    technologies: ["React", "TypeScript", "Python", "TensorFlow", "PostgreSQL", "Docker"],
    status: "completed",
    metrics: "50,000+ active users, 99.9% uptime, 40% faster data processing",
    githubUrl: "https://github.com/johndoe/ai-analytics-dashboard",
    demoUrl: "https://analytics-demo.example.com",
    imageUrl: null,
    startDate: "2023-01-15T00:00:00.000Z",
    endDate: "2024-03-20T00:00:00.000Z",
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    name: "Blockchain Voting System",
    description: "A secure and transparent blockchain-based voting system designed for democratic processes with enhanced security and verifiability features.",
    technologies: ["Solidity", "Web3.js", "Node.js", "Express", "MongoDB", "React"],
    status: "completed",
    metrics: "100% security audit passed, 10,000+ votes processed, Zero tampering incidents",
    githubUrl: "https://github.com/johndoe/blockchain-voting",
    demoUrl: "https://voting-demo.example.com",
    imageUrl: null,
    startDate: "2023-06-01T00:00:00.000Z",
    endDate: "2024-01-15T00:00:00.000Z",
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

// Publications routes
app.get('/api/publications', async (req, res) => {
  try {
    if (db) {
      const type = req.query.type;
      let result;
      if (type && (type === 'conference' || type === 'journal')) {
        result = await db.select().from(publications).where(eq(publications.type, type));
      } else {
        result = await db.select().from(publications);
      }
      res.json(result);
    } else {
      // Fallback to sample data
      const type = req.query.type;
      let result = samplePublications;
      if (type && (type === 'conference' || type === 'journal')) {
        result = samplePublications.filter(pub => pub.type === type);
      }
      res.json(result);
    }
  } catch (error) {
    console.error('Publications API error:', error);
    res.status(500).json({ error: "Failed to fetch publications" });
  }
});

app.get('/api/publications/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (db) {
      const result = await db.select().from(publications).where(eq(publications.id, id));
      if (result.length > 0) {
        res.json(result[0]);
      } else {
        res.status(404).json({ error: "Publication not found" });
      }
    } else {
      const publication = samplePublications.find(p => p.id === id);
      if (publication) {
        res.json(publication);
      } else {
        res.status(404).json({ error: "Publication not found" });
      }
    }
  } catch (error) {
    console.error('Publication API error:', error);
    res.status(500).json({ error: "Failed to fetch publication" });
  }
});

// Projects routes
app.get('/api/projects', async (req, res) => {
  try {
    if (db) {
      const featured = req.query.featured === 'true';
      let result;
      if (featured) {
        result = await db.select().from(projects).where(eq(projects.featured, true));
      } else {
        result = await db.select().from(projects);
      }
      res.json(result);
    } else {
      // Fallback to sample data
      const featured = req.query.featured === 'true';
      let result = sampleProjects;
      if (featured) {
        result = sampleProjects.filter(project => project.featured);
      }
      res.json(result);
    }
  } catch (error) {
    console.error('Projects API error:', error);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

app.get('/api/projects/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (db) {
      const result = await db.select().from(projects).where(eq(projects.id, id));
      if (result.length > 0) {
        res.json(result[0]);
      } else {
        res.status(404).json({ error: "Project not found" });
      }
    } else {
      const project = sampleProjects.find(p => p.id === id);
      if (project) {
        res.json(project);
      } else {
        res.status(404).json({ error: "Project not found" });
      }
    }
  } catch (error) {
    console.error('Project API error:', error);
    res.status(500).json({ error: "Failed to fetch project" });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

module.exports.handler = serverless(app);