import { Stars, useGLTF, useAnimations } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import {
  Group,
  LinearFilter,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  TextureLoader,
  Vector3,
} from "three";
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
    actions["Demo"]?.play();
  }, [actions]);
  useEffect(() => {
    const mesh = bookSceneRef.current?.getObjectByName("Book_0") as Mesh;
    const bookCoverMaterial = new MeshStandardMaterial({
      // roughness: 0.5,
      // metalness: 0.9,
    });
    const textureLoader = new TextureLoader();
    textureLoader.load("/bookModel/textures/cover.jpeg", (texture) => {
      // to create high quality texture
      texture.generateMipmaps = true;
      texture.repeat.set(1, 1);
      texture.offset.set(0, 0);
      texture.center.set(0, 0);
      texture.rotation = 0;
      texture.minFilter = LinearFilter;
      texture.needsUpdate = true;
      texture.anisotropy = 1;
      texture.flipY = false;
      // bookCoverMaterial.map = texture;
      (mesh.material as MeshStandardMaterial).map = texture;
      console.log(mesh);
      setIsLoadingTexture(true);
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
export default BookObject;
