import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: {
    default: "MatchMaking — AI Talent Search",
    template: "%s · MatchMaking",
  },
  description:
    "Describe a creative gig in plain English and instantly get a ranked shortlist of the best-fit photographers, editors, and directors — powered by natural language parsing and weighted scoring.",
  keywords: [
    "talent matchmaking",
    "creative talent search",
    "Next.js portfolio project",
    "natural language search",
  ],
  authors: [{ name: "Mayur Parmar", url: "https://github.com/alwaysmayur" }],
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "MatchMaking — AI Talent Search",
    description:
      "Plain-English brief in, ranked talent shortlist out — a rule-based NLP matchmaking engine for creative gigs.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f1f8f9" },
    { media: "(prefers-color-scheme: dark)", color: "#0B1120" },
  ],
};

const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (stored === 'dark' || (!stored && prefersDark)) {
      document.documentElement.classList.add('dark');
    }
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body
        className={`${jakarta.variable} ${jakarta.className} antialiased bg-hero-wash transition-colors`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
