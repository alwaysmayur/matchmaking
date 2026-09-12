"use client";

import { useEffect, useState } from "react";
import { Brain, ListChecks, SlidersHorizontal } from "lucide-react";
import { Card, CardContent } from "@/app/components/ui/card";

const steps = [
  { label: "Parsing your brief…", icon: Brain },
  { label: "Scoring talent against location, budget & style…", icon: SlidersHorizontal },
  { label: "Ranking the shortlist…", icon: ListChecks },
];

const STEP_INTERVAL_MS = 900;

export default function AIProcessing() {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    setStepIndex(0);
    const interval = setInterval(() => {
      setStepIndex((i) => Math.min(i + 1, steps.length - 1));
    }, STEP_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  const ActiveIcon = steps[stepIndex].icon;

  return (
    <div className="space-y-4" aria-live="polite" aria-busy="true">
      <Card className="border bg-card rounded-xl">
        <CardContent className="flex items-center gap-3 py-5">
          <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-accent to-brand-mint text-black">
            <ActiveIcon className="h-4 w-4" />
          </span>
          <p className="text-sm font-medium text-foreground">{steps[stepIndex].label}</p>
        </CardContent>
      </Card>

      {Array.from({ length: 3 }).map((_, i) => (
        <Card key={i} className="border bg-card rounded-2xl overflow-hidden">
          <CardContent className="p-6 sm:p-8 space-y-6">
            <div className="flex items-start gap-4">
              <div className="relative h-14 w-14 rounded-full bg-surface-muted overflow-hidden shrink-0 animate-shimmer" />
              <div className="space-y-2 flex-1">
                <div className="relative h-4 w-40 rounded bg-surface-muted overflow-hidden animate-shimmer" />
                <div className="relative h-3 w-64 rounded bg-surface-muted overflow-hidden animate-shimmer" />
              </div>
            </div>
            <div className="relative h-16 w-full rounded bg-surface-muted overflow-hidden animate-shimmer" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
