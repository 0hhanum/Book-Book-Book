import React from "react";
import ThreeLayout from "../../ThreeJS/ThreeLayout";
import styled from "styled-components";
import { motion } from "framer-motion";

const Container = styled(motion.div)``;

const MaseratiInOcean = () => {
  return (
    <Container initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <ThreeLayout>
        <ambientLight intensity={0.8} />
      </ThreeLayout>
    </Container>
  );
};

export default MaseratiInOcean;
