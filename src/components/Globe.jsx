import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const GlobeGeometry = () => {
  const meshRef = useRef();
  const pointsRef = useRef();

  // Rotate the globe
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003;
    }
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.003;
    }
  });

  // Create dots for continents
  const points = useMemo(() => {
    const points = [];
    const radius = 1.5; // Smaller radius for shorter globe
    
    // Create points on sphere surface
    for (let lat = -90; lat <= 90; lat += 8) {
      for (let lon = -180; lon <= 180; lon += 8) {
        // Simple continent pattern (crude approximation)
        const isLand = 
          (lat > 10 && lat < 70 && lon > -10 && lon < 50) || // Europe/Africa
          (lat > -10 && lat < 50 && lon > 60 && lon < 150) || // Asia
          (lat > -50 && lat < -10 && lon > 110 && lon < 160) || // Australia
          (lat > 25 && lat < 70 && lon > -130 && lon < -60) || // North America
          (lat > -55 && lat < 15 && lon > -85 && lon < -35); // South America
        
        if (isLand && Math.random() > 0.3) {
          const phi = (90 - lat) * (Math.PI / 180);
          const theta = (lon + 180) * (Math.PI / 180);
          
          const x = radius * Math.sin(phi) * Math.cos(theta);
          const y = radius * Math.cos(phi);
          const z = radius * Math.sin(phi) * Math.sin(theta);
          
          points.push(x, y, z);
        }
      }
    }
    
    return new Float32Array(points);
  }, []);

  return (
    <group>
      {/* Globe wireframe */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshBasicMaterial 
          color="#1e3a5f"
          wireframe
          transparent
          opacity={0.1}
        />
      </mesh>

      {/* Globe surface */}
      <Sphere args={[1.48, 32, 32]}>
        <meshPhongMaterial
          color="#0a1929"
          transparent
          opacity={0.3}
          shininess={10}
        />
      </Sphere>

      {/* Continental dots */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={points.length / 3}
            array={points}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.04}
          color="#38bdf8"
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>

      {/* Atmosphere glow */}
      <Sphere args={[1.6, 32, 32]}>
        <meshPhongMaterial
          color="#38bdf8"
          transparent
          opacity={0.05}
          side={THREE.BackSide}
        />
      </Sphere>
    </group>
  );
};

const Globe = () => {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 3.5], fov: 45 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#38bdf8" />
        
        <GlobeGeometry />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
};

export default Globe;