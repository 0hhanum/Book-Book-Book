import React from "react";
import styled from "styled-components";

const Aside = styled.aside`
  position: fixed;
  width: ${(props) => props.theme.variables.sidebarWidth};
  top: ${(props) => props.theme.variables.headerHeight};
  bottom: 0;
  left: 0;
  border: 1px solid white;
`;

const Sidebar = () => {
  return <Aside>sidebar</Aside>;
};

export default Sidebar;
