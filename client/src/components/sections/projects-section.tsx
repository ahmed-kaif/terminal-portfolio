import { ExternalLink, Github } from "lucide-react";

interface Project {
  name: string;
  description: string;
  technologies: string[];
  status: string;
  metrics: string;
  githubUrl: string;
  demoUrl: string;
}

export default function ProjectsSection() {
  const projects: Project[] = [
    {
      name: "E-Commerce Platform",
      description: "A full-stack e-commerce platform built with React, Node.js, and MongoDB. Features include user authentication, payment processing, and admin dashboard.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      status: "Production",
      metrics: "Users: 1,200+",
      githubUrl: "https://github.com/johndoe/ecommerce",
      demoUrl: "https://ecommerce-demo.com"
    },
    {
      name: "Task Management App",
      description: "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
      technologies: ["Vue.js", "Express", "Socket.io", "PostgreSQL"],
      status: "Active Development",
      metrics: "Teams: 150+",
      githubUrl: "https://github.com/johndoe/taskapp",
      demoUrl: "https://taskapp-demo.com"
    },
    {
      name: "DevOps Dashboard",
      description: "A comprehensive DevOps monitoring dashboard with real-time metrics, automated deployments, and incident management.",
      technologies: ["React", "Go", "Kubernetes", "Prometheus"],
      status: "Open Source",
      metrics: "Stars: 2,400+",
      githubUrl: "https://github.com/johndoe/devops-dashboard",
      demoUrl: "https://devops-demo.com"
    }
  ];

  return (
    <section>
      <div className="mb-6">
        <div className="text-catppuccin-green">$ ls -la projects/</div>
      </div>

      <div className="space-y-6">
        {projects.map((project, index) => (
          <div key={index} className="border border-catppuccin-surface1 rounded p-6 bg-catppuccin-surface0 hover:border-catppuccin-blue transition-colors">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
              <h3 className="text-xl text-catppuccin-blue">{project.name}</h3>
              <div className="flex space-x-4 mt-2 md:mt-0">
                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-catppuccin-green hover:text-catppuccin-lavender transition-colors text-sm flex items-center gap-1"
                >
                  <Github size={14} />
                  [GitHub]
                </a>
                <a 
                  href={project.demoUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-catppuccin-yellow hover:text-catppuccin-lavender transition-colors text-sm flex items-center gap-1"
                >
                  <ExternalLink size={14} />
                  [Live Demo]
                </a>
              </div>
            </div>
            <p className="text-catppuccin-subtext1 mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map((tech, techIndex) => (
                <span key={techIndex} className="px-2 py-1 bg-catppuccin-surface1 text-catppuccin-text text-xs rounded">
                  {tech}
                </span>
              ))}
            </div>
            <div className="text-sm text-catppuccin-overlay1">
              <span className="text-catppuccin-green">Status:</span> {project.status} • 
              <span className="text-catppuccin-green"> {project.metrics}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
