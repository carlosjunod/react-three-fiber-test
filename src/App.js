import React, { useState } from "react";
import { Canvas } from "react-three-fiber";
import "./App.css";

const Cube = ({ width, height, depth }) => {
  return (
    <mesh position={[0, 0, 0]} rotation={[10, 20, 0]}>
      <boxBufferGeometry attach='geometry' args={[width, height, depth]} />
      <meshStandardMaterial attach='material' color='tomato' />
    </mesh>
  );
};
// args = [width, height, depth]

const Scene = (props) => {
  return (
    <>
      <ambientLight />
      <pointLight intensity={0.3} position={[-1, -2, 4]} />
      <pointLight intensity={0.1} position={[2, -10, 10]} />
      <Cube {...props.cube} />
    </>
  );
};

function App() {
  const [width, setWidth] = useState(1);
  const [height, setHeight] = useState(1);
  const [depth, setDepth] = useState(1);

  return (
    <>
      <input
        onChange={(e) => setWidth(e.target.value)}
        type='range'
        id='width'
        name='width'
        min='1'
        max='10'
        step={0.1}
      />
      <input
        onChange={(e) => setHeight(e.target.value)}
        type='range'
        id='height'
        name='height'
        min='1'
        max='10'
        step={0.1}
      />
      <input
        onChange={(e) => setDepth(e.target.value)}
        type='range'
        id='depth'
        name='depth'
        min='1'
        max='10'
        step={0.1}
      />
      <Canvas>
        <Scene cube={{ width, height, depth }} />
      </Canvas>
    </>
  );
}

export default App;
