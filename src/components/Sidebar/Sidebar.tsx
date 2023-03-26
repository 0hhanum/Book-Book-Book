import React from "react";
import styled from "styled-components";
import Filter from "./Filter";
import filtersObject from "../../data/filters";

const Aside = styled.aside`
  position: fixed;
  width: ${(props) => props.theme.variables.sidebarWidth};
  top: ${(props) => props.theme.variables.headerHeight};
  bottom: 0;
  left: 0;
  border-right: ${(props) => `1px solid ${props.theme.normalColor}`};
`;
const Ul = styled.ul``;

const Sidebar = () => {
  return (
    <Aside>
      <Ul>
        {filtersObject.filters.map(({ author }, index) => (
          <Filter key={index} author={author} />
        ))}
      </Ul>
    </Aside>
  );
};

export default Sidebar;
