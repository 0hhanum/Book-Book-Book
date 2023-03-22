import React from "react";
import styled from "styled-components";
import Filters, { IFilter } from "./Filters";

const COLOR_SET_NUM = 18;
const ROW_NUM = 17;

const filterColorSet = [
  "#CC4C48",
  "#93AB93",
  "#CA5117",
  "#1E4E79",
  "#DFE094",
  "#3B5E38",
  "#D9AA58",
  "#C4C8A2",
  "#D31A18",
  "#7E7269",
  "#D2C0BF",
  "#A97845",
  "#CF6164",
  "#DE9F06",
  "#EE4D08",
  "#525F87",
  "#6C5214",
  "#8C9F7B",
  "#108689",
];
const getRandomFilters = (): IFilter[] => {
  const randomFilterItemNum = Math.floor(Math.random() * 2) + 1; // 1 or 2
  const randomColorItemIndexes = [];
  for (let i = 0; i < randomFilterItemNum; i++) {
    randomColorItemIndexes.push(Math.round(Math.random() * COLOR_SET_NUM));
  }
  return randomColorItemIndexes.map((index) => ({
    author: `test ${index}`,
    bgColor: filterColorSet[index],
  }));
};
const Aside = styled.aside`
  position: fixed;
  width: ${(props) => props.theme.variables.sidebarWidth};
  top: ${(props) => props.theme.variables.headerHeight};
  bottom: 0;
  left: 0;
  border: 1px solid white;
`;
const Ul = styled.ul``;
const Sidebar = () => {
  return (
    <Aside>
      <Ul>
        <Filters filters={[{ author: "hanum", bgColor: "red" }]} />
        {[...Array(ROW_NUM)].map((_, index) => (
          <Filters key={index} filters={getRandomFilters()} />
        ))}
      </Ul>
    </Aside>
  );
};

export default Sidebar;
