import React, { useState } from "react";
import { Canvas, useThree, extend } from "react-three-fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import "./App.css";

extend({ OrbitControls });

const Cube = (props) => {
  const [isBig, setIsBig] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const size = isBig ? 2 : 1;
  const color = isHovered ? "salmon" : "tomato";

  return (
    <mesh
      {...props}
      onClick={() => setIsBig(!isBig)}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
    >
      <boxBufferGeometry attach='geometry' args={[size, size, size]} />
      <meshStandardMaterial attach='material' color={color} />
    </mesh>
  );
};
// args = [width, height, depth]

const Scene = () => {
  const {
    camera,
    gl: { domElement },
  } = useThree();

  return (
    <>
      <ambientLight />
      <pointLight intensity={0.3} position={[-1, -2, 4]} />
      <pointLight intensity={0.1} position={[2, -10, 10]} />
      <Cube position={[0, 0, 0]} rotation={[10, 20, 0]} />
      <Cube position={[-2, 1, 0]} rotation={[10, 30, 10]} />

      <orbitControls args={[camera, domElement]} />
    </>
  );
};

function App() {
  return (
    <>
      <Canvas>
        <Scene />
      </Canvas>
    </>
  );
}

export default App;
