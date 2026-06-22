'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useRouter } from 'next/navigation';
import * as THREE from 'three';
import { Edges, MeshTransmissionMaterial, Float } from '@react-three/drei';

function ModelPart({
  id,
  children,
  defaultColor,
  hoverColor,
  scale = 1
}: {
  id: string;
  children: React.ReactNode;
  defaultColor: string;
  hoverColor: string;
  scale?: number;
}) {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const router = useRouter();

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const targetScale = hovered ? scale * 1.05 : scale;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 5);
  });

  return (
    <group
      ref={meshRef}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={(e) => {
        setHovered(false);
        document.body.style.cursor = 'auto';
      }}
      onClick={(e) => {
        e.stopPropagation();
        // Uses parallel routing + intercepting route
        router.push(`/parts/${id}`, { scroll: false });
      }}
    >
      {/* We pass a dynamic color context down to materials if needed, but here we can just clone or apply to children if we structured it. 
          For simplicity, we'll let the children handle their own materials, but the scale animation applies here. */}
      {children}
    </group>
  );
}

export default function ConfiguratorModel() {
  const coreMaterial = useRef<THREE.MeshPhysicalMaterial>(null);
  
  useFrame((state) => {
    if (coreMaterial.current) {
      coreMaterial.current.emissiveIntensity = 2 + Math.sin(state.clock.elapsedTime * 3) * 1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group position={[0, 0, 0]}>
        
        {/* Central Core */}
        <ModelPart id="core" defaultColor="#ff0055" hoverColor="#ff3377" scale={1}>
          <mesh>
            <icosahedronGeometry args={[1, 1]} />
            <meshPhysicalMaterial 
              ref={coreMaterial}
              color="#ff0055" 
              emissive="#ff0055" 
              emissiveIntensity={2}
              roughness={0.2} 
              metalness={0.8} 
              wireframe
            />
          </mesh>
          <mesh>
            <icosahedronGeometry args={[0.8, 2]} />
            <meshPhysicalMaterial 
              color="#ffffff" 
              emissive="#ffffff" 
              emissiveIntensity={1}
              roughness={0} 
              metalness={1} 
            />
          </mesh>
        </ModelPart>

        {/* Stabilization Rings */}
        <ModelPart id="rings" defaultColor="#00ddff" hoverColor="#55eeff" scale={1}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[2, 0.05, 16, 100]} />
            <meshStandardMaterial color="#00ddff" emissive="#00ddff" emissiveIntensity={0.5} />
          </mesh>
          <mesh rotation={[Math.PI / 2.5, Math.PI / 4, 0]}>
            <torusGeometry args={[2.2, 0.02, 16, 100]} />
            <meshStandardMaterial color="#00ddff" emissive="#00ddff" emissiveIntensity={0.2} />
          </mesh>
          <mesh rotation={[Math.PI / 1.5, -Math.PI / 4, 0]}>
            <torusGeometry args={[2.4, 0.02, 16, 100]} />
            <meshStandardMaterial color="#00ddff" emissive="#00ddff" emissiveIntensity={0.2} />
          </mesh>
        </ModelPart>

        {/* Outer Shell */}
        <ModelPart id="shell" defaultColor="#222222" hoverColor="#444444" scale={1}>
          <mesh>
            <dodecahedronGeometry args={[2.8, 0]} />
            <MeshTransmissionMaterial 
              backside
              samples={4}
              thickness={0.5}
              chromaticAberration={0.05}
              anisotropy={0.1}
              distortion={0.2}
              distortionScale={0.5}
              temporalDistortion={0.1}
              color="#222222"
            />
            <Edges threshold={15} color="white" />
          </mesh>
        </ModelPart>

      </group>
    </Float>
  );
}
