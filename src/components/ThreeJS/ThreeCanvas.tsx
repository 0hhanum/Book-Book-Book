import React from "react";
import { Canvas } from "@react-three/fiber";

interface IThreeCanvas {
  children: any;
}

const ThreeCanvas = ({ children }: IThreeCanvas) => {
  return (
    <Canvas
      gl={{ antialias: false, alpha: false }}
      camera={{
        position: [0, 0, 3],
        focus: 5,
      }}
      dpr={[1, 2]}
    >
      {children}
    </Canvas>
  );
};

export default ThreeCanvas;
