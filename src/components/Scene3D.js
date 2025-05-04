import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  Text, 
  MeshReflectorMaterial,
  Sparkles,
  PerspectiveCamera
} from '@react-three/drei';
import * as THREE from 'three';

// Simple Chip Component
const Chip = () => {
  const chipRef = useRef();
  const textRef = useRef();
  
  // Basic chip parameters
  const chipSize = 1.2;
  const chipThickness = 0.08;
  const chipColor = "#1a082d";
  const borderColor = "#A855F7";
  
  // Simple animation
  useFrame(({ clock }) => {
    if (textRef.current) {
      textRef.current.material.emissiveIntensity = 1.2 + Math.sin(clock.getElapsedTime() * 2) * 0.3;
    }
  });

  return (
    <group ref={chipRef} position={[0, 0.4, 0]}>
      {/* Chip base */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[chipSize, chipThickness, chipSize]} />
        <meshStandardMaterial 
          color={chipColor} 
          metalness={0.7} 
          roughness={0.2}
        />
      </mesh>
      
      {/* Chip border */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[chipSize + 0.05, chipThickness + 0.01, chipSize + 0.05]} />
        <meshStandardMaterial 
          color={borderColor} 
          emissive={borderColor} 
          emissiveIntensity={0.8} 
          metalness={0.6} 
          roughness={0.3} 
          transparent 
          opacity={0.7} 
        />
      </mesh>
      
      {/* GM Text - flat on the chip */}
      <Text
        ref={textRef}
        position={[0, chipThickness / 2 + 0.01, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.5}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        fontWeight={800}
        outlineColor="#A855F7"
        outlineWidth={0.04}
        emissive="#A855F7"
        emissiveIntensity={1.2}
      >
        GM
      </Text>
      
      {/* Sparkles around the chip - very slow */}
      <Sparkles 
        count={40} 
        scale={[2, 0.5, 2]} 
        size={4} 
        speed={0.01} // Very slow sparkles
        opacity={0.6} 
        color="#A855F7" 
      />
    </group>
  );
};

// Simple Grid Floor
const GridFloor = () => {
  // Create a simplified grid with fewer elements
  const gridSize = 6;
  const chips = [];

  for (let x = -gridSize/2; x <= gridSize/2; x++) {
    for (let z = -gridSize/2; z <= gridSize/2; z++) {
      // Skip the center for chip placement
      if (Math.abs(x) < 1 && Math.abs(z) < 1) continue;
      
      chips.push(
        <mesh 
          key={`${x},${z}`}
          position={[x * 1.2, 0, z * 1.2]} 
          receiveShadow
        >
          <boxGeometry args={[0.8, 0.04, 0.8]} />
          <meshStandardMaterial
            color="#1a082d"
            emissive="#A855F7"
            emissiveIntensity={0.1}
            metalness={0.6}
            roughness={0.3}
          />
        </mesh>
      );
    }
  }

  return (
    <group position={[0, 0, 0]}>
      {chips}
      
      {/* Reflective floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
        <planeGeometry args={[20, 20]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={512}
          mixBlur={0.8}
          mixStrength={10}
          depthScale={1}
          minDepthThreshold={0.85}
          color="#050314"
          metalness={0.5}
          roughness={0.9}
          mirror={0.5}
        />
      </mesh>
      
      {/* Main sparkles - extremely slow */}
      <Sparkles 
        count={80}
        scale={[15, 3, 15]}
        size={5}
        speed={0.008} // Extremely slow movement
        opacity={0.5}
        color="#A855F7"
      />
      
      {/* Additional sparkle layers */}
      <Sparkles 
        count={50}
        scale={[12, 3, 12]}
        size={4}
        speed={0.005} // Nearly static
        opacity={0.3}
        color="#3f2d69"
      />
      
      <Sparkles 
        count={30}
        scale={[10, 2, 10]}
        size={3}
        speed={0.01} 
        opacity={0.4}
        color="#7c3aed"
      />
    </group>
  );
};

// Simple Mouse Control
const MouseControl = ({ children }) => {
  const groupRef = useRef();
  const targetRotation = useRef({ x: 0, y: 0 });
  
  // Set up mouse movement tracking
  useEffect(() => {
    const handleMouseMove = (event) => {
      // Calculate target rotation based on mouse position
      targetRotation.current = {
        x: (-(event.clientY / window.innerHeight) * 2 + 1) * 0.2,
        y: ((event.clientX / window.innerWidth) * 2 - 1) * 0.4
      };
    };
    
    // Support touch devices
    const handleTouchMove = (event) => {
      if (event.touches.length > 0) {
        const touch = event.touches[0];
        targetRotation.current = {
          x: (-(touch.clientY / window.innerHeight) * 2 + 1) * 0.2,
          y: ((touch.clientX / window.innerWidth) * 2 - 1) * 0.4
        };
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);
  
  // Apply smooth rotation
  useFrame(() => {
    if (groupRef.current) {
      // Smooth transition with lerp
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetRotation.current.x,
        0.05
      );
      
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotation.current.y,
        0.05
      );
    }
  });
  
  return (
    <group ref={groupRef}>
      {children}
    </group>
  );
};

// Main Scene3D component (simplified)
const Scene3D = ({ height = '100vh' }) => {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      style={{ 
        width: '100%', 
        height,
        position: 'relative',
        backgroundColor: 'transparent',
        zIndex: -1
      }}
      className="scene-3d-container"
    >
      <Canvas 
        shadows
        gl={{ 
          antialias: true,
          alpha: true,
        }}
        camera={{ position: [0, 3, 6], fov: 45 }}
        style={{
          position: 'absolute',
          zIndex: 1
        }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[0, 4, 0]} intensity={0.8} color="#A855F7" castShadow />
        <pointLight position={[5, 2, -5]} intensity={0.4} color="#3f2d69" />
        
        <MouseControl>
          <Chip />
          <GridFloor />
        </MouseControl>
      </Canvas>
    </div>
  );
};

export default Scene3D;