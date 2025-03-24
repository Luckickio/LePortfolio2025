import { useState, useRef, useEffect } from "react";
import { Terminal as TerminalIcon, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import content from "@/data/content.json";

interface Command {
  command: string;
  response: string[];
}

type Game = "guess" | "calc" | null;

export function Terminal() {
  const [history, setHistory] = useState<Command[]>([]);
  const [input, setInput] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [currentGame, setCurrentGame] = useState<Game>(null);
  const [gameState, setGameState] = useState({
    guessNumber: 0,
    guessCount: 0,
    calcOperands: { a: 0, b: 0, operator: "" },
    score: 0,
  });

  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  };

  const exitGame = () => {
    setCurrentGame(null);
    setGameState((prev) => ({ ...prev, score: 0 }));
    setHistory((prev) => [
      ...prev,
      {
        command: "exit",
        response: ["Jeu terminé."],
      },
    ]);
  };

  const startGuessGame = () => {
    const number = Math.floor(Math.random() * 100) + 1;
    setGameState((prev) => ({ ...prev, guessNumber: number, guessCount: 0 }));
    setCurrentGame("guess");
    setHistory((prev) => [
      ...prev,
      {
        command: "guess",
        response: [
          "Jeu de devinette démarré !",
          "Devinez un nombre entre 1 et 100.",
          'Tapez "exit" pour quitter.',
        ],
      },
    ]);
  };

  const startCalcGame = () => {
    const operators = ["+", "-", "*"];
    const a = Math.floor(Math.random() * 20);
    const b = Math.floor(Math.random() * 20);
    const operator = operators[Math.floor(Math.random() * operators.length)];

    setGameState((prev) => ({
      ...prev,
      calcOperands: { a, b, operator },
      score: 0,
    }));
    setCurrentGame("calc");
    setHistory((prev) => [
      ...prev,
      {
        command: "calc",
        response: [
          "Jeu de calcul mental démarré !",
          `Combien fait ${a} ${operator} ${b} ?`,
          'Tapez "exit" pour quitter.',
        ],
      },
    ]);
  };

  const handleGuess = (guess: number) => {
    const { guessNumber, guessCount } = gameState;
    const newCount = guessCount + 1;

    setGameState((prev) => ({ ...prev, guessCount: newCount }));

    if (guess === guessNumber) {
      setHistory((prev) => [
        ...prev,
        {
          command: guess.toString(),
          response: [
            `Bravo ! Vous avez trouvé le nombre ${guessNumber} en ${newCount} essais !`,
            'Tapez "guess" pour rejouer.',
          ],
        },
      ]);
      setCurrentGame(null);
    } else {
      const hint = guess > guessNumber ? "plus petit" : "plus grand";
      setHistory((prev) => [
        ...prev,
        {
          command: guess.toString(),
          response: [`Le nombre est ${hint} que ${guess}`],
        },
      ]);
    }
  };

  const handleCalc = (answer: number) => {
    const { a, b, operator } = gameState.calcOperands;
    let correctAnswer: number;

    switch (operator) {
      case "+":
        correctAnswer = a + b;
        break;
      case "-":
        correctAnswer = a - b;
        break;
      case "*":
        correctAnswer = a * b;
        break;
      default:
        correctAnswer = 0;
    }

    if (answer === correctAnswer) {
      const newScore = gameState.score + 1;
      setGameState((prev) => ({ ...prev, score: newScore }));
      const operators = ["+", "-", "*"];
      const newA = Math.floor(Math.random() * 20);
      const newB = Math.floor(Math.random() * 20);
      const newOperator =
        operators[Math.floor(Math.random() * operators.length)];

      setGameState((prev) => ({
        ...prev,
        calcOperands: { a: newA, b: newB, operator: newOperator },
        score: newScore,
      }));

      setHistory((prev) => [
        ...prev,
        {
          command: answer.toString(),
          response: [
            "Correct ! Score : " + newScore,
            `Nouveau calcul : ${newA} ${newOperator} ${newB} ?`,
          ],
        },
      ]);
    } else {
      setHistory((prev) => [
        ...prev,
        {
          command: answer.toString(),
          response: [
            `Incorrect ! La réponse était ${correctAnswer}`,
            `Score final : ${gameState.score}`,
            'Tapez "calc" pour rejouer.',
          ],
        },
      ]);
      setCurrentGame(null);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isFocused) return;

      if (e.ctrlKey && e.key === "l") {
        e.preventDefault();
        setHistory([]);
        setInput("");
        return;
      }

      if (currentGame && e.key === "q") {
        e.preventDefault();
        exitGame();
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        if (
          commandHistory.length > 0 &&
          historyIndex < commandHistory.length - 1
        ) {
          const newIndex = historyIndex + 1;
          setHistoryIndex(newIndex);
          setInput(commandHistory[commandHistory.length - 1 - newIndex]);
        }
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (historyIndex > 0) {
          const newIndex = historyIndex - 1;
          setHistoryIndex(newIndex);
          setInput(commandHistory[commandHistory.length - 1 - newIndex]);
        } else if (historyIndex === 0) {
          setHistoryIndex(-1);
          setInput("");
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isFocused, currentGame, commandHistory, historyIndex]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const command = input.trim().toLowerCase();
    let response: string[] = [];

    if (command) {
      setCommandHistory((prev) => [...prev, command]);
      setHistoryIndex(-1);
    }

    if (command === "clear") {
      setCurrentGame(null);
      setHistory([]);
      setInput("");
      return;
    }

    if (command === "exit" || command === "q") {
      if (currentGame) {
        exitGame();
        setInput("");
        return;
      } else {
        response = ["Aucun jeu en cours."];
      }
    } else if (currentGame === "guess") {
      const guess = parseInt(command);
      if (isNaN(guess)) {
        response = ["Veuillez entrer un nombre valide."];
      } else {
        handleGuess(guess);
        setInput("");
        return;
      }
    } else if (currentGame === "calc") {
      const answer = parseInt(command);
      if (isNaN(answer)) {
        response = ["Veuillez entrer un nombre valide."];
      } else {
        handleCalc(answer);
        setInput("");
        return;
      }
    } else {
      switch (command) {
        case "":
          response = [""];
          break;
        case "games":
          response = content.terminal.commands.games;
          break;
        case "guess":
          startGuessGame();
          setInput("");
          return;
        case "calc":
          startCalcGame();
          setInput("");
          return;
        default:
          if (
            content.terminal.commands[
              command as keyof typeof content.terminal.commands
            ]
          ) {
            response =
              content.terminal.commands[
                command as keyof typeof content.terminal.commands
              ];
          } else {
            response = [
              `Commande non reconnue. Tapez 'help' pour voir les commandes disponibles.`,
            ];
          }
      }
    }

    setHistory((prev) => [...prev, { command: input, response }]);
    setInput("");
  };

  return (
    <div
      className="group relative z-0"
      role="region"
      aria-label="Terminal interactif"
    >
      <div className="absolute -inset-1 bg-gradient-to-r from-rose-400/30 via-sky-400/30 to-violet-400/30 rounded-2xl blur-2xl opacity-50 group-hover:opacity-75 transition duration-500" />

      <div
        className="relative overflow-hidden rounded-xl border bg-background/80 shadow-2xl backdrop-blur-xl backdrop-saturate-150 transition duration-300 group-hover:translate-y-[-2px] group-hover:shadow-3xl"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        tabIndex={0}
      >
        <div
          className="flex items-center gap-2 border-b bg-muted/50 px-4 py-2.5 rounded-t-xl"
          role="toolbar"
          aria-label="Barre d'outils du terminal"
        >
          <div className="flex gap-1.5">
            <button
              className="h-3 w-3 rounded-full bg-red-500 transition-transform hover:scale-110"
              aria-label="Bouton rouge (décoratif)"
              tabIndex={-1}
            />
            <button
              className="h-3 w-3 rounded-full bg-yellow-500 transition-transform hover:scale-110"
              aria-label="Bouton jaune (décoratif)"
              tabIndex={-1}
            />
            <button
              className="h-3 w-3 rounded-full bg-green-500 transition-transform hover:scale-110"
              aria-label="Bouton vert (décoratif)"
              tabIndex={-1}
            />
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <TerminalIcon className="h-4 w-4" aria-hidden="true" />
            terminal
          </div>
        </div>

        <div
          ref={terminalRef}
          className="h-[200px] sm:h-[250px] md:h-[400px] overflow-auto p-4 font-mono text-sm bg-gradient-to-b from-background/90 to-background/70 rounded-b-xl"
          style={{
            boxShadow: "inset 0 0 30px rgba(0, 0, 0, 0.1)",
          }}
          onClick={() => inputRef.current?.focus()}
          role="log"
          aria-live="polite"
        >
          <div className="text-muted-foreground">
            {content.terminal.welcome}
          </div>
          {history.map((entry, i) => (
            <div key={i} className="space-y-1">
              <div className="flex items-center gap-2">
                <ChevronRight
                  className="h-4 w-4 text-green-500"
                  aria-hidden="true"
                />
                <span className={cn(entry.command ? "" : "opacity-0")}>
                  {entry.command || "."}
                </span>
              </div>
              {entry.response.map((line, j) => (
                <div key={j} className="ml-6 whitespace-pre-wrap break-words">
                  {line}
                </div>
              ))}
            </div>
          ))}
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2"
            role="search"
            aria-label="Ligne de commande"
          >
            <ChevronRight
              className="h-4 w-4 text-green-500 shrink-0"
              aria-hidden="true"
            />
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent outline-none min-w-0"
              autoFocus
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              aria-label="Entrez une commande"
              role="combobox"
              aria-autocomplete="list"
              aria-expanded="false"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
