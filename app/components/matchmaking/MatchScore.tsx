const MAX_DISPLAY_SCORE = 100;

export function getMatchPercent(score: number) {
  return Math.min(100, Math.round((score / MAX_DISPLAY_SCORE) * 100));
}

interface MatchScoreProps {
  score: number;
  className?: string;
}

export default function MatchScore({ score, className = "" }: MatchScoreProps) {
  const matchPercent = getMatchPercent(score);

  return (
    <div className={`w-full sm:w-32 shrink-0 ${className}`}>
      <div className="flex items-center justify-between text-xs font-medium text-muted-foreground mb-1">
        <span>Match</span>
        <span className="text-foreground font-semibold">{score} pts</span>
      </div>
      <div className="h-2 w-full rounded-full bg-surface-muted overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-brand-accent to-brand-mint transition-[width] duration-500"
          style={{ width: `${matchPercent}%` }}
        />
      </div>
    </div>
  );
}
