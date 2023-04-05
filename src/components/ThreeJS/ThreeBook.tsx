import {
  OrbitControls,
  Stars,
  useGLTF,
  useAnimations,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import { Mesh } from "three";
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
  const { nodes, animations, scene } = useGLTF(
    "/bookModel/scene.gltf"
  ) as CustomGLTF;
  // const targetMesh = scene.getObjectByName("Book_0") as Mesh;
  // const newMaterial = new MeshStandardMaterial({ color: "red" });
  // targetMesh.material = newMaterial;
  const { ref, actions, names } = useAnimations(animations);
  console.log(ref, actions, names);
  const animation = animations[0];
  console.log(animation);
  const cleanup = useRef(() => {
    bookMeshRef.current?.geometry.dispose();
  });

  // dispose all objects to avoid memory leaking
  useEffect(() => {
    return () => {
      cleanup.current();
    };
  }, []);
  useEffect(() => {
    // Reset and fade in animation after an index has been changed
    if (actions) {
      actions["Demo"]?.play();
    }
  }, [actions, names]);
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
      {/* <object3D ref={() => ref}>
        <mesh
          {...props}
          scale={0.5}
          ref={bookMeshRef}
          geometry={nodes["Book_0"].geometry}
        >
          <meshStandardMaterial color="red" />
        </mesh>
      </object3D> */}
      <primitive object={scene} ref={ref} />
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
