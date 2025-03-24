import { Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import pronunciationSound from "@/assets/NamePronunciation/guell_pronunciation.mp3";

export function NamePronunciation() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audioElement = new Audio(pronunciationSound);
    setAudio(audioElement);

    return () => {
      if (audioElement) {
        audioElement.pause();
        audioElement.src = "";
      }
    };
  }, []);

  const playPronunciation = () => {
    if (!audio || isPlaying) return;

    setIsPlaying(true);
    audio.play();
    audio.onended = () => setIsPlaying(false);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className={`h-6 w-6 p-0.5 hover:bg-primary/10 ${
        isPlaying ? "text-primary" : "text-muted-foreground"
      }`}
      onClick={playPronunciation}
      disabled={!audio || isPlaying}
    >
      <Volume2 className="h-4 w-4" />
      <span className="sr-only">Écouter la prononciation</span>
    </Button>
  );
}
