# Portfolio Terminal Application

## Overview

This is a modern full-stack web application that creates an interactive terminal-style portfolio website. The application features a sleek dark theme inspired by the Catppuccin Mocha color scheme and provides an engaging command-line interface experience for showcasing personal information, projects, skills, and contact details.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **Styling**: Tailwind CSS with custom Catppuccin Mocha color scheme
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js for REST API endpoints
- **Development**: TSX for TypeScript execution
- **Build**: ESBuild for production bundling

### Data Storage Solutions
- **Database**: PostgreSQL with Drizzle ORM
- **Driver**: Neon Database serverless PostgreSQL driver
- **Development Storage**: In-memory storage implementation for development
- **Schema Management**: Drizzle Kit for migrations and schema management

## Key Components

### Frontend Components
1. **Terminal Interface**: 
   - `TerminalWindow` - Main container with header and content areas
   - `TerminalHeader` - Mac-style window controls and title bar
   - `Navigation` - Command-style navigation between sections

2. **Content Sections**:
   - `HomeSection` - Welcome screen with ASCII art and typing animation
   - `AboutSection` - Personal information and background
   - `ProjectsSection` - Portfolio projects showcase
   - `SkillsSection` - Technical skills with progress indicators
   - `ContactSection` - Contact form and social links

3. **UI Components**:
   - Custom typing animation component
   - ASCII art renderer
   - Progress bars for skills
   - Toast notifications
   - Form components with validation

### Backend Components
1. **Storage Interface**: Abstracted storage layer supporting both memory and database implementations
2. **Route Registration**: Express route handler setup
3. **Development Server**: Vite integration for hot module replacement

### Database Schema
- **Users Table**: Basic user authentication structure with username and password fields
- **Publications Table**: Academic publications with type (conference/journal), metadata, and status tracking
- **Projects Table**: Portfolio projects with technologies, status, metrics, and timeline information
- **Zod Validation**: Type-safe schema validation using drizzle-zod

## Data Flow

1. **Client Rendering**: React components render the terminal interface
2. **Navigation**: User interactions trigger section changes via state management
3. **API Communication**: TanStack Query handles server communication with proper caching
4. **Database Operations**: Drizzle ORM provides type-safe database interactions
5. **Real-time Updates**: Development server provides hot reloading for instant feedback

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL driver for production
- **drizzle-orm**: Type-safe ORM with excellent TypeScript support
- **@tanstack/react-query**: Powerful data fetching and caching
- **wouter**: Minimalist routing library
- **date-fns**: Date manipulation utilities

### UI Dependencies
- **@radix-ui/***: Comprehensive set of accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Type-safe component variants
- **embla-carousel-react**: Touch-friendly carousel component

### Development Dependencies
- **vite**: Fast build tool with HMR support
- **typescript**: Static type checking
- **@replit/vite-plugin-***: Replit-specific development enhancements

## Deployment Strategy

### Development Environment
- **Hot Module Replacement**: Vite provides instant feedback during development
- **TypeScript Compilation**: Real-time type checking and compilation
- **Database**: Can use either in-memory storage or PostgreSQL connection

### Production Build
1. **Frontend**: Vite builds optimized static assets to `dist/public`
2. **Backend**: ESBuild bundles server code to `dist/index.js`
3. **Database**: Requires PostgreSQL connection via `DATABASE_URL` environment variable
4. **Static Serving**: Express serves built frontend assets in production

### Environment Configuration
- **Development**: Uses tsx for TypeScript execution and Vite dev server
- **Production**: Runs bundled JavaScript with static file serving
- **Database Migrations**: Drizzle Kit handles schema changes via `db:push` command

## User Preferences

Preferred communication style: Simple, everyday language.

## Changelog

Changelog:
- July 08, 2025. Initial setup
- July 08, 2025. Added Publications section with database integration for academic papers
- July 08, 2025. Integrated Projects section with database storage, filtering, and enhanced UI