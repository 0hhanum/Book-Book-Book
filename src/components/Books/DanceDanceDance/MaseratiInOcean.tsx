import React, { Suspense, memo, useRef, useState } from "react";
import { OrbitControls, Sky, useGLTF } from "@react-three/drei";
import ThreeCanvas from "../../ThreeJS/ThreeCanvas";
import ThreeOcean from "../../ThreeJS/ThreeOcean";
import { Vector3 } from "three";
import { ThreeElements, useFrame, useThree } from "@react-three/fiber";
import { graphql, useStaticQuery } from "gatsby";

const CAMERA_POSITION = new Vector3(-5, 0, 70);
const CAMERA_ZOOM_SPEED = 0.005;
interface IMaseratiInOcean {
  isMaseratiVisible: boolean;
}
const MaseratiInOcean = ({ isMaseratiVisible }: IMaseratiInOcean) => {
  return (
    <ThreeCanvas cameraPosition={CAMERA_POSITION}>
      <Sky sunPosition={[0, -1, 0]} turbidity={20} />
      <group>
        <spotLight position={[0, 10, 20]} angle={0.4} penumbra={0.2} />
        <spotLight position={[0, 10, -20]} angle={0.4} penumbra={0.2} />
        <Suspense fallback={null}>
          <Maserati isMaseratiVisible={isMaseratiVisible} />
        </Suspense>
        <ThreeOcean />
        <boxGeometry />
      </group>
      <OrbitControls
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.5}
        maxDistance={450}
      />
    </ThreeCanvas>
  );
};
const Maserati = memo(({ isMaseratiVisible }: IMaseratiInOcean) => {
  const { contentfulAsset } = useStaticQuery<Queries.getMasiModelQuery>(graphql`
    query getMasiModel {
      contentfulAsset(title: { eq: "Maserati" }) {
        url
      }
    }
  `);
  const [isZoomIn, setIsZoomIn] = useState(false);
  const { scene } = useGLTF(contentfulAsset?.url!);
  const { camera } = useThree();
  const objectRef = useRef<ThreeElements>(null);
  // bouncng Masi
  useFrame((state, delta) => {
    if (!objectRef.current) return;
    if (!isMaseratiVisible) return;
    objectRef.current.position.y =
      Math.sin(state.clock.elapsedTime * 0.5) - Math.PI / 3.5;
    objectRef.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.1) * 0.2 - Math.PI / 6;
    if (!isZoomIn && state.clock.elapsedTime > 5) {
      // initial zoom
      const targetCameraPosition = new Vector3(5, 0, 10);
      const currentPosition = camera.position;
      camera.position.lerp(targetCameraPosition, CAMERA_ZOOM_SPEED);
      const dist = currentPosition.distanceTo(targetCameraPosition);
      if (dist < 0.1) {
        setIsZoomIn(true);
      }
    }
  });
  return (
    <primitive
      ref={objectRef}
      object={scene}
      rotation={[-Math.PI / 6, 0, 0]}
      position={[0, -Math.PI / 6, 0]}
    />
  );
});

export default MaseratiInOcean;
