import { OrbitControls } from "@react-three/drei";
import React, { useRef } from "react";
import ThreeLayout from "./ThreeLayout";

interface IThreeBook {
  children: any;
}
interface IBookObject {
  position: [number, number, number];
}

function BookObject(props: IBookObject) {
  return (
    <mesh {...props} scale={1}>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial color={"orange"} />
    </mesh>
  );
}
const ThreeBook = ({ children }: IThreeBook) => {
  return (
    <ThreeLayout>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <BookObject position={[0, 0, 0]} />
      <OrbitControls />
    </ThreeLayout>
  );
};

export default ThreeBook;
