// src/app/api/match/route.ts

import { NextResponse } from "next/server";
import { runNaturalLanguageMatch } from "@/lib/matchmaking";
import { parseQueryToGig } from "@/lib/parser";

type MatchRequestBody = {
  query: string;
  page?: number;
  pageSize?: number;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as MatchRequestBody;
    const { query, page = 1, pageSize = 5 } = body;

    if (!query) {
      return NextResponse.json(
        { error: "Search query is required" },
        { status: 400 }
      );
    }

    const parsedGig = parseQueryToGig(query);
    const allMatches = runNaturalLanguageMatch(parsedGig);

    const total = allMatches.length;
    const totalPages = Math.ceil(total / pageSize);
    const startIndex = (page - 1) * pageSize;
    const paginatedMatches = allMatches.slice(
      startIndex,
      startIndex + pageSize
    );

    return NextResponse.json({
      rankedTalents: paginatedMatches,
      parsedGig,
      pagination: {
        total,
        totalPages,
        currentPage: page,
        pageSize,
      },
    });
  } catch (error: unknown) {
    // fallback if error is an actual Error object
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
