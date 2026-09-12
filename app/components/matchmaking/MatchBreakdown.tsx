import { CheckCircle2 } from "lucide-react";

interface MatchBreakdownProps {
  rationale: string[];
  title?: string;
}

export default function MatchBreakdown({
  rationale,
  title = "Why this is a great match",
}: MatchBreakdownProps) {
  if (rationale.length === 0) return null;

  return (
    <div className="p-4 rounded-2xl bg-surface-muted border border-border">
      <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block mb-2">
        {title}
      </span>
      <ul className="space-y-1.5 sm:grid sm:grid-cols-2 sm:gap-x-4 sm:space-y-0">
        {rationale.map((reason, i) => (
          <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-foreground/80 py-0.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 mt-0.5 shrink-0" />
            <span>{reason}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
