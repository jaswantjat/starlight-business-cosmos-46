
interface BusinessUnit {
  name: string;
}

// This function simulates generating business units based on a company name
// In a real application, this could make an API call to get real data
export function generateBusinessUnits(companyName: string): BusinessUnit[] {
  // Common business units
  const commonUnits = [
    "Marketing", 
    "Sales", 
    "Finance", 
    "HR", 
    "Operations", 
    "IT", 
    "R&D", 
    "Customer Support",
    "Legal",
    "Product Development"
  ];

  // Specialized units based on first letter of company name
  const specializedUnits: Record<string, string[]> = {
    'a': ['Analytics', 'Automation'],
    'b': ['Brand Strategy', 'Business Intelligence'],
    'c': ['Content Creation', 'Cloud Services'],
    'd': ['Digital Transformation', 'Data Science'],
    'e': ['E-commerce', 'Enterprise Solutions'],
    'f': ['Fulfillment', 'Financial Planning'],
    'g': ['Global Relations', 'Growth Hacking'],
    'h': ['Hospitality', 'Healthcare Solutions'],
    'i': ['Innovation Lab', 'International Markets'],
    'j': ['Joint Ventures', 'Journalism'],
    'k': ['Knowledge Management', 'Key Accounts'],
    'l': ['Logistics', 'Learning & Development'],
    'm': ['Mobile Development', 'Mergers & Acquisitions'],
    'n': ['Network Operations', 'New Markets'],
    'o': ['Online Presence', 'Organizational Development'],
    'p': ['Public Relations', 'Partnerships'],
    'q': ['Quality Assurance', 'Quantitative Analysis'],
    'r': ['Risk Management', 'Retail Operations'],
    's': ['Strategic Planning', 'Security'],
    't': ['Technical Support', 'Talent Acquisition'],
    'u': ['User Experience', 'Urban Development'],
    'v': ['Venture Capital', 'Virtual Solutions'],
    'w': ['Web Development', 'Workforce Planning'],
    'x': ['XR Development', 'X-platform Strategy'],
    'y': ['Yield Optimization', 'Youth Markets'],
    'z': ['Zero Waste Initiative', 'Zoology Research']
  };

  // Get first letter of company name
  const firstLetter = companyName.trim().toLowerCase().charAt(0);
  
  // Get specialized units based on first letter or use empty array if none match
  const specialized = specializedUnits[firstLetter] || [];
  
  // Combine and shuffle
  const allPossibleUnits = [...specialized, ...commonUnits];
  
  // Get a random number of units between 5 and 9
  const numUnits = Math.floor(Math.random() * 5) + 5; // 5-9 units
  
  // Shuffle and pick
  const shuffled = allPossibleUnits.sort(() => 0.5 - Math.random());
  const selectedUnits = shuffled.slice(0, numUnits);
  
  return selectedUnits.map(name => ({ name }));
}
