import { RankedTalent } from "@/types";
import {
  Award,
  Briefcase,
  CheckCircle,
  MapPin,
  Sparkles,
  Star,
  Wallet,
} from "lucide-react";
import { Card, CardContent } from "@/app/components/ui/card";

interface TalentCardProps {
  rankedTalent: RankedTalent;
  rank: number;
}

const TalentCard = ({ rankedTalent, rank }: TalentCardProps) => {
  const { talent, score, rationale } = rankedTalent;
  const isTopThree = rank <= 3;

  const getRankIcon = () => {
    if (rank === 1) return <Award className="h-5 w-5 text-[#FAC22D]" />;
    if (rank === 2) return <Award className="h-5 w-5 text-gray-400" />;
    if (rank === 3) return <Award className="h-5 w-5 text-[#FFD700]" />;
    return null;
  };

  return (
    <Card
      className={`bg-white border border-slate-200 shadow-sm transition-all rounded-2xl ${
        isTopThree ? "ring-2 ring-[#FAC22D]/30" : ""
      }`}
    >
      <CardContent className="p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-6">
          <div className="flex items-start gap-4">
            <div
              className={`h-14 w-14 rounded-full flex items-center justify-center text-xl font-bold shadow-md shrink-0 ${
                isTopThree
                  ? "bg-gradient-to-br from-[#FAC22D] to-[#7BF2C9] text-black"
                  : "bg-slate-100 text-slate-500"
              }`}
            >
              #{rank}
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-black flex items-center gap-2">
                {getRankIcon()}
                {talent.name}
              </h3>
              <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin size={14} /> {talent.city}
                </span>
                <span className="flex items-center gap-1">
                  <Briefcase size={14} /> {talent.experience_years} yrs exp
                </span>
                <span className="flex items-center gap-1">
                  <Wallet size={14} /> {talent.budget_range}
                </span>
              </div>
            </div>
          </div>

          <div className="min-w-[90px] text-right">
            <div className="flex items-center justify-end gap-2 bg-[#EFFBFF] text-black font-semibold px-3 py-1 rounded-full shadow-sm">
              <Star className="h-4 w-4 text-[#FAC22D]" />
              <span>{score}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Match Score</p>
          </div>
        </div>

        {rationale.length > 0 && (
          <div className="border-t pt-5 space-y-3">
            <h4 className="text-sm font-semibold text-black flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[#FAC22D]" />
              {` Why they're a great match:`}
            </h4>
            <ul className="space-y-2">
              {rationale.map((reason, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-[#2C2C2C]"
                >
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
    
  );
};

export default TalentCard;
