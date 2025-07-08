import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const publications = pgTable("publications", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  authors: text("authors").notNull(),
  type: text("type").notNull(), // 'conference' or 'journal'
  venue: text("venue").notNull(),
  year: integer("year").notNull(),
  abstract: text("abstract"),
  doi: text("doi"),
  pdfUrl: text("pdf_url"),
  keywords: text("keywords").array(),
  status: text("status").default("published"), // 'published', 'accepted', 'under_review'
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  technologies: text("technologies").array().notNull(),
  status: text("status").notNull(), // 'completed', 'in_progress', 'planned'
  metrics: text("metrics"),
  githubUrl: text("github_url"),
  demoUrl: text("demo_url"),
  imageUrl: text("image_url"),
  startDate: timestamp("start_date"),
  endDate: timestamp("end_date"),
  featured: boolean("featured").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertPublicationSchema = createInsertSchema(publications).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertPublication = z.infer<typeof insertPublicationSchema>;
export type Publication = typeof publications.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;
