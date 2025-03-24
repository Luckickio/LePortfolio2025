import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import content from "@/data/content.json";

export function Education() {
  return (
    <motion.section
      className="py-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="mb-8 text-2xl font-semibold tracking-tight bg-gradient-to-r from-primary/80 to-primary bg-clip-text text-transparent">
        Parcours
      </h2>
      <div className="space-y-6">
        {content.education.experiences.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="p-6 backdrop-blur-sm bg-card/80">
              <div className="flex items-start gap-4">
                <div className="relative w-16 h-16 md:w-24 md:h-16 rounded-lg bg-primary/5 overflow-hidden flex-shrink-0 flex items-center justify-center p-2">
                  <img
                    src={exp.image}
                    alt={exp.school}
                    className="w-auto h-auto max-w-full max-h-full object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <h3 className="font-semibold">{exp.school}</h3>
                    <Badge variant="secondary" className="flex-shrink-0 w-fit">
                      {exp.period}
                    </Badge>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm font-medium">{exp.degree}</p>
                    {Array.isArray(exp.description) ? (
                      <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                        {exp.description.map((desc, i) => (
                          <p key={i}>• {desc}</p>
                        ))}
                      </div>
                    ) : (
                      <p className="mt-2 text-sm text-muted-foreground">
                        • {exp.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
