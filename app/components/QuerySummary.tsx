import { ParsedGig } from "@/lib/parser";
import { Search, MapPin, Wallet, Brush } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";

interface QuerySummaryProps {
  parsedGig: ParsedGig | null;
  query: string;
}

const SummaryItem = ({
  value,
  label,
  icon,
}: {
  value: string | null;
  label: string;
  icon: React.ReactNode;
}) => {
  if (!value) return null;

  return (
    <div className="flex items-start gap-3 rounded-lg bg-[#EFFBFF] px-4 py-3 border border-slate-200 shadow-sm">
      <div className="text-[#2C2C2C]">{icon}</div>
      <div className="flex flex-col">
        <span className="text-xs uppercase tracking-wide text-[#888] font-medium">
          {label}
        </span>
        <span className="text-sm font-semibold text-[#000] capitalize">
          {value}
        </span>
      </div>
    </div>
  );
};

const QuerySummary = ({ parsedGig, query }: QuerySummaryProps) => {
  if (!parsedGig) return null;

  return (
    <Card className="mb-10 border border-slate-200 shadow-md bg-white rounded-xl">
      <CardHeader className="pb-2">
        <div className="flex items-start gap-3">
          <Search className="h-5 w-5 text-[#2C2C2C]/70 mt-0.5" />
          <div>
            <p className="text-base font-medium text-[#000]">
             {` Your query: `}<span className="italic">{`" ${query} "`}</span>
            </p>
            <p className="text-sm text-[#888] mt-1">
             {` Here's what we understood:`}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 pt-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <SummaryItem icon={<MapPin size={16} />} label="Location" value={parsedGig.city} />
          <SummaryItem
            icon={<Wallet size={16} />}
            label="Budget"
            value={parsedGig.budget ? `~₹${parsedGig.budget.toLocaleString()}` : null}
          />
          <SummaryItem icon={<Brush size={16} />} label="Category" value={parsedGig.category} />
        </div>

        {parsedGig.style_tags.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-[#888] mb-2">
              Style Tags / Keywords
            </p>
            <div className="flex flex-wrap gap-2">
              {parsedGig.style_tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="rounded-full border border-[#7BF2C9] bg-[#7BF2C9]/20 text-[#2C2C2C] px-3 py-1 text-xs font-medium hover:bg-[#7BF2C9]/30 transition"
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

export default QuerySummary;
