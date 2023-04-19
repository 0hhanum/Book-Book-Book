import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";

export interface INavDropdown {
  dropdownItems: IDropdownItem[];
  onMouseLeave: () => void;
}
interface IDropdownItem {
  name: string;
  icon: string;
  link: string;
  type: "mail" | "internal" | "external";
}
const Container = styled(motion.div)`
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
    top: 10px;
    position: relative;
  }
  background-size: 16px 16px;
  background-color: ${(props) => props.theme.headerColor};
  width: 192px;
  height: 180px;
  position: absolute;
  top: -5px;
  right: -85px;
`;
const Ul = styled.ul`
  padding-top: 55px;
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
    font-size: 17px;
    color: ${(props) => props.theme.colors.black};
  }
`;
const NavDropdown = (props: INavDropdown) => {
  return (
    <AnimatePresence>
      <Container onMouseLeave={props.onMouseLeave}>
        <Ul>
          {props.dropdownItems.map((item) =>
            item.type === "internal" ? (
              <Link to={item.link} key={item.name}>
                <Li>
                  <img src={item.icon} />
                  <span>{item.name}</span>
                </Li>
              </Link>
            ) : (
              // external link
              <a href={item.link} key={item.name} target="_blank">
                <Li>
                  <img src={item.icon} />
                  <span>{item.name}</span>
                </Li>
              </a>
            )
          )}
        </Ul>
      </Container>
    </AnimatePresence>
  );
};

export default NavDropdown;
