import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";

interface IFilter {
  bgColor: string;
  author?: string;
}
interface IContainer {
  bgColor: string;
}
const Container = styled(motion.div)<IContainer>`
  background-color: ${(props) => props.bgColor};
`;
const Filter = ({ bgColor, author }: IFilter) => {
  return (
    <Container bgColor={bgColor}>
      <h1>{author}</h1>
    </Container>
  );
};

export default Filter;
