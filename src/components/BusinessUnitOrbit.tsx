
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface BusinessUnitOrbitProps {
  units: { name: string }[];
  companyName: string;
}

const BusinessUnitOrbit: React.FC<BusinessUnitOrbitProps> = ({ units, companyName }) => {
  const orbitRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const orbitContainerRef = useRef<HTMLDivElement>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Handle the physics-based orbit animation
  useEffect(() => {
    if (!units.length || !orbitRef.current || !centerRef.current || isInitialized) return;
    
    // Mark as initialized to prevent re-triggering
    setIsInitialized(true);
    
    // Initial pulse effect from center
    gsap.fromTo(centerRef.current, 
      { scale: 0, opacity: 0 },
      { 
        scale: 1, 
        opacity: 1, 
        duration: 1.5, 
        ease: "elastic.out(1.2, 0.5)",
        onComplete: () => {
          // Start continuous pulse effect
          gsap.to(centerRef.current, {
            boxShadow: "0 0 40px rgba(0, 255, 153, 0.8), 0 0 70px rgba(0, 255, 153, 0.4)",
            repeat: -1,
            yoyo: true,
            duration: 2.5,
            ease: "sine.inOut"
          });
        }
      }
    );
    
    // Dynamic orbit parameters
    const orbit = {
      radius: Math.min(orbitContainerRef.current?.offsetWidth || 300, 300) * 0.4,
      rotationSpeed: 0.1,
      wobbleAmount: 0.2,
      maxRandomOffset: 40,
      minRandomOffset: -40
    };

    // Create and position units with more physics-based effects
    const unitElements = document.querySelectorAll('[data-orbit-unit]');
    
    // Clear any existing animation timelines
    unitElements.forEach((element, i) => {
      // Individual rotation angle for each unit
      const angle = (i / units.length) * Math.PI * 2;
      
      // Random offsets for more organic feel
      const radiusOffset = Math.random() * (orbit.maxRandomOffset - orbit.minRandomOffset) + orbit.minRandomOffset;
      const finalRadius = orbit.radius + radiusOffset;
      
      // Calculate initial positions centered
      gsap.set(element, {
        opacity: 0,
        scale: 0.3,
        x: 0,
        y: 0,
        z: -100,
        rotationX: Math.random() * 180 - 90,
        rotationY: Math.random() * 180 - 90,
        rotationZ: Math.random() * 40 - 20,
      });
      
      // Animate to orbital positions with physics
      gsap.to(element, {
        x: Math.sin(angle) * finalRadius,
        y: Math.cos(angle) * finalRadius,
        z: Math.random() * 50 - 25,
        opacity: 1,
        scale: 1,
        rotationX: 0,
        rotationY: 0,
        rotationZ: Math.random() * 12 - 6,
        duration: 2.5,
        delay: 0.8 + i * 0.15,
        ease: "elastic.out(1, 0.75)",
        onComplete: () => {
          // Create custom animation timeline for each unit
          const tl = gsap.timeline({
            repeat: -1,
            yoyo: false
          });
          
          // Orbital path with wobble effect
          tl.to(element, {
            duration: 15 + Math.random() * 10, // Different durations for varied speed
            ease: "none",
            onUpdate: function() {
              // Current progress of the timeline (0-1)
              const progress = this.progress();
              
              // Calculate new position on the orbit
              const currentAngle = angle + progress * Math.PI * 2;
              
              // Add wobble effect
              const wobbleX = Math.sin(progress * 7) * (orbit.wobbleAmount * finalRadius);
              const wobbleY = Math.sin(progress * 5) * (orbit.wobbleAmount * finalRadius);
              const wobbleZ = Math.sin(progress * 9) * 15;
              
              // Update position
              gsap.set(element, {
                x: Math.sin(currentAngle) * finalRadius + wobbleX,
                y: Math.cos(currentAngle) * finalRadius + wobbleY,
                z: wobbleZ,
                rotationX: Math.sin(progress * 2) * 10,
                rotationY: Math.cos(progress * 3) * 10,
                rotationZ: Math.sin(progress * 4) * 5,
              });
            }
          });
          
          // Create connection lines after units are positioned
          if (i > 0 && i < unitElements.length) {
            createConnectionLine(element as HTMLElement, i, angle);
          }
        }
      });
    });
    
    // Create interactive hover effects for units
    unitElements.forEach((element) => {
      element.addEventListener('mouseenter', () => handleUnitHover(element as HTMLElement, true));
      element.addEventListener('mouseleave', () => handleUnitHover(element as HTMLElement, false));
      element.addEventListener('click', () => handleUnitClick(element as HTMLElement));
    });
    
    // Cleanup function
    return () => {
      unitElements.forEach((element) => {
        element.removeEventListener('mouseenter', () => handleUnitHover(element as HTMLElement, true));
        element.removeEventListener('mouseleave', () => handleUnitHover(element as HTMLElement, false));
        element.removeEventListener('click', () => handleUnitClick(element as HTMLElement));
        
        // Kill any active GSAP animations
        gsap.killTweensOf(element);
      });
      
      // Remove connection lines
      const connectionLines = document.querySelectorAll('.connection-line');
      connectionLines.forEach(line => {
        if (line.parentElement) {
          line.parentElement.removeChild(line);
        }
      });
    };
  }, [units, isInitialized]);
  
  // Enhanced hover effect with more dramatic animation
  const handleUnitHover = (element: HTMLElement, isHovering: boolean) => {
    if (isHovering) {
      // Scale up and increase glow
      gsap.to(element, {
        scale: 1.25,
        boxShadow: "0 0 30px rgba(0, 255, 153, 0.8), 0 0 50px rgba(0, 255, 153, 0.4)",
        duration: 0.5,
        ease: "power2.out",
        zIndex: 50
      });
      
      // Add ripple effect
      const ripple = document.createElement('div');
      ripple.className = 'absolute -z-10 rounded-full bg-cosmic-neon-green/10 pointer-events-none';
      ripple.style.top = '50%';
      ripple.style.left = '50%';
      ripple.style.transform = 'translate(-50%, -50%)';
      ripple.style.width = '10px';
      ripple.style.height = '10px';
      
      element.appendChild(ripple);
      
      gsap.to(ripple, {
        width: '200px',
        height: '200px',
        opacity: 0,
        duration: 1.5,
        onComplete: () => {
          if (element.contains(ripple)) {
            element.removeChild(ripple);
          }
        }
      });
    } else {
      // Return to normal
      gsap.to(element, {
        scale: 1,
        boxShadow: "0 0 15px rgba(0, 255, 153, 0.2), 0 0 30px rgba(0, 255, 153, 0.1)",
        duration: 0.5,
        ease: "power2.out",
        zIndex: 1,
        clearProps: "zIndex"
      });
    }
  };
  
  // Handle unit click with more dramatic animation
  const handleUnitClick = (element: HTMLElement) => {
    // Get unit name
    const unitName = element.getAttribute('data-unit-name') || '';
    
    // Unit focus animation
    gsap.timeline()
      .to(element, {
        scale: 1.4,
        duration: 0.3,
        ease: "back.out(1.5)"
      })
      .to(element, {
        scale: 1.2,
        duration: 0.4,
        ease: "elastic.out(1, 0.5)"
      });
    
    // Pulse effect from the center
    if (centerRef.current) {
      gsap.to(centerRef.current, {
        boxShadow: "0 0 60px rgba(0, 255, 153, 1), 0 0 100px rgba(0, 255, 153, 0.7)",
        scale: 1.3,
        duration: 0.3,
        yoyo: true,
        repeat: 1,
        ease: "power1.inOut"
      });
    }
    
    // Show toast with enhanced styling
    toast(`${unitName} - Business Unit of ${companyName}`, {
      position: "bottom-center",
      className: "glass-panel-dark border border-cosmic-neon-green/40",
      duration: 3000,
    });
  };
  
  // Create enhanced connection lines between units
  const createConnectionLine = (element: HTMLElement, index: number, angle: number) => {
    // Only connect to the previous unit for cleaner visual
    const prevIndex = (index - 1) % units.length;
    const prevElement = document.querySelector(`[data-orbit-index="${prevIndex}"]`) as HTMLElement;
    
    if (prevElement && element.parentElement) {
      const line = document.createElement('div');
      line.className = 'connection-line absolute z-0';
      
      // Improved styling for the connection line
      line.style.background = 'linear-gradient(90deg, rgba(0, 255, 153, 0.1), rgba(0, 255, 153, 0.6), rgba(0, 255, 153, 0.1))';
      line.style.height = '1px';
      line.style.transformOrigin = 'left center';
      
      element.parentElement.appendChild(line);
      
      const updateLine = () => {
        const rect1 = element.getBoundingClientRect();
        const rect2 = prevElement.getBoundingClientRect();
        
        // Calculate positions relative to container
        const containerRect = element.parentElement.getBoundingClientRect();
        
        const x1 = rect1.left + rect1.width/2 - containerRect.left;
        const y1 = rect1.top + rect1.height/2 - containerRect.top;
        const x2 = rect2.left + rect2.width/2 - containerRect.left;
        const y2 = rect2.top + rect2.height/2 - containerRect.top;
        
        // Calculate distance and angle for the line
        const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        const angleDeg = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
        
        // Position the line
        line.style.width = `${distance}px`;
        line.style.left = `${x1}px`;
        line.style.top = `${y1}px`;
        line.style.transform = `rotate(${angleDeg}deg)`;
        line.style.boxShadow = '0 0 8px rgba(0, 255, 153, 0.4)';
      };
      
      // Initial positioning
      updateLine();
      
      // Animate the line appearance
      gsap.fromTo(line, 
        { width: 0, opacity: 0 },
        { width: line.style.width, opacity: 0.8, duration: 1.5, ease: "power3.out", delay: 0.3 }
      );
      
      // Update line positions during animations
      const updateInterval = setInterval(updateLine, 100);
      
      // Return cleanup function
      return () => {
        clearInterval(updateInterval);
        if (line.parentElement) {
          line.parentElement.removeChild(line);
        }
      };
    }
  };

  return (
    <div className="relative w-full h-[60vh] perspective-container" ref={orbitRef}>
      {units.length > 0 && (
        <>
          {/* Center point with more dramatic pulse effect */}
          <div 
            ref={centerRef}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-cosmic-neon-green/20 flex items-center justify-center z-10"
          >
            <div className="w-12 h-12 rounded-full bg-cosmic-neon-green/50 animate-pulse-glow"></div>
            <div className="absolute w-32 h-32 rounded-full border border-cosmic-neon-green/20 animate-pulse-ring"></div>
            <div className="absolute w-40 h-40 rounded-full border border-cosmic-neon-green/15 animate-pulse-ring" style={{ animationDelay: '0.7s' }}></div>
            <div className="absolute w-48 h-48 rounded-full border border-cosmic-neon-green/10 animate-pulse-ring" style={{ animationDelay: '1.4s' }}></div>
            <div className="absolute w-56 h-56 rounded-full border border-cosmic-neon-green/5 animate-pulse-ring" style={{ animationDelay: '2.1s' }}></div>
          </div>
          
          {/* Container for all orbiting units */}
          <div ref={orbitContainerRef} className="relative w-full h-full flex items-center justify-center">
            {units.map((unit, index) => (
              <div 
                key={`${unit.name}-${index}`}
                data-orbit-unit
                data-orbit-index={index}
                data-unit-name={unit.name}
                className={cn(
                  "absolute glass-panel-dark rounded-lg p-4 shadow-lg transform",
                  "w-40 h-40 flex items-center justify-center",
                  "neon-green-border z-10",
                  "cursor-pointer transition-transform duration-300"
                )}
                style={{
                  transformStyle: 'preserve-3d',
                  perspective: '1000px',
                  transformOrigin: 'center center'
                }}
              >
                <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-3 rounded-md backdrop-blur-sm bg-black/30">
                  {/* Enhanced dot accent with animated glow */}
                  <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-cosmic-neon-green animate-pulse-glow"></div>
                  
                  {/* Circuit pattern overlay */}
                  <div className="absolute inset-0 circuit-bg opacity-20"></div>
                  
                  {/* Unit name with text glow */}
                  <div className="text-center font-medium text-base font-display tracking-wide text-cosmic-neon-green text-glow-green">
                    {unit.name}
                  </div>
                  
                  {/* Inner accent elements */}
                  <div className="absolute bottom-2 right-2 w-3 h-3 rounded-full bg-cosmic-neon-green/10"></div>
                  <div className="absolute top-3 right-3 w-8 h-[1px] bg-cosmic-neon-green/20 rotate-45"></div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default BusinessUnitOrbit;
