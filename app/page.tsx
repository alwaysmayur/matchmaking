"use client";

import { useState } from "react";
import { RankedTalent } from "@/types";
import TalentCard from "@/app/components/TalentCard";
import { ParsedGig } from "@/lib/parser";
import QuerySummary from "@/app/components/QuerySummary";
import { Textarea } from "@/app/components/ui/textarea";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";

const exampleQueries = [
  "I need a travel photographer in Goa for 3 days in November for a sustainable fashion brand. I want pastel tones and candid portraits. ₹75k max.",
  "Looking for an editorial video editor in Mumbai, budget around 1 Lakh.",
  "Find a director in Bangalore with a classic, cinematic style for a corporate shoot.",
  "Urgent: need a photographer in Delhi for weddings, documentary style. budget is flexible",
];

export default function Home() {
  const [query, setQuery] = useState(exampleQueries[0]);
  const [matches, setMatches] = useState<RankedTalent[]>([]);
  const [parsedGig, setParsedGig] = useState<ParsedGig | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // FIX 1: Set page size to match the backend's default (5)
  const [sizePerPage, setSizePerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const handleFindMatches = async (page = 1) => {
    if (!query) return;

    setIsLoading(true);
    // For a new search (always page 1), reset the parsed gig.
    // For pagination, keep the existing summary.
    if (page === 1) {
      setParsedGig(null);
    }
    setMatches([]); // Always clear the current list of matches
    setCurrentPage(page);

    try {
      const response = await fetch(`/api/match`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // FIX 2: Use the correct `page` variable and send `pageSize`
        body: JSON.stringify({ query, page, pageSize: sizePerPage }),
      });

      const data = await response.json();
      if (response.ok) {
        setMatches(data.rankedTalents);
        setParsedGig(data.parsedGig);
        setTotalPages(data.pagination.totalPages);
        // Ensure currentPage from the response is used, in case the API corrects it
        setCurrentPage(data.pagination.currentPage);
      } else {
        console.error(data.error);
        setParsedGig(null); // Clear summary on error
      }
    } catch (error) {
      console.error("Failed to fetch matches:", error);
      setParsedGig(null); // Clear summary on error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#EFFBFF] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-10">
        <header className="text-center space-y-2">
          <h1 className={`text-4xl font-bold tracking-tight text-[#000000]`}>
            MatchMacking
          </h1>
          <p className="text-[#2C2C2C] text-base sm:text-lg">
            Talent Search
          </p>
        </header>

        {/* Query Box */}
        <div className="space-y-4">
          <div className="relative">
            <Textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Describe the talent you're looking for..."
              className="min-h-[96px] pr-36 text-base bg-white border border-[#D6EAF8] focus:ring-2 focus:ring-[#FAC22D] focus:border-[#FAC22D]"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleFindMatches(1);
                }
              }}
            />
            <Button
              onClick={() => handleFindMatches(1)}
              disabled={isLoading || !query}
              className="absolute top-2 right-2 bg-[#FAC22D] text-black hover:bg-[#e6ae20] font-semibold disabled:bg-gray-300"
            >
              {isLoading ? "Matching..." : "Find Talent"}
            </Button>
          </div>
          <div className="text-sm text-[#2C2C2C]">
            Try an example:
            <button
              onClick={() => {
                setQuery(exampleQueries[1]);
                handleFindMatches(1);
              }}
              className="ml-2 text-[#FAC22D] hover:underline"
            >
              Video Editor
            </button>
            <button
              onClick={() => {
                setQuery(exampleQueries[2]);
                handleFindMatches(1);
              }}
              className="ml-2 text-[#FAC22D] hover:underline"
            >
              Director
            </button>
          </div>
        </div>

        {/* Results */}
        {isLoading && matches.length === 0 ? (
          <Card className="text-center p-8 border border-[#D6EAF8] bg-white">
            <p className="text-sm text-[#2C2C2C]">
              🧠 Parsing your request and finding the best matches...
            </p>
          </Card>
        ) : (
          <div className="space-y-6">
            {parsedGig && <QuerySummary parsedGig={parsedGig} query={query} />}

            {matches.length > 0 && (
              <h2 className="text-lg font-semibold text-[#000000]">
                Top Matches
              </h2>
            )}

            <div className="space-y-4">
              {matches.map((match, index) => (
                <TalentCard
                  key={match.talent.id}
                  rankedTalent={match}
                  // FIX 3: Rank calculation is now correct due to correct sizePerPage
                  rank={(currentPage - 1) * sizePerPage + index + 1}
                />
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-6">
                <Button
                  variant="outline"
                  onClick={() => handleFindMatches(currentPage - 1)}
                  disabled={isLoading || currentPage === 1}
                >
                  Previous
                </Button>
                <span className="text-sm font-medium text-[#2C2C2C]">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  onClick={() => handleFindMatches(currentPage + 1)}
                  disabled={isLoading || currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            )}

            {!isLoading && matches.length === 0 && parsedGig && (
              <Card className="text-center p-8 border border-[#D6EAF8] bg-white">
                <p className="font-semibold text-[#000000]">
                  No strong matches found.
                </p>
                <p className="text-sm text-[#2C2C2C] mt-1">
                  Try broadening your search or check for typos.
                </p>
              </Card>
            )}
          </div>
        )}
      </div>
    </main>
  );
}