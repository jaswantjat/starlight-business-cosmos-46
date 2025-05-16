
import React, { useState, useEffect } from 'react';
import CompanyInput from '@/components/CompanyInput';
import BusinessUnitBox from '@/components/BusinessUnitBox';
import ParticlesBg from '@/components/ParticlesBg';
import { generateBusinessUnits } from '@/utils/generateBusinessUnits';
import { toast } from 'sonner';

interface BusinessUnit {
  name: string;
}

const Index = () => {
  const [businessUnits, setBusinessUnits] = useState<BusinessUnit[]>([]);
  const [companyName, setCompanyName] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  
  const handleGenerate = (company: string) => {
    setIsGenerating(true);
    setCompanyName(company);
    
    // Clear previous units first
    setBusinessUnits([]);
    
    // Simulate API delay
    setTimeout(() => {
      const units = generateBusinessUnits(company);
      setBusinessUnits(units);
      setIsGenerating(false);
      toast.success(`Generated business units for ${company}`, {
        description: `${units.length} business units found`
      });
    }, 500);
  };

  return (
    <div className="min-h-screen overflow-hidden relative grid place-items-center">
      {/* Background Elements */}
      <div className="fixed inset-0 grid-bg"></div>
      <div className="fixed inset-0 nebula-bg opacity-50"></div>
      <ParticlesBg />
      
      {/* Content */}
      <div className="container py-16 px-4 relative z-10">
        <div className="mb-16">
          <CompanyInput onGenerate={handleGenerate} />
        </div>
        
        {/* Business Units Display */}
        <div className="relative h-[50vh] flex items-center justify-center">
          {businessUnits.length > 0 && (
            <div className="text-center mb-8">
              <h2 className="text-xl font-semibold text-cosmic-neon-blue">
                Business Units for {companyName}
              </h2>
            </div>
          )}
          
          {/* Center point glow when units are displayed */}
          {businessUnits.length > 0 && (
            <div className="absolute w-16 h-16 rounded-full bg-cosmic-neon-blue/20 animate-pulse-glow flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-cosmic-neon-blue/50 animate-pulse-glow"></div>
            </div>
          )}
          
          {/* Render business unit boxes */}
          <div className="relative w-full h-full flex items-center justify-center">
            {businessUnits.map((unit, index) => (
              <BusinessUnitBox 
                key={`${unit.name}-${index}`}
                name={unit.name}
                index={index}
                total={businessUnits.length}
                animationDelay={0.2}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
