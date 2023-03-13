import { Link } from "gatsby";
import React from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { isDefaultThemeAtom } from "../atoms";
import ThemeToggle from "./ThemeToggle";

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
  return (
    <header>
      <Nav>
        <Link to="/">
          <NavBox>
            <Icon
              src={
                isDefaultTheme
                  ? "../../favicon.svg"
                  : "../../favicon_lighter.svg"
              }
              width="30"
              height="30"
            />
            <h1>책책책, 책을 읽읍시다!</h1>
          </NavBox>
        </Link>
        <NavBox>
          <Contact>Contact</Contact>
          <ThemeToggle />
        </NavBox>
      </Nav>
    </header>
  );
};

export default NavBar;
