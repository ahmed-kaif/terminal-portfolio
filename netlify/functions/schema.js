const { pgTable, serial, text, integer, timestamp, boolean } = require('drizzle-orm/pg-core');

const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

const publications = pgTable("publications", {
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

const projects = pgTable("projects", {
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

module.exports = {
  users,
  publications,
  projects
};