import { Button } from "@/components/ui/button";
import { Terminal } from "@/components/Terminal";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import content from "@/data/content.json";

export function Hero() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = `mailto:${content.contact.email}`;
  };

  return (
    <motion.section
      className="py-12 md:py-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mx-auto grid items-center gap-8 lg:grid-cols-2">
        <motion.div
          className="space-y-6 order-first"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            {content.hero.title}
          </h1>
          <p className="text-xl text-muted-foreground">
            {content.hero.description}
          </p>
          <div className="flex gap-4">
            {content.hero.buttons.map((button, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              >
                <Button
                  size="lg"
                  variant={button.variant as "default" | "outline"}
                  onClick={
                    button.text === "Me contacter"
                      ? handleContactClick
                      : undefined
                  }
                  asChild={button.text === "Voir mes projets"}
                >
                  {button.text === "Voir mes projets" ? (
                    <a href="#projects">{button.text}</a>
                  ) : (
                    button.text
                  )}
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>
        {!isMobile && (
          <motion.div
            className="lg:order-last"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Terminal />
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}
