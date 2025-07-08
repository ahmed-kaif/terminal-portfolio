import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ExternalLink, Github, Calendar, Code, Users, Star, ArrowRight, Loader2, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Project } from "@shared/schema";

export default function ProjectsSection() {
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const { data: projects = [], isLoading, error } = useQuery({
    queryKey: ['/api/projects'],
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-catppuccin-green text-catppuccin-base';
      case 'in_progress': return 'bg-catppuccin-yellow text-catppuccin-base';
      case 'planned': return 'bg-catppuccin-blue text-catppuccin-base';
      default: return 'bg-catppuccin-surface2 text-catppuccin-text';
    }
  };

  const getTechnologies = () => {
    const allTechs = projects.flatMap((project: Project) => project.technologies);
    return [...new Set(allTechs)].sort();
  };

  const filteredProjects = projects.filter((project: Project) => {
    const techMatch = !selectedTech || project.technologies.includes(selectedTech);
    const statusMatch = statusFilter === "all" || project.status === statusFilter;
    return techMatch && statusMatch;
  });

  const featuredProjects = projects.filter((project: Project) => project.featured);
  const completedProjects = projects.filter((project: Project) => project.status === 'completed');

  if (isLoading) {
    return (
      <section>
        <div className="mb-6">
          <div className="text-catppuccin-green">$ find ./projects -name "*.git" -type d</div>
        </div>
        <div className="flex items-center gap-2 text-catppuccin-subtext1">
          <Loader2 size={16} className="animate-spin" />
          Loading projects...
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <div className="mb-6">
          <div className="text-catppuccin-green">$ find ./projects -name "*.git" -type d</div>
        </div>
        <div className="text-catppuccin-red">Error loading projects. Please try again.</div>
      </section>
    );
  }

  return (
    <section>
      <div className="mb-6">
        <div className="text-catppuccin-green">$ find ./projects -name "*.git" -type d</div>
      </div>

      {/* Project Statistics */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-catppuccin-surface0 border-catppuccin-surface1">
          <CardContent className="p-4 text-center">
            <div className="text-2xl text-catppuccin-blue font-bold">{projects.length}</div>
            <div className="text-catppuccin-subtext1 text-sm">Total Projects</div>
          </CardContent>
        </Card>
        <Card className="bg-catppuccin-surface0 border-catppuccin-surface1">
          <CardContent className="p-4 text-center">
            <div className="text-2xl text-catppuccin-green font-bold">{completedProjects.length}</div>
            <div className="text-catppuccin-subtext1 text-sm">Completed</div>
          </CardContent>
        </Card>
        <Card className="bg-catppuccin-surface0 border-catppuccin-surface1">
          <CardContent className="p-4 text-center">
            <div className="text-2xl text-catppuccin-yellow font-bold">{getTechnologies().length}</div>
            <div className="text-catppuccin-subtext1 text-sm">Technologies</div>
          </CardContent>
        </Card>
        <Card className="bg-catppuccin-surface0 border-catppuccin-surface1">
          <CardContent className="p-4 text-center">
            <div className="text-2xl text-catppuccin-mauve font-bold">{featuredProjects.length}</div>
            <div className="text-catppuccin-subtext1 text-sm">Featured</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="mb-6 p-4 bg-catppuccin-surface0 border border-catppuccin-surface1 rounded">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-catppuccin-overlay0" />
            <span className="text-catppuccin-text text-sm font-medium">Filter by status:</span>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={statusFilter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("all")}
              className={statusFilter === "all" ? 
                "bg-catppuccin-blue text-catppuccin-base" : 
                "text-catppuccin-subtext1 border-catppuccin-surface2"
              }
            >
              All ({projects.length})
            </Button>
            <Button
              variant={statusFilter === "completed" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("completed")}
              className={statusFilter === "completed" ? 
                "bg-catppuccin-green text-catppuccin-base" : 
                "text-catppuccin-subtext1 border-catppuccin-surface2"
              }
            >
              Completed ({projects.filter((p: Project) => p.status === 'completed').length})
            </Button>
            <Button
              variant={statusFilter === "in_progress" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("in_progress")}
              className={statusFilter === "in_progress" ? 
                "bg-catppuccin-yellow text-catppuccin-base" : 
                "text-catppuccin-subtext1 border-catppuccin-surface2"
              }
            >
              In Progress ({projects.filter((p: Project) => p.status === 'in_progress').length})
            </Button>
            <Button
              variant={statusFilter === "planned" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("planned")}
              className={statusFilter === "planned" ? 
                "bg-catppuccin-blue text-catppuccin-base" : 
                "text-catppuccin-subtext1 border-catppuccin-surface2"
              }
            >
              Planned ({projects.filter((p: Project) => p.status === 'planned').length})
            </Button>
          </div>
          
          {getTechnologies().length > 0 && (
            <>
              <div className="flex items-center gap-2">
                <Code size={16} className="text-catppuccin-overlay0" />
                <span className="text-catppuccin-text text-sm font-medium">Filter by technology:</span>
              </div>
              <div className="flex gap-2 flex-wrap">
                <Button
                  variant={selectedTech === null ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTech(null)}
                  className={selectedTech === null ? 
                    "bg-catppuccin-blue text-catppuccin-base" : 
                    "text-catppuccin-subtext1 border-catppuccin-surface2"
                  }
                >
                  All Technologies
                </Button>
                {getTechnologies().map(tech => (
                  <Button
                    key={tech}
                    variant={selectedTech === tech ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTech(tech)}
                    className={selectedTech === tech ? 
                      "bg-catppuccin-blue text-catppuccin-base" : 
                      "text-catppuccin-subtext1 border-catppuccin-surface2"
                    }
                  >
                    {tech}
                  </Button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Projects Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="bg-catppuccin-surface0 border border-catppuccin-surface1">
          <TabsTrigger value="all" className="data-[state=active]:bg-catppuccin-blue data-[state=active]:text-catppuccin-base">
            All Projects ({filteredProjects.length})
          </TabsTrigger>
          <TabsTrigger value="featured" className="data-[state=active]:bg-catppuccin-mauve data-[state=active]:text-catppuccin-base">
            Featured ({featuredProjects.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project: Project) => (
                <Card key={project.id} className="bg-catppuccin-surface0 border-catppuccin-surface1 hover:border-catppuccin-blue transition-colors">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <CardTitle className="text-catppuccin-blue">{project.name}</CardTitle>
                          {project.featured && (
                            <Star size={16} className="text-catppuccin-yellow fill-catppuccin-yellow" />
                          )}
                        </div>
                        <Badge className={getStatusColor(project.status)}>
                          {project.status.replace('_', ' ')}
                        </Badge>
                      </div>
                    </div>
                    <CardDescription className="text-catppuccin-subtext1">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Code size={14} className="text-catppuccin-overlay0" />
                          <span className="text-catppuccin-text text-sm font-medium">Technologies:</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map(tech => (
                            <span key={tech} className="px-2 py-1 bg-catppuccin-surface1 text-catppuccin-text text-xs rounded">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {project.metrics && (
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Users size={14} className="text-catppuccin-overlay0" />
                            <span className="text-catppuccin-text text-sm font-medium">Metrics:</span>
                          </div>
                          <p className="text-catppuccin-subtext1 text-sm">{project.metrics}</p>
                        </div>
                      )}

                      {(project.startDate || project.endDate) && (
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Calendar size={14} className="text-catppuccin-overlay0" />
                            <span className="text-catppuccin-text text-sm font-medium">Timeline:</span>
                          </div>
                          <p className="text-catppuccin-subtext1 text-sm">
                            {project.startDate && new Date(project.startDate).toLocaleDateString()}
                            {project.startDate && project.endDate && " - "}
                            {project.endDate && new Date(project.endDate).toLocaleDateString()}
                            {project.startDate && !project.endDate && " - Present"}
                          </p>
                        </div>
                      )}

                      <div className="flex gap-3 pt-2">
                        {project.githubUrl && (
                          <Button
                            variant="outline"
                            size="sm"
                            asChild
                            className="text-catppuccin-text border-catppuccin-surface2 hover:bg-catppuccin-surface1"
                          >
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                              <Github size={14} className="mr-1" />
                              Code
                            </a>
                          </Button>
                        )}
                        {project.demoUrl && (
                          <Button
                            variant="outline"
                            size="sm"
                            asChild
                            className="text-catppuccin-green border-catppuccin-surface2 hover:bg-catppuccin-surface1"
                          >
                            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink size={14} className="mr-1" />
                              Demo
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-2 text-center py-12 text-catppuccin-subtext1">
                <Code size={48} className="mx-auto mb-4 text-catppuccin-overlay0" />
                <p>No projects found matching your criteria.</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="featured" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            {featuredProjects.length > 0 ? (
              featuredProjects.map((project: Project) => (
                <Card key={project.id} className="bg-catppuccin-surface0 border-catppuccin-surface1 hover:border-catppuccin-mauve transition-colors">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <CardTitle className="text-catppuccin-mauve">{project.name}</CardTitle>
                          <Star size={16} className="text-catppuccin-yellow fill-catppuccin-yellow" />
                        </div>
                        <Badge className={getStatusColor(project.status)}>
                          {project.status.replace('_', ' ')}
                        </Badge>
                      </div>
                    </div>
                    <CardDescription className="text-catppuccin-subtext1">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Code size={14} className="text-catppuccin-overlay0" />
                          <span className="text-catppuccin-text text-sm font-medium">Technologies:</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map(tech => (
                            <span key={tech} className="px-2 py-1 bg-catppuccin-surface1 text-catppuccin-text text-xs rounded">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {project.metrics && (
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Users size={14} className="text-catppuccin-overlay0" />
                            <span className="text-catppuccin-text text-sm font-medium">Metrics:</span>
                          </div>
                          <p className="text-catppuccin-subtext1 text-sm">{project.metrics}</p>
                        </div>
                      )}

                      <div className="flex gap-3 pt-2">
                        {project.githubUrl && (
                          <Button
                            variant="outline"
                            size="sm"
                            asChild
                            className="text-catppuccin-text border-catppuccin-surface2 hover:bg-catppuccin-surface1"
                          >
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                              <Github size={14} className="mr-1" />
                              Code
                            </a>
                          </Button>
                        )}
                        {project.demoUrl && (
                          <Button
                            variant="outline"
                            size="sm"
                            asChild
                            className="text-catppuccin-mauve border-catppuccin-surface2 hover:bg-catppuccin-surface1"
                          >
                            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink size={14} className="mr-1" />
                              Demo
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-2 text-center py-12 text-catppuccin-subtext1">
                <Star size={48} className="mx-auto mb-4 text-catppuccin-overlay0" />
                <p>No featured projects available.</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
}