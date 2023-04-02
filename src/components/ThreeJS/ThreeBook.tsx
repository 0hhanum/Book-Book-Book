import { OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import { BoxGeometry, Color, Float32BufferAttribute, Mesh } from "three";
import ThreeLayout from "./ThreeLayout";

interface IThreeBook {
  children: any;
}
interface IBookObject {
  position: [number, number, number];
}
function BookObject(props: IBookObject) {
  const meshRef = useRef<Mesh>(null);
  // useFrame((state, delta) => {
  //   if (meshRef.current) {
  //     meshRef.current.rotation.y += delta * 0.5;
  //   }
  // });

  return (
    <mesh {...props} scale={1} ref={meshRef}>
      <boxGeometry args={[0.6, 0.8, 0.15]} attach="geometry" />
      <meshBasicMaterial color="white" attach="material-0" />
      <meshBasicMaterial color="green" attach="material-1" />
      <meshBasicMaterial color="white" attach="material-2" />
      <meshBasicMaterial color="white" attach="material-3" />
      <meshBasicMaterial color="green" attach="material-4" />
      <meshBasicMaterial color="green" attach="material-5" />
    </mesh>
  );
}
const ThreeBook = ({ children }: IThreeBook) => {
  return (
    <ThreeLayout>
      <ambientLight intensity={1.5} />
      <spotLight position={[5, 5, 10]} angle={0.15} penumbra={1} />
      <BookObject position={[0, 0, 0]} />
      <OrbitControls />
    </ThreeLayout>
  );
};

export default ThreeBook;
