import { useState } from "react";
import { MoonIcon, SunIcon, Menu, LaptopIcon, Languages } from "lucide-react";
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
import { HoverTooltip } from "@/components/HoverTooltip";
import {
  useLanguage,
  languages,
  format,
  type Language,
} from "@/i18n/LanguageProvider";

const themes = [
  { value: "light", Icon: SunIcon },
  { value: "dark", Icon: MoonIcon },
  { value: "system", Icon: LaptopIcon },
] as const;

function ThemeIcon({ theme }: { theme: string }) {
  if (theme === "system") return <LaptopIcon className="h-5 w-5" />;
  if (theme === "dark") return <MoonIcon className="h-5 w-5" />;
  return <SunIcon className="h-5 w-5" />;
}

function ThemeMenu() {
  const { theme, setTheme } = useTheme();
  const { content } = useLanguage();
  const labels = content.ui.header.themes;
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <HoverTooltip
        label={format(content.ui.header.themeTooltip, { theme: labels[theme] })}
        align="end"
        hidden={open}
      >
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9"
            aria-label={format(content.ui.header.changeTheme, {
              theme: labels[theme],
            })}
          >
            <ThemeIcon theme={theme} />
          </Button>
        </DropdownMenuTrigger>
      </HoverTooltip>
      <DropdownMenuContent align="end">
        {themes.map(({ value, Icon }) => (
          <DropdownMenuItem
            key={value}
            onClick={() => setTheme(value)}
            className={theme === value ? "bg-accent" : ""}
            role="menuitemradio"
            aria-checked={theme === value}
          >
            <Icon className="mr-2 h-4 w-4" />
            <span>{labels[value]}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function LanguageMenu() {
  const { language, setLanguage, content } = useLanguage();
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <HoverTooltip
        label={format(content.ui.header.languageTooltip, {
          language: languages[language].label,
        })}
        align="end"
        hidden={open}
      >
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9"
            aria-label={format(content.ui.header.changeLanguage, {
              language: languages[language].label,
            })}
          >
            <Languages className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
      </HoverTooltip>
      <DropdownMenuContent align="end">
        {(Object.keys(languages) as Language[]).map((code) => (
          <DropdownMenuItem
            key={code}
            onClick={() => setLanguage(code)}
            className={language === code ? "bg-accent" : ""}
            role="menuitemradio"
            aria-checked={language === code}
            lang={code}
          >
            <span className="mr-2 w-6 text-xs font-semibold uppercase text-muted-foreground">
              {code}
            </span>
            <span>{languages[code].label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function Header() {
  const { content } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header
      className="fixed top-0 left-0 right-0 border-b bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/60 z-50"
      role="banner"
    >
      <div className="max-w-(--breakpoint-2xl) mx-auto px-4">
        <nav
          className="flex h-16 items-center justify-between"
          role="navigation"
          aria-label={content.ui.header.mainNavigation}
        >
          <div className="flex items-center gap-2">
            <a
              href="/"
              className="text-xl font-semibold rounded-sm focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary"
            >
              {content.header.name}
            </a>
            <NamePronunciation />
          </div>

          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6" role="menubar">
              {content.header.navigation.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="text-sm font-medium transition-colors hover:text-primary focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary rounded-sm px-2 py-1"
                  role="menuitem"
                >
                  {item.label}
                </a>
              ))}
            </div>
            <div className="flex items-center gap-1">
              <LanguageMenu />
              <ThemeMenu />
            </div>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <LanguageMenu />
            <ThemeMenu />

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9"
                  aria-label={content.ui.header.openMenu}
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetTitle>{content.ui.header.menuTitle}</SheetTitle>
                <nav
                  className="flex flex-col gap-4 mt-8"
                  role="navigation"
                  aria-label={content.ui.header.mobileNavigation}
                >
                  {content.header.navigation.map((item, index) => (
                    <a
                      key={index}
                      href={item.href}
                      className="text-lg font-medium transition-colors hover:text-primary focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary rounded-sm px-2 py-1"
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
