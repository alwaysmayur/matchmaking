# 🧠 MatchMaking — AI Talent Search

A talent-matchmaking engine for creative gigs: describe a brief in plain English and get back a ranked, explainable shortlist of the best-fit photographers, editors, directors, and stylists.

Built with **Next.js 15**, **TypeScript**, and **Tailwind CSS** — no external LLM API calls, so it's fast, free to run, and every match comes with a transparent, line-by-line rationale.

## ✨ Features

- **Natural language brief parser** — turns a free-text query ("travel photographer in Goa, pastel tones, ₹75k max") into a structured gig (city, category, budget, style tags) using lightweight rule-based NLP.
- **Weighted match scoring** — ranks talent against the parsed gig on location, budget fit, category, skills, style, and portfolio keyword overlap.
- **Explainable results** — every match shows exactly why it scored the way it did, not just a black-box number.
- **Polished, responsive UI** — light/dark mode, skeleton loading states, animated score bars, and mobile-first layout.
- **Robust API** — input validation, request cancellation on rapid re-search, and pagination.

## 🛠️ Tech Stack

| Layer       | Choice                                          |
| ----------- | ------------------------------------------------ |
| Framework   | Next.js 15 (App Router, Turbopack)                |
| Language    | TypeScript                                        |
| Styling     | Tailwind CSS v4 + shadcn/ui primitives            |
| Icons       | Lucide                                            |
| Matching    | Custom weighted scoring — `lib/matchmaking.ts`    |
| Parsing     | Custom rule-based NLP — `lib/parser.ts`           |

## 🧩 How it works

```
User query ─▶ parseQueryToGig()  ─▶ ParsedGig { city, category, budget, style_tags }
                                          │
                                          ▼
                              runNaturalLanguageMatch()
                                          │
                     scores every talent against the parsed gig:
                     📍 location  💰 budget  ✅ category  🛠️ skills
                     🎨 style tags  🖼️ portfolio keyword overlap
                                          │
                                          ▼
                       ranked, paginated results + rationale
```

The parser and scorer are intentionally dependency-free and synchronous — with ~200 talents in the dataset, there's no need for a network round-trip to an LLM to get sub-millisecond, fully explainable results.

## ⚙️ Getting Started

```bash
git clone https://github.com/alwaysmayur/matchmaking.git
cd matchmaking

npm install
npm run dev       # http://localhost:3000

npm run build      # production build
npm run lint       # ESLint
```

## 📁 Project Structure

```
app/
  api/match/route.ts       # POST /api/match — parses query, scores, paginates
  components/               # UI: TalentCard, QuerySummary, ResultSkeleton, ThemeToggle
  hooks/useMatchmaking.ts   # client-side search state, request cancellation, pagination
  page.tsx                  # search page
lib/
  parser.ts                 # natural language → structured gig
  matchmaking.ts             # weighted scoring engine
  data-loader.ts             # typed JSON data access
data/                        # seed talents, clients, gigs
types/                       # shared TypeScript interfaces
```

## 🗺️ Possible Next Steps

- Swap the rule-based parser for an LLM-backed one (behind a feature flag) for messier, more open-ended briefs.
- Persist searches and add saved shortlists per client.
- Add unit tests around `parseQueryToGig` and the scoring functions.

---

Built by [Mayur Parmar](https://github.com/alwaysmayur).
