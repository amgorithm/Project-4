import React from "react";
import { Link, NavLink } from "react-router-dom";
import useUser from "../../hooks/useUser";
import "./NavBar.css";

const NavBar = () => {
  const { handleLogout, user } = useUser();

  let nav = user ? (
    <div>
      <NavLink to="/search" className="NavBar-link">
        Search
      </NavLink>
      <NavLink to="/dashboard" className="NavBar-link">
        Dashboard
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

  return (
    <div className="NavBar">
      <Link to="/">
        <h1>Waste Not</h1>
      </Link>

      {nav}
    </div>
  );
};

export default NavBar;
