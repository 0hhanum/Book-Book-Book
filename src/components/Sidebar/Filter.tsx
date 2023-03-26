import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";

export interface IFilter {
  author: string;
}
const Li = styled.li`
  cursor: pointer;
`;
const FilterDiv = styled(motion.div)`
  height: 45px;
  width: 100%;
  text-align: center;
  font-weight: bold;
  font-size: 28px;
  padding-top: 20px;
  border-bottom: ${(props) => `1px solid ${props.theme.normalColor}`};
`;
const Filters = ({ author }: IFilter) => {
  return (
    <Li>
      <FilterDiv>{author}</FilterDiv>
    </Li>
  );
};

export default Filters;
