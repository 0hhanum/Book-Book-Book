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
  onMouseLeave: () => void;
}
interface IContainer {
  position: string;
}
const Container = styled.div<IContainer>`
  &:after {
    background: ${(
      props
    ) => `linear-gradient(135deg, ${props.theme.headerColor} 12px, transparent 0),
      linear-gradient(-135deg, ${props.theme.headerColor} 12px, transparent 0)`};
    background-repeat: repeat-x;
    background-size: 24px 24px;
    content: " ";
    display: flex;
    height: 30px;
    top: 15px;
    position: relative;
  }
  background-size: 16px 16px;
  background-color: ${(props) => props.theme.headerColor};
  width: 192px;
  height: 155px;
  position: absolute;

  ${(props) => props.position}
`;
const Ul = styled.ul`
  padding-top: 25px;
  width: 100%;
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  a {
    display: flex;
    justify-content: center;
    width: 100%;
  }
`;
const Li = styled.li`
  width: 80%;
  display: flex;
  align-items: center;
  img {
    margin: 5px 20px;
    width: 28px;
    height: 28px;
  }
  span {
    font-size: 18px;
    color: ${(props) => props.theme.colors.black};
  }
`;
const Dropdown = ({ position, items, onMouseLeave }: IDropDown) => {
  return (
    <Container position={position} onMouseLeave={onMouseLeave}>
      <Ul>
        {items.map((item) => (
          <Link to={item.link} key={item.name}>
            <Li>
              <img src={item.icon} />
              <span>{item.name}</span>
            </Li>
          </Link>
        ))}
      </Ul>
    </Container>
  );
};

export default Dropdown;
