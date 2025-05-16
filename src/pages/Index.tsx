
import React, { useState, useEffect, useRef } from 'react';
import CompanyInput from '@/components/CompanyInput';
import EnhancedParticles from '@/components/EnhancedParticles';
import BusinessUnitOrbit from '@/components/BusinessUnitOrbit';
import { generateBusinessUnits } from '@/utils/generateBusinessUnits';
import { toast } from 'sonner';
import gsap from 'gsap';
import { useIsMobile } from '@/hooks/use-mobile';

interface BusinessUnit {
  name: string;
}

const Index = () => {
  const [businessUnits, setBusinessUnits] = useState<BusinessUnit[]>([]);
  const [companyName, setCompanyName] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const pageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  // Enhanced page load animation
  useEffect(() => {
    if (!pageRef.current) return;
    
    // Create a more dramatic entrance animation
    const timeline = gsap.timeline();
    
    timeline.from(pageRef.current, {
      opacity: 0,
      duration: 2,
      ease: "power2.out"
    });
    
    if (titleRef.current) {
      // Animate title elements with staggered timing
      timeline.from(titleRef.current.querySelectorAll('.animate-title'), {
        y: 60, 
        opacity: 0,
        stagger: 0.2,
        duration: 1.2,
        ease: "back.out(1.4)",
      }, "-=1.5");
    }
    
    // Create subtle floating effect for whole page
    gsap.to(pageRef.current, {
      y: 10,
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }, []);
  
  const handleGenerate = (company: string) => {
    setHasInteracted(true);
    setIsGenerating(true);
    setCompanyName(company);
    
    // Clear previous units first
    setBusinessUnits([]);
    
    // Enhanced loading toast with better styling
    const toastId = toast.loading(`Generating business units for ${company}...`, {
      duration: 4000,
      className: 'glass-panel-enhanced'
    });
    
    // Create ripple effect from center of page
    if (pageRef.current) {
      const ripple = document.createElement('div');
      ripple.className = 'absolute rounded-full bg-cosmic-neon-green/10 z-0';
      ripple.style.top = '50%';
      ripple.style.left = '50%';
      ripple.style.transform = 'translate(-50%, -50%)';
      ripple.style.width = '10px';
      ripple.style.height = '10px';
      
      pageRef.current.appendChild(ripple);
      
      gsap.to(ripple, {
        width: '150vw',
        height: '150vw',
        opacity: 0,
        duration: 2.5,
        ease: "power2.out",
        onComplete: () => {
          if (pageRef.current && pageRef.current.contains(ripple)) {
            pageRef.current.removeChild(ripple);
          }
        }
      });
    }
    
    // Simulate API delay with enhanced animations
    setTimeout(() => {
      const units = generateBusinessUnits(company);
      setBusinessUnits(units);
      setIsGenerating(false);
      
      // Update loading toast to success toast with improved styling
      toast.success(`Generated ${units.length} business units for ${company}`, {
        id: toastId,
        duration: 3000,
        className: 'glass-panel-enhanced'
      });
    }, 2000);
  };

  return (
    <div 
      ref={pageRef} 
      className="min-h-screen overflow-hidden relative grid place-items-center"
    >
      {/* Enhanced Particles Background */}
      <EnhancedParticles 
        density={isMobile ? 'low' : 'medium'}
        interactive={!isMobile}
        colorScheme="cosmic"
      />
      
      {/* Grid overlay for tech effect */}
      <div className="fixed inset-0 grid-bg opacity-8"></div>
      
      {/* Content */}
      <div className="container py-10 md:py-20 px-4 relative z-10">
        <div ref={titleRef} className="mb-10 md:mb-24">
          <CompanyInput onGenerate={handleGenerate} />
        </div>
        
        {/* Business Units Visualizer with enhanced styling */}
        {/* Show title when units are available */}
        {businessUnits.length > 0 && (
          <div className="text-center mb-16 animate-fade-in">
            <div className="w-48 h-[1px] bg-gradient-to-r from-transparent via-cosmic-neon-green/60 to-transparent mx-auto mb-8"></div>
            <h2 className="text-3xl font-display font-semibold text-cosmic-neon-green tracking-wider mb-3 text-glow-green animate-title">
              {companyName}
            </h2>
            <p className="text-gray-300 mb-1 animate-title">Business Unit Visualization</p>
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-cosmic-neon-green/30 to-transparent mx-auto mt-2"></div>
          </div>
        )}
        
        {/* Enhanced orbit visualization */}
        <BusinessUnitOrbit 
          units={businessUnits} 
          companyName={companyName} 
        />
        
        {/* Enhanced footer when visualization is shown */}
        {businessUnits.length > 0 && (
          <div className="absolute bottom-0 left-0 w-full text-center text-xs text-gray-400 py-4 animate-fade-in">
            <p className="glass-panel-dark inline-block px-4 py-2 rounded-full text-cosmic-neon-green/70 border border-cosmic-neon-green/10">
              Interactive Business Unit Visualizer • Click on units for details
            </p>
          </div>
        )}
        
        {/* Helpful prompt if user hasn't interacted yet */}
        {!hasInteracted && (
          <div className="absolute bottom-6 left-0 w-full text-center animate-pulse-glow">
            <p className="text-cosmic-neon-green/80 text-sm">
              Enter a company name above to visualize its business units
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
