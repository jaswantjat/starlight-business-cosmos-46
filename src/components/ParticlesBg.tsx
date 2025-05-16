
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const ParticlesBg: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 50;
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    
    // Particles
    const particlesCount = Math.min(2000, window.innerWidth * 0.8);
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesPositions = new Float32Array(particlesCount * 3);
    
    // Colors - using the cosmic color scheme
    const colors = [
      new THREE.Color('#4AE3B5'), // Neon green
      new THREE.Color('#7A88FB'), // Neon blue 
      new THREE.Color('#B467FB'), // Neon purple
    ];
    
    const particlesColors = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount; i++) {
      // Position
      particlesPositions[i * 3] = (Math.random() - 0.5) * 100;
      particlesPositions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      particlesPositions[i * 3 + 2] = (Math.random() - 0.5) * 50;
      
      // Color
      const color = colors[Math.floor(Math.random() * colors.length)];
      particlesColors[i * 3] = color.r;
      particlesColors[i * 3 + 1] = color.g;
      particlesColors[i * 3 + 2] = color.b;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(particlesPositions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(particlesColors, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.15,
      transparent: true,
      opacity: 0.6,
      vertexColors: true,
      sizeAttenuation: true,
    });
    
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    
    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Rotate particles slightly
      particles.rotation.x += 0.0001;
      particles.rotation.y += 0.0002;
      
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
      window.removeEventListener('resize', handleResize);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose resources
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, []);
  
  return (
    <div 
      ref={containerRef} 
      className="fixed top-0 left-0 w-full h-full -z-10"
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default ParticlesBg;
