
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface EnhancedParticlesProps {
  density?: 'low' | 'medium' | 'high';
  interactive?: boolean;
  colorScheme?: 'cosmic' | 'aurora' | 'neon';
}

const EnhancedParticles: React.FC<EnhancedParticlesProps> = ({ 
  density = 'medium',
  interactive = true,
  colorScheme = 'cosmic'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    
    // Camera setup with improved depth
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      2000
    );
    camera.position.z = 90;
    
    // Renderer setup with enhanced antialiasing
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    
    // Determine particle count based on density and screen size
    let particleMultiplier = 1;
    switch(density) {
      case 'low': particleMultiplier = 0.5; break;
      case 'high': particleMultiplier = 2; break;
      default: particleMultiplier = 1;
    }
    
    const particlesCount = Math.min(4000 * particleMultiplier, window.innerWidth * 2);
    
    // Enhanced geometric particles setup
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesPositions = new Float32Array(particlesCount * 3);
    const particlesSizes = new Float32Array(particlesCount);
    
    // Color schemes based on the prop
    let colors: THREE.Color[] = [];
    
    switch(colorScheme) {
      case 'aurora':
        colors = [
          new THREE.Color('#4AE3B5'), // Neon green
          new THREE.Color('#05D8E8'), // Cyan
          new THREE.Color('#9945FF'), // Purple
          new THREE.Color('#14F195'), // Mint
        ];
        break;
      case 'neon':
        colors = [
          new THREE.Color('#FE53BB'), // Pink
          new THREE.Color('#09FBD3'), // Cyan
          new THREE.Color('#F5D300'), // Yellow
          new THREE.Color('#7122FA'), // Purple
        ];
        break;
      default: // cosmic
        colors = [
          new THREE.Color('#4AE3B5'), // Neon green
          new THREE.Color('#7A88FB'), // Neon blue 
          new THREE.Color('#B467FB'), // Neon purple
          new THREE.Color('#24CDD8'), // Neon teal
        ];
    }
    
    const particlesColors = new Float32Array(particlesCount * 3);
    
    // Create dynamic particle field with varied depth
    for (let i = 0; i < particlesCount; i++) {
      // Create spherical distribution with more depth variation
      const radius = 100 + Math.random() * 80;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      // Squish the z dimension for a flatter but still 3D field
      const zSquish = 0.3 + Math.random() * 0.4; // Between 0.3 and 0.7
      
      particlesPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlesPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlesPositions[i * 3 + 2] = radius * Math.cos(phi) * zSquish;
      
      // Varied particle sizes
      particlesSizes[i] = Math.random() * (i % 5 === 0 ? 2.5 : 1.2);
      
      // Enhanced coloring with brightness variation
      const color = colors[Math.floor(Math.random() * colors.length)];
      const brightness = 0.4 + Math.random() * 0.6; // More varied brightness
      
      particlesColors[i * 3] = color.r * brightness;
      particlesColors[i * 3 + 1] = color.g * brightness;
      particlesColors[i * 3 + 2] = color.b * brightness;
    }
    
    // Set geometry attributes
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(particlesPositions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(particlesColors, 3));
    particlesGeometry.setAttribute('size', new THREE.BufferAttribute(particlesSizes, 1));
    
    // Custom shader material with enhanced glow and brightness
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.25,
      transparent: true,
      opacity: 0.8,
      vertexColors: true,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
    });
    
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    
    // Add prominent highlight particles
    const highlightGeometry = new THREE.BufferGeometry();
    const highlightCount = 40;
    const highlightPositions = new Float32Array(highlightCount * 3);
    const highlightSizes = new Float32Array(highlightCount);
    const highlightColors = new Float32Array(highlightCount * 3);
    
    for (let i = 0; i < highlightCount; i++) {
      // Distribute highlight particles more towards the center
      const radius = 50 + Math.random() * 60;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      highlightPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      highlightPositions[i * 3 + 1] = radius * Math.cos(phi);
      highlightPositions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta) * 0.3;
      
      // Larger sizes for highlights
      highlightSizes[i] = 2.5 + Math.random() * 3.5;
      
      // Brighter versions of the color scheme
      const color = colors[Math.floor(Math.random() * colors.length)];
      const intensity = 0.9 + Math.random() * 0.1;
      
      highlightColors[i * 3] = color.r * intensity;
      highlightColors[i * 3 + 1] = color.g * intensity;
      highlightColors[i * 3 + 2] = color.b * intensity;
    }
    
    highlightGeometry.setAttribute('position', new THREE.BufferAttribute(highlightPositions, 3));
    highlightGeometry.setAttribute('color', new THREE.BufferAttribute(highlightColors, 3));
    highlightGeometry.setAttribute('size', new THREE.BufferAttribute(highlightSizes, 1));
    
    const highlightMaterial = new THREE.PointsMaterial({
      size: 1.5,
      transparent: true,
      opacity: 1,
      vertexColors: true,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
    });
    
    const highlights = new THREE.Points(highlightGeometry, highlightMaterial);
    scene.add(highlights);

    // Enhanced nebula clouds using ShaderMaterial
    const createNebulaMesh = () => {
      const geometry = new THREE.PlaneGeometry(200, 200, 1, 1);
      
      // Custom cloud shader
      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          colorScheme: { value: colorScheme === 'cosmic' ? 0 : colorScheme === 'aurora' ? 1 : 2 }
        },
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform float time;
          uniform int colorScheme;
          varying vec2 vUv;
          
          // Noise functions
          float random(vec2 st) {
            return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
          }
          
          // Simplex noise approximation
          vec2 hash(vec2 p) {
            p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
            return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
          }
          
          float noise(vec2 p) {
            const float K1 = 0.366025404;
            const float K2 = 0.211324865;
            
            vec2 i = floor(p + (p.x + p.y) * K1);
            vec2 a = p - i + (i.x + i.y) * K2;
            vec2 o = step(a.yx, a.xy);    
            vec2 b = a - o + K2;
            vec2 c = a - 1.0 + 2.0 * K2;
            
            vec3 h = max(0.5 - vec3(dot(a, a), dot(b, b), dot(c, c)), 0.0);
            vec3 n = h * h * h * h * vec3(dot(a, hash(i + 0.0)), dot(b, hash(i + o)), dot(c, hash(i + 1.0)));
            
            return dot(n, vec3(70.0));
          }
          
          float fbm(vec2 p) {
            float value = 0.0;
            float amplitude = 0.5;
            float frequency = 1.0;
            // Domain warping for more interesting patterns
            p += time * 0.05;
            
            for (int i = 0; i < 6; i++) {
              value += amplitude * noise(p * frequency);
              frequency *= 2.0;
              amplitude *= 0.5;
              p = p * 1.1 + vec2(value * 0.2, value * 0.1);
            }
            return value;
          }
          
          // Function to blend colors based on colorScheme
          vec3 getColor(float t) {
            // Cosmic theme (greens, blues, purples)
            if (colorScheme == 0) {
              vec3 color1 = vec3(0.0, 1.0, 0.6); // Green
              vec3 color2 = vec3(0.29, 0.34, 0.98); // Blue
              vec3 color3 = vec3(0.7, 0.27, 0.98); // Purple
              
              if (t < 0.33) {
                return mix(color1, color2, t * 3.0);
              } else if (t < 0.66) {
                return mix(color2, color3, (t - 0.33) * 3.0);
              } else {
                return mix(color3, color1, (t - 0.66) * 3.0);
              }
            }
            // Aurora theme (cyans, teals, purples)
            else if (colorScheme == 1) {
              vec3 color1 = vec3(0.02, 0.85, 0.91); // Cyan
              vec3 color2 = vec3(0.29, 0.88, 0.52); // Teal
              vec3 color3 = vec3(0.6, 0.27, 1.0); // Purple
              
              if (t < 0.33) {
                return mix(color1, color2, t * 3.0);
              } else if (t < 0.66) {
                return mix(color2, color3, (t - 0.33) * 3.0);
              } else {
                return mix(color3, color1, (t - 0.66) * 3.0);
              }
            }
            // Neon theme (pinks, cyans, purples)
            else {
              vec3 color1 = vec3(0.996, 0.325, 0.733); // Pink
              vec3 color2 = vec3(0.035, 0.984, 0.827); // Cyan
              vec3 color3 = vec3(0.443, 0.133, 0.98); // Purple
              
              if (t < 0.33) {
                return mix(color1, color2, t * 3.0);
              } else if (t < 0.66) {
                return mix(color2, color3, (t - 0.33) * 3.0);
              } else {
                return mix(color3, color1, (t - 0.66) * 3.0);
              }
            }
          }
          
          void main() {
            // Create warped coordinate space
            vec2 uv = vUv * 2.0 - 1.0;
            uv *= 1.5; // Scale up
            
            // Generate noise fields with time variation
            float noise1 = fbm(uv + time * 0.01);
            float noise2 = fbm(uv * 1.5 - time * 0.02);
            
            // Composite noise for cloud structure
            float nebula = smoothstep(0.1, 0.9, noise1 * noise2);
            
            // Edge fade out
            float dist = length(uv);
            float edge = 1.0 - smoothstep(0.8, 1.2, dist);
            
            // Time-varying color
            float colorMix = noise2 * 0.5 + 0.5;
            vec3 nebulaColor = getColor(colorMix + time * 0.05);
            
            // Final color and transparency
            vec3 finalColor = nebulaColor * nebula * edge * 0.6;
            gl_FragColor = vec4(finalColor, nebula * edge * 0.3);
          }
        `,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending
      });
      
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.z = -40;
      mesh.rotation.z = Math.random() * Math.PI;
      return mesh;
    };
    
    // Create multiple nebula layers for depth
    const nebulaLayers = [];
    for (let i = 0; i < 3; i++) {
      const nebula = createNebulaMesh();
      nebula.position.z = -20 - i * 30;
      nebula.rotation.x = Math.random() * 0.2;
      nebula.rotation.y = Math.random() * 0.2;
      nebula.scale.set(1 + i * 0.4, 1 + i * 0.4, 1);
      scene.add(nebula);
      nebulaLayers.push(nebula);
    }
    
    // Add circuit-like lines connecting some particles
    const linesMaterial = new THREE.LineBasicMaterial({ 
      color: colorScheme === 'neon' ? 0x09FBD3 : colorScheme === 'aurora' ? 0x14F195 : 0x4AE3B5, 
      transparent: true,
      opacity: 0.15,
    });
    
    const linesCount = 25;
    const lines: THREE.Line[] = [];
    
    for (let i = 0; i < linesCount; i++) {
      const lineGeometry = new THREE.BufferGeometry();
      const linePointsCount = Math.floor(Math.random() * 3) + 3; // 3-5 points per line
      const linePositions = new Float32Array(linePointsCount * 3);
      
      // Create random points for the line with similar spatial distribution
      for (let j = 0; j < linePointsCount; j++) {
        const radius = 60 + Math.random() * 50;
        const theta = (Math.random() * Math.PI * 0.5) + (i / linesCount) * Math.PI * 2;
        const phi = (Math.random() * Math.PI * 0.3) + Math.PI * 0.3;
        
        linePositions[j * 3] = radius * Math.sin(phi) * Math.cos(theta);
        linePositions[j * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        linePositions[j * 3 + 2] = radius * Math.cos(phi) * 0.5;
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
      if (!interactive) return;
      
      mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Animation loop with enhanced effects
    const clock = new THREE.Clock();
    
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      requestAnimationFrame(animate);
      
      // Smooth camera movement following mouse
      if (interactive) {
        targetX = mouseX * 15;
        targetY = -mouseY * 15;
        camera.position.x += (targetX - camera.position.x) * 0.05;
        camera.position.y += (targetY - camera.position.y) * 0.05;
      } else {
        // Gentle automatic camera movement if not interactive
        camera.position.x = Math.sin(elapsedTime * 0.15) * 10;
        camera.position.y = Math.cos(elapsedTime * 0.1) * 8;
      }
      camera.lookAt(scene.position);
      
      // Rotate particle systems
      particles.rotation.y = elapsedTime * 0.03;
      particles.rotation.x = Math.sin(elapsedTime * 0.02) * 0.1;
      highlights.rotation.y = -elapsedTime * 0.02;
      highlights.rotation.x = Math.cos(elapsedTime * 0.03) * 0.1;
      
      // Animate lines
      lines.forEach((line, i) => {
        line.rotation.y = elapsedTime * 0.02 + i * 0.01;
        line.rotation.x = Math.sin(elapsedTime * 0.15 + i) * 0.1;
      });
      
      // Animate nebula layers
      nebulaLayers.forEach((nebula, i) => {
        // Update time uniform for shader animation
        if (nebula.material instanceof THREE.ShaderMaterial) {
          nebula.material.uniforms.time.value = elapsedTime;
        }
        
        // Gentle rotation
        nebula.rotation.z = elapsedTime * 0.02 * (i % 2 ? 1 : -1);
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
      
      nebulaLayers.forEach(nebula => {
        nebula.geometry.dispose();
        if (nebula.material instanceof THREE.Material) {
          nebula.material.dispose();
        }
      });
      
      lines.forEach(line => {
        line.geometry.dispose();
        if (line.material instanceof THREE.Material) {
          line.material.dispose();
        }
      });
      
      renderer.dispose();
    };
  }, [density, interactive, colorScheme]);
  
  return (
    <div 
      ref={containerRef} 
      className="fixed top-0 left-0 w-full h-full -z-10 bg-cosmic-bg-dark"
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default EnhancedParticles;
