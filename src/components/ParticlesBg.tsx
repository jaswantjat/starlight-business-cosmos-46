
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const ParticlesBg: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    
    // Camera setup with improved depth
    const camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.1,
      2000
    );
    camera.position.z = 80;
    
    // Renderer setup with enhanced antialiasing
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    
    // Enhanced Particles with higher count
    const particlesCount = Math.min(3500, window.innerWidth);
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesPositions = new Float32Array(particlesCount * 3);
    const particlesSizes = new Float32Array(particlesCount);
    
    // Enhanced Colors - using the cosmic color scheme
    const colors = [
      new THREE.Color('#4AE3B5'), // Neon green
      new THREE.Color('#7A88FB'), // Neon blue 
      new THREE.Color('#B467FB'), // Neon purple
      new THREE.Color('#24CDD8'), // Neon teal
    ];
    
    const particlesColors = new Float32Array(particlesCount * 3);
    
    // Create main particle cloud
    for (let i = 0; i < particlesCount; i++) {
      // Position with enhanced depth and distribution
      const radius = 90 + Math.random() * 30;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      particlesPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlesPositions[i * 3 + 1] = radius * Math.cos(phi);
      particlesPositions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta) * 0.5; // Flatter on z-axis
      
      // Add varied sizes
      particlesSizes[i] = Math.random() * 1.5;
      
      // Color - using the cosmic color scheme with intensity variation
      const color = colors[Math.floor(Math.random() * colors.length)];
      const intensity = 0.5 + Math.random() * 0.5; // Variable brightness
      
      particlesColors[i * 3] = color.r * intensity;
      particlesColors[i * 3 + 1] = color.g * intensity;
      particlesColors[i * 3 + 2] = color.b * intensity;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(particlesPositions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(particlesColors, 3));
    particlesGeometry.setAttribute('size', new THREE.BufferAttribute(particlesSizes, 1));
    
    // Custom shader material for enhanced particles
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.2,
      transparent: true,
      opacity: 0.7,
      vertexColors: true,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
    });
    
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    
    // Add some larger "highlight" particles
    const highlightGeometry = new THREE.BufferGeometry();
    const highlightCount = 30;
    const highlightPositions = new Float32Array(highlightCount * 3);
    const highlightSizes = new Float32Array(highlightCount);
    const highlightColors = new Float32Array(highlightCount * 3);
    
    for (let i = 0; i < highlightCount; i++) {
      // Position with enhanced depth and distribution
      const radius = 70 + Math.random() * 50;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      highlightPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      highlightPositions[i * 3 + 1] = radius * Math.cos(phi);
      highlightPositions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta) * 0.5;
      
      // Add varied sizes - larger
      highlightSizes[i] = 1.5 + Math.random() * 3;
      
      // Color - using brighter versions of the cosmic colors
      const color = colors[Math.floor(Math.random() * colors.length)];
      const intensity = 0.8 + Math.random() * 0.2; // Brighter
      
      highlightColors[i * 3] = color.r * intensity;
      highlightColors[i * 3 + 1] = color.g * intensity;
      highlightColors[i * 3 + 2] = color.b * intensity;
    }
    
    highlightGeometry.setAttribute('position', new THREE.BufferAttribute(highlightPositions, 3));
    highlightGeometry.setAttribute('color', new THREE.BufferAttribute(highlightColors, 3));
    highlightGeometry.setAttribute('size', new THREE.BufferAttribute(highlightSizes, 1));
    
    const highlightMaterial = new THREE.PointsMaterial({
      size: 1,
      transparent: true,
      opacity: 0.9,
      vertexColors: true,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
    });
    
    const highlights = new THREE.Points(highlightGeometry, highlightMaterial);
    scene.add(highlights);

    // Add circuit-like lines connecting some particles
    const linesMaterial = new THREE.LineBasicMaterial({ 
      color: 0x4AE3B5, 
      transparent: true,
      opacity: 0.2,
    });
    
    const linesCount = 20;
    const lines: THREE.Line[] = [];
    
    for (let i = 0; i < linesCount; i++) {
      const lineGeometry = new THREE.BufferGeometry();
      const linePointsCount = Math.floor(Math.random() * 3) + 2; // 2-4 points per line
      const linePositions = new Float32Array(linePointsCount * 3);
      
      // Create random points for the line with similar spatial distribution
      for (let j = 0; j < linePointsCount; j++) {
        const radius = 70 + Math.random() * 50;
        const theta = (Math.random() * Math.PI * 0.5) + (i / linesCount) * Math.PI * 2;
        const phi = (Math.random() * Math.PI * 0.3) + Math.PI * 0.3;
        
        linePositions[j * 3] = radius * Math.sin(phi) * Math.cos(theta);
        linePositions[j * 3 + 1] = radius * Math.cos(phi);
        linePositions[j * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta) * 0.5;
      }
      
      lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
      const line = new THREE.Line(lineGeometry, linesMaterial);
      scene.add(line);
      lines.push(line);
    }
    
    // Mouse interaction for parallax effect
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    
    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Animation with parallax effect
    const clock = new THREE.Clock();
    
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      requestAnimationFrame(animate);
      
      // Smooth camera movement following mouse
      targetX = mouseX * 10;
      targetY = -mouseY * 10;
      camera.position.x += (targetX - camera.position.x) * 0.05;
      camera.position.y += (targetY - camera.position.y) * 0.05;
      camera.lookAt(scene.position);
      
      // Rotate particles slowly
      particles.rotation.y = elapsedTime * 0.05;
      highlights.rotation.y = -elapsedTime * 0.03;
      
      // Animate lines
      lines.forEach((line, i) => {
        line.rotation.y = elapsedTime * 0.03 + i * 0.01;
        line.rotation.x = Math.sin(elapsedTime * 0.2 + i) * 0.1;
      });
      
      // Render
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose resources
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      highlightGeometry.dispose();
      highlightMaterial.dispose();
      
      lines.forEach(line => {
        line.geometry.dispose();
        if (line.material instanceof THREE.Material) {
          line.material.dispose();
        }
      });
      
      renderer.dispose();
    };
  }, []);
  
  return (
    <div 
      ref={containerRef} 
      className="fixed top-0 left-0 w-full h-full -z-10 bg-cosmic-bg-dark"
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default ParticlesBg;
