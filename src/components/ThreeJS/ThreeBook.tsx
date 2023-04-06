import {
  OrbitControls,
  Stars,
  useGLTF,
  useAnimations,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import React, { Suspense, useEffect, useRef, useState } from "react";
import {
  Group,
  LinearFilter,
  Mesh,
  MeshStandardMaterial,
  TextureLoader,
  Vector3,
} from "three";
import ThreeLayout from "./ThreeLayout";

interface IThreeBook {
  children: any;
}
interface IBookObject {
  position: [number, number, number];
  rotation: [number, number, number];
}

const BookObject = React.memo((props: IBookObject) => {
  const groupRef = useRef<Group>(null);
  const { scene, animations } = useGLTF("/bookModel/scene.gltf");
  const { actions, ref: bookSceneRef } = useAnimations(animations, groupRef);
  const [isZoomedIn, setIsZoomedIn] = useState(false);
  const [isLoadingTexture, setIsLoadingTexture] = useState(false);
  const { camera } = useThree();

  useEffect(() => {
    camera?.position.set(0, 0, 20);
  }, [camera]);
  useEffect(() => {
    // actions["Demo"]?.play();
  }, [actions]);
  useEffect(() => {
    const mesh = bookSceneRef.current?.getObjectByName("Book_0") as Mesh;
    const bookCoverMaterial = new MeshStandardMaterial({ color: "wheat" });
    const textureLoader = new TextureLoader();
    textureLoader.load(
      "/bookModel/textures/Base_metallicRoughness.png",
      (texture) => {
        // to create high quality texture
        texture.generateMipmaps = false;
        texture.minFilter = LinearFilter;
        texture.needsUpdate = true;
        bookCoverMaterial.map = texture;
        mesh.material = bookCoverMaterial;
        setIsLoadingTexture(true);
      }
    );
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

  return (
    <group ref={groupRef}>
      <spotLight position={[-5, 10, 10]} angle={0.5} penumbra={0.5} />
      <primitive
        object={scene}
        {...props}
        ref={bookSceneRef}
        visible={isLoadingTexture}
      />
      <Stars />
    </group>
  );
});
const ThreeBook = ({ children }: IThreeBook) => {
  return (
    <ThreeLayout>
      <ambientLight intensity={0.8} />
      <BookObject
        position={[-1, 0, 0]}
        rotation={[Math.PI / 2, 0, -Math.PI / 2]}
      />
      <OrbitControls />
    </ThreeLayout>
  );
};

export default ThreeBook;
