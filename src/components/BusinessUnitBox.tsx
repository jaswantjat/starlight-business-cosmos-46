
import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { cn } from '@/lib/utils';

interface BusinessUnitBoxProps {
  name: string;
  index: number;
  total: number;
  animationDelay?: number;
}

const BusinessUnitBox: React.FC<BusinessUnitBoxProps> = ({ 
  name, 
  index, 
  total,
  animationDelay = 0 
}) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Calculate position based on index and total
  useEffect(() => {
    if (!boxRef.current) return;
    
    const angle = (index / total) * Math.PI * 2;
    const radius = Math.min(window.innerWidth * 0.25, 250); 
    const offsetX = Math.sin(angle) * radius;
    const offsetY = Math.cos(angle) * radius;
    
    // Initial position - come from the center with more dramatic effect
    gsap.set(boxRef.current, {
      x: 0,
      y: 0,
      opacity: 0,
      scale: 0.3,
      rotationX: Math.random() * 120 - 60,
      rotationY: Math.random() * 120 - 60,
      rotationZ: Math.random() * 40 - 20,
    });
    
    // Animate to final position with enhanced easing
    gsap.to(boxRef.current, {
      x: offsetX,
      y: offsetY,
      opacity: 1,
      scale: 1,
      rotationX: 0,
      rotationY: 0, 
      rotationZ: Math.random() * 8 - 4,
      delay: animationDelay + index * 0.15,
      duration: 1.8,
      ease: "elastic.out(1.2, 0.75)",
      onComplete: () => {
        // Add connection lines between adjacent units
        if (index > 0) {
          createConnectionLine(boxRef.current!, index, angle);
        }
      }
    });
    
    // Improved floating animation with subtle rotation
    const floatTl = gsap.timeline({ repeat: -1, yoyo: true });
    
    floatTl
      .to(boxRef.current, {
        y: offsetY + (Math.random() * 20 - 10),
        x: offsetX + (Math.random() * 20 - 10),
        rotationZ: Math.random() * 6 - 3,
        rotationX: Math.random() * 5 - 2.5,
        rotationY: Math.random() * 5 - 2.5,
        duration: 3 + Math.random() * 2,
        ease: "sine.inOut",
        delay: animationDelay + index * 0.1 + 1.2,
      })
      .to(boxRef.current, {
        y: offsetY - (Math.random() * 15 - 7.5),
        x: offsetX - (Math.random() * 15 - 7.5),
        rotationZ: -Math.random() * 6 + 3,
        rotationX: -Math.random() * 5 + 2.5,
        rotationY: -Math.random() * 5 + 2.5,
        duration: 3 + Math.random() * 2,
        ease: "sine.inOut"
      });
      
  }, [index, total, animationDelay]);
  
  // Create connections between business units with enhanced styling
  const createConnectionLine = (element: HTMLDivElement, index: number, angle: number) => {
    // Only connect to previous unit for cleaner visual
    const prevIndex = (index - 1) % total;
    const prevElement = document.querySelector(`[data-unit-index="${prevIndex}"]`) as HTMLElement;
    
    if (prevElement && element.parentElement) {
      const line = document.createElement('div');
      line.className = 'connection-line';
      
      const updateLine = () => {
        const rect1 = element.getBoundingClientRect();
        const rect2 = prevElement.getBoundingClientRect();
        
        // Calculate positions
        const containerRect = element.parentElement.getBoundingClientRect();
        
        const x1 = rect1.left + rect1.width/2 - containerRect.left;
        const y1 = rect1.top + rect1.height/2 - containerRect.top;
        const x2 = rect2.left + rect2.width/2 - containerRect.left;
        const y2 = rect2.top + rect2.height/2 - containerRect.top;
        
        // Calculate distance and angle
        const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        const angleDeg = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
        
        // Position the line with enhanced style
        line.style.width = `${distance}px`;
        line.style.left = `${x1}px`;
        line.style.top = `${y1}px`;
        line.style.transform = `rotate(${angleDeg}deg)`;
        line.style.boxShadow = '0 0 10px rgba(0, 255, 153, 0.8)';
      };
      
      element.parentElement.appendChild(line);
      updateLine();
      
      // Enhanced line appearance animation
      gsap.from(line, {
        opacity: 0,
        width: 0,
        duration: 1.2,
        delay: 0.2,
        ease: "power3.out"
      });
      
      // Update line position during animations
      const updateInterval = setInterval(updateLine, 100);
      
      // Clean up the interval when component unmounts
      return () => {
        clearInterval(updateInterval);
        if (line.parentElement) {
          line.parentElement.removeChild(line);
        }
      };
    }
  };
  
  // Enhanced hover interactions
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (boxRef.current && contentRef.current) {
      gsap.to(boxRef.current, {
        scale: 1.2,
        duration: 0.4,
        ease: "power2.out",
        zIndex: 10
      });
      
      // Enhanced glow effect on hover
      gsap.to(boxRef.current, {
        boxShadow: "0 0 30px rgba(0, 255, 153, 0.7)",
        duration: 0.4
      });
    }
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    if (boxRef.current && contentRef.current) {
      gsap.to(boxRef.current, {
        scale: 1,
        duration: 0.4,
        ease: "power2.in",
        zIndex: 1,
        clearProps: "zIndex"
      });
      
      // Remove pulse glow effect
      gsap.to(boxRef.current, {
        boxShadow: "0 0 15px rgba(0, 255, 153, 0.2)",
        duration: 0.4
      });
    }
  };
  
  return (
    <div 
      ref={boxRef}
      data-unit-index={index}
      className={cn(
        "absolute glass-panel-dark rounded-lg p-4 shadow-lg transform transition-all duration-300",
        "w-40 h-40 flex items-center justify-center",
        "neon-green-border",
        isHovered ? "z-10" : "z-1"
      )}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
        transformOrigin: 'center center'
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        ref={contentRef}
        className={cn(
          "relative z-10 w-full h-full flex flex-col items-center justify-center",
          "p-3 rounded-md backdrop-blur-sm bg-black/30"
        )}
      >
        {/* Enhanced dot accent with glow */}
        <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-cosmic-neon-green animate-pulse-glow"></div>
        
        {/* Circuit pattern overlay */}
        <div className="absolute inset-0 circuit-bg opacity-20"></div>
        
        {/* Animated border on hover */}
        {isHovered && (
          <>
            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-cosmic-neon-green to-transparent animate-shimmer"></div>
            <div className="absolute inset-y-0 right-0 w-[1px] bg-gradient-to-b from-transparent via-cosmic-neon-green to-transparent animate-shimmer"></div>
            <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-cosmic-neon-green to-transparent animate-shimmer"></div>
            <div className="absolute inset-y-0 left-0 w-[1px] bg-gradient-to-b from-transparent via-cosmic-neon-green to-transparent animate-shimmer"></div>
          </>
        )}
        
        <div 
          className={cn(
            "text-center font-medium text-base font-display tracking-wide",
            "text-cosmic-neon-green",
            "text-glow-green transition-all duration-300",
            isHovered ? "scale-110" : ""
          )}
        >
          {name}
        </div>
        
        {/* Enhanced hover details */}
        {isHovered && (
          <div className="mt-2 text-xs text-gray-300 opacity-90 text-center animate-fade-in">
            <div className="pb-1 mb-1 border-b border-cosmic-neon-green/20">Unit {index + 1} of {total}</div>
            <div className="text-cosmic-neon-green/80 text-xs mt-1">Click to expand</div>
          </div>
        )}
      </div>
      
      {/* Enhanced inner accent elements */}
      <div className="absolute bottom-2 right-2 w-3 h-3 rounded-full bg-cosmic-neon-green/10"></div>
      <div className="absolute top-3 right-3 w-8 h-[1px] bg-cosmic-neon-green/20 rotate-45"></div>
    </div>
  );
};

export default BusinessUnitBox;
