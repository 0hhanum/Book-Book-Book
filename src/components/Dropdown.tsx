import { Link } from "gatsby";
import React from "react";
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
const Container = styled.div<IContainer>`
  border: 1px solid ${(props) => props.theme.fontColor};
  width: 200px;
  height: 400px;
  position: absolute;
  ${(props) => props.position}
`;
const Ul = styled.ul``;
const Li = styled.li``;
const Dropdown = ({ position, items }: IDropDown) => {
  return (
    <Container position={position}>
      <Ul>
        {items.map((item) => (
          <Link to={item.link}>
            <Li>
              <img src={item.link} />
              <span>{item.name}</span>
            </Li>
          </Link>
        ))}
      </Ul>
    </Container>
  );
};

export default Dropdown;
