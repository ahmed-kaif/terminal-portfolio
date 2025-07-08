import { users, type User, type InsertUser, publications, type Publication, type InsertPublication, projects, type Project, type InsertProject } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Publications methods
  getPublications(): Promise<Publication[]>;
  getPublicationsByType(type: 'conference' | 'journal'): Promise<Publication[]>;
  getPublication(id: number): Promise<Publication | undefined>;
  createPublication(publication: InsertPublication): Promise<Publication>;
  updatePublication(id: number, publication: Partial<InsertPublication>): Promise<Publication | undefined>;
  deletePublication(id: number): Promise<boolean>;
  
  // Projects methods
  getProjects(): Promise<Project[]>;
  getFeaturedProjects(): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: number, project: Partial<InsertProject>): Promise<Project | undefined>;
  deleteProject(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private publications: Map<number, Publication>;
  private projects: Map<number, Project>;
  private currentUserId: number;
  private currentPublicationId: number;
  private currentProjectId: number;

  constructor() {
    this.users = new Map();
    this.publications = new Map();
    this.projects = new Map();
    this.currentUserId = 1;
    this.currentPublicationId = 1;
    this.currentProjectId = 1;
    
    // Add some sample data
    this.initializeSamplePublications();
    this.initializeSampleProjects();
  }

  private initializeSamplePublications() {
    const samplePublications: Omit<Publication, 'id'>[] = [
      {
        title: "Deep Learning Approaches for Real-Time Object Detection in Autonomous Vehicles",
        authors: "John Doe, Jane Smith, Bob Johnson",
        type: "conference",
        venue: "IEEE Conference on Computer Vision and Pattern Recognition (CVPR)",
        year: 2024,
        abstract: "This paper presents novel deep learning approaches for real-time object detection in autonomous vehicles, achieving 95% accuracy with 30ms inference time.",
        doi: "10.1109/CVPR.2024.12345",
        pdfUrl: "https://example.com/papers/cvpr2024.pdf",
        keywords: ["deep learning", "object detection", "autonomous vehicles", "computer vision"],
        status: "published",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Scalable Microservices Architecture for Cloud-Native Applications",
        authors: "John Doe, Alice Cooper",
        type: "journal",
        venue: "ACM Transactions on Software Engineering and Methodology",
        year: 2023,
        abstract: "We propose a scalable microservices architecture that improves system reliability by 40% and reduces deployment time by 60%.",
        doi: "10.1145/3587102",
        pdfUrl: "https://example.com/papers/tosem2023.pdf",
        keywords: ["microservices", "cloud computing", "software architecture", "scalability"],
        status: "published",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Blockchain-Based Security Framework for IoT Networks",
        authors: "John Doe, Robert Chen, Lisa Wong",
        type: "conference",
        venue: "International Conference on Network Security (ICNS)",
        year: 2024,
        abstract: "A novel blockchain-based security framework that enhances IoT network security while maintaining low latency communication.",
        doi: "10.1007/978-3-031-12345-6_15",
        pdfUrl: "https://example.com/papers/icns2024.pdf",
        keywords: ["blockchain", "IoT", "security", "distributed systems"],
        status: "accepted",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Machine Learning Optimization Techniques for Edge Computing",
        authors: "John Doe, Maria Rodriguez",
        type: "journal",
        venue: "IEEE Transactions on Mobile Computing",
        year: 2024,
        abstract: "This work explores machine learning optimization techniques specifically designed for resource-constrained edge computing environments.",
        doi: null,
        pdfUrl: null,
        keywords: ["machine learning", "edge computing", "optimization", "mobile computing"],
        status: "under_review",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ];

    samplePublications.forEach(pub => {
      const id = this.currentPublicationId++;
      this.publications.set(id, { ...pub, id });
    });
  }

  private initializeSampleProjects() {
    const sampleProjects: Omit<Project, 'id'>[] = [
      {
        name: "AI-Powered Analytics Dashboard",
        description: "A comprehensive analytics dashboard that leverages machine learning to provide real-time insights and predictive analytics for business intelligence applications.",
        technologies: ["React", "TypeScript", "Python", "TensorFlow", "PostgreSQL", "Docker"],
        status: "completed",
        metrics: "50,000+ active users, 99.9% uptime, 40% faster data processing",
        githubUrl: "https://github.com/johndoe/ai-analytics-dashboard",
        demoUrl: "https://analytics-demo.example.com",
        imageUrl: null,
        startDate: new Date("2023-01-15"),
        endDate: new Date("2024-03-20"),
        featured: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Blockchain Voting System",
        description: "A secure and transparent blockchain-based voting system designed for democratic processes with enhanced security and verifiability features.",
        technologies: ["Solidity", "Web3.js", "Node.js", "Express", "MongoDB", "React"],
        status: "completed",
        metrics: "100% security audit passed, 10,000+ votes processed, Zero tampering incidents",
        githubUrl: "https://github.com/johndoe/blockchain-voting",
        demoUrl: "https://voting-demo.example.com",
        imageUrl: null,
        startDate: new Date("2023-06-01"),
        endDate: new Date("2024-01-15"),
        featured: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "IoT Smart Home Platform",
        description: "An integrated IoT platform for smart home automation with real-time monitoring, energy optimization, and voice control capabilities.",
        technologies: ["Python", "MQTT", "InfluxDB", "Grafana", "Raspberry Pi", "Arduino"],
        status: "in_progress",
        metrics: "75% complete, 25+ device integrations, 30% energy savings achieved",
        githubUrl: "https://github.com/johndoe/iot-smart-home",
        demoUrl: null,
        imageUrl: null,
        startDate: new Date("2024-02-01"),
        endDate: null,
        featured: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Real-time Chat Application",
        description: "A scalable real-time chat application with end-to-end encryption, file sharing, and video calling capabilities for team collaboration.",
        technologies: ["Node.js", "Socket.io", "React", "Redis", "MongoDB", "WebRTC"],
        status: "completed",
        metrics: "1,000+ concurrent users, <100ms latency, 99.95% message delivery rate",
        githubUrl: "https://github.com/johndoe/realtime-chat",
        demoUrl: "https://chat-demo.example.com",
        imageUrl: null,
        startDate: new Date("2022-09-01"),
        endDate: new Date("2023-02-28"),
        featured: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "E-commerce Microservices Architecture",
        description: "A highly scalable e-commerce platform built using microservices architecture with containerized deployment and automated CI/CD pipeline.",
        technologies: ["Java", "Spring Boot", "Docker", "Kubernetes", "PostgreSQL", "Redis"],
        status: "planned",
        metrics: "Design phase complete, Expected to handle 100,000+ transactions/day",
        githubUrl: null,
        demoUrl: null,
        imageUrl: null,
        startDate: new Date("2024-06-01"),
        endDate: null,
        featured: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    sampleProjects.forEach(project => {
      const id = this.currentProjectId++;
      this.projects.set(id, { ...project, id });
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getPublications(): Promise<Publication[]> {
    return Array.from(this.publications.values()).sort((a, b) => b.year - a.year);
  }

  async getPublicationsByType(type: 'conference' | 'journal'): Promise<Publication[]> {
    return Array.from(this.publications.values())
      .filter(pub => pub.type === type)
      .sort((a, b) => b.year - a.year);
  }

  async getPublication(id: number): Promise<Publication | undefined> {
    return this.publications.get(id);
  }

  async createPublication(insertPublication: InsertPublication): Promise<Publication> {
    const id = this.currentPublicationId++;
    const publication: Publication = {
      ...insertPublication,
      id,
      status: insertPublication.status || "published",
      abstract: insertPublication.abstract || null,
      doi: insertPublication.doi || null,
      pdfUrl: insertPublication.pdfUrl || null,
      keywords: insertPublication.keywords || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.publications.set(id, publication);
    return publication;
  }

  async updatePublication(id: number, updates: Partial<InsertPublication>): Promise<Publication | undefined> {
    const existing = this.publications.get(id);
    if (!existing) return undefined;

    const updated: Publication = {
      ...existing,
      ...updates,
      updatedAt: new Date(),
    };
    this.publications.set(id, updated);
    return updated;
  }

  async deletePublication(id: number): Promise<boolean> {
    return this.publications.delete(id);
  }

  // Projects methods
  async getProjects(): Promise<Project[]> {
    return Array.from(this.projects.values()).sort((a, b) => {
      // Sort by status priority (completed, in_progress, planned) then by start date
      const statusOrder = { completed: 1, in_progress: 2, planned: 3 };
      const statusDiff = statusOrder[a.status as keyof typeof statusOrder] - statusOrder[b.status as keyof typeof statusOrder];
      if (statusDiff !== 0) return statusDiff;
      return new Date(b.startDate || 0).getTime() - new Date(a.startDate || 0).getTime();
    });
  }

  async getFeaturedProjects(): Promise<Project[]> {
    return Array.from(this.projects.values())
      .filter(project => project.featured)
      .sort((a, b) => new Date(b.startDate || 0).getTime() - new Date(a.startDate || 0).getTime());
  }

  async getProject(id: number): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = this.currentProjectId++;
    const project: Project = {
      ...insertProject,
      id,
      metrics: insertProject.metrics || null,
      githubUrl: insertProject.githubUrl || null,
      demoUrl: insertProject.demoUrl || null,
      imageUrl: insertProject.imageUrl || null,
      startDate: insertProject.startDate || null,
      endDate: insertProject.endDate || null,
      featured: insertProject.featured || false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.projects.set(id, project);
    return project;
  }

  async updateProject(id: number, updates: Partial<InsertProject>): Promise<Project | undefined> {
    const existing = this.projects.get(id);
    if (!existing) return undefined;

    const updated: Project = {
      ...existing,
      ...updates,
      updatedAt: new Date(),
    };
    this.projects.set(id, updated);
    return updated;
  }

  async deleteProject(id: number): Promise<boolean> {
    return this.projects.delete(id);
  }
}

export const storage = new MemStorage();
