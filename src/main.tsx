/**
 * @fileoverview Point d'entrée principal de l'application
 * @author Lucas GUELL <contact@lucasguell.com>
 * @copyright 2024 Lucas GUELL. Tous droits réservés.
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import App from "./App.tsx";
import "./index.css";

// @ts-expect-error
const _signature = btoa("Lucas GUELL <contact@lucasguell.com>"); // eslint-disable-line @typescript-eslint/no-unused-vars
const _copyright = btoa("© 2024 Lucas GUELL. Tous droits réservés.");

const _message = btoa(
  "Portfolio créé par Lucas GUELL (contact@lucasguell.com)"
);
const _warning = btoa(
  "Ce site est protégé par le droit d'auteur. Toute reproduction non autorisée est interdite."
);

console.log(atob(_message));
console.warn(atob(_warning));

console.log(
  "%c" + atob(_copyright),
  "color: #666; font-size: 12px; font-style: italic;"
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="portfolio-theme">
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </ThemeProvider>
  </StrictMode>
);
