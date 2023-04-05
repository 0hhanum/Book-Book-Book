import { OrbitControls, Stars, useGLTF } from "@react-three/drei";
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
  nodes: { [key: string]: Mesh };
}
const BookObject = React.memo((props: IBookObject) => {
  const bookMeshRef = useRef<Mesh>(null);
  const { nodes, scene } = useGLTF("/bookModel/scene.gltf") as CustomGLTF;
  // const targetMesh = scene.getObjectByName("Book_0") as Mesh;
  console.log(nodes);
  // const newMaterial = new MeshStandardMaterial({ color: "red" });
  // targetMesh.material = newMaterial;

  const cleanup = useRef(() => {
    bookMeshRef.current?.geometry.dispose();
  });

  // dispose all objects to avoid memory leaking
  useEffect(() => {
    return () => {
      cleanup.current();
    };
  }, []);
  useFrame((_, delta) => {
    // if (bookMeshRef.current) {
    //   bookMeshRef.current.rotation.y -= delta * 0.3;
    //   bookMeshRef.current.rotation.z += delta * 0.125;
    // }
  });

  return (
    <group>
      <spotLight position={[-5, 10, 10]} angle={0.5} penumbra={0.5} />
      {/* <primitive object={scene} /> */}
      <mesh
        {...props}
        scale={1}
        ref={bookMeshRef}
        geometry={nodes["Book_0"].geometry}
      >
        <meshStandardMaterial color="red" />
      </mesh>
      <Stars />
    </group>
  );
});
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
