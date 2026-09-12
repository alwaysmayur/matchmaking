import { Wand2 } from "lucide-react";
import SearchExperience from "@/app/components/matchmaking/SearchExperience";
import ThemeToggle from "@/app/components/ThemeToggle";
import { talents } from "@/lib/data-loader";

export default function Page() {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 border-b border-border bg-card/70 backdrop-blur-md">
        <div className="max-w-4xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-brand-lime via-brand-accent-strong to-brand-accent flex items-center justify-center shadow-sm">
              <Wand2 className="h-4 w-4 text-slate-900" />
            </div>
            <span className="font-bold text-xl tracking-tight text-foreground">
              Match<span className="text-brand-accent-active">Making</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/alwaysmayur/matchmaking"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-9 w-9 rounded-full border border-border bg-white/70 dark:bg-slate-900/70 text-foreground hover:bg-white transition"
              aria-label="View source on GitHub"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.93.57.1.78-.25.78-.55 0-.27-.01-1.16-.02-2.11-3.2.7-3.88-1.35-3.88-1.35-.52-1.33-1.28-1.68-1.28-1.68-1.04-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.41-5.25 5.7.41.36.78 1.07.78 2.15 0 1.55-.01 2.8-.01 3.18 0 .3.2.66.79.55A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
              </svg>
            </a>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        <SearchExperience talentCount={talents.length} />
      </main>

      <footer className="border-t border-border mt-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-xs text-muted-foreground space-y-2">
          <p className="font-medium text-foreground/80">
            Rule-based NLP parsing + weighted scoring — no external API calls, fully explainable
            matches.
          </p>
          <p>
            Built with Next.js, TypeScript &amp; Tailwind CSS by{" "}
            <a
              href="https://github.com/alwaysmayur"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground"
            >
              Mayur Parmar
            </a>
          </p>
          <p className="text-[11px] text-muted-foreground/70">
            © {new Date().getFullYear()} MatchMaking
          </p>
        </div>
      </footer>
    </div>
  );
}
