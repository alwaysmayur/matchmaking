/* eslint-disable @typescript-eslint/no-explicit-any */

export interface Talent {
  id: string;
  name: string;
  city: string;
  categories: string[];
  skills: string[];
  style_tags: string[];
  budget_range: string;
  experience_years: number;
  portfolio: {
    title: string;
    tags: string[];
    keywords: string[];
  }[];
}

export interface Client {
  id: string;
  name: "The Loom Art";
  type: string;
  company_name: string;
  industry: string;
  sub_industry: string;
  brand_style: string[];
  notes_and_history: string;
  talent_preferences: {
      location_of_talent: string;
      [key: string]: any;
  }
}

export interface Gig {
  start_date: string | number | Date;
  id: string;
  title: string;
  brief_text: string;
  category: string;
  city: string;
  budget: number | string;
  client_id: string;
  style_tags: string[];
  expectation_level: 'basic' | 'intermediate' | 'pro' | 'top-tier';
}

export interface RankedTalent {
  talent: Talent;
  score: number;
  rationale: string[];
}