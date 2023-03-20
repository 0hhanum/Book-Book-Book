import React from "react";

import { motion } from "framer-motion";
import styled from "styled-components";

const Container = styled(motion.div)`
  border: 1px solid ${(props) => props.theme.fontColor};
`;
const Dropdown = () => {
  return <Container></Container>;
};

export default Dropdown;
