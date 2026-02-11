export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 border-t border-border/30 bg-slate-50 dark:bg-slate-950">
      <div className="px-2 py-1 sm:px-4 md:px-6">
        <div className="flex items-center justify-between gap-2 text-[9px] sm:text-[10px] md:text-xs text-muted-foreground/50">
          {/* Left: Copyright */}
          <div className="flex items-center gap-1 sm:gap-2">
            <span className="whitespace-nowrap">© {currentYear} Sorvi</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline whitespace-nowrap">v0.1.0</span>
          </div>

          {/* Right: Links */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            <a
              href="#"
              className="hover:text-muted-foreground transition-colors whitespace-nowrap"
            >
              Privacy
            </a>
            <span className="hidden sm:inline">•</span>
            <a
              href="#"
              className="hover:text-muted-foreground transition-colors whitespace-nowrap"
            >
              Terms
            </a>
            <span className="hidden sm:inline">•</span>
            <a
              href="#"
              className="hover:text-muted-foreground transition-colors whitespace-nowrap"
            >
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
