import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import content from "@/data/content.json";
import { TechLogo } from "./TechLogo";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export function Projects() {
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);

  const allTechnologies = useMemo(() => {
    const techSet = new Set<string>();
    content.projects.forEach((project) => {
      project.technologies.forEach((tech) => {
        techSet.add(tech.name);
      });
    });
    return Array.from(techSet).sort();
  }, []);

  const filteredProjects = useMemo(() => {
    if (selectedTechs.length === 0) return content.projects;
    return content.projects.filter((project) => {
      const projectTechs = new Set(
        project.technologies.map((tech) => tech.name)
      );
      return selectedTechs.every((tech) => projectTechs.has(tech));
    });
  }, [selectedTechs]);

  const resetFilters = () => {
    setSelectedTechs([]);
  };

  return (
    <motion.section
      className="py-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-2xl font-semibold tracking-tight bg-gradient-to-r from-primary/80 to-primary bg-clip-text text-transparent">
            Projets
          </h2>
          {selectedTechs.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={resetFilters}
              className="self-start sm:self-auto"
            >
              Réinitialiser les filtres ({selectedTechs.length})
            </Button>
          )}
        </div>

        <ToggleGroup
          type="multiple"
          value={selectedTechs}
          onValueChange={setSelectedTechs}
          className="flex flex-wrap gap-2"
        >
          {allTechnologies.map((tech) => (
            <ToggleGroupItem
              key={tech}
              value={tech}
              aria-label={`Filter by ${tech}`}
              className="flex items-center gap-2 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground transition-all"
            >
              <TechLogo name={tech} size="sm" />
              <span>{tech}</span>
            </ToggleGroupItem>
          ))}
        </ToggleGroup>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              layout
            >
              <Card className="flex flex-col overflow-hidden backdrop-blur-sm bg-card/80 h-full">
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={project.image.src}
                    alt={`Aperçu du projet ${project.title}`}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="flex flex-col flex-1 p-6">
                  <div className="flex-1">
                    <h3 className="mb-2 text-lg font-semibold">
                      {project.title}
                    </h3>
                    <p className="mb-6 text-sm text-muted-foreground">
                      {project.description}
                    </p>
                  </div>
                  <div className="space-y-4 mt-auto pt-6 border-t">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <Badge
                          key={techIndex}
                          variant={
                            selectedTechs.includes(tech.name)
                              ? "default"
                              : "secondary"
                          }
                          className="flex items-center gap-2 h-6 px-3 rounded-full cursor-pointer transition-colors"
                          onClick={() => {
                            if (selectedTechs.includes(tech.name)) {
                              setSelectedTechs(
                                selectedTechs.filter((t) => t !== tech.name)
                              );
                            } else {
                              setSelectedTechs([...selectedTechs, tech.name]);
                            }
                          }}
                        >
                          <TechLogo
                            name={tech.name}
                            size="sm"
                            className="shrink-0"
                          />
                          <span className="text-xs">{tech.name}</span>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1" asChild>
                        <a
                          href={project.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2"
                        >
                          <Github className="h-4 w-4" />
                          Sources
                        </a>
                      </Button>
                      {project.liveUrl && (
                        <Button variant="default" className="flex-1" asChild>
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2"
                          >
                            <Globe className="h-4 w-4" />
                            Site
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-lg text-muted-foreground">
              Aucun projet ne correspond aux technologies sélectionnées.
            </p>
            <Button variant="outline" className="mt-4" onClick={resetFilters}>
              Réinitialiser les filtres
            </Button>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}
