
// These could be dynamically generated from your DB in a real app
const KNOWN_CATEGORIES: { [key: string]: string } = {
  photographer: 'Photography',
  director: 'Direction',
  editor: 'Video Editing',
  stylist: 'Styling',
  animator: 'Animation',
  writer: 'Content Writing'
};

const KNOWN_CITIES = ['goa', 'mumbai', 'delhi', 'bangalore', 'chennai', 'hyderabad', 'pune', 'kolkata'];

const KNOWN_STYLES = [
    "portrait", "pastel", "candid", "editorial", "bold", "street", "documentary",
    "vibrant", "cinematic", "minimal", "classic", "sustainable"
];


export interface ParsedGig {
  category: string | null;
  city: string | null;
  style_tags: string[];
  budget: number | null;
}

export const parseQueryToGig = (query: string): ParsedGig => {
  const lowerQuery = query.toLowerCase();
  
  const parsed: ParsedGig = {
    category: null,
    city: null,
    style_tags: [],
    budget: null
  };

  // 1. Extract Category
  for (const keyword in KNOWN_CATEGORIES) {
    if (lowerQuery.includes(keyword)) {
      parsed.category = KNOWN_CATEGORIES[keyword];
      break; 
    }
  }

  // 2. Extract City
  for (const city of KNOWN_CITIES) {
    if (lowerQuery.includes(city)) {
      parsed.city = city.charAt(0).toUpperCase() + city.slice(1);
      break;
    }
  }
  
  // 3. Extract Styles/Skills
  for (const style of KNOWN_STYLES) {
    if(lowerQuery.includes(style)) {
      parsed.style_tags.push(style);
    }
  }
  
  // 4. Extract Budget (e.g., "₹75k", "75000 max", "Rs 1 Lakh")
  const budgetRegex = /(?:₹|Rs\.?)\s*([\d,]+(?:k|lakh)?)/i;
  const budgetMatch = lowerQuery.match(budgetRegex);
  
  if (budgetMatch) {
    const budgetStr = budgetMatch[1].replace(/,/g, '');
    if (budgetStr.endsWith('k')) {
      parsed.budget = parseFloat(budgetStr) * 1000;
    } else if (budgetStr.endsWith('lakh')) {
      parsed.budget = parseFloat(budgetStr) * 100000;
    } else {
      parsed.budget = parseFloat(budgetStr);
    }
  } else {
    // Look for numbers without currency symbol
    const numberMatch = lowerQuery.match(/([\d,]{4,})\s*(?:max|budget)?/);
    if(numberMatch) {
        parsed.budget = parseFloat(numberMatch[1].replace(/,/g, ''));
    }
  }

  return parsed;
}