import { ParsedGig } from "@/lib/parser";
import { Search, MapPin, Wallet, Brush } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";

interface RequirementSummaryProps {
  parsedGig: ParsedGig | null;
  query: string;
}

const SummaryItem = ({
  value,
  label,
  icon,
  colorClass,
}: {
  value: string | null;
  label: string;
  icon: React.ReactNode;
  colorClass: string;
}) => {
  if (!value) return null;

  return (
    <div className={`flex items-center gap-3 p-3.5 rounded-2xl border ${colorClass}`}>
      <div className="h-10 w-10 rounded-xl bg-white/60 dark:bg-black/20 flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div>
        <span className="text-[10px] font-bold tracking-wider uppercase opacity-70 block">
          {label}
        </span>
        <span className="text-sm font-bold text-foreground">{value}</span>
      </div>
    </div>
  );
};

const RequirementSummary = ({ parsedGig, query }: RequirementSummaryProps) => {
  if (!parsedGig) return null;

  const hasStructuredData =
    parsedGig.city || parsedGig.budget || parsedGig.category;

  return (
    <Card className="mb-10 border shadow-md bg-card rounded-3xl animate-fade-slide-up">
      <CardHeader className="pb-2">
        <div className="flex items-start gap-3.5">
          <div className="h-8 w-8 rounded-full bg-surface-muted flex items-center justify-center text-muted-foreground shrink-0 mt-0.5">
            <Search className="h-3.5 w-3.5" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Your query:{" "}
              <span className="italic text-foreground font-semibold">
                &ldquo;{query}&rdquo;
              </span>
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Here&apos;s what we understood
              </span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 pt-0">
        {hasStructuredData ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <SummaryItem
              icon={<MapPin size={16} className="text-cyan-700 dark:text-cyan-300" />}
              label="Location"
              value={parsedGig.city}
              colorClass="bg-cyan-50/60 dark:bg-cyan-950/30 border-cyan-100 dark:border-cyan-900 text-cyan-900 dark:text-cyan-200"
            />
            <SummaryItem
              icon={<Wallet size={16} className="text-amber-700 dark:text-amber-300" />}
              label="Budget"
              value={parsedGig.budget ? `~₹${parsedGig.budget.toLocaleString()}` : null}
              colorClass="bg-amber-50/60 dark:bg-amber-950/30 border-amber-100 dark:border-amber-900 text-amber-900 dark:text-amber-200"
            />
            <SummaryItem
              icon={<Brush size={16} className="text-teal-700 dark:text-teal-300" />}
              label="Category"
              value={parsedGig.category}
              colorClass="bg-teal-50/60 dark:bg-teal-950/30 border-teal-100 dark:border-teal-900 text-teal-900 dark:text-teal-200"
            />
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            We couldn&apos;t pin down specifics — try mentioning a city, budget, or category for sharper results.
          </p>
        )}

        {parsedGig.style_tags.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-muted-foreground mb-2">
              Style Tags / Keywords
            </p>
            <div className="flex flex-wrap gap-2">
              {parsedGig.style_tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="rounded-full border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 px-3 py-1 text-xs font-semibold hover:bg-emerald-100/70 transition"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RequirementSummary;
