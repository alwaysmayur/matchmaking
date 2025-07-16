
import { Gig } from "@/types";
import { clients } from "@/lib/data-loader";
import { Briefcase, Calendar, Info, MapPin, Wallet } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Avatar, AvatarFallback } from "@/app/components/ui/avatar";
import { Badge } from "@/app/components/ui/badge";

interface GigDetailsProps {
  gig: Gig;
}

const DetailItem = ({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) => (
  <div className="flex flex-col gap-1">
    <dt className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
      <span className="bg-muted rounded-full p-1">{icon}</span>
      {label}
    </dt>
    <dd className="text-base font-medium text-foreground">{children}</dd>
  </div>
);

const GigDetails = ({ gig }: GigDetailsProps) => {
  const client = clients.find((c) => c.id === gig.client_id);

  const formatBudget = (budget: number | string) => {
    if (typeof budget === "number") {
      return `₹${budget.toLocaleString("en-IN")}`;
    }
    if (typeof budget === "string" && budget.toLowerCase() === "to be discussed") {
      return "To be Discussed";
    }
    return budget;
  };

  return (
    <Card className="sticky top-8 max-w-xl mx-auto backdrop-blur-lg bg-white/90 shadow-xl ring-1 ring-slate-200 p-6">
      {client && (
        <CardHeader className="flex flex-row items-center gap-4 p-0 mb-4">
          <Avatar>
            <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-sky-400 text-white font-bold">
              {client.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-base font-bold text-indigo-700">{client.name}</p>
            <p className="text-xs text-muted-foreground">{client.industry}</p>
          </div>
        </CardHeader>
      )}

      <CardTitle className="text-3xl font-extrabold tracking-tight mb-4">{gig.title}</CardTitle>

      <blockquote className="mt-4 p-5 bg-slate-50 rounded-xl border-l-4 border-sky-300 shadow-sm">
        <p className="text-lg italic text-muted-foreground leading-relaxed">{`" ${gig.brief_text} "`}</p>
      </blockquote>

      <CardContent className="p-0 mt-10">
        <h3 className="text-xs font-bold tracking-widest text-muted-foreground uppercase border-b pb-2 mb-6">
          Project Details
        </h3>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
          <DetailItem icon={<Briefcase size={18} />} label="Category">
            {gig.category}
          </DetailItem>
          <DetailItem icon={<MapPin size={18} />} label="Location">
            {gig.city}
          </DetailItem>
          <DetailItem icon={<Wallet size={18} />} label="Budget">
            {formatBudget(gig.budget)}
          </DetailItem>
          <DetailItem icon={<Calendar size={18} />} label="Start Date">
            {new Date(gig?.start_date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </DetailItem>
          <DetailItem icon={<Info size={18} />} label="Expectation Level">
            <Badge variant="outline" className="capitalize">
              {gig.expectation_level}
            </Badge>
          </DetailItem>
        </dl>

        <div className="mt-10">
          <h3 className="text-xs font-bold tracking-widest text-muted-foreground uppercase border-b pb-2 mb-6">
            Desired Styles
          </h3>
          <div className="flex flex-wrap gap-3">
            {gig.style_tags.map((tag) => (
              <Badge
                key={tag}
                className="bg-gradient-to-r from-sky-100 to-indigo-100 text-sky-800 hover:from-sky-200 hover:to-indigo-200 transition"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GigDetails;
