
interface BusinessUnit {
  name: string;
}

// This function simulates generating business units based on a company name
// In a real application, this could make an API call to get real data
export function generateBusinessUnits(companyName: string): BusinessUnit[] {
  // Common business units with more interesting alternatives
  const commonUnits = [
    "Marketing", 
    "Sales", 
    "Finance", 
    "Human Resources", 
    "Operations", 
    "Information Technology", 
    "Research & Development", 
    "Customer Experience",
    "Legal Affairs",
    "Product Development",
    "Strategic Planning",
    "Global Partnerships"
  ];

  // Specialized units based on first letter of company name - enhanced with modern terminology
  const specializedUnits: Record<string, string[]> = {
    'a': ['Analytics & Insights', 'AI Innovation', 'Automation Systems'],
    'b': ['Brand Experience', 'Business Intelligence', 'Blockchain Strategy'],
    'c': ['Content Creation', 'Cloud Infrastructure', 'Customer Success'],
    'd': ['Digital Transformation', 'Data Science', 'DevOps Infrastructure'],
    'e': ['E-commerce Solutions', 'Enterprise Systems', 'Emerging Technologies'],
    'f': ['Future Ventures', 'Financial Planning', 'Frontend Engineering'],
    'g': ['Global Relations', 'Growth Hacking', 'Geographic Expansion'],
    'h': ['Hybrid Solutions', 'Healthcare Innovation', 'Human Experience'],
    'i': ['Innovation Lab', 'International Markets', 'Infrastructure Security'],
    'j': ['Joint Ventures', 'Journey Mapping', 'Junction Labs'],
    'k': ['Knowledge Management', 'Key Accounts', 'Kinetic Design'],
    'l': ['Logistics & Operations', 'Learning Systems', 'Leadership Development'],
    'm': ['Mobile Technologies', 'Market Intelligence', 'Metaverse Strategy'],
    'n': ['Network Operations', 'New Markets', 'Neural Systems'],
    'o': ['Online Presence', 'Organizational Development', 'Optimization Team'],
    'p': ['Platform Engineering', 'Partnerships', 'Product Design'],
    'q': ['Quality Assurance', 'Quantum Computing', 'Quick Response Team'],
    'r': ['Risk Management', 'Retail Innovation', 'Revenue Operations'],
    's': ['Security Systems', 'Sustainability', 'SaaS Development'],
    't': ['Technical Support', 'Talent Acquisition', 'Technology Strategy'],
    'u': ['User Experience', 'Urban Solutions', 'Unified Communications'],
    'v': ['Virtual Reality', 'Venture Capital', 'Value Engineering'],
    'w': ['Web3 Development', 'Workplace Design', 'Worldwide Logistics'],
    'x': ['XR Development', 'X-platform Strategy', 'Experience Design'],
    'y': ['Yield Optimization', 'Youth Markets', 'Year-round Planning'],
    'z': ['Zero Waste Initiative', 'Zenith Performance', 'Zoology Research']
  };

  // Get first letter of company name
  const firstLetter = companyName.trim().toLowerCase().charAt(0);
  
  // Get specialized units based on first letter or use empty array if none match
  const specialized = specializedUnits[firstLetter] || [];
  
  // Get a specialized unit based on company length
  const lengthSpecialized = [
    'Advanced Analytics',
    'Customer Insights',
    'Digital Innovation',
    'Enterprise Solutions', 
    'Future Markets',
    'Global Technology'
  ];
  
  const lengthUnit = lengthSpecialized[companyName.length % lengthSpecialized.length];
  
  // Combine and shuffle
  const allPossibleUnits = [...specialized, ...commonUnits, lengthUnit];
  
  // Get a random number of units between 6 and 9
  const numUnits = Math.floor(Math.random() * 4) + 6; // 6-9 units
  
  // Shuffle and pick
  const shuffled = allPossibleUnits.sort(() => 0.5 - Math.random());
  const selectedUnits = shuffled.slice(0, numUnits);
  
  return selectedUnits.map(name => ({ name }));
}
