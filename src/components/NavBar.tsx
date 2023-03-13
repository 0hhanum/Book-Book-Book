import { Link } from "gatsby";
import React from "react";
import styled from "styled-components";
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
const Icon = styled.img`
  margin-right: 10px;
`;
const NavBar = () => {
  return (
    <header>
      <Nav>
        <Link to="/">
          <NavBox>
            <Icon src="../../favicon.svg" width="30" height="30" />
            <h1>책책책, 책을 읽읍시다!</h1>
          </NavBox>
        </Link>
        <NavBox>
          <span>Contact</span>
          <ThemeToggle />
        </NavBox>
      </Nav>
    </header>
  );
};

export default NavBar;
