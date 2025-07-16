
import { clients, gigs, talents } from '@/lib/data-loader'; // Only talents needed here
import { ParsedGig } from './parser';

// turns "₹30k–₹60k" → [30000, 60000]
const parseBudgetRange = (rangeStr: string): [number, number] => {
  if (!rangeStr || typeof rangeStr !== 'string') return [0, 0];
  const numbers = rangeStr.replace(/[^0-9–-]/g, '').split(/[–-]/).map(Number);
  return [numbers[0] || 0, numbers[1] || numbers[0] || 0];
};

// handles strings like "To be discussed" or "₹50k"
const getGigBudget = (budget: number | string): number => {
  if (typeof budget === 'number') return budget;
  if (typeof budget === 'string') {
    if (budget.toLowerCase() === 'to be discussed') return -1;
    const parsed = parseInt(budget.replace(/[^0-9]/g, ''), 10);
    return isNaN(parsed) ? -1 : parsed;
  }
  return -1;
};

// simplified matcher using parsed gig (from natural language)
export const runNaturalLanguageMatch = (parsedGig: ParsedGig) => {
  const rankedTalents = talents.map((talent) => {
    let score = 0;
    const rationale: string[] = [];

    // match city
    if (parsedGig.city && talent.city.toLowerCase() === parsedGig.city.toLowerCase()) {
      score += 25;
      rationale.push(`📍 Location Match (${parsedGig.city})`);
    }

    // match budget
    if (parsedGig.budget) {
      const [min, max] = parseBudgetRange(talent.budget_range);
      if (parsedGig.budget >= min && parsedGig.budget <= max) {
        score += 20;
        rationale.push(`💰 Budget fits`);
      } else if (parsedGig.budget > max) {
        score += 5;
        rationale.push(`💸 Budget is more than required`);
      }
    }

    // match category
    if (parsedGig.category && talent.categories.map(c => c.toLowerCase()).includes(parsedGig.category.toLowerCase())) {
      score += 15;
      rationale.push(`✅ Category match`);
    }

    const gigSkills = new Set(parsedGig.style_tags.map(s => s.toLowerCase()));

    // match skills
    talent.skills.forEach(skill => {
      const keyword = skill.toLowerCase().split(' ')[0];
      if (gigSkills.has(keyword)) {
        score += 5;
        rationale.push(`🛠️ Skill: ${skill}`);
      }
    });

    // match style tags
    talent.style_tags.forEach(style => {
      if (gigSkills.has(style.toLowerCase())) {
        score += 10;
        rationale.push(`🎨 Style: ${style}`);
      }
    });

    // match portfolio tags
    const portfolioMatches = new Set<string>();
    talent.portfolio.forEach(p => {
      [...p.tags, ...p.keywords].forEach(keyword => {
        if (gigSkills.has(keyword.toLowerCase())) {
          portfolioMatches.add(keyword);
        }
      });
    });
    if (portfolioMatches.size > 0) {
      score += portfolioMatches.size * 3;
      rationale.push(`🖼️ Portfolio: ${[...portfolioMatches].join(', ')}`);
    }

    return { talent, score, rationale };
  });

  // return sorted matches
  return rankedTalents.filter(t => t.score > 0).sort((a, b) => b.score - a.score);
};

// full gig & client-based matcher
export const runMatchmaking = (gigId: string) => {
  const gig = gigs.find((g) => g.id === gigId);
  if (!gig) throw new Error('Gig not found');

  const client = clients.find((c) => c.id === gig.client_id);
  const gigBudget = getGigBudget(gig.budget);

  const rankedTalents = talents.map((talent) => {
    let score = 0;
    const rationale: string[] = [];

    // match city
    if (talent.city.toLowerCase() === gig.city.toLowerCase()) {
      score += 25;
      rationale.push(`📍 City match`);
    }

    // match budget
    const [min, max] = parseBudgetRange(talent.budget_range);
    if (gigBudget >= min && gigBudget <= max) {
      score += 20;
      rationale.push(`💰 Budget match`);
    } else if (gigBudget > max) {
      score += 5;
      rationale.push(`💸 Generous budget`);
    }

    // match category
    if (talent.categories.map(c => c.toLowerCase()).includes(gig.category.toLowerCase())) {
      score += 15;
      rationale.push(`✅ Category match`);
    }

    const gigSkills = new Set(gig.style_tags.map(s => s.toLowerCase()));

    // match skills
    talent.skills.forEach(skill => {
      if (gigSkills.has(skill.toLowerCase().split(' ')[0])) {
        score += 5;
        rationale.push(`🛠️ Skill: ${skill}`);
      }
    });

    // match styles
    talent.style_tags.forEach(style => {
      if (gigSkills.has(style.toLowerCase())) {
        score += 10;
        rationale.push(`🎨 Style: ${style}`);
      }
    });

    // match portfolio
    const portfolioMatches = new Set<string>();
    talent.portfolio.forEach(p => {
      [...p.tags, ...p.keywords].forEach(keyword => {
        if (gigSkills.has(keyword.toLowerCase())) {
          portfolioMatches.add(keyword);
        }
      });
    });
    if (portfolioMatches.size > 0) {
      score += portfolioMatches.size * 3;
      rationale.push(`🖼️ Portfolio: ${[...portfolioMatches].join(', ')}`);
    }

    // match experience level
    const expLevels = {
      'basic': (exp: number) => exp >= 1 && exp <= 3,
      'intermediate': (exp: number) => exp >= 3 && exp <= 6,
      'pro': (exp: number) => exp >= 5,
      'top-tier': (exp: number) => exp >= 7,
    };
    if (gig.expectation_level && expLevels[gig.expectation_level]?.(talent.experience_years)) {
      score += 10;
      rationale.push(`⭐ Experience match`);
    }

    // match client preferences
    if (client) {
      client.brand_style.forEach(style => {
        if (talent.style_tags.includes(style.toLowerCase())) {
          score += 5;
          rationale.push(`🤝 Brand style: ${style}`);
        }
      });
      if (
        client.notes_and_history.toLowerCase().includes('natural lighting') &&
        talent.portfolio.some(p => p.keywords.includes('natural light'))
      ) {
        score += 5;
        rationale.push(`☀️ Natural light preference match`);
      }
    }

    return { talent, score, rationale };
  });

  return rankedTalents.sort((a, b) => b.score - a.score);
};
