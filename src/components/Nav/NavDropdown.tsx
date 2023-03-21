import React from "react";
import Dropdown, { IDropDown } from "../Dropdown";

interface INavDropdown extends Omit<IDropDown, "position"> {
  onMouseLeave: () => void;
}

const NavDropdown = (props: INavDropdown) => {
  return (
    <Dropdown
      {...props}
      position="top:25px; right: -85px"
      onMouseLeave={props.onMouseLeave}
    />
  );
};

export default NavDropdown;
