import { memo } from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { RankedTalent } from "@/types";
import { Card, CardContent } from "@/app/components/ui/card";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/app/components/ui/dialog";
import { Button } from "@/app/components/ui/button";
import CreatorProfile from "@/app/components/matchmaking/CreatorProfile";
import MatchScore, { getMatchPercent } from "@/app/components/matchmaking/MatchScore";
import MatchBreakdown from "@/app/components/matchmaking/MatchBreakdown";
import { useBookmarks } from "@/app/hooks/useBookmarks";

interface MatchCardProps {
  rankedTalent: RankedTalent;
  rank: number;
}

const MatchCard = ({ rankedTalent, rank }: MatchCardProps) => {
  const { talent, score, rationale } = rankedTalent;
  const matchPercent = getMatchPercent(score);
  const { isBookmarked, toggle } = useBookmarks();
  const bookmarked = isBookmarked(talent.id);

  return (
    <Card className="bg-card border shadow-sm transition-all rounded-3xl hover:shadow-lg animate-fade-slide-up">
      <CardContent className="p-6 space-y-5">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <CreatorProfile talent={talent} rank={rank} matchPercent={matchPercent} />

          <div className="flex items-center gap-2 self-start md:self-center shrink-0">
            <button
              onClick={() => toggle(talent.id)}
              aria-label={bookmarked ? "Remove bookmark" : "Bookmark this creator"}
              aria-pressed={bookmarked}
              className="p-2.5 rounded-xl border border-border text-muted-foreground hover:text-foreground hover:bg-surface-muted transition-colors"
              title={bookmarked ? "Bookmarked" : "Bookmark"}
            >
              {bookmarked ? (
                <BookmarkCheck className="h-4 w-4 text-brand-accent-active fill-brand-accent" />
              ) : (
                <Bookmark className="h-4 w-4" />
              )}
            </button>

            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" className="rounded-xl font-semibold">
                  View full profile
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{talent.name}</DialogTitle>
                  <DialogDescription>Full profile &amp; match rationale</DialogDescription>
                </DialogHeader>
                <CreatorProfile talent={talent} rank={rank} matchPercent={matchPercent} detailed />
                <MatchScore score={score} className="w-full" />
                <MatchBreakdown rationale={rationale} />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <MatchBreakdown rationale={rationale} title="Why this is your top match" />
      </CardContent>
    </Card>
  );
};

export default memo(MatchCard);
