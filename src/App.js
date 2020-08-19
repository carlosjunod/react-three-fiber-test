import React, { useState, useRef } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import { OrbitControls, Box } from "drei";
import { a, useSpring } from "react-spring/three";
import { Controls, useControl } from "react-three-gui";
import "./App.css";

const Cube = (props) => {
  const [isBig, setIsBig] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef();

  useFrame(() => {
    ref.current.rotation.x += 0.01;
    ref.current.rotation.y += 0.01;
  });

  const { size, x } = useSpring({
    size: isBig ? [2, 2, 2] : [1, 1, 1],
    x: isBig ? 2 : 0,
  });

  const color = isHovered ? "#F9C231" : "tomato";

  return (
    <a.mesh
      {...props}
      ref={ref}
      onClick={() => setIsBig(!isBig)}
      position-x={x}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
      scale={size}
      receiveShadow={true}
      castShadow={true}
    >
      <torusBufferGeometry
        attach='geometry'
        args={[1, 0.4, 40, 60, Math.PI * 2]}
      />
      <meshPhongMaterial
        attach='material'
        roughness={0}
        metalness={1}
        color={color}
        emissive={0.3}
        shininess={200}
        // clearcoat={1}
      />
    </a.mesh>
  );
};
// args = [width, height, depth]

const Plane = () => {
  return (
    <mesh
      receiveShadow={true}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -3, 0]}
    >
      <planeGeometry attach='geometry' args={[50, 50]} />
      <meshPhongMaterial attach='material' color='skyblue' />
    </mesh>
  );
};

const Scene = () => {
  const positionX = useControl("Position X", {
    type: "number",
    max: 10,
    min: -10,
  });

  const color = useControl("Color", {
    type: "color",
    default: "lightblue",
  });

  return (
    <>
      <ambientLight />
      <pointLight intensity={0.6} position={[0, 6, 3]} castShadow={true} />
      {/* <pointLight intensity={0.1} position={[10, -10, 10]} /> */}
      <Cube position={[positionX, 3, 0]} rotation={[10, 20, 0]} />
      <Cube position={[0, 0, 0]} rotation={[10, 30, 10]} />
      <Box
        position={[-3, 2, 0]}
        rotation={[0, 0, 0]}
        receiveShadow={true}
        castShadow={true}
        args={[1, 1, 1]}
      >
        <meshPhongMaterial
          attach='material'
          roughness={0}
          metalness={1}
          color={color}
          shininess={200}
          // clearcoat={1}
        />
      </Box>
      <Plane />
      <OrbitControls />
    </>
  );
};

function App() {
  return (
    <>
      <Canvas shadowMap={true}>
        <Scene />
      </Canvas>
      <Controls />
    </>
  );
}

export default App;
