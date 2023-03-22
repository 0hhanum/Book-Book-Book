import { Link } from "gatsby";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { isDefaultThemeAtom } from "../../atoms";
import { IDropDown } from "../Dropdown";
import { IThemeProp } from "../Layout";
import NavDropdown from "./NavDropdown";
import ThemeToggle from "./ThemeToggle";

const Header = styled.header<IThemeProp>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: ${(props) => props.theme.headerColor};
  h1 {
    color: ${(props) => props.theme.colors.black};
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
  position: relative;
  span {
    color: ${(props) => props.theme.colors.black};
    position: relative;
  }
`;
const Icon = styled.img`
  margin-right: 10px;
  width: 30px;
  height: 30px;
`;
const dropdownItems: IDropDown["items"] = [
  {
    name: "Github",
    icon: "/github_ico.svg",
    link: "https://github.com/0hhanum",
    type: "external",
  },
  {
    name: "Mail",
    icon: "/mail_ico.svg",
    link: "rntls123@naver.com",
    type: "mail",
  },
  {
    name: "Hotline",
    icon: "/hotline_ico.svg",
    link: "#",
    type: "internal",
  },
];
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
            <Icon src={"/favicon_lighter.svg"} />
            <h1>책책책, 책을 읽읍시다!</h1>
          </NavBox>
        </Link>
        <NavBox>
          <Contact onMouseEnter={onMouseEnter}>
            {isHover && (
              <NavDropdown onMouseLeave={onMouseLeave} items={dropdownItems} />
            )}
            <span>Contact</span>
          </Contact>
          <ThemeToggle />
        </NavBox>
      </Nav>
    </Header>
  );
};

export default NavBar;
