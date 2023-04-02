import { OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import { BoxGeometry, Mesh, MeshStandardMaterial } from "three";
import ThreeLayout from "./ThreeLayout";

interface IThreeBook {
  children: any;
}
interface IBookObject {
  position: [number, number, number];
}
function BookObject(props: IBookObject) {
  const meshRef = useRef<Mesh>(null);
  const boxRef = useRef<BoxGeometry>(null);
  const materialRefs = useRef<MeshStandardMaterial[]>([]);
  // dispose all objects to avoid memory leaking
  useEffect(() => {
    return () => {
      boxRef.current?.dispose();
      materialRefs.current.forEach((materialRef) => {
        if (materialRef) {
          materialRef.dispose();
        }
      });
    };
  }, []);
  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y -= delta * 0.5;
      meshRef.current.rotation.z += delta * 0.25;
    }
  });

  return (
    <mesh {...props} scale={1} ref={meshRef}>
      <spotLight position={[-5, 10, 10]} angle={0.5} penumbra={0.5} />
      <boxGeometry ref={boxRef} args={[0.6, 0.8, 0.15]} attach="geometry" />
      <meshStandardMaterial
        color="white"
        attach="material-0"
        ref={(ref) => (ref ? materialRefs.current.push(ref!) : null)}
      />
      <meshStandardMaterial
        color="green"
        attach="material-1"
        ref={(ref) => (ref ? materialRefs.current.push(ref!) : null)}
      />
      <meshStandardMaterial
        color="white"
        attach="material-2"
        ref={(ref) => (ref ? materialRefs.current.push(ref!) : null)}
      />
      <meshStandardMaterial
        color="white"
        attach="material-3"
        ref={(ref) => (ref ? materialRefs.current.push(ref!) : null)}
      />
      <meshStandardMaterial
        color="green"
        attach="material-4"
        ref={(ref) => (ref ? materialRefs.current.push(ref!) : null)}
      />
      <meshStandardMaterial
        color="green"
        attach="material-5"
        ref={(ref) => (ref ? materialRefs.current.push(ref!) : null)}
      />
    </mesh>
  );
}
const ThreeBook = ({ children }: IThreeBook) => {
  return (
    <ThreeLayout>
      <ambientLight intensity={0.8} />
      <BookObject position={[0, 0, 0]} />
      <OrbitControls />
    </ThreeLayout>
  );
};

export default ThreeBook;
