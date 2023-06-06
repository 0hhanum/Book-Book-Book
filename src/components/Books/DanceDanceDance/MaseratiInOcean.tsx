import React, { memo } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { OrbitControls, Sky, useGLTF } from "@react-three/drei";
import ThreeCanvas from "../../ThreeJS/ThreeCanvas";
import ThreeOcean from "../../ThreeJS/ThreeOcean";
import { Vector3 } from "three";

const CAMERA_POSITION = new Vector3(100, 10, 0);
const ANIMATE_DURATION = 0.1;
const Container = styled(motion.div)`
  position: fixed;
  top: ${(props) => `${props.theme.variables.headerHeight}px`};
  right: 0;
  left: 0;
  bottom: 0;
`;
const MaseratiInOcean = () => {
  return (
    <Container
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: ANIMATE_DURATION }}
    >
      <ThreeCanvas cameraPosition={CAMERA_POSITION}>
        <Sky sunPosition={[0, -1, 0]} turbidity={20} />
        <group>
          <ThreeOcean />
          <boxGeometry />
        </group>
        <OrbitControls
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2}
          maxDistance={450}
        />
      </ThreeCanvas>
    </Container>
  );
};

const Maserati = memo(() => {
  const { scene, animations } = useGLTF("/threeModel/bookModel/scene.gltf");

  return null;
});
export default MaseratiInOcean;
