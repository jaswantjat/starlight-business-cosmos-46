
import React, { useState, useRef, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
import gsap from 'gsap';

interface CompanyInputProps {
  onGenerate: (company: string) => void;
}

const CompanyInput: React.FC<CompanyInputProps> = ({ onGenerate }) => {
  const [companyName, setCompanyName] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Animation on mount
  useEffect(() => {
    if (containerRef.current) {
      gsap.from(containerRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    }
  }, []);
  
  const handleGenerate = () => {
    if (!companyName.trim()) {
      toast.error('Please enter a company name');
      if (inputRef.current) {
        inputRef.current.focus();
        // Shake animation for error
        gsap.to(inputRef.current, {
          x: [-5, 5, -5, 5, 0],
          duration: 0.4,
          ease: "power1.inOut"
        });
      }
      return;
    }
    
    // Animation when generating
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        y: -20,
        scale: 0.95,
        opacity: 0.8,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          gsap.to(containerRef.current, {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
          });
        }
      });
    }
    
    onGenerate(companyName);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleGenerate();
    }
  };

  return (
    <div ref={containerRef} className="w-full max-w-md mx-auto">
      <div className="relative">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-2 text-white text-glow">
            Business Unit Visualizer
          </h1>
          <p className="text-gray-300">
            Enter your company name to visualize its business units
          </p>
        </div>
        
        <div className="glass-panel rounded-xl p-6 border border-white/10 relative overflow-hidden">
          <div className="absolute inset-0 opacity-30 nebula-bg"></div>
          
          <div className="relative z-10">
            <label 
              htmlFor="company-name" 
              className="block mb-2 text-sm font-medium text-gray-200"
            >
              Company Name
            </label>
            <div className="flex gap-2">
              <Input
                ref={inputRef}
                id="company-name"
                className="bg-black/30 border-cosmic-neon-blue/30 focus:border-cosmic-neon-blue text-white placeholder:text-gray-400"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter company name..."
              />
              <Button 
                onClick={handleGenerate}
                className="bg-cosmic-neon-blue hover:bg-cosmic-neon-blue/80 text-white"
              >
                Generate
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyInput;
