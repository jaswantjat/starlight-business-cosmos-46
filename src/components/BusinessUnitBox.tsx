
import React, { useRef, useEffect } from 'react';
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
  
  // Calculate position based on index and total
  useEffect(() => {
    if (!boxRef.current) return;
    
    const angle = (index / total) * Math.PI * 2;
    const radius = Math.min(window.innerWidth * 0.2, 200); 
    const offsetX = Math.sin(angle) * radius;
    const offsetY = Math.cos(angle) * radius;
    
    // Initial position - come from the center
    gsap.set(boxRef.current, {
      x: 0,
      y: 0,
      opacity: 0,
      scale: 0.5,
    });
    
    // Animate to final position
    gsap.to(boxRef.current, {
      x: offsetX,
      y: offsetY,
      opacity: 1,
      scale: 1,
      delay: animationDelay + index * 0.1,
      duration: 1.2,
      ease: "back.out(1.5)",
    });
    
    // Add floating animation
    gsap.to(boxRef.current, {
      y: offsetY + (Math.random() * 20 - 10),
      x: offsetX + (Math.random() * 20 - 10),
      rotation: Math.random() * 8 - 4,
      duration: 3 + Math.random() * 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: animationDelay + index * 0.1 + 1.2,
    });
    
  }, [index, total, animationDelay]);
  
  // Determine a color for each box
  const colors = ['neon-green', 'neon-blue', 'neon-purple'];
  const colorIndex = index % colors.length;
  const colorClass = `cosmic-${colors[colorIndex]}`;
  const glowClass = colorIndex === 0 ? 'neon-border' : 
                   colorIndex === 1 ? 'neon-blue-border' : 
                   'neon-purple-border';
  
  return (
    <div 
      ref={boxRef}
      className={cn(
        "absolute glass-panel rounded-lg p-4 shadow-lg transform transition-transform",
        "w-32 h-32 flex items-center justify-center",
        glowClass
      )}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
    >
      <div 
        className={cn(
          "text-center font-medium text-sm",
          `text-${colorClass}`,
          "text-glow"
        )}
      >
        {name}
      </div>
    </div>
  );
};

export default BusinessUnitBox;
