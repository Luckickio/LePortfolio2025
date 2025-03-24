import { cn } from "@/lib/utils";

import reactLogo from "@/assets/logos/react.svg";
import html5Logo from "@/assets/logos/html5-original.svg";
import css3Logo from "@/assets/logos/css3-original.svg";
import javascriptLogo from "@/assets/logos/javascript-original.svg";
import typescriptLogo from "@/assets/logos/typescript-original.svg";
import nextjsLogo from "@/assets/logos/nextjs-original.svg";
import phpLogo from "@/assets/logos/php-original.svg";
import tailwindLogo from "@/assets/logos/tailwindcss-icon.svg";
import mongodbLogo from "@/assets/logos/mongodb-original.svg";
import postgresqlLogo from "@/assets/logos/postgresql-original.svg";
import pythonLogo from "@/assets/logos/python-original.svg";
import pandasLogo from "@/assets/logos/pandas-original.svg";
import numpyLogo from "@/assets/logos/numpy-original.svg";
import tensorflowLogo from "@/assets/logos/tensorflow-original.svg";
import scikitlearnLogo from "@/assets/logos/Scikit_learn_logo_small.svg";
import rLogo from "@/assets/logos/r-original.svg";
import cLogo from "@/assets/logos/c-original.svg";
import csharpLogo from "@/assets/logos/csharp-original.svg";
import rustLogo from "@/assets/logos/rust-original.svg";
import bashLogo from "@/assets/logos/bash-original.svg";
import gitLogo from "@/assets/logos/git-original.svg";
import figmaLogo from "@/assets/logos/figma-original.svg";
import dockerLogo from "@/assets/logos/docker-original.svg";
import vscodeLogo from "@/assets/logos/vscodium_logo.png";
import jupyterLogo from "@/assets/logos/jupyter-original-wordmark.svg";
import fedoraLogo from "@/assets/logos/fedora-original.svg";
import windowsLogo from "@/assets/logos/Windows_11_logo.png";
import deepseekLogo from "@/assets/logos/DeepSeek_logo.png";
import shadcnuiLogo from "@/assets/logos/shadcnui_logo.png";
import radixLogo from "@/assets/logos/radix_logo.png";
import RStudioLogo from "@/assets/logos/RStudio_Logo.png";
import FramerMotionLogo from "@/assets/logos/framer-motion.svg";

const techLogos: Record<string, { src: string; isLocal?: boolean }> = {
  "React Local": {
    src: reactLogo,
    isLocal: true,
  },
  HTML5: {
    src: html5Logo,
    isLocal: true,
  },
  CSS3: {
    src: css3Logo,
    isLocal: true,
  },
  JavaScript: {
    src: javascriptLogo,
    isLocal: true,
  },
  TypeScript: {
    src: typescriptLogo,
    isLocal: true,
  },
  React: {
    src: reactLogo,
    isLocal: true,
  },
  "Next.js": {
    src: nextjsLogo,
    isLocal: true,
  },
  PHP: {
    src: phpLogo,
    isLocal: true,
  },
  "Tailwind CSS": {
    src: tailwindLogo,
    isLocal: true,
  },
  MongoDB: {
    src: mongodbLogo,
    isLocal: true,
  },
  PostgreSQL: {
    src: postgresqlLogo,
    isLocal: true,
  },
  Python: {
    src: pythonLogo,
    isLocal: true,
  },
  Pandas: {
    src: pandasLogo,
    isLocal: true,
  },
  NumPy: {
    src: numpyLogo,
    isLocal: true,
  },
  TensorFlow: {
    src: tensorflowLogo,
    isLocal: true,
  },
  "Scikit-learn": {
    src: scikitlearnLogo,
    isLocal: true,
  },
  R: {
    src: rLogo,
    isLocal: true,
  },
  C: {
    src: cLogo,
    isLocal: true,
  },
  "C#": {
    src: csharpLogo,
    isLocal: true,
  },
  Rust: {
    src: rustLogo,
    isLocal: true,
  },
  Bash: {
    src: bashLogo,
    isLocal: true,
  },
  Git: {
    src: gitLogo,
    isLocal: true,
  },
  Figma: {
    src: figmaLogo,
    isLocal: true,
  },
  Docker: {
    src: dockerLogo,
    isLocal: true,
  },
  VSCodium: {
    src: vscodeLogo,
    isLocal: true,
  },
  JupyterLab: {
    src: jupyterLogo,
    isLocal: true,
  },
  Fedora: {
    src: fedoraLogo,
    isLocal: true,
  },
  "Windows 11": {
    src: windowsLogo,
    isLocal: true,
  },
  Deepseek: {
    src: deepseekLogo,
    isLocal: true,
  },
  "Shadcn/ui": {
    src: shadcnuiLogo,
    isLocal: true,
  },
  Radix: {
    src: radixLogo,
    isLocal: true,
  },
  RStudio: {
    src: RStudioLogo,
    isLocal: true,
  },
  FramerMotion: {
    src: FramerMotionLogo,
    isLocal: true,
  },
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
        })}
      />
    </div>
  );
}
