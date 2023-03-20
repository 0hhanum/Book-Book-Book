import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

interface IItem {
  name: string;
  icon: string;
  link: string;
}
export interface IDropDown {
  items: IItem[];
  position: string;
}
interface IContainer {
  position: string;
}
const Container = styled(motion.div)<IContainer>`
  border: 1px solid ${(props) => props.theme.fontColor};
  width: 200px;
  height: 400px;
  position: absolute;
  ${(props) => props.position}
`;
const Dropdown = (props: IDropDown) => {
  return <Container position={props.position}></Container>;
};

export default Dropdown;
