'use client';

import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, Stars, PerspectiveCamera } from '@react-three/drei';
import { Suspense } from 'react';
import ConfiguratorModel from './ConfiguratorModel';

export default function Scene() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 2, 8], fov: 45 }}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 2]}
      >
        <color attach="background" args={['#050505']} />
        <fog attach="fog" args={['#050505', 10, 30]} />

        <Suspense fallback={null}>
          <Environment preset="city" />
          <Stars radius={50} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          
          <ambientLight intensity={0.2} />
          <directionalLight position={[5, 5, 5]} intensity={2} color="#4fc3f7" />
          <pointLight position={[-5, -5, -5]} intensity={1} color="#f48fb1" />
          <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={2} castShadow color="#ffffff" />

          <ConfiguratorModel />
          
          <OrbitControls 
            enablePan={false}
            minDistance={4}
            maxDistance={12}
            maxPolarAngle={Math.PI / 1.5}
            minPolarAngle={Math.PI / 3}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
