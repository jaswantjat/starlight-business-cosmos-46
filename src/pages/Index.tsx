
import React, { useState, useEffect, useRef } from 'react';
import CompanyInput from '@/components/CompanyInput';
import BusinessUnitBox from '@/components/BusinessUnitBox';
import ParticlesBg from '@/components/ParticlesBg';
import { generateBusinessUnits } from '@/utils/generateBusinessUnits';
import { toast } from 'sonner';
import gsap from 'gsap';

interface BusinessUnit {
  name: string;
}

const Index = () => {
  const [businessUnits, setBusinessUnits] = useState<BusinessUnit[]>([]);
  const [companyName, setCompanyName] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const visualizerRef = useRef<HTMLDivElement>(null);
  const centerPointRef = useRef<HTMLDivElement>(null);

  // Track mouse position for subtle parallax effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!visualizerRef.current) return;
      
      const mouseX = e.clientX / window.innerWidth - 0.5;
      const mouseY = e.clientY / window.innerHeight - 0.5;
      
      gsap.to(visualizerRef.current, {
        x: mouseX * 20,  // Subtle movement
        y: mouseY * 20,
        duration: 1,
        ease: 'power2.out'
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  // Custom cursor effect
  useEffect(() => {
    // Create cursor element
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);
    
    // Update cursor position
    const updateCursorPosition = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'power1.out'
      });
    };
    
    // Handle cursor hover state
    const addHoverClass = () => cursor.classList.add('cursor-hover');
    const removeHoverClass = () => cursor.classList.remove('cursor-hover');
    
    // Add event listeners
    document.addEventListener('mousemove', updateCursorPosition);
    
    // Add hover effect for interactive elements
    const interactiveElements = document.querySelectorAll('button, a, input, .glass-panel-enhanced');
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', addHoverClass);
      element.addEventListener('mouseleave', removeHoverClass);
    });
    
    return () => {
      document.removeEventListener('mousemove', updateCursorPosition);
      interactiveElements.forEach(element => {
        element.removeEventListener('mouseenter', addHoverClass);
        element.removeEventListener('mouseleave', removeHoverClass);
      });
      
      if (cursor.parentNode) {
        cursor.parentNode.removeChild(cursor);
      }
    };
  }, []);
  
  const handleGenerate = (company: string) => {
    setIsGenerating(true);
    setCompanyName(company);
    
    // Clear previous units first
    setBusinessUnits([]);
    
    // Show generating toast with enhanced styling
    const toastId = toast.loading(`Generating business units for ${company}...`, {
      duration: 2000,
      className: 'glass-panel-enhanced'
    });
    
    // Simulate API delay with enhanced animations
    setTimeout(() => {
      const units = generateBusinessUnits(company);
      setBusinessUnits(units);
      setIsGenerating(false);
      
      // Update loading toast to success toast
      toast.success(`Generated ${units.length} business units for ${company}`, {
        id: toastId,
        duration: 3000,
        className: 'glass-panel-enhanced'
      });
      
      // Animate center point when units appear
      if (centerPointRef.current) {
        gsap.from(centerPointRef.current, {
          scale: 0,
          opacity: 0,
          duration: 1,
          ease: "elastic.out(1, 0.5)"
        });
        
        // Pulse animation
        gsap.to(centerPointRef.current, {
          boxShadow: "0 0 30px rgba(122, 136, 251, 0.7)",
          repeat: -1,
          yoyo: true,
          duration: 2,
          ease: "sine.inOut"
        });
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen overflow-hidden relative grid place-items-center">
      {/* Background Elements */}
      <div className="fixed inset-0 circuit-bg opacity-30"></div>
      <div className="fixed inset-0 enhanced-nebula-bg opacity-70"></div>
      <ParticlesBg />
      
      {/* Decorative elements */}
      <div className="fixed top-[15%] left-[10%] w-24 h-24 rounded-full bg-cosmic-neon-blue/5 filter blur-3xl"></div>
      <div className="fixed bottom-[20%] right-[10%] w-32 h-32 rounded-full bg-cosmic-neon-purple/5 filter blur-3xl"></div>
      <div className="fixed top-[60%] left-[60%] w-48 h-48 rounded-full bg-cosmic-neon-green/5 filter blur-3xl"></div>
      
      {/* Content */}
      <div className="container py-20 px-4 relative z-10">
        <div className="mb-20">
          <CompanyInput onGenerate={handleGenerate} />
        </div>
        
        {/* Business Units Visualizer */}
        <div 
          ref={visualizerRef}
          className="relative h-[60vh] flex items-center justify-center perspective-container"
        >
          {businessUnits.length > 0 && (
            <div className="text-center mb-12">
              <div className="w-40 h-[1px] bg-gradient-to-r from-transparent via-cosmic-neon-blue/50 to-transparent mx-auto mb-6"></div>
              <h2 className="text-2xl font-display font-semibold text-cosmic-neon-blue tracking-wider mb-2">
                {companyName}
              </h2>
              <p className="text-gray-400">Business Unit Visualization</p>
            </div>
          )}
          
          {/* Center point glow when units are displayed */}
          {businessUnits.length > 0 && (
            <div 
              ref={centerPointRef}
              className="absolute w-16 h-16 rounded-full bg-cosmic-neon-blue/20 flex items-center justify-center z-10"
            >
              <div className="w-8 h-8 rounded-full bg-cosmic-neon-blue/50 animate-pulse-glow-blue"></div>
              <div className="absolute w-24 h-24 rounded-full border border-cosmic-neon-blue/20 animate-pulse-ring"></div>
              <div className="absolute w-32 h-32 rounded-full border border-cosmic-neon-blue/10 animate-pulse-ring" style={{ animationDelay: '1s' }}></div>
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
                animationDelay={0.5}
              />
            ))}
          </div>
          
          {/* Subtle footer when visualization is shown */}
          {businessUnits.length > 0 && (
            <div className="absolute bottom-0 left-0 w-full text-center text-xs text-gray-500 py-4">
              <p>Interactive Business Unit Visualizer • Hover over units for details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
