import { OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import { Mesh } from "three";
import ThreeLayout from "./ThreeLayout";

interface IThreeBook {
  children: any;
}
interface IBookObject {
  position: [number, number, number];
}
function BookObject(props: IBookObject) {
  const meshRef = useRef<Mesh>(null);
  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y -= delta * 0.5;
      meshRef.current.rotation.z += delta * 0.25;
    }
  });

  return (
    <mesh {...props} scale={1} ref={meshRef}>
      <boxGeometry args={[0.6, 0.8, 0.15]} attach="geometry" />
      <meshStandardMaterial color="white" attach="material-0" />
      <meshStandardMaterial color="green" attach="material-1" />
      <meshStandardMaterial color="white" attach="material-2" />
      <meshStandardMaterial color="white" attach="material-3" />
      <meshStandardMaterial color="green" attach="material-4" />
      <meshStandardMaterial color="green" attach="material-5" />
    </mesh>
  );
}
const ThreeBook = ({ children }: IThreeBook) => {
  return (
    <ThreeLayout>
      <ambientLight intensity={0.8} />
      <spotLight position={[-5, 10, 10]} angle={0.5} penumbra={0.5} />
      <BookObject position={[0, 0, 0]} />
      <OrbitControls />
    </ThreeLayout>
  );
};

export default ThreeBook;
