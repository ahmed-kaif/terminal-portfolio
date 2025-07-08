import { users, type User, type InsertUser, publications, type Publication, type InsertPublication } from "@shared/schema";

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
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private publications: Map<number, Publication>;
  private currentUserId: number;
  private currentPublicationId: number;

  constructor() {
    this.users = new Map();
    this.publications = new Map();
    this.currentUserId = 1;
    this.currentPublicationId = 1;
    
    // Add some sample publications
    this.initializeSamplePublications();
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
}

export const storage = new MemStorage();
