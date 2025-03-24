/**
 * @fileoverview Main component of the application
 * @author Lucas GUELL <contact@lucasguell.com>
 * @copyright 2025 Lucas GUELL. All rights reserved.
 *
 * This file is protected by copyright.
 * Unauthorized reproduction is prohibited.
 */

import { Separator } from "@/components/ui/separator";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Education } from "@/components/Education";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";

const _signature = btoa("Lucas GUELL <contact@lucasguell.com>");
const _copyright = btoa("© 2025 Lucas GUELL. All rights reserved.");

function App() {
  useSEO();

  return (
    <div className="min-h-screen bg-background texture-bg">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(45%_40%_at_50%_50%,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0)_100%)] dark:bg-[radial-gradient(45%_40%_at_50%_50%,rgba(0,0,0,0.3)_0%,rgba(0,0,0,0)_100%)]" />

      <Header />

      <main className="container mx-auto px-4 pt-20">
        <Hero />
        <Separator className="my-8" />
        <section id="about" className="scroll-mt-24">
          <About />
        </section>
        <Separator className="my-8" />
        <section id="skills" className="scroll-mt-24">
          <Skills />
        </section>
        <Separator className="my-8" />
        <section id="education" className="scroll-mt-24">
          <Education />
        </section>
        <Separator className="my-8" />
        <section id="projects" className="scroll-mt-24">
          <Projects />
        </section>
        <Separator className="my-8" />
        <section id="contact" className="scroll-mt-24">
          <Contact />
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;
