import { Link } from "gatsby";
import React from "react";
import styled from "styled-components";

const Nav = styled.nav`
  padding: 10px;
  display: flex;
  justify-content: space-between;
`;
const SiteTitle = styled.div`
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
          <SiteTitle>
            <Icon src="../../favicon.svg" width="30" height="30" />
            <h1>책책책, 책을 읽읍시다!</h1>
          </SiteTitle>
        </Link>
        <div>
          <ul>
            <li></li>
          </ul>
        </div>
      </Nav>
    </header>
  );
};

export default NavBar;
