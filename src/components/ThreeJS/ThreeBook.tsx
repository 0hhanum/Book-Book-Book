import { Html, OrbitControls, Stars, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import { BoxGeometry, Material, Mesh, MeshStandardMaterial } from "three";
import ThreeLayout from "./ThreeLayout";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

interface IThreeBook {
  children: any;
}
interface IBookObject {
  position?: [number, number, number];
}

interface CustomGLTF extends GLTF {
  materials: { [key: string]: Material };
}
function BookObject(props: IBookObject) {
  const meshRef = useRef<Mesh>(null);
  const boxRef = useRef<BoxGeometry>(null);
  const materialRefs = useRef<MeshStandardMaterial[]>([]);
  const scene = useGLTF("/anibook/scene.gltf") as CustomGLTF;
  console.log(scene);
  // dispose all objects to avoid memory leaking
  useEffect(() => {
    return () => {
      boxRef.current?.dispose();
      materialRefs.current.forEach((materialRef) => {
        materialRef?.dispose();
      });
    };
  }, []);
  useFrame((_, delta) => {
    // if (meshRef.current) {
    //   meshRef.current.rotation.y -= delta * 0.3;
    //   meshRef.current.rotation.z += delta * 0.125;
    // }
  });

  return (
    <group>
      <mesh {...props} scale={1} ref={meshRef}>
        <spotLight position={[-5, 10, 10]} angle={0.5} penumbra={0.5} />
        <bufferGeometry attach="geometry" />
        <primitive object={scene.scene} />
      </mesh>
      <Stars />
    </group>
  );
}
const ThreeBook = ({ children }: IThreeBook) => {
  return (
    <ThreeLayout>
      <ambientLight intensity={0.8} />
      <BookObject position={[0, 0, -1]} />
      <OrbitControls />
    </ThreeLayout>
  );
};

export default ThreeBook;
