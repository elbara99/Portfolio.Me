import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import * as THREE from "three";

interface NeuronProps {
  position: [number, number, number];
  color: string;
  scale?: number;
  pulseDelay?: number;
}

const Neuron = ({ position, color, scale = 1, pulseDelay = 0 }: NeuronProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [intensity, setIntensity] = useState(0);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime + pulseDelay;
      const pulse = Math.sin(time * 2) * 0.3 + 0.7;
      meshRef.current.scale.setScalar(scale * pulse);
      setIntensity(pulse);
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.15, 16, 16]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={intensity * 0.8}
        roughness={0.2}
        metalness={0.8}
      />
    </mesh>
  );
};

interface ConnectionProps {
  start: [number, number, number];
  end: [number, number, number];
  color: string;
  pulseDelay?: number;
}

const Connection = ({ start, end, color, pulseDelay = 0 }: ConnectionProps) => {
  const lineRef = useRef<THREE.Line | null>(null);

  const lineObject = useMemo(() => {
    const points = [new THREE.Vector3(...start), new THREE.Vector3(...end)];
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.3 });
    return new THREE.Line(geometry, material);
  }, [start, end, color]);

  useFrame((state) => {
    if (lineRef.current) {
      const time = state.clock.elapsedTime + pulseDelay;
      const pulse = Math.sin(time * 3) * 0.4 + 0.5;
      (lineRef.current.material as THREE.LineBasicMaterial).opacity = pulse;
    }
  });

  return <primitive object={lineObject} ref={lineRef} />;
};

interface DataParticleProps {
  start: [number, number, number];
  end: [number, number, number];
  color: string;
  speed?: number;
  delay?: number;
}

const DataParticle = ({ start, end, color, speed = 1, delay = 0 }: DataParticleProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const time = ((state.clock.elapsedTime * speed + delay) % 2) / 2;
      meshRef.current.position.lerpVectors(
        new THREE.Vector3(...start),
        new THREE.Vector3(...end),
        time
      );
      meshRef.current.scale.setScalar(0.05 + Math.sin(time * Math.PI) * 0.05);
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshBasicMaterial color={color} transparent opacity={0.9} />
    </mesh>
  );
};

const MouseTracker = ({ onMouseMove }: { onMouseMove: (x: number, y: number) => void }) => {
  const { viewport } = useThree();

  useFrame((state) => {
    const x = (state.mouse.x * viewport.width) / 2;
    const y = (state.mouse.y * viewport.height) / 2;
    onMouseMove(x, y);
  });

  return null;
};

const NeuralNetworkScene = () => {
  const groupRef = useRef<THREE.Group>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Define network layers
  const layers = useMemo(() => {
    const inputLayer = Array.from({ length: 4 }, (_, i) => ({
      position: [-3, (i - 1.5) * 1.2, 0] as [number, number, number],
      color: "#22d3ee", // cyan
    }));

    const hidden1 = Array.from({ length: 5 }, (_, i) => ({
      position: [-1, (i - 2) * 1, 0] as [number, number, number],
      color: "#a855f7", // purple
    }));

    const hidden2 = Array.from({ length: 5 }, (_, i) => ({
      position: [1, (i - 2) * 1, 0] as [number, number, number],
      color: "#ec4899", // pink
    }));

    const outputLayer = Array.from({ length: 3 }, (_, i) => ({
      position: [3, (i - 1) * 1.2, 0] as [number, number, number],
      color: "#22c55e", // green
    }));

    return [inputLayer, hidden1, hidden2, outputLayer];
  }, []);

  // Generate connections between layers
  const connections = useMemo(() => {
    const conns: { start: [number, number, number]; end: [number, number, number]; color: string }[] = [];
    
    for (let l = 0; l < layers.length - 1; l++) {
      const currentLayer = layers[l];
      const nextLayer = layers[l + 1];
      
      currentLayer.forEach((neuron, i) => {
        nextLayer.forEach((nextNeuron, j) => {
          // Only show some connections to avoid clutter
          if ((i + j) % 2 === 0) {
            conns.push({
              start: neuron.position,
              end: nextNeuron.position,
              color: neuron.color,
            });
          }
        });
      });
    }
    
    return conns;
  }, [layers]);

  // Generate data particles
  const particles = useMemo(() => {
    return connections.slice(0, 15).map((conn, i) => ({
      ...conn,
      speed: 0.5 + Math.random() * 0.5,
      delay: Math.random() * 2,
    }));
  }, [connections]);

  useFrame(() => {
    if (groupRef.current) {
      // Smooth rotation following mouse
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        mousePos.x * 0.15,
        0.05
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -mousePos.y * 0.1,
        0.05
      );
    }
  });

  return (
    <>
      <MouseTracker onMouseMove={(x, y) => setMousePos({ x, y })} />
      
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#22d3ee" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#a855f7" />
      
      <Stars radius={50} depth={50} count={1000} factor={2} saturation={0} fade speed={1} />
      
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <group ref={groupRef}>
          {/* Render neurons */}
          {layers.map((layer, layerIndex) =>
            layer.map((neuron, neuronIndex) => (
              <Neuron
                key={`neuron-${layerIndex}-${neuronIndex}`}
                position={neuron.position}
                color={neuron.color}
                scale={1}
                pulseDelay={layerIndex * 0.5 + neuronIndex * 0.2}
              />
            ))
          )}

          {/* Render connections */}
          {connections.map((conn, index) => (
            <Connection
              key={`conn-${index}`}
              start={conn.start}
              end={conn.end}
              color={conn.color}
              pulseDelay={index * 0.1}
            />
          ))}

          {/* Render data particles */}
          {particles.map((particle, index) => (
            <DataParticle
              key={`particle-${index}`}
              start={particle.start}
              end={particle.end}
              color="#ffffff"
              speed={particle.speed}
              delay={particle.delay}
            />
          ))}
        </group>
      </Float>
    </>
  );
};

const NeuralNetworkVisualization = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div 
      className={`w-full h-full transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      style={{ minHeight: '400px' }}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <NeuralNetworkScene />
      </Canvas>
      
    </div>
  );
};

export default NeuralNetworkVisualization;
