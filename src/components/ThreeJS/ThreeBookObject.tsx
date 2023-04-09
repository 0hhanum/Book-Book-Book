import { Stars, useGLTF, useAnimations } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import { Group, Mesh, MeshStandardMaterial, Vector3 } from "three";
import { IBook } from "../../data/books";
import { loadTexture } from "./ThreeUtils";

interface IBookObject {
  position: [number, number, number];
  rotation: [number, number, number];
  book: IBook;
}
const BookObject = React.memo(({ book, ...props }: IBookObject) => {
  const groupRef = useRef<Group>(null);
  const bookMaterialRef = useRef<MeshStandardMaterial>();

  const { scene, animations } = useGLTF("/bookModel/scene.gltf");
  const { actions, ref: bookSceneRef } = useAnimations(animations, groupRef);
  const [isZoomedIn, setIsZoomedIn] = useState(false);
  const [isLoadingTexture, setIsLoadingTexture] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const { camera } = useThree();
  useEffect(() => {
    camera?.position.set(0, 0, 20);
  }, [camera]);
  useEffect(() => {
    // actions["Demo"]?.play();
  }, [actions]);
  useEffect(() => {
    const bookMesh = bookSceneRef.current?.getObjectByName("Book_0") as Mesh;
    const bookMaterial = bookMesh.material as MeshStandardMaterial;
    bookMaterialRef.current = bookMaterial;
    bookMaterial.metalness = 0.5;
    bookMaterial.roughness = 0.2;
    loadTexture({
      bookId: "cover",
      material: bookMaterial,
      callback: () => setIsLoadingTexture(true),
    });
  }, [bookSceneRef]);
  useFrame((_, delta) => {
    if (!isZoomedIn && isLoadingTexture) {
      // Zoom in
      const targetPosition = new Vector3(0, 0, 7);
      const currentPosition = camera.position;
      camera.position.lerp(targetPosition, 0.05);
      const dist = currentPosition.distanceTo(targetPosition);
      if (dist < 0.1) {
        setIsZoomedIn(true);
      }
    } else {
      // Rotate the book
      if (bookSceneRef.current) {
        bookSceneRef.current.rotation.y += delta * 0.3;
        bookSceneRef.current.rotation.z += delta * 0.125;
      }
    }
  });
  const onClick = () => {
    if (actions["Demo"]) {
      actions["Demo"].play();
    }
  };
  return (
    <group ref={groupRef}>
      <spotLight position={[0, 10, 20]} angle={0.4} penumbra={0.2} />
      <spotLight position={[0, 10, -20]} angle={0.4} penumbra={0.2} />
      <primitive
        object={scene}
        {...props}
        ref={bookSceneRef}
        visible={isLoadingTexture}
        onPointOver={() => {
          setIsHover(true);
        }}
        onPointerOut={() => {
          setIsHover(false);
        }}
        onClick={onClick}
      />
      <Stars />
    </group>
  );
});
export default BookObject;
