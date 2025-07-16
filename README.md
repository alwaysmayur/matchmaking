# 🧠 Talent Matchmaking Engine

A lightweight matchmaking engine for creative gigs — built with Next.js 15 and TypeScript. It connects client briefs to the most relevant talents using natural language parsing, weighted scoring, and custom filters.

## 🚀 Features

- Match talents to client briefs using:
- Location, budget, style, skills, category, and experience
- Natural language brief parser → structured gig format
- Human-readable matching rationale (why this talent matched)
- Simple pagination and API endpoint
- Typed with TypeScript & ESLint rules enforced

---

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (optional UI layer)
- **Icons:** Lucide
- **Linting:** ESLint with TypeScript rules
- **Matching Logic:** Custom scoring logic in `lib/matchmaking.ts`

---

## 📁 Project Structure

├── app/
│ ├── api/
│ │ └── match/route.ts # API route to process brief & return talent matches
│ ├── components/
│ │ ├── GigDetails.tsx # Renders detailed gig info
│ │ ├── QuerySummary.tsx # Shows what the engine parsed from the query
│ │ └── TalentCard.tsx # Displays a single talent with score + rationale
│ └── page.tsx # UI page that runs the query and shows matches
│
├── lib/
│ ├── matchmaking.ts # Main matchmaking logic (scoring system)
│ └── parser.ts # Converts natural language → structured gig
│
├── data/
│ ├── clients.json # Mock client profiles
│ ├── gigs.json # Mock gig briefs
│ └── talents.json # Mock talent database (10k+ style)
│
├── types/
│ └── index.ts # Type definitions for Client, Talent, Gig, etc.

---

## ⚙️ Getting Started

```bash

# Clone the repo
git clone https://github.com/alwaysmayur/matchmaking.git
cd matchmaking

# Install dependencies
npm install

# Run the dev server
npm run dev

# Build for production
npm run build
