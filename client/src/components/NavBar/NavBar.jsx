import React from "react";
import { NavLink } from "react-router-dom";
import useUser from "../../hooks/useUser";
import "./NavBar.css";

const NavBar = () => {
  const { handleLogout, user } = useUser();

  let nav = user ? (
    <div>
      <NavLink to="/search" className="NavBar-link">
        Search
      </NavLink>
      <NavLink to="/" className="NavBar-link">
        Home
      </NavLink>
      <NavLink to="/inventory" className="NavBar-link">
        Inventory
      </NavLink>
      &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
      <NavLink to="" className="NavBar-link" onClick={handleLogout}>
        LOG OUT
      </NavLink>
      <NavLink to="/profile">
        &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
        <span className="NavBar-welcome">WELCOME, {user}</span>
      </NavLink>
    </div>
  ) : (
    <div>
      <NavLink to="/login" className="NavBar-link">
        LOG IN
      </NavLink>
      &nbsp;&nbsp;|&nbsp;&nbsp;
      <NavLink to="/signup" className="NavBar-link">
        SIGN UP
      </NavLink>
    </div>
  );

  return <div className="NavBar">{nav}</div>;
};

export default NavBar;
