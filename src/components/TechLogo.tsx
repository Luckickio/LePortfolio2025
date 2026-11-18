import { cn } from "@/lib/utils";

import reactLogo from "@/assets/logos/react-original.svg";
import html5Logo from "@/assets/logos/html5-original.svg";
import cssLogo from "@/assets/logos/css3-original.svg";
import javascriptLogo from "@/assets/logos/javascript-original.svg";
import typescriptLogo from "@/assets/logos/typescript-original.svg";
import nextjsLogo from "@/assets/logos/nextjs-original.svg";
import phpLogo from "@/assets/logos/php-original.svg";
import tailwindLogo from "@/assets/logos/tailwindcss-original.svg";
import mongodbLogo from "@/assets/logos/mongodb-original.svg";
import postgresqlLogo from "@/assets/logos/postgresql-original.svg";
import pythonLogo from "@/assets/logos/python-original.svg";
import pandasLogo from "@/assets/logos/pandas-original.svg";
import numpyLogo from "@/assets/logos/numpy-original.svg";
import tensorflowLogo from "@/assets/logos/tensorflow-original.svg";
import scikitlearnLogo from "@/assets/logos/scikitlearn-original.svg";
import rLogo from "@/assets/logos/r-original.svg";
import cLogo from "@/assets/logos/c-original.svg";
import csharpLogo from "@/assets/logos/csharp-original.svg";
import rustLogo from "@/assets/logos/rust-original.svg";
import bashLogo from "@/assets/logos/bash-original.svg";
import gitLogo from "@/assets/logos/git-original.svg";
import figmaLogo from "@/assets/logos/figma-original.svg";
import dockerLogo from "@/assets/logos/docker-original.svg";
import vscodiumLogo from "@/assets/logos/vscodium-original.svg";
import jupyterLogo from "@/assets/logos/jupyter-original-wordmark.svg";
import fedoraLogo from "@/assets/logos/fedora-original.svg";
import windowsLogo from "@/assets/logos/windows11-original.svg";
import deepseekLogo from "@/assets/logos/DeepSeek_logo.png";
import claudeLogo from "@/assets/logos/claude-original.svg";
import claudeCodeLogo from "@/assets/logos/claudecode-original.svg";
import shadcnuiLogo from "@/assets/logos/shadcn-original.svg";
import radixLogo from "@/assets/logos/radix_logo.png";
import rstudioLogo from "@/assets/logos/rstudio-original.svg";
import motionLogo from "@/assets/logos/motion-original.svg";
import hoppscotchLogo from "@/assets/logos/hoppscotch-original.svg";
import dbeaverLogo from "@/assets/logos/dbeaver-original.svg";
import dashLogo from "@/assets/logos/Dash_logo.png";
import plotlyLogo from "@/assets/logos/plotly-original.svg";

const techLogos: Record<string, { src: string; darkInvert?: boolean }> = {
  "React Local": { src: reactLogo },
  HTML5: { src: html5Logo },
  CSS3: { src: cssLogo },
  JavaScript: { src: javascriptLogo },
  TypeScript: { src: typescriptLogo },
  React: { src: reactLogo },
  "Next.js": { src: nextjsLogo, darkInvert: true },
  PHP: { src: phpLogo },
  "Tailwind CSS": { src: tailwindLogo },
  MongoDB: { src: mongodbLogo },
  PostgreSQL: { src: postgresqlLogo },
  Python: { src: pythonLogo },
  Pandas: { src: pandasLogo },
  NumPy: { src: numpyLogo },
  TensorFlow: { src: tensorflowLogo },
  "Scikit-learn": { src: scikitlearnLogo },
  R: { src: rLogo },
  C: { src: cLogo },
  "C#": { src: csharpLogo },
  Rust: { src: rustLogo, darkInvert: true },
  Bash: { src: bashLogo, darkInvert: true },
  Git: { src: gitLogo },
  Figma: { src: figmaLogo },
  Docker: { src: dockerLogo },
  VSCodium: { src: vscodiumLogo },
  JupyterLab: { src: jupyterLogo },
  Fedora: { src: fedoraLogo },
  "Windows 11": { src: windowsLogo },
  Deepseek: { src: deepseekLogo },
  Claude: { src: claudeLogo },
  "Claude Code": { src: claudeCodeLogo },
  "Shadcn/ui": { src: shadcnuiLogo, darkInvert: true },
  Radix: { src: radixLogo },
  RStudio: { src: rstudioLogo },
  Motion: { src: motionLogo, darkInvert: true },
  Hoppscotch: { src: hoppscotchLogo },
  DBeaver: { src: dbeaverLogo },
  Dash: { src: dashLogo },
  Plotly: { src: plotlyLogo },
};

interface TechLogoProps {
  name: string;
  className?: string;
  size?: "sm" | "md";
}

export function TechLogo({ name, className, size = "md" }: TechLogoProps) {
  const tech = techLogos[name];

  if (!tech) return null;

  return (
    <div
      className={cn(
        "flex items-center justify-center",
        {
          "p-2": size === "md",
          "p-1": size === "sm",
        },
        className
      )}
    >
      <img
        src={tech.src}
        alt={`${name} logo`}
        className={cn("h-auto w-auto", {
          "h-6 w-6": size === "md",
          "h-4 w-4": size === "sm",
          "dark:invert dark:hue-rotate-180": tech.darkInvert,
        })}
      />
    </div>
  );
}
