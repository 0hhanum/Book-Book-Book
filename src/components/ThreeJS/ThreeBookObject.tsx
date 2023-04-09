import { Stars, useGLTF, useAnimations } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import {
  Euler,
  Group,
  Mesh,
  MeshStandardMaterial,
  Quaternion,
  Vector3,
} from "three";
import { IBook } from "../../data/books";
import { loadTexture } from "./ThreeUtils";
import { useSetRecoilState } from "recoil";
import { cursorStyleAtom } from "../../atoms";

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
  const [clickAnimation, setClickAnimation] = useState([false, false]);
  const [animationToggle, setAnimationToggle] = useState(false);
  const setIsHover = useSetRecoilState(cursorStyleAtom);
  const { camera } = useThree();
  useEffect(() => {
    camera?.position.set(0, 0, 20);
  }, [camera]);
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
      const targetCameraPosition = new Vector3(0, 0, 7);
      const currentPosition = camera.position;
      camera.position.lerp(targetCameraPosition, 0.05);
      const dist = currentPosition.distanceTo(targetCameraPosition);
      if (dist < 0.1) {
        setIsZoomedIn(true);
      }
    } else {
      if (bookSceneRef.current) {
        // book opening animation
        if (clickAnimation[0]) {
          if (!animationToggle) {
            // before zoom
            const targetCameraPosition = new Vector3(0, 0, 10);
            camera.position.lerp(targetCameraPosition, 0.04);
            const currentPosition = camera.position;
            const targetRotation = new Quaternion();
            targetRotation.setFromEuler(new Euler(0, -Math.PI / 2, 0));
            bookSceneRef.current.quaternion.slerp(targetRotation, 0.05);
            const cameraDistance =
              currentPosition.distanceTo(targetCameraPosition);
            const rotationDifference =
              bookSceneRef.current.quaternion.angleTo(targetRotation);
            if (cameraDistance < 0.5 && rotationDifference === 0) {
              setAnimationToggle(true);
            }
          } else if (clickAnimation[1]) {
            // after zoom
            const targetCameraPosition = new Vector3(5, 0, 5);
            camera.position.lerp(targetCameraPosition, 0.04);
          }
        } else {
          // Rotate the book
          bookSceneRef.current.rotation.y += delta * 0.4;
          bookSceneRef.current.rotation.z += delta * 0.225;
        }
      }
    }
  });
  useEffect(() => {
    if (animationToggle) {
      actions["Demo"]?.play();
      setTimeout(() => {
        actions["Demo"]?.stop();
        setClickAnimation([true, true]);
      }, 2000);
    }
  }, [animationToggle]);
  const onClick = () => {
    if (isZoomedIn) {
      // bookSceneRef.current!.rotation.y = -Math.PI / 2;
      // bookSceneRef.current!.rotation.z = 0;
      // const targetRotation = new Quaternion();
      // targetRotation.setFromEuler(new Euler(-Math.PI / 2, 0, 0));
      // setInterval(() => {
      //   bookSceneRef.current!.quaternion.slerp(targetRotation, 0.05);
      // });
      setClickAnimation([true, false]);
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
        onPointerOver={() => setIsHover(true)}
        onPointerOut={() => setIsHover(false)}
        onClick={onClick}
      />
      <Stars />
    </group>
  );
});
export default BookObject;
