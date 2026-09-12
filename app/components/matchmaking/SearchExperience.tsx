"use client";

import { useState } from "react";
import { AlertCircle } from "lucide-react";
import MatchCard from "@/app/components/matchmaking/MatchCard";
import RequirementSummary from "@/app/components/matchmaking/RequirementSummary";
import SearchComposer from "@/app/components/matchmaking/SearchComposer";
import AIProcessing from "@/app/components/matchmaking/AIProcessing";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { useMatchmaking } from "@/app/hooks/useMatchmaking";

const exampleQueries = [
  "I need a travel photographer in Goa for 3 days in November for a sustainable fashion brand. I want pastel tones and candid portraits. ₹75k max.",
  "Looking for an editorial video editor in Mumbai, budget around 1 Lakh.",
  "Find a director in Bangalore with a classic, cinematic style for a corporate shoot.",
  "Urgent: need a photographer in Delhi for weddings, documentary style. budget is flexible",
];

interface SearchExperienceProps {
  talentCount: number;
}

export default function SearchExperience({ talentCount }: SearchExperienceProps) {
  const [query, setQuery] = useState(exampleQueries[0]);
  const { matches, parsedGig, pagination, isLoading, error, search, goToPage } =
    useMatchmaking();

  const handleSubmit = () => search(query, 1);

  const handleExample = (example: string) => {
    setQuery(example);
    search(example, 1);
  };

  const hasResults = matches.length > 0;
  const hasSearched = parsedGig !== null || error !== null;

  return (
    <>
      <section className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-900 text-emerald-800 dark:text-emerald-300 text-xs font-medium">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          <span>Deterministic rule-based NLP engine — {talentCount} creators indexed</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
          Find your next creative collaborator
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto">
          Describe the gig in plain English — location, budget, style — and get a ranked
          shortlist explained line by line.
        </p>
      </section>

      <SearchComposer
        value={query}
        onChange={setQuery}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        examples={exampleQueries.slice(1)}
        onExampleClick={handleExample}
      />

      <section className="space-y-6" aria-live="polite">
        {error && (
          <Card className="border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/40 p-4 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
            <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
          </Card>
        )}

        {parsedGig && <RequirementSummary parsedGig={parsedGig} query={query} />}

        {isLoading && <AIProcessing />}

        {!isLoading && hasResults && (
          <>
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-foreground">Ranked Collaborator Matches</h2>
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300">
                  {pagination?.total ?? matches.length} found
                </span>
              </div>
              <span className="hidden sm:inline text-xs text-muted-foreground">
                Sorted by explainable match score
              </span>
            </div>
            <div className="space-y-4">
              {matches.map((match, index) => (
                <MatchCard
                  key={match.talent.id}
                  rankedTalent={match}
                  rank={
                    ((pagination?.currentPage ?? 1) - 1) *
                      (pagination?.pageSize ?? matches.length) +
                    index +
                    1
                  }
                />
              ))}
            </div>

            {pagination && pagination.totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 pt-2">
                <Button
                  variant="outline"
                  onClick={() => goToPage(pagination.currentPage - 1)}
                  disabled={isLoading || pagination.currentPage === 1}
                >
                  Previous
                </Button>
                <span className="text-sm font-medium text-muted-foreground">
                  Page {pagination.currentPage} of {pagination.totalPages}
                </span>
                <Button
                  variant="outline"
                  onClick={() => goToPage(pagination.currentPage + 1)}
                  disabled={isLoading || pagination.currentPage === pagination.totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}

        {!isLoading && !hasResults && hasSearched && !error && (
          <Card className="text-center p-8 border bg-card">
            <p className="font-semibold text-foreground">No strong matches found.</p>
            <p className="text-sm text-muted-foreground mt-1">
              Try broadening your search or check for typos.
            </p>
          </Card>
        )}
      </section>
    </>
  );
}
