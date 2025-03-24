export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex h-14 items-center">
        <p className="text-sm text-muted-foreground pl-4">
          © {currentYear} Lucas GUELL. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
