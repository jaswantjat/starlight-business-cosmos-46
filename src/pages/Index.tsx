
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
  const pageRef = useRef<HTMLDivElement>(null);

  // Enhanced parallax effect for a more immersive feel
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!visualizerRef.current || !pageRef.current) return;
      
      const mouseX = e.clientX / window.innerWidth - 0.5;
      const mouseY = e.clientY / window.innerHeight - 0.5;
      
      // More subtle movement for main visualizer
      gsap.to(visualizerRef.current, {
        x: mouseX * 25,
        y: mouseY * 25,
        duration: 1.2,
        ease: 'power2.out'
      });
      
      // Parallax effect for background elements
      gsap.to('.parallax-bg-1', {
        x: mouseX * -45,
        y: mouseY * -45,
        duration: 1.5,
        ease: 'power1.out'
      });
      
      gsap.to('.parallax-bg-2', {
        x: mouseX * -30,
        y: mouseY * -30, 
        duration: 1.5,
        ease: 'power1.out'
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Initial page animation
    if (pageRef.current) {
      gsap.from(pageRef.current, {
        opacity: 0,
        duration: 1.5,
        ease: 'power2.out'
      });
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  // Enhanced custom cursor effect
  useEffect(() => {
    // Create cursor element
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);
    
    // Trail effect
    const trail = document.createElement('div');
    trail.classList.add('cursor-trail');
    document.body.appendChild(trail);
    
    // Update cursor position with smoother animation
    const updateCursorPosition = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'power1.out'
      });
      
      gsap.to(trail, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: 'power2.out'
      });
    };
    
    // Enhanced hover states
    const addHoverClass = () => {
      cursor.classList.add('cursor-hover');
      trail.classList.add('trail-hover');
    };
    
    const removeHoverClass = () => {
      cursor.classList.remove('cursor-hover');
      trail.classList.remove('trail-hover');
    };
    
    // Add event listeners
    document.addEventListener('mousemove', updateCursorPosition);
    
    // Add hover effect for interactive elements
    const interactiveElements = document.querySelectorAll('button, a, input, .glass-panel-enhanced, .glass-panel-dark');
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
      if (trail.parentNode) {
        trail.parentNode.removeChild(trail);
      }
    };
  }, []);
  
  const handleGenerate = (company: string) => {
    setIsGenerating(true);
    setCompanyName(company);
    
    // Clear previous units first
    setBusinessUnits([]);
    
    // Enhanced loading toast with better styling
    const toastId = toast.loading(`Generating business units for ${company}...`, {
      duration: 2000,
      className: 'glass-panel-enhanced'
    });
    
    // Create ripple effect from center
    if (visualizerRef.current) {
      const ripple = document.createElement('div');
      ripple.className = 'absolute rounded-full bg-cosmic-neon-green/10';
      ripple.style.top = '50%';
      ripple.style.left = '50%';
      ripple.style.transform = 'translate(-50%, -50%)';
      ripple.style.width = '10px';
      ripple.style.height = '10px';
      
      visualizerRef.current.appendChild(ripple);
      
      gsap.to(ripple, {
        width: '800px',
        height: '800px',
        opacity: 0,
        duration: 2,
        ease: "power2.out",
        onComplete: () => {
          if (visualizerRef.current && visualizerRef.current.contains(ripple)) {
            visualizerRef.current.removeChild(ripple);
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
      
      // Enhanced center point animation
      if (centerPointRef.current) {
        gsap.from(centerPointRef.current, {
          scale: 0,
          opacity: 0,
          duration: 1.2,
          ease: "elastic.out(1.2, 0.5)"
        });
        
        // Enhanced pulse animation
        gsap.to(centerPointRef.current, {
          boxShadow: "0 0 40px rgba(0, 255, 153, 0.8)",
          repeat: -1,
          yoyo: true,
          duration: 2,
          ease: "sine.inOut"
        });
      }
    }, 1500);
  };

  return (
    <div ref={pageRef} className="min-h-screen overflow-hidden relative grid place-items-center">
      {/* Enhanced Background Elements */}
      <div className="fixed inset-0 circuit-bg opacity-30"></div>
      <div className="fixed inset-0 enhanced-nebula-bg opacity-70"></div>
      
      {/* Parallax backgrounds */}
      <div className="fixed top-0 left-0 w-full h-full parallax-bg-1">
        <div className="absolute top-[10%] left-[10%] w-64 h-64 rounded-full bg-cosmic-neon-green/3 filter blur-3xl"></div>
        <div className="absolute bottom-[20%] right-[5%] w-96 h-96 rounded-full bg-cosmic-neon-green/4 filter blur-3xl"></div>
      </div>
      
      <div className="fixed top-0 left-0 w-full h-full parallax-bg-2">
        <div className="absolute top-[40%] left-[60%] w-80 h-80 rounded-full bg-cosmic-neon-green/3 filter blur-3xl"></div>
        <div className="absolute top-[70%] left-[30%] w-72 h-72 rounded-full bg-cosmic-neon-green/3 filter blur-3xl"></div>
      </div>
      
      <ParticlesBg />
      
      {/* Grid overlay for tech effect */}
      <div className="fixed inset-0 grid-bg opacity-5"></div>
      
      {/* Content */}
      <div className="container py-20 px-4 relative z-10">
        <div className="mb-24">
          <CompanyInput onGenerate={handleGenerate} />
        </div>
        
        {/* Business Units Visualizer with enhanced styling */}
        <div 
          ref={visualizerRef}
          className="relative h-[60vh] flex items-center justify-center perspective-container"
        >
          {businessUnits.length > 0 && (
            <div className="text-center mb-16">
              <div className="w-48 h-[1px] bg-gradient-to-r from-transparent via-cosmic-neon-green/60 to-transparent mx-auto mb-8"></div>
              <h2 className="text-3xl font-display font-semibold text-cosmic-neon-green tracking-wider mb-3 text-glow-green">
                {companyName}
              </h2>
              <p className="text-gray-300 mb-1">Business Unit Visualization</p>
              <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-cosmic-neon-green/30 to-transparent mx-auto mt-2"></div>
            </div>
          )}
          
          {/* Enhanced center point glow when units are displayed */}
          {businessUnits.length > 0 && (
            <div 
              ref={centerPointRef}
              className="absolute w-20 h-20 rounded-full bg-cosmic-neon-green/20 flex items-center justify-center z-10"
            >
              <div className="w-10 h-10 rounded-full bg-cosmic-neon-green/50 animate-pulse-glow"></div>
              <div className="absolute w-28 h-28 rounded-full border border-cosmic-neon-green/20 animate-pulse-ring"></div>
              <div className="absolute w-36 h-36 rounded-full border border-cosmic-neon-green/10 animate-pulse-ring" style={{ animationDelay: '1s' }}></div>
              <div className="absolute w-44 h-44 rounded-full border border-cosmic-neon-green/5 animate-pulse-ring" style={{ animationDelay: '2s' }}></div>
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
          
          {/* Enhanced footer when visualization is shown */}
          {businessUnits.length > 0 && (
            <div className="absolute bottom-0 left-0 w-full text-center text-xs text-gray-400 py-4">
              <p className="glass-panel-dark inline-block px-4 py-2 rounded-full text-cosmic-neon-green/70 border border-cosmic-neon-green/10">
                Interactive Business Unit Visualizer • Hover over units for details
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
