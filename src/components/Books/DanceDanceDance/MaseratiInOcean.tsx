import React from "react";
import ThreeLayout from "../../ThreeJS/ThreeLayout";
import styled from "styled-components";
import { motion } from "framer-motion";

const Container = styled(motion.div)`
  position: fixed;
  top: ${(props) => `${props.theme.variables.headerHeight}px`};
  right: 0;
  left: 0;
  bottom: 0;
  background-color: red;
`;

const MaseratiInOcean = () => {
  return (
    <Container
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 5 }}
    >
      <ThreeLayout>
        <ambientLight intensity={0.8} />
        <mesh>
          <boxGeometry />
          <meshStandardMaterial />
        </mesh>
      </ThreeLayout>
    </Container>
  );
};

export default MaseratiInOcean;
