import { OrbitControls } from "@react-three/drei";
import React from "react";
import ThreeLayout from "./ThreeLayout";
import BookObject from "./ThreeBookObject";

interface IThreeBookScene {
  children?: any;
}

const ThreeBook = ({ children }: IThreeBookScene) => {
  return (
    <ThreeLayout>
      <ambientLight intensity={0.8} />
      <BookObject
        position={[-1, 0, 0]}
        rotation={[Math.PI / 2, 0, -Math.PI / 2]}
      />
      <OrbitControls />
    </ThreeLayout>
  );
};

export default ThreeBook;
