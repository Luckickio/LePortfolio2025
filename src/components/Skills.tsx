import { motion } from 'framer-motion';
import { TechLogo } from './TechLogo';
import { Card } from '@/components/ui/card';
import content from '@/data/content.json';

export function Skills() {
  return (
    <section className="py-12">
      <h2 className="mb-8 text-2xl font-semibold tracking-tight bg-gradient-to-r from-primary/80 to-primary bg-clip-text text-transparent">
        Compétences
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {content.skills.map((skillGroup, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <Card className="p-6 backdrop-blur-sm bg-card/80">
              <div className="flex items-baseline gap-4 mb-6">
                <h3 className="text-xl font-medium">
                  {skillGroup.category}
                </h3>
                <div className="flex-1 h-px bg-border" />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {skillGroup.technologies.map((tech, techIndex) => (
                  <motion.div
                    key={techIndex}
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    whileHover={{ y: -2 }}
                    viewport={{ once: true }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                      delay: techIndex * 0.1
                    }}
                    className="relative group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="flex flex-col items-center gap-2 p-2 rounded-lg bg-card/40 backdrop-blur-sm border border-border/50">
                      <TechLogo name={tech} size="sm" />
                      <span className="text-xs font-medium text-center">
                        {tech}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}