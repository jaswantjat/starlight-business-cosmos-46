
interface BusinessUnit {
  name: string;
  importance?: number; // 1-10 scale for visual sizing
  type?: string; // e.g., 'core', 'support', 'innovation'
}

// This function generates business units based on a company name
// with enhanced variety and intelligence
export function generateBusinessUnits(companyName: string): BusinessUnit[] {
  // Common business units with more interesting alternatives
  const commonUnits = [
    { name: "Marketing", type: "core", importance: 8 }, 
    { name: "Sales", type: "core", importance: 9 },
    { name: "Finance", type: "support", importance: 7 }, 
    { name: "Human Resources", type: "support", importance: 6 }, 
    { name: "Operations", type: "core", importance: 8 }, 
    { name: "Information Technology", type: "support", importance: 7 }, 
    { name: "Research & Development", type: "innovation", importance: 9 }, 
    { name: "Customer Experience", type: "core", importance: 8 },
    { name: "Legal Affairs", type: "support", importance: 5 },
    { name: "Product Development", type: "innovation", importance: 9 },
    { name: "Strategic Planning", type: "core", importance: 7 },
    { name: "Global Partnerships", type: "core", importance: 6 }
  ];

  // Specialized units based on first letter of company name - enhanced with modern terminology
  const specializedUnits: Record<string, BusinessUnit[]> = {
    'a': [
      { name: 'Analytics & Insights', type: 'innovation', importance: 7 }, 
      { name: 'AI Innovation', type: 'innovation', importance: 10 }, 
      { name: 'Automation Systems', type: 'innovation', importance: 8 }
    ],
    'b': [
      { name: 'Brand Experience', type: 'core', importance: 8 }, 
      { name: 'Business Intelligence', type: 'support', importance: 7 }, 
      { name: 'Blockchain Strategy', type: 'innovation', importance: 9 }
    ],
    'c': [
      { name: 'Content Creation', type: 'core', importance: 7 }, 
      { name: 'Cloud Infrastructure', type: 'support', importance: 8 }, 
      { name: 'Customer Success', type: 'core', importance: 9 }
    ],
    'd': [
      { name: 'Digital Transformation', type: 'innovation', importance: 9 }, 
      { name: 'Data Science', type: 'innovation', importance: 8 }, 
      { name: 'DevOps Infrastructure', type: 'support', importance: 7 }
    ],
    'e': [
      { name: 'E-commerce Solutions', type: 'core', importance: 8 }, 
      { name: 'Enterprise Systems', type: 'support', importance: 7 }, 
      { name: 'Emerging Technologies', type: 'innovation', importance: 9 }
    ],
    'f': [
      { name: 'Future Ventures', type: 'innovation', importance: 9 }, 
      { name: 'Financial Planning', type: 'support', importance: 7 }, 
      { name: 'Frontend Engineering', type: 'support', importance: 6 }
    ],
    'g': [
      { name: 'Global Relations', type: 'core', importance: 7 }, 
      { name: 'Growth Hacking', type: 'innovation', importance: 8 }, 
      { name: 'Geographic Expansion', type: 'core', importance: 8 }
    ],
    'h': [
      { name: 'Hybrid Solutions', type: 'innovation', importance: 8 }, 
      { name: 'Healthcare Innovation', type: 'innovation', importance: 9 }, 
      { name: 'Human Experience', type: 'core', importance: 7 }
    ],
    'i': [
      { name: 'Innovation Lab', type: 'innovation', importance: 10 }, 
      { name: 'International Markets', type: 'core', importance: 8 }, 
      { name: 'Infrastructure Security', type: 'support', importance: 7 }
    ],
    'j': [
      { name: 'Joint Ventures', type: 'core', importance: 8 }, 
      { name: 'Journey Mapping', type: 'core', importance: 7 }, 
      { name: 'Junction Labs', type: 'innovation', importance: 9 }
    ],
    'k': [
      { name: 'Knowledge Management', type: 'support', importance: 7 }, 
      { name: 'Key Accounts', type: 'core', importance: 8 }, 
      { name: 'Kinetic Design', type: 'innovation', importance: 8 }
    ],
    'l': [
      { name: 'Logistics & Operations', type: 'support', importance: 7 }, 
      { name: 'Learning Systems', type: 'support', importance: 6 }, 
      { name: 'Leadership Development', type: 'support', importance: 7 }
    ],
    'm': [
      { name: 'Mobile Technologies', type: 'innovation', importance: 9 }, 
      { name: 'Market Intelligence', type: 'core', importance: 8 }, 
      { name: 'Metaverse Strategy', type: 'innovation', importance: 10 }
    ],
    'n': [
      { name: 'Network Operations', type: 'support', importance: 7 }, 
      { name: 'New Markets', type: 'core', importance: 8 }, 
      { name: 'Neural Systems', type: 'innovation', importance: 9 }
    ],
    'o': [
      { name: 'Online Presence', type: 'core', importance: 8 }, 
      { name: 'Organizational Development', type: 'support', importance: 7 }, 
      { name: 'Optimization Team', type: 'support', importance: 7 }
    ],
    'p': [
      { name: 'Platform Engineering', type: 'support', importance: 8 }, 
      { name: 'Partnerships', type: 'core', importance: 7 }, 
      { name: 'Product Design', type: 'core', importance: 9 }
    ],
    'q': [
      { name: 'Quality Assurance', type: 'support', importance: 7 }, 
      { name: 'Quantum Computing', type: 'innovation', importance: 10 }, 
      { name: 'Quick Response Team', type: 'support', importance: 6 }
    ],
    'r': [
      { name: 'Risk Management', type: 'support', importance: 7 }, 
      { name: 'Retail Innovation', type: 'core', importance: 8 }, 
      { name: 'Revenue Operations', type: 'core', importance: 9 }
    ],
    's': [
      { name: 'Security Systems', type: 'support', importance: 7 }, 
      { name: 'Sustainability', type: 'innovation', importance: 8 }, 
      { name: 'SaaS Development', type: 'innovation', importance: 9 }
    ],
    't': [
      { name: 'Technical Support', type: 'support', importance: 6 }, 
      { name: 'Talent Acquisition', type: 'support', importance: 7 }, 
      { name: 'Technology Strategy', type: 'innovation', importance: 9 }
    ],
    'u': [
      { name: 'User Experience', type: 'core', importance: 9 }, 
      { name: 'Urban Solutions', type: 'innovation', importance: 8 }, 
      { name: 'Unified Communications', type: 'support', importance: 7 }
    ],
    'v': [
      { name: 'Virtual Reality', type: 'innovation', importance: 10 }, 
      { name: 'Venture Capital', type: 'core', importance: 8 }, 
      { name: 'Value Engineering', type: 'core', importance: 7 }
    ],
    'w': [
      { name: 'Web3 Development', type: 'innovation', importance: 9 }, 
      { name: 'Workplace Design', type: 'support', importance: 7 }, 
      { name: 'Worldwide Logistics', type: 'core', importance: 8 }
    ],
    'x': [
      { name: 'XR Development', type: 'innovation', importance: 10 }, 
      { name: 'X-platform Strategy', type: 'innovation', importance: 8 }, 
      { name: 'Experience Design', type: 'core', importance: 9 }
    ],
    'y': [
      { name: 'Yield Optimization', type: 'support', importance: 7 }, 
      { name: 'Youth Markets', type: 'core', importance: 8 }, 
      { name: 'Year-round Planning', type: 'support', importance: 6 }
    ],
    'z': [
      { name: 'Zero Waste Initiative', type: 'innovation', importance: 8 }, 
      { name: 'Zenith Performance', type: 'support', importance: 7 }, 
      { name: 'Zoology Research', type: 'innovation', importance: 9 }
    ]
  };

  // Get first letter of company name
  const firstLetter = companyName.trim().toLowerCase().charAt(0);
  
  // Get specialized units based on first letter or use empty array if none match
  const specialized = specializedUnits[firstLetter] || [];
  
  // Get a specialized unit based on company length with more variety
  const lengthSpecialized = [
    { name: 'Advanced Analytics', type: 'innovation', importance: 8 },
    { name: 'Customer Insights', type: 'core', importance: 7 },
    { name: 'Digital Innovation', type: 'innovation', importance: 9 },
    { name: 'Enterprise Solutions', type: 'support', importance: 7 }, 
    { name: 'Future Markets', type: 'innovation', importance: 8 },
    { name: 'Global Technology', type: 'innovation', importance: 9 }
  ];
  
  const lengthUnit = lengthSpecialized[companyName.length % lengthSpecialized.length];
  
  // Industry-specific units based on company name length
  const industrySpecializedUnits = [
    { name: 'Machine Learning', type: 'innovation', importance: 9 },
    { name: 'Quantum Research', type: 'innovation', importance: 10 },
    { name: 'Sustainable Development', type: 'innovation', importance: 8 },
    { name: 'UX Research', type: 'core', importance: 8 },
    { name: 'Visual Identity', type: 'core', importance: 7 }
  ];
  
  // Pick an industry specialized unit based on company name length
  const industrySpecialized = industrySpecializedUnits[companyName.length % industrySpecializedUnits.length];
  
  // Combine and shuffle
  const allPossibleUnits = [...specialized, ...commonUnits, lengthUnit, industrySpecialized];
  
  // Get a random number of units between 6 and 9
  const numUnits = Math.floor(Math.random() * 4) + 6; // 6-9 units
  
  // Shuffle and pick
  const shuffled = allPossibleUnits.sort(() => 0.5 - Math.random());
  const selectedUnits = shuffled.slice(0, numUnits);
  
  return selectedUnits;
}
