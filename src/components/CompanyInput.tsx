
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
  const titleRef = useRef<HTMLHeadingElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  
  // Animation on mount
  useEffect(() => {
    if (!containerRef.current || !titleRef.current || !panelRef.current) return;
    
    // Initial animations
    const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    // Stagger animations for a more dynamic entrance
    timeline
      .from(titleRef.current, {
        y: -50,
        opacity: 0,
        duration: 1.2,
        ease: "back.out(1.7)"
      })
      .from(panelRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power4.out"
      }, "-=0.7") // Slight overlap for smoother sequence
      .from(".shimmer-line", {
        width: "0%",
        opacity: 0,
        duration: 1,
        stagger: 0.2
      }, "-=0.5");
    
    // Add hover effect for the input panel
    panelRef.current.addEventListener('mouseenter', () => {
      gsap.to(panelRef.current, {
        boxShadow: '0 0 15px rgba(0, 255, 153, 0.3)',
        duration: 0.3
      });
    });
    
    panelRef.current.addEventListener('mouseleave', () => {
      gsap.to(panelRef.current, {
        boxShadow: '0 0 5px rgba(0, 255, 153, 0.1)',
        duration: 0.3
      });
    });
  }, []);
  
  const handleGenerate = () => {
    if (!companyName.trim()) {
      toast.error('Please enter a company name');
      if (inputRef.current) {
        inputRef.current.focus();
        // Shake animation for error using timeline for sequential values
        const tl = gsap.timeline();
        tl.to(inputRef.current, { x: -5, duration: 0.1 })
          .to(inputRef.current, { x: 5, duration: 0.1 })
          .to(inputRef.current, { x: -5, duration: 0.1 })
          .to(inputRef.current, { x: 5, duration: 0.1 })
          .to(inputRef.current, { x: 0, duration: 0.1 });
      }
      return;
    }
    
    // Enhanced animation when generating
    if (containerRef.current) {
      const tl = gsap.timeline();
      
      // Pulse animation on submit
      tl.to(containerRef.current, {
        y: -20,
        scale: 0.95,
        opacity: 0.8,
        duration: 0.3,
        ease: "power2.in",
      })
      .to(containerRef.current, {
        y: 0,
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      });
      
      // Add a ripple effect from the button
      const ripple = document.createElement('div');
      ripple.className = 'absolute rounded-full bg-cosmic-neon-green/20';
      ripple.style.top = '50%';
      ripple.style.left = '50%';
      ripple.style.transform = 'translate(-50%, -50%)';
      ripple.style.width = '10px';
      ripple.style.height = '10px';
      
      if (panelRef.current) {
        panelRef.current.appendChild(ripple);
        
        gsap.to(ripple, {
          width: '300px',
          height: '300px',
          opacity: 0,
          duration: 1,
          onComplete: () => {
            if (panelRef.current && panelRef.current.contains(ripple)) {
              panelRef.current.removeChild(ripple);
            }
          }
        });
      }
    }
    
    onGenerate(companyName);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleGenerate();
    }
  };

  return (
    <div ref={containerRef} className="w-full max-w-md mx-auto relative perspective-container">
      <div className="step-indicator">01/03</div>
      
      <div className="relative">
        {/* Glowing accent line */}
        <div className="w-32 h-[2px] bg-gradient-to-r from-cosmic-neon-green to-cosmic-neon-green/50 mx-auto mb-8 shimmer-line"></div>
        
        <div className="mb-8 text-center">
          <h1 
            ref={titleRef}
            className="text-4xl md:text-6xl font-bold mb-3 font-display tracking-tight"
            data-text="Business Unit Visualizer"
          >
            <span className="inline-block text-cosmic-neon-green text-glow-green">Business Unit</span>
            <br />
            <span className="text-white">Visualizer</span>
          </h1>
          <p className="text-gray-300 text-lg">
            Enter your company name to visualize its business units
          </p>
        </div>
        
        <div 
          ref={panelRef}
          className="glass-panel-dark rounded-xl p-8 border border-cosmic-neon-green/10 relative overflow-hidden shadow-lg"
        >
          {/* Enhanced background elements */}
          <div className="absolute inset-0 enhanced-nebula-bg opacity-50"></div>
          <div className="absolute inset-0 circuit-bg"></div>
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cosmic-neon-green/30 to-transparent"></div>
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          
          {/* Content with improved styling */}
          <div className="relative z-10">
            <label 
              htmlFor="company-name" 
              className="block mb-3 text-sm font-medium text-cosmic-neon-green font-display tracking-wide"
            >
              COMPANY NAME
            </label>
            <div className="flex gap-3">
              <Input
                ref={inputRef}
                id="company-name"
                className="bg-black/30 border-cosmic-neon-green/30 focus:border-cosmic-neon-green focus:ring-1 focus:ring-cosmic-neon-green/50 text-white placeholder:text-gray-400 rounded-lg h-12"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter company name..."
              />
              <Button 
                onClick={handleGenerate}
                className="glass-button hover:bg-cosmic-neon-green/40 text-white font-medium px-6 h-12 rounded-lg transition-all"
              >
                <span className="relative z-10">Generate</span>
                <span className="absolute inset-0 bg-gradient-to-r from-cosmic-neon-green/30 to-cosmic-neon-green/20 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
              </Button>
            </div>

            {/* Decorative elements */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-cosmic-neon-green/5 blur-xl"></div>
            <div className="absolute -top-4 -left-4 w-16 h-16 rounded-full bg-cosmic-neon-green/5 blur-xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyInput;
