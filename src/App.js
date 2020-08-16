import React from "react";
import { Canvas, useThree, extend } from "react-three-fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import "./App.css";

const Cube = (props) => {
  return (
    <mesh {...props}>
      <boxBufferGeometry attach='geometry' args={[2, 2, 1]} />
      <meshStandardMaterial attach='material' color='tomato' />
    </mesh>
  );
};
// args = [width, height, depth]

extend({ OrbitControls });

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
