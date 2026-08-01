import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';

const Crop = ({ position, color, height }) => {
  const ref = useRef();
  useFrame(({ clock }) => {
    ref.current.rotation.z = Math.sin(clock.getElapsedTime() + position[0]) * 0.05;
  });
  return (
    <group ref={ref} position={position}>
      <mesh position={[0, height/2, 0]}>
        <cylinderGeometry args={[0.05, 0.08, height]} />
        <meshStandardMaterial color="#4a7c4e" />
      </mesh>
      <mesh position={[0, height + 0.2, 0]}>
        <sphereGeometry args={[0.18]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
};

const Ground = () => (
  <mesh rotation={[-Math.PI/2, 0, 0]} receiveShadow>
    <planeGeometry args={[20, 20]} />
    <meshStandardMaterial color="#2d5a27" />
  </mesh>
);

const FarmScene = () => {
  const crops = [];
  for (let x = -4; x <= 4; x += 1.2) {
    for (let z = -4; z <= 4; z += 1.2) {
      crops.push({
        position: [x, 0, z],
        color: ['#7bc67e','#a8d5a2','#58b75e','#89d08f'][Math.floor(Math.random()*4)],
        height: 0.6 + Math.random() * 0.4
      });
    }
  }

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1.2} castShadow />
      <pointLight position={[0, 5, 0]} color="#ffdd88" intensity={0.4} />
      <Ground />
      {crops.map((c, i) => <Crop key={i} {...c} />)}
      <Text position={[0, 3, -5]} fontSize={0.5} color="#00D26A">
        AgroFarm AI
      </Text>
    </>
  );
};

const FarmScene3D = () => (
  <div className="glass-card" style={{ height:'500px' }}>
    <h3 style={{ color:'var(--accent)', marginBottom:'1rem' }}>
      🌿 Interactive 3D Farm — Drag to explore
    </h3>
    <div style={{ height:'420px', borderRadius:'12px', overflow:'hidden' }}>
      <Canvas camera={{ position:[0, 5, 10], fov:50 }} shadows>
        <FarmScene />
        <OrbitControls enablePan={true} enableZoom={true} />
      </Canvas>
    </div>
  </div>
);

export default FarmScene3D;