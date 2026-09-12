"use client";

import { useEffect, useState } from "react";
import { Search as SearchIcon, MapPin, Wallet, Brush } from "lucide-react";
import { Textarea } from "@/app/components/ui/textarea";
import { Button } from "@/app/components/ui/button";
import { parseQueryToGig } from "@/lib/parser";

interface SearchComposerProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  examples: string[];
  onExampleClick: (example: string) => void;
}

const PREVIEW_DEBOUNCE_MS = 250;

export default function SearchComposer({
  value,
  onChange,
  onSubmit,
  isLoading,
  examples,
  onExampleClick,
}: SearchComposerProps) {
  const [preview, setPreview] = useState(() => parseQueryToGig(value));

  useEffect(() => {
    const timeout = setTimeout(() => setPreview(parseQueryToGig(value)), PREVIEW_DEBOUNCE_MS);
    return () => clearTimeout(timeout);
  }, [value]);

  const hasPreview = preview.city || preview.budget || preview.category;

  return (
    <section className="space-y-4">
      <div className="bg-card rounded-3xl p-3 sm:p-4 shadow-xl shadow-slate-900/5 border border-border transition-colors hover:border-brand-accent/40">
        <div className="relative">
          <Textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Describe what you're looking for..."
            className="w-full border-0 shadow-none focus-visible:ring-0 text-base sm:text-lg resize-none p-3 min-h-[84px]"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                onSubmit();
              }
            }}
          />

          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-border px-2 mt-1">
            <div className="flex items-center flex-wrap gap-2 text-xs text-muted-foreground min-h-[1.75rem]">
              {hasPreview ? (
                <>
                  {preview.city && (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-surface-muted border border-border font-medium text-foreground/80">
                      <MapPin size={12} className="text-muted-foreground mr-1.5" />
                      {preview.city}
                    </span>
                  )}
                  {preview.budget && (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-surface-muted border border-border font-medium text-foreground/80">
                      <Wallet size={12} className="text-muted-foreground mr-1.5" />
                      ~₹{preview.budget.toLocaleString()}
                    </span>
                  )}
                  {preview.category && (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-surface-muted border border-border font-medium text-foreground/80">
                      <Brush size={12} className="text-muted-foreground mr-1.5" />
                      {preview.category}
                    </span>
                  )}
                </>
              ) : (
                <span className="italic opacity-70">We&apos;ll pick out the location, budget & category as you type…</span>
              )}
            </div>

            <Button
              onClick={onSubmit}
              disabled={isLoading || !value.trim()}
              className="h-auto bg-brand-accent text-slate-900 hover:bg-brand-accent-strong active:bg-brand-accent-active font-bold rounded-2xl px-6 py-3 shadow-md shadow-brand-accent/20 disabled:opacity-50 gap-2"
            >
              <SearchIcon className="h-4 w-4" />
              {isLoading ? "Matching…" : "Find Talent"}
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
        <span className="font-semibold text-muted-foreground/80 pl-1">Try:</span>
        {examples.map((example) => (
          <button
            key={example}
            onClick={() => onExampleClick(example)}
            className="px-3.5 py-1.5 rounded-full bg-card/80 border border-border text-muted-foreground hover:border-brand-accent hover:text-foreground transition truncate max-w-[280px] text-left"
          >
            {example.length > 44 ? `${example.slice(0, 44)}…` : example}
          </button>
        ))}
      </div>
    </section>
  );
}
