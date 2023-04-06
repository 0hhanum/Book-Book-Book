import {
  OrbitControls,
  Stars,
  useGLTF,
  useAnimations,
  OrthographicCamera,
  CameraControls,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import { BoxGeometry, Group, Material, Mesh, Vector3 } from "three";
import ThreeLayout from "./ThreeLayout";

interface IThreeBook {
  children: any;
}
interface IBookObject {
  position?: [number, number, number];
}

const BookObject = React.memo((props: IBookObject) => {
  const groupRef = useRef<Group>(null);
  // const bookSceneRef = useRef<Mesh>(null);
  const { scene, animations } = useGLTF("/bookModel/scene.gltf");
  const { actions, ref: bookSceneRef } = useAnimations(animations, groupRef);
  const { camera } = useThree();
  useEffect(() => {
    camera?.position.set(0, 0, 15);
  }, [camera]);
  useEffect(() => {
    // actions["Demo"]?.play();
  }, [actions]);
  useEffect(() => {
    const mesh = bookSceneRef.current?.getObjectByName("Book_0") as Mesh;
  }, [bookSceneRef]);
  useFrame((_, delta) => {
    // if (bookSceneRef.current) {
    //   bookSceneRef.current.rotation.y -= delta * 0.3;
    //   bookSceneRef.current.rotation.z += delta * 0.125;
    // }
  });
  return (
    <group ref={groupRef}>
      <spotLight position={[-5, 10, 10]} angle={0.5} penumbra={0.5} />
      <primitive object={scene} {...props} ref={bookSceneRef}></primitive>
      <Stars />
    </group>
  );
});
const ThreeBook = ({ children }: IThreeBook) => {
  return (
    <ThreeLayout>
      <ambientLight intensity={0.8} />
      <mesh position={[0, 1, 0]}>
        <boxGeometry>
          <meshStandardMaterial color="green" />
        </boxGeometry>
      </mesh>
      <BookObject position={[0, 0, 0]} />
      <OrbitControls />
    </ThreeLayout>
  );
};

export default ThreeBook;
