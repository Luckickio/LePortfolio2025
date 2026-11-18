import { useContent } from "@/i18n/LanguageProvider";

export function Footer() {
  const content = useContent();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex h-14 items-center">
        <p className="text-sm text-muted-foreground pl-4">
          © {currentYear} Lucas GUELL. {content.ui.footer.rights}
        </p>
      </div>
    </footer>
  );
}
