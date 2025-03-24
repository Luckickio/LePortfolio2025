import { useState } from "react";
import { MoonIcon, SunIcon, Menu, LaptopIcon } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NamePronunciation } from "@/components/NamePronunciation";
import content from "@/data/content.json";

export function Header() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const ThemeIcon = () => {
    if (theme === "system") return <LaptopIcon className="h-5 w-5" />;
    if (theme === "dark") return <MoonIcon className="h-5 w-5" />;
    return <SunIcon className="h-5 w-5" />;
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50"
      role="banner"
    >
      <div className="max-w-screen-2xl mx-auto px-4">
        <nav
          className="flex h-16 items-center justify-between"
          role="navigation"
          aria-label="Navigation principale"
        >
          <div className="flex items-center gap-2">
            <span className="text-xl font-semibold">{content.header.name}</span>
            <NamePronunciation />
          </div>

          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6" role="menubar">
              {content.header.navigation.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="text-sm font-medium transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm px-2 py-1"
                  role="menuitem"
                >
                  {item.label}
                </a>
              ))}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9"
                  aria-label={`Changer le thème (actuellement en mode ${theme})`}
                >
                  <ThemeIcon />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => setTheme("light")}
                  className={theme === "light" ? "bg-accent" : ""}
                  role="menuitemradio"
                  aria-checked={theme === "light"}
                >
                  <SunIcon className="mr-2 h-4 w-4" />
                  <span>Clair</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setTheme("dark")}
                  className={theme === "dark" ? "bg-accent" : ""}
                  role="menuitemradio"
                  aria-checked={theme === "dark"}
                >
                  <MoonIcon className="mr-2 h-4 w-4" />
                  <span>Sombre</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setTheme("system")}
                  className={theme === "system" ? "bg-accent" : ""}
                  role="menuitemradio"
                  aria-checked={theme === "system"}
                >
                  <LaptopIcon className="mr-2 h-4 w-4" />
                  <span>Système</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9"
                  aria-label={`Changer le thème (actuellement en mode ${theme})`}
                >
                  <ThemeIcon />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => setTheme("light")}
                  className={theme === "light" ? "bg-accent" : ""}
                  role="menuitemradio"
                  aria-checked={theme === "light"}
                >
                  <SunIcon className="mr-2 h-4 w-4" />
                  <span>Clair</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setTheme("dark")}
                  className={theme === "dark" ? "bg-accent" : ""}
                  role="menuitemradio"
                  aria-checked={theme === "dark"}
                >
                  <MoonIcon className="mr-2 h-4 w-4" />
                  <span>Sombre</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setTheme("system")}
                  className={theme === "system" ? "bg-accent" : ""}
                  role="menuitemradio"
                  aria-checked={theme === "system"}
                >
                  <LaptopIcon className="mr-2 h-4 w-4" />
                  <span>Système</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9"
                  aria-label="Ouvrir le menu de navigation"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetTitle>Menu de navigation</SheetTitle>
                <nav
                  className="flex flex-col gap-4 mt-8"
                  role="navigation"
                  aria-label="Menu mobile"
                >
                  {content.header.navigation.map((item, index) => (
                    <a
                      key={index}
                      href={item.href}
                      className="text-lg font-medium transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm px-2 py-1"
                      onClick={() => setIsOpen(false)}
                      role="menuitem"
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  );
}
