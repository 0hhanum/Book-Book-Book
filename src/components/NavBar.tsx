import { Link } from "gatsby";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { isDefaultThemeAtom } from "../atoms";
import Dropdown from "./Dropdown";
import { IThemeProp } from "./Layout";
import ThemeToggle from "./ThemeToggle";

const Header = styled.header<IThemeProp>`
  position: fixed;
  top: 0;
  width: 100%;
  background-color: ${(props) => props.theme.headerColor};
  h1,
  div {
    color: ${(props) =>
      props.$isDefaultTheme
        ? props.theme.backgroundColor
        : props.theme.fontColor};
  }
`;
const Nav = styled.nav`
  padding: 15px;
  display: flex;
  justify-content: space-between;
`;
const NavBox = styled.div`
  display: flex;
  align-items: center;
`;
const Contact = styled.div`
  cursor: pointer;
  margin-right: 20px;
`;
const Icon = styled.img`
  margin-right: 10px;
`;
const NavBar = () => {
  const isDefaultTheme = useRecoilValue(isDefaultThemeAtom);
  const [isHover, setIsHover] = useState(false);
  const onMouseEnter = () => {
    setIsHover(true);
  };
  const onMouseLeave = () => {
    setIsHover(false);
  };
  return (
    <Header $isDefaultTheme={isDefaultTheme}>
      <Nav>
        <Link to="/">
          <NavBox>
            <Icon src={"../../favicon_lighter.svg"} width="30" height="30" />
            <h1>책책책, 책을 읽읍시다!</h1>
          </NavBox>
        </Link>
        <NavBox>
          {isHover && <Dropdown />}
          <Contact onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            Contact
          </Contact>
          <ThemeToggle />
        </NavBox>
      </Nav>
    </Header>
  );
};

export default NavBar;
