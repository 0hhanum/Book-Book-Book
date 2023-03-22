import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";

export interface IFilters {
  filters: IFilter[];
}
export interface IFilter {
  bgColor: string;
  author?: string;
}
const FilterList = styled.li``;
const Filter = styled(motion.div)<IFilter>`
  background-color: ${(props) => props.bgColor};
`;
const Filters = ({ filters }: IFilters) => {
  console.log("render");
  return (
    <FilterList>
      {filters.map((filter, index) => (
        <Filter key={index} bgColor={filter.bgColor}>
          {filter.author || null}
        </Filter>
      ))}
    </FilterList>
  );
};

export default Filters;
