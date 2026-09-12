import { Talent } from "@/types";
import { BadgeCheck, Briefcase, MapPin, Wallet } from "lucide-react";
import { Badge } from "@/app/components/ui/badge";

interface CreatorProfileProps {
  talent: Talent;
  rank?: number;
  matchPercent?: number;
  detailed?: boolean;
}

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function CreatorProfile({
  talent,
  rank,
  matchPercent,
  detailed = false,
}: CreatorProfileProps) {
  const isTopThree = !!rank && rank <= 3;

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="relative shrink-0">
          <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-brand-accent to-brand-lime flex items-center justify-center text-slate-900 font-extrabold text-lg shadow-inner">
            {initials(talent.name)}
          </div>
          {isTopThree && (
            <span
              className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-card flex items-center justify-center text-white"
              title="Top-ranked match"
            >
              <BadgeCheck className="h-3 w-3" />
            </span>
          )}
        </div>

        <div className="space-y-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-lg font-bold text-foreground">{talent.name}</h3>
            {matchPercent !== undefined && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900">
                {matchPercent}% match
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            {talent.categories.join(" & ")} · Based in {talent.city}
          </p>
          <div className="flex flex-wrap gap-3 text-xs text-muted-foreground pt-1">
            <span className="flex items-center gap-1">
              <MapPin size={12} /> {talent.city}
            </span>
            <span className="flex items-center gap-1">
              <Briefcase size={12} /> {talent.experience_years} yrs exp
            </span>
            <span className="flex items-center gap-1">
              <Wallet size={12} /> {talent.budget_range}
            </span>
          </div>
        </div>
      </div>

      {detailed && (
        <div className="space-y-5">
          <div>
            <p className="text-xs font-semibold text-muted-foreground mb-2">Categories</p>
            <div className="flex flex-wrap gap-2">
              {talent.categories.map((c) => (
                <Badge key={c} variant="outline">
                  {c}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-muted-foreground mb-2">Skills</p>
            <div className="flex flex-wrap gap-2">
              {talent.skills.map((s) => (
                <Badge key={s} variant="outline">
                  {s}
                </Badge>
              ))}
            </div>
          </div>

          {talent.style_tags.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-2">Style</p>
              <div className="flex flex-wrap gap-2">
                {talent.style_tags.map((s) => (
                  <Badge
                    key={s}
                    className="rounded-full border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300"
                    variant="outline"
                  >
                    {s}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {talent.portfolio.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-2">Portfolio</p>
              <ul className="space-y-2">
                {talent.portfolio.map((p) => (
                  <li key={p.title} className="rounded-lg bg-surface-muted border border-border px-3 py-2">
                    <p className="text-sm font-medium text-foreground">{p.title}</p>
                    {[...p.tags, ...p.keywords].length > 0 && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {[...p.tags, ...p.keywords].join(" · ")}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
