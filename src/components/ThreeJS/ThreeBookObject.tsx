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
import { IBook } from "../../types/book";
import { convertToKebabCase, loadTexture } from "./ThreeUtils";
import { useSetRecoilState } from "recoil";
import { cursorStyleAtom, selectedBookAtom } from "../../atoms";
import { navigate } from "gatsby";

interface IBookObject {
  position: [number, number, number];
  rotation: [number, number, number];
  book: IBook;
}

const BookObject = React.memo(
  ({ book: { coverImage, title }, ...props }: IBookObject) => {
    const groupRef = useRef<Group>(null);
    const bookMaterialRef = useRef<MeshStandardMaterial>();
    const { scene, animations } = useGLTF("/threeModel/bookModel/scene.gltf");
    const { actions, ref: bookSceneRef } = useAnimations(animations, groupRef);
    const [isZoomedIn, setIsZoomedIn] = useState(false);
    const [isLoadedTexture, setIsLoadedTexture] = useState(false);
    const [clickAnimation, setClickAnimation] = useState([false, false]);
    const [openAnimation, setOpenAnimation] = useState(false);
    const setIsHover = useSetRecoilState(cursorStyleAtom);
    const setSelectedBook = useSetRecoilState(selectedBookAtom);
    const { camera } = useThree();
    // set initial camera position
    useEffect(() => {
      camera?.position.set(0, 0, 20);
    }, [camera]);
    // load and set book cover texture
    useEffect(() => {
      const bookMesh = bookSceneRef.current?.getObjectByName("Book_0") as Mesh;
      const bookMaterial = bookMesh.material as MeshStandardMaterial;
      bookMaterialRef.current = bookMaterial;
      bookMaterial.metalness = 0.5;
      bookMaterial.roughness = 0.2;
      loadTexture({
        bookCoverSrc: coverImage?.file?.url || "",
        material: bookMaterial,
        callback: () => {
          setIsLoadedTexture(true);
        },
      });
    }, [bookSceneRef]);
    useEffect(() => {
      if (openAnimation) {
        actions["Demo"]!.play();
        setTimeout(() => {
          actions["Demo"]!.paused = true;
          // dive in to book
          setClickAnimation([true, true]);
        }, 1500);
      }
    }, [openAnimation]);
    useFrame((_, delta) => {
      if (!isLoadedTexture) return;
      if (!isZoomedIn) {
        // zoom in
        const targetCameraPosition = new Vector3(0, 0, 7);
        const currentPosition = camera.position;
        camera.position.lerp(targetCameraPosition, 0.1);
        const dist = currentPosition.distanceTo(targetCameraPosition);
        if (dist < 0.1) {
          setIsZoomedIn(true);
        }
      } else if (bookSceneRef.current) {
        const bookRef = bookSceneRef.current;
        if (!clickAnimation[0]) {
          // Rotate the book
          bookRef.rotation.y += delta * 0.4;
          bookRef.rotation.z += delta * 0.225;
        } else {
          // clickAnimation[0]: set camera and book for fixed position
          // clickAnimation[1]: dive to book
          if (!clickAnimation[1]) {
            // make distance from the book (camera)
            const targetCameraPosition = new Vector3(0, 0, 10);
            camera.position.lerp(targetCameraPosition, 0.07);
            // rotate book to see forward (book)
            const targetRotation = new Quaternion();
            targetRotation.setFromEuler(new Euler(0, -Math.PI / 2, 0));
            bookRef!.quaternion.slerp(targetRotation, 0.07);
            // Start book open animation
            setOpenAnimation(true);
          } else if (clickAnimation[1]) {
            // dive to book
            const targetCameraPosition = new Vector3(0, 0, 1);
            camera.position.lerp(targetCameraPosition, 0.05);
            const currentPosition = camera.position;
            const cameraDistance =
              currentPosition.distanceTo(targetCameraPosition);
            if (cameraDistance < 0.5) {
              // move to book detail page if dive animation is done
              navigate(`/books/${convertToKebabCase(title!)}`);
            }
          }
        }
      }
    });
    const onClick = () => {
      if (!clickAnimation[1]) {
        setClickAnimation([true, false]);
      }
    };
    return (
      <group ref={groupRef}>
        {/* light for opposite position */}
        <spotLight position={[0, 10, 20]} angle={0.4} penumbra={0.2} />
        <spotLight position={[0, 10, -20]} angle={0.4} penumbra={0.2} />
        <primitive
          object={scene}
          {...props}
          ref={bookSceneRef}
          visible={isLoadedTexture}
          onPointerOver={() => setIsHover(true)}
          onPointerOut={() => setIsHover(false)}
          onClick={onClick}
        />
        <Stars />
      </group>
    );
  }
);

export default BookObject;
