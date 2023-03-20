import React from "react";
import Dropdown, { IDropDown } from "./Dropdown";

interface INavDropdown extends Omit<IDropDown, "position"> {}

const NavDropdown = (props: INavDropdown) => {
  return <Dropdown {...props} position="top: -5px; right: -5px" />;
};

export default NavDropdown;
