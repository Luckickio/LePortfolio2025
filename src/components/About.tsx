import { Server, Code, Brain, Palette } from "lucide-react";
import { motion } from "framer-motion";
import content from "@/data/content.json";

const icons = {
  code: Code,
  server: Server,
  brain: Brain,
  palette: Palette,
};

export function About() {
  return (
    <motion.section
      className="py-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="mb-8 text-2xl font-semibold tracking-tight bg-gradient-to-r from-primary/80 to-primary bg-clip-text text-transparent">
        {content.about.title}
      </h2>

      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5">
        <div className="absolute inset-0 bg-grid-white/10 bg-[size:3rem_3rem] [mask-image:radial-gradient(white,transparent_85%)]" />

        <div className="relative p-8">
          <motion.div
            className="mb-12 max-w-3xl"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="mb-4 text-2xl font-semibold">
              {content.about.introduction.title}
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {content.about.introduction.description}
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {content.about.specializations.map((spec, index) => {
              const IconComponent = icons[spec.icon as keyof typeof icons];
              return (
                <motion.div
                  key={index}
                  className="group relative overflow-hidden rounded-xl bg-card/40 p-6 transition-colors hover:bg-card/60"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <div className="absolute right-4 top-4 text-primary/10 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110">
                    {IconComponent && <IconComponent className="h-12 w-12" />}
                  </div>
                  <div className="relative space-y-4">
                    <div className="inline-flex rounded-lg bg-primary/10 p-2">
                      {IconComponent && (
                        <IconComponent className="h-5 w-5 text-primary" />
                      )}
                    </div>
                    <div>
                      <h4 className="mb-2 font-semibold">{spec.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {spec.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
