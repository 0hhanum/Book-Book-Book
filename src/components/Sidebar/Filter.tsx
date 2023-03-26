import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";

export interface IFilter {
  author: string;
  isFilteredAuthor: boolean;
  onClick: () => void;
}
interface IFilterDiv {
  isActive: boolean;
}
const FilterLi = styled.li`
  cursor: pointer;
`;
const FilterDiv = styled(motion.div)<IFilterDiv>`
  height: 45px;
  width: 100%;
  text-align: center;
  font-weight: bold;
  font-size: 28px;
  padding-top: 20px;
  border-bottom: ${(props) => `1px solid ${props.theme.normalColor}`};
  color: ${(props) =>
    props.isActive ? props.theme.headerColor : props.theme.fontColor};
`;
const Filters = ({ author, isFilteredAuthor, onClick }: IFilter) => {
  return (
    <FilterLi onClick={onClick}>
      <FilterDiv isActive={isFilteredAuthor}>{author}</FilterDiv>
    </FilterLi>
  );
};

export default Filters;
