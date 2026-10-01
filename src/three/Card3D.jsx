import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// A floating 3D bank card — gentle idle rotation plus mouse tilt.
function Card() {
  const group = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    if (!group.current) return;
    mouse.current.x += (state.pointer.x - mouse.current.x) * 0.06;
    mouse.current.y += (state.pointer.y - mouse.current.y) * 0.06;
    const t = state.clock.elapsedTime;
    group.current.rotation.y = mouse.current.x * 0.5 + Math.sin(t * 0.4) * 0.15 - 0.35;
    group.current.rotation.x = -mouse.current.y * 0.35 + Math.sin(t * 0.5) * 0.06 + 0.12;
    group.current.position.y = Math.sin(t * 0.7) * 0.12;
  });

  return (
    <group ref={group} rotation={[0.12, -0.35, 0]}>
      {/* Card body */}
      <mesh castShadow>
        <boxGeometry args={[3.3, 2.1, 0.08]} />
        <meshStandardMaterial color="#10b981" roughness={0.28} metalness={0.6} />
      </mesh>
      {/* Chip */}
      <mesh position={[-1, 0.45, 0.05]}>
        <boxGeometry args={[0.42, 0.32, 0.03]} />
        <meshStandardMaterial color="#eafff5" roughness={0.3} metalness={0.8} />
      </mesh>
      {/* Number strip */}
      <mesh position={[-0.2, -0.35, 0.05]}>
        <boxGeometry args={[2.4, 0.16, 0.02]} />
        <meshStandardMaterial color="#04140d" roughness={0.5} metalness={0.2} opacity={0.5} transparent />
      </mesh>
      {/* Accent bar */}
      <mesh position={[1.0, 0.55, 0.05]}>
        <boxGeometry args={[0.5, 0.5, 0.02]} />
        <meshStandardMaterial color="#eafff5" roughness={0.2} metalness={0.9} />
      </mesh>
    </group>
  );
}

export default function Card3D() {
  return (
    <Canvas camera={{ position: [0, 0, 5.4], fov: 40 }} dpr={[1, 1.6]} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 5, 5]} intensity={1.8} />
      <pointLight position={[-4, -2, 2]} intensity={1.1} color="#34d399" />
      <Suspense fallback={null}>
        <Card />
      </Suspense>
    </Canvas>
  );
}
