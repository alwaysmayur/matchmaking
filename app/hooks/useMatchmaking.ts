"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { RankedTalent } from "@/types";
import { ParsedGig } from "@/lib/parser";

const PAGE_SIZE = 5;

interface Pagination {
  total: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

export function useMatchmaking() {
  const [matches, setMatches] = useState<RankedTalent[]>([]);
  const [parsedGig, setParsedGig] = useState<ParsedGig | null>(null);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastQuery, setLastQuery] = useState("");

  const abortRef = useRef<AbortController | null>(null);

  const search = useCallback(async (query: string, page = 1) => {
    const trimmed = query.trim();
    if (!trimmed) return;

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setIsLoading(true);
    setError(null);
    setLastQuery(trimmed);
    if (page === 1) setParsedGig(null);

    try {
      const response = await fetch("/api/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: trimmed, page, pageSize: PAGE_SIZE }),
        signal: controller.signal,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Something went wrong. Please try again.");
      }

      setMatches(data.rankedTalents);
      setParsedGig(data.parsedGig);
      setPagination(data.pagination);
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return;
      setError(err instanceof Error ? err.message : "Failed to fetch matches.");
      setMatches([]);
      setParsedGig(null);
      setPagination(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const goToPage = useCallback(
    (page: number) => {
      if (!pagination || page < 1 || page > pagination.totalPages) return;
      search(lastQuery, page);
    },
    [pagination, lastQuery, search]
  );

  useEffect(() => () => abortRef.current?.abort(), []);

  return {
    matches,
    parsedGig,
    pagination,
    isLoading,
    error,
    search,
    goToPage,
  };
}
