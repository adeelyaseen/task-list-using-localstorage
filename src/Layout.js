import React from "react";
import { Outlet, Link } from "react-router-dom";
import styled from "styled-components";
const UL = styled.ul`
  list-style: none;
  display: flex;
  gap: 20px;
  padding: 20px;
`;
const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  background: lightgrey;
  position: sticky;
`;
export const Layout = () => {
  return (
    <>
      <Nav>
        <UL>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/bulk-delete">Delete Tasks</Link>
          </li>
        </UL>
      </Nav>

      <Outlet />
    </>
  );
};
