import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { OrbitControls, Sky } from "@react-three/drei";
import ThreeCanvas from "../../ThreeJS/ThreeCanvas";
import ThreeOcean from "../../ThreeJS/ThreeOcean";
import { Vector3 } from "three";

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
      transition={{ duration: 5 }}
    >
      <ThreeCanvas cameraPosition={new Vector3(100, 5, 0)}>
        <Sky sunPosition={[0, -1, 0]} turbidity={20} />
        <ThreeOcean />
        <boxGeometry />
        <OrbitControls />
      </ThreeCanvas>
    </Container>
  );
};

export default MaseratiInOcean;
