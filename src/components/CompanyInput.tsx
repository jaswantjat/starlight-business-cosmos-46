
import React, { useState, useRef, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
import gsap from 'gsap';
import { useIsMobile } from '@/hooks/use-mobile';

interface CompanyInputProps {
  onGenerate: (company: string) => void;
}

const CompanyInput: React.FC<CompanyInputProps> = ({
  onGenerate
}) => {
  const [companyName, setCompanyName] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  // Animation on mount with enhanced timing
  useEffect(() => {
    if (!containerRef.current || !titleRef.current || !panelRef.current) return;

    // Initial animations with improved timing and effects
    const timeline = gsap.timeline({
      defaults: {
        ease: "power3.out"
      }
    });

    // More dramatic entrance animations with slight delay for staggered effect
    timeline.from(titleRef.current, {
      y: -90,
      opacity: 0,
      duration: 1.6,
      ease: "back.out(1.9)"
    }).from(panelRef.current, {
      y: 90,
      opacity: 0,
      duration: 1.4,
      ease: "elastic.out(1, 0.75)"
    }, "-=1") // More overlap for smoother sequence
    .from(".shimmer-line", {
      width: "0%",
      opacity: 0,
      duration: 1.2,
      stagger: 0.25
    }, "-=1");
    
    // Add subtle floating effect
    gsap.to(containerRef.current, {
      y: 10,
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
    
    // Add subtle rotation effect
    gsap.to(panelRef.current, {
      rotationX: 2,
      rotationY: 2,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Enhanced hover effect for the input panel
    panelRef.current.addEventListener('mouseenter', () => {
      if (isMobile) return;
      
      gsap.to(panelRef.current, {
        boxShadow: '0 0 30px rgba(0, 255, 153, 0.5), inset 0 0 20px rgba(0, 255, 153, 0.15)',
        scale: 1.02,
        duration: 0.4
      });
    });
    panelRef.current.addEventListener('mouseleave', () => {
      if (isMobile) return;
      
      gsap.to(panelRef.current, {
        boxShadow: '0 0 10px rgba(0, 255, 153, 0.15), inset 0 0 5px rgba(0, 255, 153, 0.05)',
        scale: 1,
        duration: 0.4
      });
    });
    
    // Focus input field automatically after animation completes
    timeline.call(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    });
  }, [isMobile]);

  const handleGenerate = () => {
    if (!companyName.trim()) {
      toast.error('Please enter a company name');
      if (inputRef.current) {
        inputRef.current.focus();
        // Enhanced shake animation for error using timeline for sequential values
        const tl = gsap.timeline();
        tl.to(inputRef.current, {
          x: -8,
          duration: 0.08
        }).to(inputRef.current, {
          x: 8,
          duration: 0.08
        }).to(inputRef.current, {
          x: -8,
          duration: 0.08
        }).to(inputRef.current, {
          x: 8,
          duration: 0.08
        }).to(inputRef.current, {
          x: -4,
          duration: 0.08
        }).to(inputRef.current, {
          x: 4,
          duration: 0.08
        }).to(inputRef.current, {
          x: 0,
          duration: 0.08
        });
      }
      return;
    }

    // Enhanced animation when generating
    if (containerRef.current) {
      const tl = gsap.timeline();

      // Pulse animation on submit
      tl.to(containerRef.current, {
        y: -30,
        scale: 0.95,
        opacity: 0.8,
        duration: 0.4,
        ease: "power2.in"
      }).to(containerRef.current, {
        y: 0,
        scale: 1,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out"
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
          width: '350px',
          height: '350px',
          opacity: 0,
          duration: 1.2,
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
    <div ref={containerRef} className="w-full max-w-lg mx-auto relative perspective-container">
      <div className="relative">
        {/* Enhanced glowing accent lines */}
        <div className="w-40 h-[2px] bg-gradient-to-r from-transparent via-cosmic-neon-green to-transparent mx-auto mb-12 shimmer-line"></div>
        
        <div className="mb-10 text-center relative">
          {/* Added circuit pattern in background */}
          <div className="absolute inset-0 circuit-bg opacity-20 z-0"></div>
          
          <h1 
            ref={titleRef} 
            className="text-5xl md:text-7xl font-bold mb-4 font-display tracking-tight relative z-10"
            data-text="Business Unit Visualizer"
          >
            <span className="inline-block text-cosmic-neon-green text-glow-green">Business</span>
            <br />
            <span className="text-white">Unit Visualizer</span>
          </h1>
          <p className="text-gray-300 text-lg relative z-10">
            Enter your company name to visualize its business units
          </p>
          
          {/* Additional decorative elements */}
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-24 h-[1px] bg-gradient-to-r from-transparent via-cosmic-neon-green/30 to-transparent"></div>
        </div>
        
        <div 
          ref={panelRef} 
          className="glass-panel-dark rounded-xl p-10 border border-cosmic-neon-green/20 relative overflow-hidden shadow-xl"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Enhanced background elements */}
          <div className="absolute inset-0 enhanced-nebula-bg opacity-60"></div>
          <div className="absolute inset-0 circuit-bg opacity-40"></div>
          
          {/* Improved glowing borders with animation */}
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cosmic-neon-green/40 to-transparent animate-shimmer"></div>
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          <div className="absolute left-0 top-0 w-[1px] h-full bg-gradient-to-b from-cosmic-neon-green/30 via-transparent to-transparent"></div>
          <div className="absolute right-0 top-0 w-[1px] h-full bg-gradient-to-b from-transparent via-cosmic-neon-green/30 to-transparent"></div>
          
          {/* Content with improved styling */}
          <div className="relative z-10">
            <label htmlFor="company-name" className="block mb-3 text-sm font-medium text-cosmic-neon-green font-display tracking-wider">
              COMPANY NAME
            </label>
            <div className="flex flex-col sm:flex-row gap-4">
              <Input 
                ref={inputRef} 
                id="company-name" 
                className="bg-black/40 border-cosmic-neon-green/40 focus:border-cosmic-neon-green focus:ring-2 focus:ring-cosmic-neon-green/50 text-white placeholder:text-gray-400 rounded-lg h-14" 
                value={companyName} 
                onChange={e => setCompanyName(e.target.value)} 
                onKeyDown={handleKeyDown} 
                placeholder="Enter company name..." 
                autoFocus
              />
              <Button 
                onClick={handleGenerate} 
                className="glass-button h-14 px-8 hover:bg-cosmic-neon-green/40 text-white font-medium rounded-lg transition-all whitespace-nowrap"
              >
                <span className="relative z-10">Generate</span>
                <span className="absolute inset-0 bg-gradient-to-r from-cosmic-neon-green/40 to-cosmic-neon-green/20 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
              </Button>
            </div>

            {/* Decorative elements */}
            <div className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full bg-cosmic-neon-green/5 blur-2xl"></div>
            <div className="absolute -top-8 -left-8 w-32 h-32 rounded-full bg-cosmic-neon-green/5 blur-2xl"></div>
            
            {/* Added circuit nodes */}
            <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-cosmic-neon-green/40"></div>
            <div className="absolute bottom-3 left-3 w-2 h-2 rounded-full bg-cosmic-neon-green/40"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyInput;
