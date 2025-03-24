import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, Github, Linkedin, MapPin, Send, Key, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import content from "@/data/content.json";

export function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopyPGP = async () => {
    try {
      await navigator.clipboard.writeText(content.contact.pgpKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy PGP key:", err);
    }
  };

  return (
    <motion.section
      className="py-8 md:py-24"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="container px-2 sm:px-4 md:px-6">
        <motion.div
          className="text-center mb-6 md:mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl">
            {content.contact.title}
          </h2>
        </motion.div>

        <motion.div
          className="w-full max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="overflow-hidden shadow-xl">
            <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x">
              {/* Informations de contact */}
              <div className="p-4 sm:p-6 md:p-8 flex flex-col">
                <div className="mb-6">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2">
                    Parlons ensemble
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    {content.contact.description}
                  </p>
                </div>

                <div className="space-y-4 flex-grow">
                  <motion.div
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <div className="shrink-0 rounded-full bg-primary/10 p-2">
                      <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                    </div>
                    <a
                      href={`mailto:${content.contact.email}`}
                      className="hover:text-primary transition-colors text-sm sm:text-base"
                    >
                      {content.contact.email}
                    </a>
                  </motion.div>
                  <motion.div
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <div className="shrink-0 rounded-full bg-primary/10 p-2">
                      <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                    </div>
                    <span className="text-sm sm:text-base">
                      {content.contact.location}
                    </span>
                  </motion.div>
                </div>

                <div className="mt-6 space-y-3">
                  <Button
                    size="default"
                    className="w-full flex items-center justify-center gap-2"
                    asChild
                  >
                    <a href={`mailto:${content.contact.email}`}>
                      <Send className="h-4 w-4" />
                      Me contacter
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2"
                    onClick={handleCopyPGP}
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4" />
                        Clé PGP copiée !
                      </>
                    ) : (
                      <>
                        <Key className="h-4 w-4" />
                        Copier ma clé PGP
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* Réseaux sociaux */}
              <div className="p-4 sm:p-6 md:p-8 flex flex-col">
                <div className="mb-6">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2">
                    Réseaux sociaux
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Retrouvez-moi sur les réseaux sociaux pour suivre mon
                    actualité et mes projets.
                  </p>
                </div>

                <div className="grid gap-3">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                  >
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-2 h-auto p-3 sm:p-4"
                      asChild
                    >
                      <a
                        href={`https://${content.contact.github}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center"
                      >
                        <div className="shrink-0 rounded-full bg-primary/10 p-1.5 sm:p-2">
                          <Github className="h-4 w-4 sm:h-5 sm:w-5" />
                        </div>
                        <div className="ml-2 sm:ml-3">
                          <span className="block font-medium text-sm sm:text-base">
                            {content.contact.social.github.label}
                          </span>
                          <span className="block text-xs sm:text-sm text-muted-foreground">
                            {content.contact.social.github.description}
                          </span>
                        </div>
                      </a>
                    </Button>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  >
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-2 h-auto p-3 sm:p-4"
                      asChild
                    >
                      <a
                        href={`https://${content.contact.linkedin}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center"
                      >
                        <div className="shrink-0 rounded-full bg-primary/10 p-1.5 sm:p-2">
                          <Linkedin className="h-4 w-4 sm:h-5 sm:w-5" />
                        </div>
                        <div className="ml-2 sm:ml-3">
                          <span className="block font-medium text-sm sm:text-base">
                            {content.contact.social.linkedin.label}
                          </span>
                          <span className="block text-xs sm:text-sm text-muted-foreground">
                            {content.contact.social.linkedin.description}
                          </span>
                        </div>
                      </a>
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </motion.section>
  );
}
