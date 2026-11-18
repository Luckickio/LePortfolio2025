import { Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import { useContent } from "@/i18n/LanguageProvider";
import pronunciationSound from "@/assets/NamePronunciation/GUELL_pronunciation.mp3";

export function NamePronunciation() {
  const content = useContent();
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audioElement = new Audio(pronunciationSound);
    const handleEnded = () => setIsPlaying(false);
    audioElement.addEventListener("ended", handleEnded);
    audioRef.current = audioElement;

    return () => {
      audioElement.removeEventListener("ended", handleEnded);
      audioElement.pause();
      audioElement.src = "";
      audioRef.current = null;
    };
  }, []);

  const playPronunciation = () => {
    const audio = audioRef.current;
    if (!audio || isPlaying) return;

    setIsPlaying(true);
    audio.play().catch(() => setIsPlaying(false));
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className={`h-6 w-6 p-0.5 hover:bg-primary/10 ${
        isPlaying ? "text-primary" : "text-muted-foreground"
      }`}
      onClick={playPronunciation}
      disabled={isPlaying}
    >
      <Volume2 className="h-4 w-4" />
      <span className="sr-only">{content.ui.pronunciation}</span>
    </Button>
  );
}
